import Styled from './styler.js';
import extractType from '../../node_modules/extracttype/extracttype.js';
import processHTMLAttr from './attribute-analyzer.js';
import { toSnakeCase, toCamelCase } from '../../node_modules/jsstring/src/jsstring.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const attrConf = { attributes: true };

export const isHTMLElement = arg => Boolean(extractType(arg).match(/HTML[a-zA-Z]*Element/));

const hidden = {
  display: 'none !important',
};

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

const baseMixin = superclass => class UIBase extends mix(superclass).with(Styled) {
  constructor () {
    super();
    this._listeners = [];
    this._isCentered = false;
    this._shadowElement = null;
    this._isReady = false;
    this._internalMutationFlag = false;
    this._mutationObservers = [];
    this._oneWayBoundAttrs = [];
    this._twoWayBoundAttrs = [];
  }

  _checkForShadowAncestor () {
    let node = this.parentNode;
    while (node) {
      if (extractType(node) === 'ShadowRoot') return node;
      node = node.parentNode;
    }
    return;
  }

  static get observedAttributes () {
    // If extension elements have additional, be sure to call super.
    return ['style', 'class'];
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

  get isUIComponent () {
    return this instanceof UIBase && (this.constructor.name || true);
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

  /**
   * on :: Event, (Event -> *) -> this
   *
   * Registers an event listener. Listeners added via this method are
   * automatically removed and reattached on being removed from/added to the
   * DOM.
   */
  on (evt, fn) {
    const isDupe = this._listeners.some(([e, f]) => e === evt && fn === f);
    if (!isDupe) {
      this.addEventListener(evt, fn);
      this._listeners.push([evt, fn]);
    }
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

  _watch (node, attr, cb) {
    if ((node.constructor.observedAttributes || []).includes(attr)) {
      node.on('attribute-change', ({ changed: { now, name, was } }) => {
        cb(name, now, was);
      });
    } else {
      const observer = new MutationObserver(([mutation]) => {
        cb(mutation.attributeName, this.attr(mutation.attributeName), mutation.oldValue);
      });

      observer.observe(node, attrConf);
      this._mutationObservers.push([observer, node, attrConf]);
    }
  }

  bindAttribute (attribute, parentAttribute, twoWay=false) {
    let parent = null;
    let node = this;
    while (node = (node.parentNode || node.host)) { // need host for shadowRoots
      if (node.getAttribute(parentAttribute) != null) {
        parent = node;
        break;
      }
    }

    if (!parent) {
      throw new Error(`Attempted to bind attribute ${attribute} to ${parentAttribute},` +
         'but no matching parent found.');
    }

    if (!parent.isUIComponent) {
      console.warn(`Attempted to data-bind ${parentAttribute} to non-ui-component parent.`);
      return;
    }

    this._watch(parent, parentAttribute, (name, now, was) => {
      if (this.attr(attribute) !== now) {
        this._internalMutationFlag = true;
        this.attr(attribute, now);
      }
    });

    if (twoWay) {
      this._watch(this, attribute, (name, now, was) => {
        if (parent.attr(parentAttribute) !== now) {
          parent.attr(parentAttribute, now);
        }
      });
      this._twoWayBoundAttrs.push(attribute);
    } else {
      this._oneWayBoundAttrs.push(attribute);
    }
  }

  init () {
    // Should be called by extension elements via super.
    const self = this;
    setTimeout(() => {
      self.constructor.observedAttributes.forEach(attr => {
        if (self.attr(attr)) {
          const evt = new CustomEvent('attribute-change');
          evt.changed = { name: attr, now: self.attr(attr), was: null };
          self.dispatchEvent(evt);
        }
      });

      // Set up data-binding. Any element attributes with a value matching the binding syntax
      // check up the DOM tree until it hits the document (in which case it throws) or finds
      // an element with a matching attribute.
      //
      // If the attribute uses the one-way syntax, the element is updated when it's parent
      // changes, if two-way then, well, it works both ways. Attempting to change a one-way
      // property logs a warning to the console and fails.
      //
      // As of right now, only works if the parent is a UIComponent. Otherwise, it log a warning
      // to the console but not throw.
      Array.from(this.attributes).forEach(({ name: attr, value: val}) => {
        const twoWay = val && val.match(/^\{\{\{(.+)\}\}\}$/);
        const oneWay = val && val.match(/^\{\{(.+)\}\}$/);
        const matched = twoWay ? twoWay[1] : oneWay ? oneWay[1] : null;
        const attrToWatch = matched ? toSnakeCase(matched, '-') : null;
        if (attrToWatch) this.bindAttribute(attr, attrToWatch, twoWay);
        // if (attr=="value") debugger;
        // if (attrToWatch) {
        //   let parent = null;
        //   let node = this;
          // while (node = (node.parentNode || node.host)) { // need host for shadowRoots
          //   if (node.getAttribute(attrToWatch) != null) {
          //     parent = node;
          //     break;
          //   }
          // }
          //
          // if (!parent) {
          //   throw new Error(`Attempted to bind attribute ${attr} to ${attrToWatch},` +
          //      'but no matching parent found.');
          // }
          //
          // if (!parent.isUIComponent) {
          //   console.warn(`Attempted to data-bind ${attrToWatch} to non-ui-component parent.`);
          //   return;
          // }
        //
        //   const doTheThings = () => {
        //     // Set initially to parent value.
        //     this.attr(attr, parent.attr(attrToWatch));
        //     if (parent.constructor.observedAttributes.includes(attrToWatch)) {
        //       parent.on('attribute-change', ({ changed: { now, name } }) => {
        //         if (name === attrToWatch) this.attr(attr, now);
        //       });
        //     } else {
        //       const observer = new MutationObserver(([mutation]) => {
        //         if (mutation.attributeName === attrToWatch) {
        //           const parentVal = parent.attr(attrToWatch);
        //           if (this.attr(attr) !== parentVal) this.attr(attr, parentVal);
        //         }
        //       });
        //
        //       const conf = { attributes: true };
        //       observer.observe(parent, conf);
        //       this._mutationObservers.push([observer, parent, conf]);
        //     }
        //
        //     if (twoWay) {
        //       if (this.constructor.observedAttributes.includes(attr)) {
        //         this.on('attribute-change', ({ changed: { now, name } }) => {
        //           if (name === attr) parent.attr(attrToWatch, now);
        //         });
        //       } else {
        //         const conf = { attributes: true };
        //         const observer = new MutationObserver(([mutation]) => {
        //           if (mutation.attributeName === attr) {
        //             const current = this.attr(attr);
        //             if (parent.attr(attrToWatch) !== current) parent.attr(attrToWatch, current);
        //           }
        //         });
        //
        //         observer.observe(this, conf);
        //         this._mutationObservers.push([observer, this, conf]);
        //       }
        //     }
        //   };
        //
        //   if (parent._isReady) {
        //     doTheThings();
        //   } else {
        //     parent.on('ui-component-ready', doTheThings);
        //   }
        // }
      });

      this._isReady = true;
      this.dispatchEvent(new CustomEvent('ui-component-ready'));
    }, 0);
  }

  // If extension elements override the default connected and disconnected
  // Callbacks they need to call super to perform appropriate init/cleanup

  connectedCallback () {
    // This allows the elements to be detatched/reattached without losing
    // handlers.
    this._listeners.forEach(([evt, f]) => this.addEventListener(evt, f));

    // Allows element to be detatched and reattached while automatically cleaning up
    // on eventual deletion.
    this._mutationObservers.forEach(([o, target, conf]) => o.observe(target, conf));

    // This avoids Chrome firing the event before DOM is ready
    setTimeout(() => { this.init(); }, 0);
  }

  disconnectedCallback () {
    this._isCentered = false;
    this._shadowElement = null;
    this._listeners.forEach(([evt, f]) => this.removeEventListener(evt, f));
    this._mutationObservers.forEach(([o]) => o.disconnect());
  }

  attributeChangedCallback (name, was, now) {

    if (was !== now) {
      if (this._oneWayBoundAttrs.includes(name) && !this._internalMutationFlag) {
        console.warn(`Attempted to manually set data-bound attribute ${name} of ${this.UIComponentName}.`);
        this._internalMutationFlag = true;
        this.attr(name, was);
        this._internalMutationFlag = false;
      } else {
        this._internalMutationFlag = false;
        const evt = new CustomEvent('attribute-change');
        evt.changed = { name, was, now: processHTMLAttr(now), raw: now };
        this.dispatchEvent(evt);
      }
    }
  }
}

export default baseMixin;
