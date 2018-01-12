/*
 *
 *
 * This uses `document.write`. While there are plenty of good reasons to avoid it, the WebComponents
 * polyfills *must* be loaded synchronously. Rather than try to suss out via polling for the other
 * polyfills I've loaded them synchronously as well.
 *
 * Obviously be sure if you include this that it's before the end of the document.
 */

;(function (global) {
  // Test for and include WebComponents polyfills.
  var document = global.document;
  if (!('HTMLElement' in global &&
        'attachShadow' in global.HTMLElement.prototype &&
        'customElements' in global)
  ) {
    console.log('No webcomponents support. Loading polyfill...');
    document.write('<script src="../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>');
    document.write('<script src="../../node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js"></script>');
  } else {
    console.log('Webcomponents supported. No polyfill needed');
  }

  // Need this for pretty much all older browsers.
  // TODO: es6-collections is unmaintained. Need to replace this with a polyfill for WeakMap only.
  // unfortunately a lot of them seem to be CJS only. Maybe just go core-js?
  if (!('WeakMap' in global)) {
    console.log('Loading WeakMap polyfill...');
    document.write('<script src="../../node_modules/es6-collections/es6-collections.js"></script>');
  }

  // Need the following for Safari which supports everything else. Elements that use this (e.g.
  // ui-form) should also import to be safe if using newer Safari.
  if (!('entries' in global.FormData.prototype)) {
    console.log('Loading FormData methods polyfill...');
    document.write('<script src="../../node_modules/formdata-polyfill/formdata.min.js"></script>');
  }
})(new Function('return this;')());