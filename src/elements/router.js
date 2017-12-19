import UIBase, { isHTMLElement } from '../utils/ui-component-base.js';
import extractType from '../../node_modules/extracttype/extracttype.js';
import { parseURL, toQueryString } from '../utils/url.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const routeReflectedAttrs = ['route-path', 'selected'];
const routerReflectedAttrs = ['updates-history', 'current-path', 'base-path', 'renders-current'];
const slot = document.createElement('slot');
slot.name = 'router-content';

let localNavigationCounter = -2;
let historyManager = null;
const Router = (class Router extends mix(HTMLElement).with(UIBase) {
  constructor () {
    super();
    this._contentSlot = null;
    this.attachShadow({ mode: 'open' });
    this._routes = {};
    this.currentRoute = [];
    this._managingHistory = false;
    this._popstateListener = ({ state: { path }={} }) => {
      localNavigationCounter -= 2;
      this.route(path);
      if (!localNavigationCounter) {
        window.removeEventListener('popstate', this._popstateListener);
        this._managingHistory = false;
      }
    };
  }

  static get observedAttributes () {
    return [...super.observedAttributes, ...routerReflectedAttrs];
  }

  _updatePath (val) {
    let { data={}, path, queryString } = parseURL(val);

    if (!path) {
      if ('/' in this._routes) path = '/';
      if (!path || !this._routes[path]) throw new Error(`Unknown route ${path || 'empty'}.`);
    }

    if (this.selected) this.selected.removeAttribute('slot');
    const [elem, f] = this._routes[path];
    this.selected = elem;
    this.currentRoute = [path, elem];
    if (f) f(elem, data);
    elem.setAttribute('slot', 'router-content');

    const evt = new CustomEvent('route-changed', { bubbles: true });
    evt.data = data;
    evt.routePath = path;

    this.dispatchEvent(evt);
    return [path, evt, queryString];
  }

  init () {
    super.init();

    this.classList.add('ui-router');
    this.on('attribute-change', ({ changed: { now, name, was } }) => {
      switch (name) {
        case 'current-path':
          localNavigationCounter++;
          if (this.updatesHistory && !this._managingHistory) {
            window.addEventListener('popstate', this._popstateListener);
          }
          const [path, evt, queryString] = this._updatePath(now);
          const { protocol, fullDomain } = parseURL(window.location.href);
          if (this.updatesHistory) {
            const url = `${protocol}://` +
              fullDomain +
              (this.basePath || '') +
              path +
              (queryString ? `?${queryString}` : '');

            history.pushState({ path }, '', url);
            window.dispatchEvent(evt);
          }
          break;

        case 'renders-current':
          if (now && !this._contentSlot) {
            this._contentSlot = slot.cloneNode(true);
            this.shadowRoot.appendChild(this._contentSlot);
          }
          break;

        case 'updates-history':
          if (now) {
            if (historyManager) {
              throw new Error(
                `Only one router per page can manage the navigation history
                 at a time. Please listen for that router's route-changed
                 event to update other elements.`
              );
            }
            historyManager = this;
            this._managingHistory = true;
            window.addEventListener('popstate', this._popstateListener);
          } else {
            historyManager = null;
            this._managingHistory = false;
            window.removeEventListener('popstate', this._popstateListener);
          }
      }
    });

    Array.from(this.querySelectorAll('[route-path]'))
      .forEach((el, i) => {
        const path = el.getAttribute('route-path');
        this._routes[path] = [el];
        if (!i) this.currentPath = path;
      });
  }

  addRoute (path, elem, f) {
    this._routes[path] = [elem, f];
    return this;
  }

  route (rt) {
    this.currentPath = rt;
    return this._routes[rt][0];
  }
}).reflectToAttribute(routerReflectedAttrs);

const Route = (class Route extends mix(HTMLElement).with(UIBase) {
  static get observedAttributes () {
    return [...super.observedAttributes, ...routeReflectedAttrs];
  }

  init () {
    super.init();
    this.classList.add('ui-route');
  }
}).reflectToAttribute(routeReflectedAttrs);

export {
  Route,
  Router,
};

customElements.define('ui-router', Router);
customElements.define('ui-route', Route);
