/*
 * gmap.js
 * @author Jared Smith <jasmith79@gmail.com>
 * @copyright 2017
 * @license MIT
 *
 * JavaScript file for ui-component-google-map. Note that this file loads the google maps API,
 * don't include multiple times. Expects a global var with the API key to be present.
 *
 * @depends node_modules/es6-promise/es6-promise.auto.js
 */

if (!window._requestedMapsAPI) {
  window._requestedMapsAPI = true;
  window._fireMapsEvent = _ => window.dispatchEvent(new CustomEvent('google-map-ready'));
  const mapsAPI = document.createElement('script');
  mapsAPI.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry,visualization&callback=_fireMapsEvent`;
  document.head.appendChild(mapsAPI);
}

const tooLongMessage = `Sorry but google maps is taking longer than expected to load.
If this message does not disappear in the next couple of seconds please refresh the page.`;

const mapsAPILoaded = new Promise((res, rej) => {
  let google = window.google;
  if (google && google.maps && google.maps.Map) {
    res(true);
  }
  let tooLong = setTimeout(_ => {
    let alertView = document.querySelector('[ui-role="alertview"]');
    if (alertView) {
      alertView.open(av => av.setContents(tooLongMessage));
    } else {
      alert(tooLongMessage);
    }
  }, 8000);
  let timeout = setTimeout(_ => {
    rej(new Error('Google maps failed to load in 10 seconds, please refresh.'));
  }, 12000);
  window.addEventListener('google-map-ready', evt => {
    clearTimeout(tooLong);
    clearTimeout(timeout);
    res(true);
  });
});

mapsAPILoaded.catch(err => {
  let alertView = document.querySelector('[ui-role="alertview"]');
  if (alertView) {
    alertView.open(av => av.setContents(err.message));
  } else {
    alert(tooLongMessage);
  }
});

// This is primarily for my own use after all.
const INDY_DEFAULTS = _ => {
  return {
    zoom: 11,
    center: new google.maps.LatLng(39.805, -86.16),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
};

const Gmap = function Gmap(el=document.createElement('div'), opts) {
  el.classList.add('ui-component-google-map');
  el.loaded = mapsAPILoaded.then(_ => new google.maps.Map(el, (opts || INDY_DEFAULTS())));
  return el;
};

document.querySelectorAll('.ui-component-google-map').forEach(el => Gmap(el));

export default Gmap;