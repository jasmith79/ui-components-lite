import Styled from './styler.js';
import DataBinder from './binder.js';
import DOMutils from './dom.js';
import processHTMLAttr from './attribute-analyzer.js';
import { toSnakeCase } from '../../node_modules/jsstring/src/jsstring.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const baseMixin = sclass => class UIBase extends mix(sclass).with(Styled, DOMutils, DataBinder) {
  constructor () {
    super();
    this._listeners = [];
    this._isCentered = false;
    this._shadowElement = null;
    this._isReady = false;
  }

  static get observedAttributes () {
    // If extension elements have additional, be sure to call super.
    return ['style', 'class'];
  }

  get isUIComponent () {
    return this.classList.contains('is-ui-component');
  }

  init () {
    // Should be called by extension elements via super.
    const self = this;
    setTimeout(() => {
      self.classList.add('is-ui-component');
      self.constructor.observedAttributes.forEach(attr => {
        if (self.attr(attr)) {
          const evt = new CustomEvent('attribute-change');
          evt.changed = { name: attr, now: self.attr(attr), was: null };
          self.dispatchEvent(evt);
        }
      });

      [...this.attributes].forEach(({ name: attr, value: val}) => {
        const twoWay = val && val.match(/^\{\{\{(.+)\}\}\}$/);
        const oneWay = val && val.match(/^\{\{(.+)\}\}$/);
        const matched = twoWay ? twoWay[1] : oneWay ? oneWay[1] : null;
        const attrToWatch = matched ? toSnakeCase(matched, '-') : null;
        if (attrToWatch) {
          this.attr(attr, parent);
          this.bindAttribute(attr, attrToWatch, twoWay);
        }
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
      if (name in this._oneWayBoundAttrs && !this._internalMutationFlag) {
        console.warn(`Attempted to manually set data-bound attribute ${name} of ${this.componentName}.`);
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
