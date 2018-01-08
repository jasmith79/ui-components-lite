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

    global._resolveMapsLoader = _ => {
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
  mapsAPI.src = `https://maps.googleapis.com/maps/api/js?key=${global.GOOGLE_MAPS_API_KEY}&callback=_fireMapsEvent`;
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
  </style>
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
      this._mapObj = null;
    }

    init () {
      mapsAPILoaded.then(_ => {
        super.init();
        const options = {
          zoom: 11,
          center: new global.google.maps.LatLng(39.805, -86.16),
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

        this._mapObj = new global.google.maps.Map(this, options);
      });
    }
  }
});