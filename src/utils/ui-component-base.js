/*
 * ui-component-base.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * Base class for ui-components-lite custom elements. Bare minimum API contract.
 */

import './styler.js';
import DataBinder from './binder.js';
import DOMutils from './dom-utils.js';
import processHTMLAttr from './attribute-analyzer.js';
import event2Promise from './promise-from-event.js';
import { baseClass, global, document, defineUIComponent } from './dom.js';
import { toSnakeCase, toCamelCase } from '../../../jsstring/src/jsstring.js';
import { mix } from '../../../mixwith/src/mixwith.js';

let flag = true;
class UIBase extends mix(baseClass).with(DOMutils, DataBinder) {
  constructor () {
    super();
    // Track the listeners so they can be detatched/reattached when element is added to/removed from
    // the DOM, avoid memory leaks.
    this._listeners = [];

    // Will be called before the WebComponentReady event fires on the element. If any of the
    // functions return a Promise, the event will be delayed until the Promise(s) resolve(s).
    this._beforeReadyHandlers = [];
    this._pendingDOM = [];
    this._isReady = event2Promise({
      element: this,
      eventName: 'ui-component-ready',
      callback: () => this
    });

    // This is a hack to get around the (current) limitations of the ShadyCSS polyfill. In a
    // perfect world (or at least in browsers with native WC support) this is unnecessary
    // ceremony, each constructor can attach `style`s to the element's shadowRoot and calls to super()
    // will sort it all out in order. However the CSS Scoping polyfill goes by tagName, meaning
    // screw you if you want to inherit CSS styles from an ancestor element's shadowRoot. Or use
    // mixins. Or generally do anything that isn't a trivial toy example in browsers with no
    // native support.
    let tmpl = this._stamp();
    if (tmpl) {
      if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(global.document.importNode(tmpl.content, true));
    }

    // Set up attribute to property reflection. Setters will take care of the property to attribute
    // reflection. Checking against the current value prevents the infinite loop.
    let rfs = this.constructor.observedAttributes;
    if (rfs.length) {
      this.on('attribute-change', ({ changed: { name, now } }) => {
        if (rfs.includes(name)) {
          this[toCamelCase(name)] = now;
        }
      });
    }

    // This is because the spec doesn't allow attribute changes in an element constructor.
    // Use a Promise instead of setTimeout because microtask enqueues faster.
    Promise.resolve(true).then(_ => this.init());
  }

  static get observedAttributes () {
    // If extension elements add additional, be sure to call super.
    return ['style', 'class'];
  }

  get componentName () {
    return this.tagName.toLowerCase();
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
    let p = this._isReady.then(_ => Promise.all(fs.map(f => f(this))));

    if (global._usingShady) {
      global.ShadyCSS.styleSubtree(this);
    }

    return p;
  }

  // Should be called by extension elements via super.
  init () {
    this.classList.add('is-ui-component');

    const elReady = el => el._isReady || Promise.resolve(el);
    const children = [...[...this.children].map(elReady)];
    if (this.shadowRoot) children.push.apply(children, [...this.shadowRoot.children].map(elReady));

    [...this.attributes].forEach(({ name: attr, value: val}) => {
      const twoWay = val && val.match(/^\{\{\{(.+)\}\}\}$/);
      const oneWay = val && val.match(/^\{\{(.+)\}\}$/);
      const matched = twoWay ? twoWay[1] : oneWay ? oneWay[1] : null;
      const attrToWatch = matched ? toSnakeCase(matched, '-') : null;
      if (attrToWatch) {
        this.bindAttribute(attr, attrToWatch, twoWay);
      }
    });

    Promise.all(children)
      .then(chlds => {
        // have to wait for children to be ready in case they're listening
        let rfs = this.constructor.observedAttributes;
        rfs.forEach(attr => {
          if (this.attr(attr)) {
            const evt = new CustomEvent('attribute-change');
            evt.changed = { name: attr, now: this.attr(attr), was: null };
            this.dispatchEvent(evt);
          }
        });

        return this._beforeReadyHandlers.length ?
          Promise.all(this._beforeReadyHandlers.map(f => f(this))) :
          null;
      })
      .then(_ => {
        return Promise.all(this._pendingDOM);
      })
      .then(_ => {
        this.dispatchEvent(new CustomEvent('ui-component-ready', { bubbles: false }));
        this._pendingDOM = null;
      }).catch(err => {
        throw err;
      });
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
  }

  // Removes all registered listeners/observers. If the element is GC'd, so are they, if the
  // element is reattached, so are they.
  disconnectedCallback () {
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

// re-export stuff from dom.js for convenience
export {
  global,
  document,
  UIBase,
  defineUIComponent,
};
