import UIBase from '../utils/ui-component-base.js';
import extractType from '../../node_modules/extracttype/extracttype.js';
import { parseURL, toQueryString } from '../utils/url.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const routeReflectedAttrs = [
  // updates-history: whether or not the route's data is converted to a url query string
  // and added to the current browser url if the parent router manages the navigation history.
  'updates-history',

  // route-path: The url path associated with the element.
  'route-path',

  // selected: if the route is the current route of it's parent router.
  'selected',

  // warns-on-unload: whether or not data-changes to the route prompt user before leaving the
  // current page.
  'warns-on-unload',
];

const routerReflectedAttrs = [
  // updates-history: whether or not the router manages the navigation history. NOTE: can only be
  // set on one router element per page. Attempting to set more than one throws an error.
  'updates-history',

  // current-path: the current path of the router.
  'current-path',

  // base-path: automatically prepended to all paths, i.e. use if the document root is not '/'.
  // For example, if you have a test page at /tests/index.html and load up e.g.
  // localhost:8080/tests then router elements on that page should have a base-path set to '/tests'.
  'base-path',

  // renders-current: whether or not the router renders the child element associated with the
  // current path. Routers do not render their children by default.
  'renders-current',
];

const slot = document.createElement('slot');
slot.name = 'router-content';

let localNavigationCounter = -2;

// Keep track of which router element is currently managing the navigation history.
let historyManager = null;

const Router = (class Router extends mix(HTMLElement).with(UIBase) {
  constructor () {
    super();
    this._contentSlot = null;
    this.attachShadow({ mode: 'open' });
    this._routes = {};
    this.currentRoute = [];
    this._managingHistory = false;
    this._popstateListener = ({ state: data }) => {
      localNavigationCounter -= 2;
      const { path } = parseURL(window.location.href);
      const routePath = path.replace(this.basePath, '');
      this.route(routePath);
      if (!localNavigationCounter) {
        window.removeEventListener('popstate', this._popstateListener);
        this._managingHistory = false;
      }
    };
  }

  static get observedAttributes () {
    return [...super.observedAttributes, ...routerReflectedAttrs];
  }

  get componentName () {
    return 'ui-router';
  }

  _updatePath (val) {
    let { data={}, path, queryString } = parseURL(val);

    if (!path) {
      if ('/' in this._routes) path = '/';
      if (!path || !this._routes[path]) throw new Error(`Unknown route ${path || 'empty'}.`);
    }

    if (this.selected) this.selected.removeAttribute('slot');
    const [elem, f] = this._routes[path];
    if (elem) {
      this.selected = elem;
      this.currentRoute = [path, elem];
      if (f) f(elem, data);
      elem.setAttribute('slot', 'router-content');

      const evt = new CustomEvent('route-changed', { bubbles: true });
      evt.data = data;
      evt.routePath = path;

      this.dispatchEvent(evt);
      return [path, evt, queryString];
    } else {
      console.warn(`No element matches path ${path}, perhaps the ui-route has no path set?`);
      return [];
    }
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
          if (this.updatesHistory && path) {
            history.pushState(this._routes[path].data, '', this.basePath + path);
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

            // Set up page load. Note that if the updates-history attribute is added
            // by JavaScript after the load event you will need to manually update the
            // current route, check querystring and/or localStorage, etc.
            window.addEventListener('load', e => {
              let { path, data } = parseURL(window.location.href);
              const routePath = path.replace(this.basePath, '');
              if (!Object.keys(data).length) {
                data = localStorage.getItem(routePath);
                if (data) data = JSON.parse(data);
              }
              this.route(routePath).update(data);
            });
          } else {
            historyManager = null;
            this._managingHistory = false;
            window.removeEventListener('popstate', this._popstateListener);
          }
      }
    });

    this.selectAll('[route-path]')
      .forEach((el, i) => {
        const path = el.getAttribute('route-path');
        this._routes[path] = [el];
        if (!i) this.currentPath = path;
        // el.on('data-changed', ({ data, target: el }) => {
        //   if (this.updatesHistory) history.replaceState(data, '', this.basePath + this.currentPath);
        // });
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
  constructor () {
    super();
    this._data = null;
    this._unloadListener = e => {
      const [path, elem] = currentRoute;
      if (elem && elem.data) localStorage.setItem(path, JSON.stringify(elem.data));
    };
  }

  static get observedAttributes () {
    return [...super.observedAttributes, ...routeReflectedAttrs];
  }

  get componentName () {
    return 'ui-route';
  }

  get data () {
    return this._data;
  }

  init () {
    super.init();
    this.classList.add('ui-route');
    let data = localStorage.getItem(this.routePath);
    if (data != null) this.update(data);
  }

  update (data) {
    this._data = data;
    const evt = new CustomEvent('data-changed');
    evt.data = data;
    if (this.updatesHistory) {
      const qs = toQueryString(data);
      if (qs !== '?') {
        history.replaceState(data, '', window.location.href, window.location.href + qs);
      }
    }
    this.dispatchEvent(evt);
    return this;
  }
}).reflectToAttribute(routeReflectedAttrs);

export {
  Route,
  Router,
};

customElements.define('ui-router', Router);
customElements.define('ui-route', Route);
