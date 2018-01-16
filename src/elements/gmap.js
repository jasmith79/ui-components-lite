import UIBase from '../utils/ui-component-base.js';
import { defineUIComponent, document, global } from '../utils/dom.js';

const tooLongMessage = `Sorry but google maps is taking longer than expected to load.
  If this message does not disappear in the next couple of seconds please refresh the page.`;

const failMessage = `Oops! Looks like Google Maps failed to load. Please refresh the page.`;

const warnTimeout = 8000;
const failTimeout = 15000;

export const mapsAPILoaded = (() => {
  return new Promise((res, rej) => {
    const warnHandle = setTimeout(() => {
      (document.querySelector('ui-alert') || global).alert(tooLongMessage);
    }, warnTimeout);

    const failHandle = setTimeout(() => {
      (document.querySelector('ui-alert') || global).alert(failMessage);
    }, failTimeout);

    global._resolveMapsLoader = function() {
      clearTimeout(warnHandle);
      clearTimeout(failHandle);
      const alerter = document.querySelector('ui-alert');
      if (alerter && alerter.isOpen) alerter.close();
      global.dispatchEvent(new CustomEvent('google-maps-ready'));
      res(true);
    }

    if (global.google && global.google.maps && global.google.maps.Map) global._resolveMapsLoader();
  });
})();

(() => {
  const mapsAPI = document.createElement('script');
  mapsAPI.src = 'https://maps.googleapis.com/maps/api/js?' +
    `key=${global.GOOGLE_MAPS_API_KEY}&callback=_resolveMapsLoader`;

  document.head.appendChild(mapsAPI);
})();

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      min-width: 400px;
      min-height: 300px;
    }

    #map-container {
      height: 100%;
      width: 100%;

      /* This is here because with no initial content height was 0 despite the parent styles */
      min-width: 400px;
      min-height: 300px;
    }
  </style>
  <div id="map-container"></div>
`;

const reflectedAttrs = [
  'latitude',
  'longitude',
  'map-type',
  'zoom-level',
];

export const GoogleMap = defineUIComponent({
  name: 'ui-google-map',
  template,
  definition: class GoogleMap extends UIBase {
    constructor () {
      super();
      this._mapContainer = null;
      this._mapObj = null;
      this._center = null;
    }

    get map () {
      return this._mapObj;
    }

    setCenter (...args) {
      const latlng = (() => {
        switch (args.length) {
          case 1: return args[0];
          case 2: return new global.google.maps.LatLng(...args);
          default: throw new TypeError(`Unrecognized arguments ${args} to ui-google-map's setCenter.`);
        }
      })();

      this._center = latlng;
      return this;
    }

    init () {
      this._mapContainer = this.shadowRoot.querySelector('#map-container');
      mapsAPILoaded.then(_ => {
        super.init();
        const options = {
          zoom: 11,
          center: new global.google.maps.LatLng(39.75, -86.16),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        if (this.mapType && this.mapType.toUpperCase() in global.google.maps.MapTypeId) {
          options.mapTypeId = global.google.maps[this.mapType.toUpperCase()];
        }

        if (this.zoomLevel) options.zoom = this.zoomLevel;
        if (this.latitude && this.longitude) options.center = new global.google.maps.LatLng(
          this.latitude,
          this.longitude
        );

        this._center = options.center;
        this._mapObj = new global.google.maps.Map(this._mapContainer, options);

        // Google maps really don't like to be unrendered, especially when they're first created:
        // tiles won't render until a resize event is triggered on window. So we'll track center
        // changes and set it manually. Currently the parent element responsible for rendering
        // this element needs to trigger resize on visibility changes, which I'm hoping to fix.
        // Currently, if setting the center programmatically, use the element's method rather
        // than the underlying map object's.
        this._mapObj.addListener('zoom_changed', e => {
          this._center = this.map.getCenter();
        });

        this._mapObj.addListener('dragend', e => {
          this._center = this.map.getCenter();
        });

        global.addEventListener('resize', e => {
          setTimeout(() => {
            this.map.setCenter(this._center);
          }, 0);
        });
      });
    }
  }
});
