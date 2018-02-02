/*
 * loader.js
 * @author jarsmith79@gmail.com
 * @copyright Jared Smith
 * @license MIT
 *
 * Loads all of the basic ui-components and associated libraries and polyfills.
 */

;(function(global) {
  var makeScript = function(src, module_, async_) {
    var script = global.document.createElement('script');
    script.src = src;
    script.setAttribute('defer', true);
    if (module_) script.setAttribute('type', 'module');
    if (async_) script.setAttribute('async', true);
    return script;
  };

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

    var transpiled = prefix + 'build/es5.js';
    var corejs = prefix + 'node_modules/babel-polyfill/dist/polyfill.min.js';
    var formdata = prefix + 'node_modules/formdata-polyfill/formdata.min.js';

    var webcomplite = prefix +
      'node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js';

    var es5shim = prefix +
      'node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';

    var webcompmin = prefix +
      'node_modules/@webcomponents/webcomponentsjs/webcomponents-sd-ce.js';

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

    var module_ = !needsTranspiled && !needsCoreJs;
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
      // poly += polyfills[i];
      document.head.appendChild(makeScript(polyfills[i]));
    }

    if (!polyfills.length) console.log('No polyfills needed for ui-components-lite.');

    if (module_) {
      document.head.appendChild(makeScript(prefix + 'build/index.js', true, true));
    }

    if (!safari10point1) {
      var nomodule = makeScript(
        prefix + (needsTranspiled ? 'build/es5.js' : 'build/concat.js'),
        false,
        true
      );
      nomodule.setAttribute('nomodule', true);
      document.head.appendChild(nomodule);
    }
  }
})(new Function('return this;')());
