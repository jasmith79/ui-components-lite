import UIBase from '../utils/ui-component-base.js';
import { defineUIComponent, document } from '../utils/dom.js';
import extractType from '../../node_modules/extracttype/extracttype.js';
import { parseURL, toQueryString } from '../utils/url.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

export const Router = (() => {
  let historyManager = null;
  let localNavigationCounter = -2;
  const reflectedAttrs = [
    // updates-history: whether or not the router manages the navigation history. NOTE: can only be
    // set on one router element per page. Attempting to set more than one throws an error.
    'updates-history',

    // current-path: the current path of the router.
    'current-path',

    // base-path: automatically prepended to all paths, i.e. use if the document root is not '/'.
    // For example, if you have a test page at /tests/index.html and load up e.g.
    // localhost:8080/tests then router elements on that page should have a base-path set to
    // '/tests'.
    'base-path',

    // renders-current: whether or not the router renders the child element associated with the
    // current path. Routers do not render their children by default.
    'renders-current',
  ];

  const template = document.createElement('template');
  template.innerHTML = `<slot name="router-content"></slot>`;

  return defineUIComponent({
    name: 'ui-router',
    template,
    reflectedAttrs,
    definition: class Router extends UIBase {
      constructor () {
        super();
        this._contentSlot = null;
        this._routes = {};
        this._currentRoute = null;
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

      get currentRoute () {
        return this._currentRoute;
      }

      appendChild (node) {
        if (node.matches && node.matches('[route-path]')) {
          this._routes[node.getAttribute('route-path')] = node;
          super.appendChild(node);
        }
      }

      _updatePath (val) {
        let { data={}, path, queryString } = parseURL(val);

        if (!path) {
          if ('/' in this._routes) path = '/';
          if (!path || !this._routes[path]) throw new Error(`Unknown route ${path || 'empty'}.`);
        }

        const elem = this._routes[path];
        if (elem && elem !== this.selected) {
          if (this.selected) {
            this.selected.removeAttribute('is-selected');
            this.selected.removeAttribute('slot');
          }

          if (this.rendersCurrent) {
            elem.setAttribute('slot', 'router-content');
          }

          this.selected = elem;
          this._currentRoute = path;
          elem.update(data);
          elem.setAttribute('is-selected', true);

          const evt = new Event('change');
          evt.data = data;
          evt.value = path;
          evt.targetComponent = elem;

          this.dispatchEvent(evt);
          return [path, evt, queryString];
        } else {
          if (elem && path !== '/') console.warn(`No element matches path ${path},
            perhaps the ui-route has no path set?`);
          return [];
        }
      }

      route (val) {
        const type = extractType(val);
        let path = null;
        if (type === 'String') path = val;
        if (type.match(/HTML\w*Element/)) path = val.getAttribute('route-path');
        if (path && path in this._routes) this.currentPath = path;
        return this;
      }

      init () {
        super.init();
        this._contentSlot = this.shadowRoot.querySelector('slot');

        this.on('attribute-change', ({ changed: { now, name, was } }) => {
          switch (name) {
            case 'current-path':
              if (now !== was) {
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
              }
              break;

            case 'renders-current':
              if (this.selected) {
                if (now) {
                  this.selected.setAttribute('slot', 'router-content');
                } else {
                  this.selected.removeAttribute('slot');
                }
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

        let selected = null;
        this.selectAll('[route-path]').forEach((el, i) => {
          const path = el.getAttribute('route-path');
          this._routes[path] = el;
          if (!i) selected = path;
          if (el.matches && el.matches('[selected]')) selected = path;
        });
        this.route(selected);
      }
    }
  });
})();

export const Route = (() => {
  const reflectedAttrs = [
    // updates-history: whether or not the route's data is converted to a url query string
    // and added to the current browser url if the parent router manages the navigation history.
    'updates-history',

    // route-path: The url path associated with the element.
    'route-path',

    // selected: if the route is the current route of it's parent router.
    'is-selected',

    // warns-on-unload: whether or not data-changes to the route prompt user before leaving the
    // current page.
    'warns-on-unload',
  ];

  return defineUIComponent({
    name: 'ui-route',
    reflectedAttrs,
    definition: class Route extends UIBase {
      constructor () {
        super();
        this._data = null;
        this._unloadListener = e => {
          const [path, elem] = currentRoute;
          if (elem && elem.data) localStorage.setItem(path, JSON.stringify(elem.data));
        };
      }

      get data () {
        return this._data;
      }

      init () {
        super.init();
        let data = localStorage.getItem(this.routePath);
        if (data != null) this.update(data);

        this.on('attribute-change', ({ changed: { now, name } }) => {
          if (name === 'is-selected') {
            const evtName = now ? 'component-selected' : 'route-deselected';
            this.dispatchEvent(new CustomEvent(evtName));
          }
        });
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
    }
  });
})();
