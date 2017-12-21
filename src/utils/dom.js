import processHTMLAttr from './attribute-analyzer.js';
import extractType from '../../node_modules/extracttype/extracttype.js';
import { toCamelCase, toSnakeCase } from '../../node_modules/jsstring/src/jsstring.js';

const attrConf = { attributes: true };

const hidden = {
  display: 'none !important',
};

const isHTMLElement = arg => Boolean(extractType(arg).match(/HTML[a-zA-Z]*Element/));

const toPropertyObj = propList => {
  return propList.reduce((acc, prop) => {
    const property = toCamelCase(prop);
    acc[property] = {
      get: function() {
        return this[`_${property}`];
      },
      set: function(val) {
        this[`_${property}`] = val;
        this.attr(toSnakeCase(property, '-'), val);
      }
    };
    return acc;
  }, {});
};

export default superclass => class DOMutils extends superclass {
  constructor () {
    super();
    this._mutationObservers = [];
  }

  static reflectToAttribute (attrs) {
    const class_ = class extends this {
      constructor (...args) {
        super(...args);
        this.on('attribute-change', ({ changed: { name, now } }) => {
          if (attrs.includes(name)) {
            this[toCamelCase(name)] = now;
          }
        });
      }
    };

    Object.defineProperties(class_.prototype, toPropertyObj(attrs));
    return class_;
  }

  _checkForShadowAncestor () {
    let node = this.parentNode;
    while (node) {
      if (extractType(node) === 'ShadowRoot') return node;
      node = node.parentNode;
    }
    return;
  }

  get isVisible () {
    const style = window.getComputedStyle(this);
    return style.display !== 'none' && style.visibility !== 'hidden';
  }

  get shadowParent () {
    if (!this._shadowElement) {
      this._shadowElement = this._checkForShadowAncestor();
    }
    return this._shadowElement;
  }

  get isShadowElement () {
    return this._shadowElement || extractType(this) === 'ShadowRoot' || this.shadowParent;
  }

  // Observes changes to the given attribute on the given node.
  watchAttribute (node, attr, cb) {
    if ((node.constructor.observedAttributes || []).includes(attr)) {
      node.on('attribute-change', ({ changed: { now, name, was } }) => {
        if (name === attr) cb(now, name, was);
      });
    } else {
      const observer = new MutationObserver(([mutation]) => {
        if (mutation.attributeName === attr) {
          cb(node.attr(mutation.attributeName), mutation.attributeName, mutation.oldValue);
        }
      });

      observer.observe(node, attrConf);
      this._mutationObservers.push([observer, node, attrConf]);
    }

    return this;
  }

  selectAll (selector) {
    const nodeList = this.querySelectorAll(selector);
    return nodeList ? Array.from(nodeList) : [];
  }

  /**
   * on :: Event, (Event -> *) -> this
   *
   * Registers an event listener. Listeners added via this method are
   * automatically removed and reattached on being removed from/added to the
   * DOM.
   */
  on (evts, fn) {
    evts.split(/\s+/g).forEach(evt => {
      const isDupe = this._listeners.some(([e, f]) => e === evt && fn === f);
      if (!isDupe) {
        this.addEventListener(evt, fn);
        this._listeners.push([evt, fn]);
      }
    });
    return this;
  }

  /**
   * remove :: Void -> this      -- removes this from parent
   * remove :: Node -> this      -- removes child from this
   * remove :: [Node] -> this    -- removes children from this
   * remove :: (* -> *) -> this  -- removes listener for all events from this
   * remove :: String, (* -> *) -> this -- removes listener for specified event
   *
   * Removes a child node(s) or event listener. If no event name is provided, it removes that
   * listener function for all events for which it is bound to the element. If no arguments arguments
   * provided the method removes the element from its parent element. So this method
   * responds to the following signatures and ignores all others:
   */
  remove (...args) {
    const [evt, fn, children] = (arr => {
      switch (arr.length) {
        case 0:
          this.parentElement && this.parentElement.removeChild(this);
          return [];

        case 1:
          return (([item]) => {
            const type = extractType(item);
            // leaving this as a switch in case I think of more options later
            switch (type) {
              case 'Function': return [null, item]
              default:
                if (isHTMLElement(item) || type === 'Text') return [null, null, [item]];
                return [];
            }
          })(arr);

        default:
          return (args => {
            const [first] = args;
            if (isHTMLElement(first) || extractType(first) === 'Text') {
              return [null, null, args];
            }
            return args.slice(0,2);
          })(arr);
      }
    })(args);

    if (fn && extractType(fn) === 'Function') {
      this._listeners = this._listeners.filter(([e, f]) => {
        if (f === fn && (evt === null || evt === e)) {
          this.removeEventListener(e, f);
          return false;
        }
        return true;
      });
    }

    if (children) {
      children.forEach(child => this.removeChild(child));
    }

    return this;
  }

  hide () {
    return this.applyStyles(hidden);
  }

  show () {
    return this.removeStyles(hidden);
  }

  attr (name, value) {
    if (value === undefined) {
      return processHTMLAttr(this.getAttribute(name));
    } else {
      switch (extractType(value)) {
        case 'Null':
          this.removeAttribute(name);
          break;

        default:
          this.setAttribute(name, value);
          break;
      }
      return this;
    }
  }
};
