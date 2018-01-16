/*
 *
 *
 * This uses `document.write`. While there are plenty of good reasons to avoid it, the WebComponents
 * polyfills *must* be loaded synchronously. Rather than try to suss out via polling for the other
 * polyfills I've loaded them synchronously as well.
 *
 * Obviously be sure if you include this that it's before the end of the document.
 */

;(function(global) {

  // First, test for IE < 11 and warn user
  var ie = global.navigator.userAgent.indexOf('MSIE ')
  if (ie > 0) {
    global.alert('You seem to be using Internet Explorer version ' +
      parseInt(ua.substring(ie + 5, ua.indexOf('.', ie)), 10) +
      '. Internet Explorer older than 11 is not supported by this' +
      ' site. Please upgrade to a modern browser like Microsoft Edge, ' +
      'Apples Safari, or Google Chrome.');
  } else {

    // Figure out if we're somewhere other than the root
    var match = global.document.currentScript.outerHTML.match(/['"]{1}([\.\w\/\-]+\/)build\/loader/);
    var prefix = match ? match[1] : './';
    console.log(prefix);
    console.log(global.document.currentScript.outerHTML);

    var transpiled = prefix + 'build/es5.js';
    var corejs = '<script src="' +
      prefix +
      'node_modules/babel-polyfill/dist/polyfill.min.js"></script>';

    var formdata = '<script src="' +
      prefix +
      'node_modules/formdata-polyfill/formdata.min.js"></script>';

    var webcomplite = '<script src="' +
      prefix +
      'node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js"></script>';

    var es5shim = '<script src="' +
      prefix +
      'node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>';

    var webcompmin = '<script src="' +
      prefix +
      'node_modules/@webcomponents/webcomponentsjs/webcomponents-sd-ce.js"></script>';

    var needsTranspiled = false;
    var needsCoreJs = false;
    var needsShady = false;
    var needsCustomEl = false;
    var needsFormData = false;

    // Older browsers, gets it all
    if (!('entries' in global.Object) ||
        !('WeakMap' in global) ||
        !('includes' in global.Array.prototype) ||
        !('Set' in global)
    ) {
      needsTranspiled = true;
      needsCoreJs = true;
      needsShady = true;
      needsCustomEl = true;
      needsFormData = true;
    }

    // This is needed to work around a bug in Safari 10.1 which supports import but not nomodule.
    // For more details see https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc
    // This will not prevent the download of the extra file which is not ideal, but working around
    // requires a great deal of hacky hacks.
    var safari10point1 = (function() {
      var check = global.document.createElement('script');
      return !('noModule' in check) && 'onbeforeload' in check;
    }());

    if (!needsTranspiled) {
      try {
        eval('class Foo { static get bar () { return 3; } };(bar=3) => bar;[...[1,2,3]]');
      } catch (e) {
        needsTranspiled = true;
      }
    }

    if (!needsShady &&
        !('HTMLElement' in global &&
          'attachShadow' in global.HTMLElement.prototype)
    ) {
      needsShady = true;
    }

    if (!needsCustomEl && !('customElements' in global)) {
      needsCustomEl = true;
    }

    if (!('entries' in global.FormData.prototype)) {
      needsFormData = true;
    }

    var module = !needsTranspiled && !needsCoreJs;
    var polyfills = [];
    if (needsCoreJs) {
      polyfills = [corejs, es5shim, webcomplite];
      console.log('Loading babel-polyfill, es5-class-adaptor, webcomponents polyfills...');
    } else if (needsTranspiled) {
      console.log('Loading es5-class-adaptor, webcomponents polyfills...');
      polyfills = [es5shim, webcomplite];
    } else if (needsShady || needsCustomEl) {
      console.log('Loading shadow DOM and custom elements polyfills...');
      polyfills = [webcompmin];
    }

    if (needsShady) global._usingShady = true;

    if (needsFormData) {
      polyfills.push(formdata);
      console.log('Loading FormData methods polyfill...');
    }

    var i = 0, poly = '';
    for (i; i < polyfills.length; ++i) {
      poly += polyfills[i];
    }

    if (poly) {
      document.write(poly);
    } else {
      console.log('No polyfills needed.');
    }

    if (module) {
      var modulescript = global.document.createElement('script');
      modulescript.type = 'module';
      modulescript.src = prefix + 'build/index.js';
      modulescript.setAttribute('async', true);
      document.head.appendChild(modulescript);
    }

    if (!safari10point1) {
      var nomodule = global.document.createElement('script');
      nomodule.setAttribute('nomodule', true);
      nomodule.setAttribute('defer', true);
      nomodule.setAttribute('async', true);
      nomodule.src = prefix + (needsTranspiled ? 'build/es5.js' : 'build/concat.js');
      document.head.appendChild(nomodule);
    }
  }
})(new Function('return this;')());

// ;(function (global) {
//   // First, test for IE < 11 and warn user
//   var ie = global.navigator.userAgent.indexOf('MSIE ')
//   if (ie > 0) {
//     global.alert('You seem to be using Internet Explorer version ' +
//       parseInt(ua.substring(ie + 5, ua.indexOf('.', ie)), 10) +
//       '. Internet Explorer older than 11 is not supported by this' +
//       ' site. Please upgrade to a modern browser like Microsoft Edge, ' +
//       'Apples Safari, or Google Chrome.');
//   } else {
//     // Figure out if we're somewhere other than the root
//     var match = global.document.currentScript.outerHTML.match(/['"]{1}(\.+[\.\/]+)/);
//     var prefix = match ? match[1] : './';
//
//     // Test for and include WebComponents polyfills.
//     var document = global.document;
//     if (!('HTMLElement' in global &&
//           'attachShadow' in global.HTMLElement.prototype &&
//           'customElements' in global)
//     ) {
//       console.log('No webcomponents support. Loading polyfill...');
//       document.write(
//         '<script src="' +
//         prefix +
//         'node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>'
//       );
//
//       document.write(
//         '<script src="' +
//         prefix +
//         'node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js"></script>'
//       );
//
//       global._usingShady = true;
//       var globalStyleFixes = global.document.createElement('style');
//       globalStyleFixes.innerHTML = '' +
//         'ui-tab ui-checkbox { display: none; } ' +
//         'ui-login ui-fab .content-wrapper .arrow { left: 27px; }';
//
//       document.head.appendChild(globalStyleFixes);
//       // document.write(
//       //   '<script src="' +
//       //   prefix +
//       //   'node_modules/@tuespetre/shadow-dom/dist/shadow-dom.min.js"></script>'
//       // );
//
//       var js = document.createElement('script');
//       js.setAttribute('async', true);
//       js.setAttribute('defer', true);
//       js.src = prefix + 'build/backup.js';
//       global.document.head.appendChild(js);
//     } else {
//       console.log('Webcomponents supported. No polyfill needed');
//     }
//
//     // Need this for pretty much all older browsers.
//     // TODO: es6-collections is unmaintained. Need to replace this with a polyfill for WeakMap only.
//     // unfortunately a lot of them seem to be CJS only. Maybe just go core-js?
//     if (!('WeakMap' in global)) {
//       console.log('Loading WeakMap polyfill...');
//       document.write('<script src="../../node_modules/es6-collections/es6-collections.js"></script>');
//     }
//
//     // Need the following for Safari which supports everything else. Elements that use this (e.g.
//     // ui-form) should also import to be safe if using newer Safari.
//     if (!('entries' in global.FormData.prototype)) {
//       console.log('Loading FormData methods polyfill...');
//       document.write('<script src="../../node_modules/formdata-polyfill/formdata.min.js"></script>');
//     }
//   }
// })(new Function('return this;')());
