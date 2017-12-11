import Styled from './styler.js';
import camelCaser from './camelcaser.js';
import extractType from '../../node_modules/extracttype/extracttype.js';
import htmlAttrs from './html-attributes.js';
import processHTMLAttr from './attribute-analyzer.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const isHTMLElement = arg => Boolean(extractType(arg).match(/HTML[a-zA-Z]*Element/));

const isHidden = {
  display: 'none !important',
};

const baseMixin = (superclass) => class UIBase extends mix(superclass).with(Styled) {
  constructor () {
    super();
    this._listeners = [];
    this._isCentered = false;
    this._shadowElement = null;
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

  get isUIComponent () {
    return this.constructor.name;
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
    return this.applyStyles(isHidden);
  }

  show () {
    return this.removeStyles(isHidden);
  }

  attr (name, value) {
    if (value === undefined) {
      return processHTMLAttr(this.getAttribute(name));
    } else {
      switch (extractType(value)) {
        case 'Null':
        case 'Undefined':
          this.removeAttribute(name);
          break;

        default:
          this.setAttribute(name, value);
          break;
      }
      return this;
    }
  }

  init () {
    // Should be called by extension elements via super.
    setTimeout(() => {
      this.dispatchEvent(new CustomEvent('ui-component-ready'));
    }, 0);
  }

  // If extension elements override the default connected and disconnected
  // Callbacks they need to call super or perform appropriate init/cleanup

  connectedCallback () {
    // This allows the elements to be detatched/reattatched without losing
    // handlers.
    this._listeners.forEach(([evt, f]) => this.addEventListener(evt, f));

    // This avoids Chrome firing the event before DOM is ready
    setTimeout(() => { this.init(); }, 0);
  }

  disconnectedCallback () {
    this._isCentered = false;
    this._shadowElement = null;
    this._listeners.forEach(([evt, f]) => this.removeEventListener(evt, f));
  }

  attributeChangedCallback (name, was, now) {
    if (!htmlAttrs.includes(name)) {
      this[camelCaser(name)] = now == null ? false : now == '' ? true : now;
    }
    const evt = new CustomEvent('attribute-change');
    evt.changed = { name, was, now };
    this.dispatchEvent(evt);
  }
}

export default baseMixin;
