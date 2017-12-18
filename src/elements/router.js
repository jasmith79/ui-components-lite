import UIBase, { isHTMLElement } from '../utils/ui-component-base.js';
import extractType from '../../node_modules/extracttype/extracttype.js';
import { parseURL } from '../utils/url.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const slot = document.createElement('slot');

const routeReflectedAttrs = ['route-path', 'selected'];
const routerReflectedAttrs = ['updates-history', 'current-path'];

const Router = (class Router extends mix(HTMLElement).with(UIBase) {
  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(slot.cloneNode());
    this._routes = {};
    window.addEventListener('popstate', ({ state }) => {
      console.log(state);
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
    this._routes[path] = [elem, f];
    return this;
  }

  route (rt) {
    const t = extractType(rt);
    const type = isHTMLElement(rt) ? 'HTMLElement' : t;
    const [path, [elem, f]] = (() => {
      switch (type) {
        case 'HTMLElement': break;
        case 'String': return [rt, this._routes[rt]];
        default: throw new TypeError(`Unknown argument ${rt} to router.`);
      }
    })();
    
  }
}).reflectToAttribute(routerReflectedAttrs);

const Route = (class Route extends mix(HTMLElement).with(UIBase) {

}).reflectToAttribute(routeReflectedAttrs);

customElements.define('ui-router', Router);
customElements.define('ui-route', Route);