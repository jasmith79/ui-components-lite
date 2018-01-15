import './styler.js';
import DataBinder from './binder.js';
import DOMutils from './dom-utils.js';
import processHTMLAttr from './attribute-analyzer.js';
import event2Promise from './promise-from-event.js';
import { baseClass, global } from './dom.js';
import { toSnakeCase } from '../../node_modules/jsstring/src/jsstring.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

let flag = true;
class UIBase extends mix(baseClass).with(DOMutils, DataBinder) {
  constructor () {
    super();
    this._listeners = [];
    this._isCentered = false;
    this._beforeReadyHandlers = [];
    this._isReady = event2Promise({
      element: this,
      eventName: 'ui-component-ready',
      callback: () => this
    });
  }

  static get observedAttributes () {
    // If extension elements have additional, be sure to call super.
    return ['style', 'class'];
  }

  get componentName () {
    return `ui-${toSnakeCase(this.constructor.name, '-')}`;
  }

  get isUIComponent () {
    return true;
  }

  get _childrenUpgraded () {
    return Promise.all([...this.children].map(ch => Promise.resolve(ch._isReady || ch)));
  }

  _beforeReady (...fs) {
    this._beforeReadyHandlers.push.apply(this._beforeReadyHandlers, fs);
  }

  onReady (...fs) {
    this._isReady.then(_ => {
      fs.forEach(f => f(this));
    });

    if (global._usingShady) {
      global.ShadyCSS.styleSubtree(this);
    }
    
    return this;
  }

  init () {
    // Should be called by extension elements via super. setTimeout is so that any initialization
    // and event handlers in the descendant classes can be attached before the reflected attribute
    // setup.
    setTimeout(() => {
      this.classList.add('is-ui-component');

      const children = this.shadowRoot ?
        [this._childrenUpgraded, ...this.shadowRoot.children] :
        this._childrenUpgraded;

      Promise.resolve(children)
        .then(_ => {
          this.constructor.observedAttributes.forEach(attr => {
            if (this.attr(attr)) {
              const evt = new CustomEvent('attribute-change');
              evt.changed = { name: attr, now: this.attr(attr), was: null };
              this.dispatchEvent(evt);
            }
          });

          [...this.attributes].forEach(({ name: attr, value: val}) => {
            const twoWay = val && val.match(/^\{\{\{(.+)\}\}\}$/);
            const oneWay = val && val.match(/^\{\{(.+)\}\}$/);
            const matched = twoWay ? twoWay[1] : oneWay ? oneWay[1] : null;
            const attrToWatch = matched ? toSnakeCase(matched, '-') : null;
            if (attrToWatch) {
              this.bindAttribute(attr, attrToWatch, twoWay);
            }
          });

          return this._beforeReadyHandlers.length ?
            Promise.all(this._beforeReadyHandlers.map(f => f(this))) :
            null;
        })
        .then(_ => {
          this.dispatchEvent(new CustomEvent('ui-component-ready', { bubbles: true }));
        });
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
    setTimeout(() => { this.init(); }, 10)
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

export default UIBase;
