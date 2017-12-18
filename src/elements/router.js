import UIBase from '../utils/ui-component-base.js';
import { parseURL } from '../utils/url.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const slot = document.createElement('slot');

const routeReflectedAttrs = ['route-path'];
const routerReflectedAttrs = ['updates-history', 'current-path'];

const Router = (class Router extends mix(HTMLElement).with(UIBase) {
  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(slot.cloneNode());
    this._paths = {};
    window.addEventListener('popstate', e => {

    });
  }

  init () {
    super.init();
    const initialRouteData = parseURL(window.location.href);
    this.on('attribute-change', ({ changed: { now, name } }) => {
      switch (name) {
        case 'currentPath':
          const urlData = parseURL(window.location.href);
          history.pushState(null, '', `${protocol}://${fullDomain}${now}?${}`);
      }
    });
  }

  addRoute (path, elem, f) {
    this._paths[path] = [elem, f];
    return this;
  }
}).reflectToAttribute(routerReflectedAttrs);

const Route = (class Route extends mix(HTMLElement).with(UIBase) {

}).reflectToAttribute(routeReflectedAttrs);

customElements.define('ui-router', Router);
customElements.define('ui-route', Route);