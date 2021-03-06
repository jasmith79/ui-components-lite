/*
 * router.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * router component for ui-components-lite.
 */

import { UIBase, defineUIComponent, document, global } from '../utils/ui-component-base.js';
import { parseURL, toQueryString } from '../utils/url.js';

import extractType from '../../../extracttype/extracttype.js';
import { mix } from '../../../mixwith/src/mixwith.js';

export const Router = (() => {
  let historyManager = null;
  let localNavigationCounter = -1;
  let historyStack = [];
  const reflectedAttributes = [
    // updates-history: whether or not the router manages the navigation history. NOTE: can only be
    // set on one router element per page. Attempting to set more than one throws an error.
    'updates-history',

    // renders-current: whether or not the router renders the child element associated with the
    // current path. Routers do not render their children by default.
    'renders-current',

    // hash-bang: whether or not the history updates use hash-bang urls for client-side routing
    'hash-bang',
  ];

  const template = document.createElement('template');
  template.innerHTML = `<slot name="router-content"></slot>`;

  return defineUIComponent({
    name: 'ui-router',
    template,
    reflectedAttributes,
    definition: class Router extends UIBase {
      constructor () {
        super();
        this._contentSlot = null;
        this._routes = {};
        this._currentRoute = null;
        this._managingHistory = false;
        this._login = null;
        this._popstateListener = ({ state: data }) => {
          // here we ignore querystring data, it may be stale
          const { route } = parseURL(window.location.href);

          // detect if it was back or forward button:
          if (route === historyStack[historyStack.length - 2]) {
            historyStack.pop();
          }

          this._updateRoute(route);
          if (!historyStack.length || (historyStack.length === 1 && historyStack[0] === '/')) {
            global.removeEventListener('popstate', this._popstateListener);
            this._managingHistory = false;
          }
        };
      }

      get currentRoute () {
        return this._currentRoute;
      }

      set currentRoute (route) {
        if (route in this._routes) {
          return this.route(route);
        }

        return null;
      }

      appendChild (node) {
        if (node.matches && node.matches('[route-path]')) {
          this._routes[node.getAttribute('route-path')] = node;
          super.appendChild(node);
        }
      }

      _internalRoute(route, data) {
        if (!route) {
          if ('/' in this._routes) route = '/';
          if (!route || !this._routes[route]) throw new Error(`Unknown route ${route || 'empty'}.`);
        }

        const elem = this._routes[route];
        if (!elem && route !== '/') {
          console.warn(`No element matches path ${route},
            perhaps the ui-route has no path set?`);

          return null;
        }

        if (elem !== this.selected) {
          if (this.selected) {
            this.selected.removeAttribute('is-selected');
            this.selected.removeAttribute('slot');
          }

          if (this.rendersCurrent) {
            elem.setAttribute('slot', 'router-content');
          }

          this.selected = elem;
          this._currentRoute = route;
          this.attr('current-route', route);
          if (elem) {
            if (data && Object.keys(data).length) elem.update(data);
            elem.setAttribute('is-selected', true);
          }

          if (route === '/login') {
            let username = elem.querySelector('.ui-login').selectInternalElement('[name="user"]');
            if (username) username.focus();
          }

          // TODO: this makes maps work. Fix this.
          global.setTimeout(() => { global.dispatchEvent(new Event('resize')); }, 0);

          return elem;
        }
        return null;
      }

      _updateRoute (route, data) {
        let changed = this._internalRoute(route, data);
        if (changed) {
          const evt = new Event('change');
          evt.data = changed.data;
          evt.value = route;
          evt.targetComponent = changed;

          this.dispatchEvent(evt);
        }
        return changed;
      }

      _updateHistory(route, url, data={}) {
        global.history.pushState(data, '', url);
        historyStack.push(route);
      }

      route (val, outsidedata) {
        let { data: urldata, path } = parseURL(window.location.href);
        const data = outsidedata || urldata;
        const type = extractType(val);
        let route = null;
        if (type === 'String') route = val;
        if (type.match(/HTML\w*Element/)) route = val.getAttribute('route-path');
        const base = path.match(/\/$/) ? path : `${path}/`;
        const url = this.hashBang ? `${base.replace('#', '')}#!${route}` : `${base}${route}`;

        if (this._login && !this._login.isLoggedIn) {
          // if (this.updatesHistory) this._updateHistory(route, url, data);
          this._internalRoute('/login');
        } else {
          if (route && route in this._routes) {
            if (route === '/login') {
              return this._updateRoute(route);
            } else if (route !== this.currentRoute) {
              if (data && Object.keys(data).length) this._routes[route].update(data);
              if (this.updatesHistory) {
                this._updateHistory(route, url, data);
              }
              return this._updateRoute(route, data);
            }
          }
        }
        return null;
      }

      init () {
        super.init();

        this._beforeReady(_ => {
          this._contentSlot = this.selectInternalElement('slot');
          let selected = null;
          let { route, data } = parseURL(window.location.href);
          if (route) selected = route;

          let flag = false;
          this.selectAll('[route-path]').forEach((el, i) => {
            const path = el.getAttribute('route-path');
            this._routes[path] = el;
            if (!i && !selected) selected = path;
            if (el.matches && el.matches('[selected]')) selected = path;
            if (path === '/login') {
              flag = true;
              el.onReady(_ => {
                let login = el.querySelector('.ui-login');
                this._login = login;
                login.on('login', e => {
                  const { route } = parseURL(window.location.href);
                  this._updateRoute(route);
                });

                login.on('logout', e => {
                  this.route('/login');
                });
                this.route(selected);
              });
            }
          });

          if (!flag) {
            this.onReady(_ => {
              this.route(selected);
            });
          }
        });

        this.on('attribute-change', ({ changed: { now, name, was } }) => {
          switch (name) {
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
              if (now && historyManager !== this) {
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
      }
    }
  });
})();

export const Route = (() => {
  const reflectedAttributes = [
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
    reflectedAttributes,
    definition: class Route extends UIBase {
      constructor () {
        super();
        this._data = null;
        this._dataElements = [];
        this._fromChangeHandler = false;
        this._unloadListener = e => {
          if (this.data) localStorage.setItem(this.routePath, JSON.stringify(elem.data));
        };
      }

      get data () {
        return this._data;
      }

      update (data) {
        this._data = data;
        const evt = new CustomEvent('data-changed');
        evt.data = data;
        localStorage.setItem(this.routePath, JSON.stringify(this.data));

        if (!this._fromChangeHandler) {
          this._dataElements.forEach(el => el.data = data);
        }
        this._fromChangeHandler = false;

        if (this.updatesHistory) {
          const qs = toQueryString(data);
          if (qs !== '?') {
            let href = window.location.href.match(/\/$/) ?
              window.location.href.slice(0, window.location.href.length - 1) :
              window.location.href;

            history.replaceState(data, '', window.location.href, window.location.href + qs);
          }
        }
        this.dispatchEvent(evt);
        return this;
      }

      appendChild (node) {
        if (node.matches && node.matches('[is-data-element]')) this._dataElements.push(node);
        super.appendChild();
      }

      init () {
        super.init();

        this.onReady(_ => {
          this._dataElements = this.shadowRoot ?
            [
              ...this.selectInternalAll('[is-data-element]'),
              ...this.selectAll('[is-data-element]')
            ] :
            this.selectAll('[is-data-element]');

          this._dataElements.forEach(el => {
            el.on('change', _ => {
              this._fromChangeHandler = true;
              this.update(this._dataElements.reduce((acc, el) => {
                const data = el.serialize();
                Object.entries(data).forEach(([k, v]) => {
                  if (k in acc) {
                    console.warn(`Overwriting duplicate data-element property ${k}.`);
                  }
                  acc[k] = v;
                });
                return acc;
              }, {}));
            });
          });
        });

        this.on('attribute-change', ({ changed: { now, name } }) => {
          switch (name) {
            case 'is-selected':
              if (now) {
                // Check to see if it was written from query string first.
                let data = localStorage.getItem(this.routePath);
                if (!this.data && data != null) this.update(JSON.parse(data));
                this.dispatchEvent(new CustomEvent('component-selected'));
              } else if (!now) {
                this.dispatchEvent(new CustomEvent('component-deselected'));
              }
              break;
          }
        });
      }
    }
  });
})();
