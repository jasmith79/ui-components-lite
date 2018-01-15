/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return document; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return baseClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return defineUIComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return global; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_jsstring_src_jsstring_js__ = __webpack_require__(7);


const global = new Function('return this')();
const document = global.document;
const baseClass = global.HTMLElement;
const registry = {};

const toPropertyObj = propList => {
  return propList.reduce((acc, prop) => {
    const property = Object(__WEBPACK_IMPORTED_MODULE_0__node_modules_jsstring_src_jsstring_js__["b" /* toCamelCase */])(prop);
    acc[property] = {
      get: function() {
        return this[`_${property}`];
      },
      set: function(val) {
        this[`_${property}`] = val;
        this.attr(Object(__WEBPACK_IMPORTED_MODULE_0__node_modules_jsstring_src_jsstring_js__["c" /* toSnakeCase */])(property, '-'), val);
      }
    };
    return acc;
  }, {});
};

const defineUIComponent = ({
  name,
  definition,
  reflectedAttrs=[],
  template,
  registerElement=true,
  isShadowHost,
}) => {
  if (!name) throw new Error('ui-components must have a name.');
  if (!definition) throw new Error('ui-components must have a defining class');
  if (name in registry) throw new Error(`ui-component named ${name} already registered.`);
  const class_ = class extends definition {
    static get observedAttributes () {
      return [...super.observedAttributes, ...reflectedAttrs];
    }

    constructor (...args) {
      super(...args);
      if ((isShadowHost || template) && !this.shadowRoot) this.attachShadow({ mode: 'open' });

      if (global._usingShady && this.shadowRoot && template) {
        global.ShadyCSS.prepareTemplate(template, name);
      }

      if (template) this.shadowRoot.appendChild(document.importNode(template.content, true));
      if (reflectedAttrs.length) {
        this.on('attribute-change', ({ changed: { name, now } }) => {
          if (reflectedAttrs.includes(name)) {
            this[Object(__WEBPACK_IMPORTED_MODULE_0__node_modules_jsstring_src_jsstring_js__["b" /* toCamelCase */])(name)] = now;
          }
        });
      }
    }

    init () {
      super.init();
      this.classList.add(name);
      this._beforeReady(_ => {
        if (global._usingShady && this.shadowRoot && this.shadowRoot.querySelector('style')) {
          ShadyCSS.styleElement(this);
        }
      });
    }
  };

  // Override with original name for debugging/reflection.
  Object.defineProperty(class_, 'name', {
    get: () => this.name
  });

  // Set up the autogenerated getters/setters for reflected attributes. If you want additional
  // actions to occur when these are set, use a handler for the 'attribute-change' event or the
  // watchAttribute shorthand method.
  Object.defineProperties(class_.prototype, toPropertyObj(reflectedAttrs));
  if (registerElement) {
    global.customElements.define(name, class_);
    registry[name] = class_;
  }

  return class_;
};




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styler_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__binder_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dom_utils_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__attribute_analyzer_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__promise_from_event_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dom_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__node_modules_jsstring_src_jsstring_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);









let flag = true;
class UIBase extends Object(__WEBPACK_IMPORTED_MODULE_7__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_5__dom_js__["a" /* baseClass */]).with(__WEBPACK_IMPORTED_MODULE_2__dom_utils_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__binder_js__["a" /* default */]) {
  constructor () {
    super();
    this._listeners = [];
    this._isCentered = false;
    this._beforeReadyHandlers = [];
    this._isReady = Object(__WEBPACK_IMPORTED_MODULE_4__promise_from_event_js__["a" /* default */])({
      element: this,
      eventName: 'ui-component-ready',
      callback: () => this
    });
  }

  static get observedAttributes () {
    // If extension elements have additional, be sure to call super.
    return ['style', 'class'];
  }

  get componentName () {
    return `ui-${Object(__WEBPACK_IMPORTED_MODULE_6__node_modules_jsstring_src_jsstring_js__["c" /* toSnakeCase */])(this.constructor.name, '-')}`;
  }

  get isUIComponent () {
    return true;
  }

  get _childrenUpgraded () {
    return Promise.all([...this.children].map(ch => Promise.resolve(ch._isReady || ch)));
  }

  _beforeReady (...fs) {
    this._beforeReadyHandlers.push.apply(this._beforeReadyHandlers, fs);
  }

  onReady (...fs) {
    this._isReady.then(_ => {
      fs.forEach(f => f(this));
    });

    if (__WEBPACK_IMPORTED_MODULE_5__dom_js__["d" /* global */]._usingShady) {
      __WEBPACK_IMPORTED_MODULE_5__dom_js__["d" /* global */].ShadyCSS.styleSubtree(this);
    }
    
    return this;
  }

  init () {
    // Should be called by extension elements via super. setTimeout is so that any initialization
    // and event handlers in the descendant classes can be attached before the reflected attribute
    // setup.
    setTimeout(() => {
      this.classList.add('is-ui-component');

      const children = this.shadowRoot ?
        [this._childrenUpgraded, ...this.shadowRoot.children] :
        this._childrenUpgraded;

      Promise.resolve(children)
        .then(_ => {
          this.constructor.observedAttributes.forEach(attr => {
            if (this.attr(attr)) {
              const evt = new CustomEvent('attribute-change');
              evt.changed = { name: attr, now: this.attr(attr), was: null };
              this.dispatchEvent(evt);
            }
          });

          [...this.attributes].forEach(({ name: attr, value: val}) => {
            const twoWay = val && val.match(/^\{\{\{(.+)\}\}\}$/);
            const oneWay = val && val.match(/^\{\{(.+)\}\}$/);
            const matched = twoWay ? twoWay[1] : oneWay ? oneWay[1] : null;
            const attrToWatch = matched ? Object(__WEBPACK_IMPORTED_MODULE_6__node_modules_jsstring_src_jsstring_js__["c" /* toSnakeCase */])(matched, '-') : null;
            if (attrToWatch) {
              this.bindAttribute(attr, attrToWatch, twoWay);
            }
          });

          return this._beforeReadyHandlers.length ?
            Promise.all(this._beforeReadyHandlers.map(f => f(this))) :
            null;
        })
        .then(_ => {
          this.dispatchEvent(new CustomEvent('ui-component-ready', { bubbles: true }));
        });
    }, 0);
  }

  // If extension elements override the default connected and disconnected
  // Callbacks they need to call super to perform appropriate init/cleanup

  connectedCallback () {
    // This allows the elements to be detatched/reattached without losing
    // handlers.
    this._listeners.forEach(([evt, f]) => this.addEventListener(evt, f));

    // Allows element to be detatched and reattached while automatically cleaning up
    // on eventual deletion.
    this._mutationObservers.forEach(([o, target, conf]) => o.observe(target, conf));

    // This avoids Chrome firing the event before DOM is ready
    setTimeout(() => { this.init(); }, 10)
  }

  disconnectedCallback () {
    this._isCentered = false;
    this._shadowElement = null;
    this._listeners.forEach(([evt, f]) => this.removeEventListener(evt, f));
    this._mutationObservers.forEach(([o]) => o.disconnect());
  }

  attributeChangedCallback (name, was, now) {
    if (was !== now) {
      if (name in this._oneWayBoundAttrs && !this._internalMutationFlag) {
        console.warn(`Attempted to manually set data-bound attribute ${name} of ${this.componentName}.`);
        this._internalMutationFlag = true;
        this.attr(name, was);
        this._internalMutationFlag = false;
      } else {
        this._internalMutationFlag = false;
        const evt = new CustomEvent('attribute-change');
        evt.changed = { name, was, now: Object(__WEBPACK_IMPORTED_MODULE_3__attribute_analyzer_js__["a" /* default */])(now), raw: now };
        this.dispatchEvent(evt);
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (UIBase);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const _cachedApplicationRef = Symbol('_cachedApplicationRef');
/* unused harmony export _cachedApplicationRef */

const _mixinRef = Symbol('_mixinRef');
/* unused harmony export _mixinRef */

const _originalMixin = Symbol('_originalMixin');
/* unused harmony export _originalMixin */


/**
 * Sets the prototype of mixin to wrapper so that properties set on mixin are
 * inherited by the wrapper.
 *
 * This is needed in order to implement @@hasInstance as a decorator function.
 */
const wrap = (mixin, wrapper) => {
  Object.setPrototypeOf(wrapper, mixin);
  if (!mixin[_originalMixin]) {
    mixin[_originalMixin] = mixin;
  }
  return wrapper;
};
/* unused harmony export wrap */


/**
 * Decorates mixin so that it caches its applications. When applied multiple
 * times to the same superclass, mixin will only create one subclass and
 * memoize it.
 */
const Cached = (mixin) => wrap(mixin, (superclass) => {
  // Get or create a symbol used to look up a previous application of mixin
  // to the class. This symbol is unique per mixin definition, so a class will have N
  // applicationRefs if it has had N mixins applied to it. A mixin will have
  // exactly one _cachedApplicationRef used to store its applications.
  let applicationRef = mixin[_cachedApplicationRef];
  if (!applicationRef) {
    applicationRef = mixin[_cachedApplicationRef] = Symbol(mixin.name);
  }
  // Look up an existing application of `mixin` to `c`, return it if found.
  if (superclass.hasOwnProperty(applicationRef)) {
    return superclass[applicationRef];
  }
  // Apply the mixin
  let application = mixin(superclass);
  // Cache the mixin application on the superclass
  superclass[applicationRef] = application;
  return application;
});
/* unused harmony export Cached */


/**
 * Adds @@hasInstance (ES2015 instanceof support) to mixin.
 * Note: @@hasInstance is not supported in any browsers yet.
 */
const HasInstance = (mixin) => {
  if (Symbol.hasInstance && !mixin.hasOwnProperty(Symbol.hasInstance)) {
    Object.defineProperty(mixin, Symbol.hasInstance, {
      value: function(o) {
        const originalMixin = this[_originalMixin];
        while (o != null) {
          if (o.hasOwnProperty(_mixinRef) && o[_mixinRef] === originalMixin) {
            return true;
          }
          o = Object.getPrototypeOf(o);
        }
        return false;
      }
    });
  }
  return mixin;
};
/* unused harmony export HasInstance */


/**
 * A basic mixin decorator that sets up a reference from mixin applications
 * to the mixin defintion for use by other mixin decorators.
 */
const BareMixin = (mixin) => wrap(mixin, (superclass) => {
  // Apply the mixin
  let application = mixin(superclass);

  // Attach a reference from mixin applition to wrapped mixin for RTTI
  // mixin[@@hasInstance] should use this.
  application.prototype[_mixinRef] = mixin[_originalMixin];
  return application;
});
/* unused harmony export BareMixin */


/**
 * Decorates a mixin function to add application caching and instanceof
 * support.
 */
const Mixin = (mixin) => Cached(HasInstance(BareMixin(mixin)));
/* unused harmony export Mixin */


const mix = (superClass) => new MixinBuilder(superClass);
/* harmony export (immutable) */ __webpack_exports__["a"] = mix;


class MixinBuilder {

  constructor(superclass) {
    this.superclass = superclass;
  }

  with() {
    return Array.from(arguments).reduce((c, m) => m(c), this.superclass);
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return extractType; });
/* unused harmony export isSameType */
/*
 * extracttype.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 *
 * Attempts to extract the type of a JavaScript object. For built-ins
 * it returns their internal [[Class]] slot, for custom constructed
 * objects it attempts to extract the name of their constructor.
 *
 * **BROWSER COMPATIBILITY NOTES**
 *
 * If using with Internet Explorer this function will work better if
 * you polyfill the missing Function.prototype.name property.
 *
 * All of the ES 2015+ stuff (arrow fns, const, Symbol, Promise, class,
 * Object.entries, Array.prototype.from, Array.prototype.includes, etc.
 * will obviously have to be transpiled/polyfilled).
 *
 * Note that the isSameType function IS NOT 100% RELIABLE. I highly
 * recommend simply duck-typing your objects to see if they have the
 * appropriate method/attribute but there are some corner cases where
 * it is handy. Use with care. I've annotated the failure conditions
 * in the function itself best as I can. Note also that it is recursive
 * and *can* blow the stack for deeply nested structures if nominal
 * typing fails.
 */

// NOTE: this isn't meant to be *totally* comprehensive.
const BUILTINS = [
  // All JavaScript. Object deliberately omitted.
  'Math',
  'JSON',
  'RegExp',
  'Date',
  'String',
  'Number',
  'Symbol',
  'Boolean',
  'Undefined',
  'Null',
  'Function',
  'Array',
  'Map',
  'WeakMap',
  'Set',
  'WeakSet',
  'Error',
  'Promise',
  'ArrayBuffer',
  'Uint8Array',
  'Int8Array',
  'Uint8ClampedArray',
  'Int16Array',
  'Uint16Array',
  'Int32Array',
  'Uint32Array',
  'Float32Array',
  'Float64Array',
  'Arguments',

  // Browser specific
  'NodeList',
  'DOMTokenList',
  'CSSStyleDeclaration',
  'Text', // text node
  'DocumentFragment',
  'Event',
  'CustomEvent',
  'XMLHTTPRequest',
];

const CLASS_REGEX = / ([a-z0-9]+)]$/i;
const HTML_ELEMENT_REGEX = /^HTML[a-zA-Z]*Element$/;

// Extracts the hidden internal [[Class]] slot of a JavaScript object.
const _extractHiddenClass = a => Object.prototype.toString.call(a).match(CLASS_REGEX)[1];

const _getConstructorName = obj => ((obj != null) && obj.constructor && obj.constructor.name) || '';

// Somewhat reliably types JavaScript objects, mostly built-ins.
const extractType = function extractType(item) {
  let clazz = _extractHiddenClass(item); // covers all built-ins, primitives, etc.
  if (clazz !== 'Object') {
    return clazz;
  }
  clazz = _getConstructorName(item);
  return clazz; // returns '' for Object.create(null);
};

const _isBuiltIn = type => {
  return BUILTINS.includes(type) || type.match(HTML_ELEMENT_REGEX);
};

const isSameType = function isSameType(a, b) {
  const tA = typeof a;
  const tB = typeof b;

  // This can fail in older Safari as typeof (function(){}) returns 'Object'
  if (tA !== 'object' && tA === tB) return true;

  // This can give a misleading response if the code does not follow the
  // Liskov Substitution Prinicple.
  if (a != null && b != null) {
    if (a.constructor && a.constructor !== Object && b instanceof a.constructor) return true;
    if (b.constructor && b.constructor !== Object && a instanceof b.constructor) return true;
  }

  const typeA = extractType(a);
  const typeB = extractType(b);

  if (typeA !== typeB) return false;

  // This is necessary because the instanceof test above fails in
  // cross-realm scenarios.
  if (_isBuiltIn(typeA) && _isBuiltIn(typeB)) return true;

  // If all attempts at nominal typing have failed to yield a definitive answer,
  // fall back to structural. This avoids the false positive from two constructors
  // that coincidentally share a name.
  const as = Object.entries(a).sort();
  const bs = Object.entries(b).sort();
  if (as.length === bs.length) {
    return as.every(([keyA, valA], i) => {
      const [keyB, valB] = bs[i];
      return keyA === keyB && (valA === valB || isSameType(valA, valB));
    });
  }

  return false;
};



/* harmony default export */ __webpack_exports__["a"] = (extractType);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_js__ = __webpack_require__(0);


const template = __WEBPACK_IMPORTED_MODULE_0__dom_js__["c" /* document */].createElement('template');
template.innerHTML = `
  <style>
    :host(.left-x) {
      box-shadow: 3px 0px 10px -3px #000;
      margin-right: 3px;
    }

    :host(.right-x) {
      box-shadow: -3px 0px 10px -3px #000;
      margin-left: 3px;
    }

    :host(.float-y) {
      box-shadow: 0px 3px 10px -3px #000;
      margin-bottom: 3px;
    }
  </style>
`;

const reflectedAttrs = [
  'floating-x',
  'floating-y',
  'right-oriented',
  'left-oriented',
];

/* harmony default export */ __webpack_exports__["a"] = (superclass => Object(__WEBPACK_IMPORTED_MODULE_0__dom_js__["b" /* defineUIComponent */])({
  name: 'ui-floating',
  reflectedAttrs,
  template,
  registerElement: false,
  definition: class Floating extends superclass {
    get isFloating () {
      return this.floatingX || this.floatingY;
    }

    init () {
      super.init();
      this.on('attribute-change', ({ changed: { now, name } }) => {
        switch (name) {
          case 'floating-y':
            return now ? this.classList.add('float-y') : this.classList.remove('float-y');

          case 'floating-x':
            const class_ = this.attr('right-oriented') ? 'right-x' : 'left-x';
            return now ? this.classList.add(class_) : this.classList.remove(class_);

          case 'right-oriented':
            if (this.classList.contains('left-x')) {
              this.classList.remove('left-x');
              this.classList.add('right-x');
            }
            return;

          case 'left-oriented':
          if (this.classList.contains('right-x')) {
            this.classList.remove('right-x');
            this.classList.add('left-x');
          }
          return;
        }
      });
    }
  }
}));


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_formdata_polyfill_formdata_min_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_formdata_polyfill_formdata_min_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__node_modules_formdata_polyfill_formdata_min_js__);







// TODO external ui-input not getting cached data? input elements lose data sometimes
// on multiple reloads?

const Form = (() => {
  const reflectedAttrs = ['action', 'method', 'autocomplete', 'response-type'];
  const template = __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].createElement('template');
  template.innerHTML = `
    <style>
      :host {
        display: block;
      }
    </style>
    <slot></slot>
  `;

  return Object(__WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["b" /* defineUIComponent */])({
    name: 'ui-form',
    template,
    reflectedAttrs,
    definition: class Form extends __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */] {
      constructor () {
        super();
        // this._inputs = null;
        // this._selects = null;
        this._form = null;
        this._formUIComponents = null;
      }

      _isFormEligible (el) {
        return el &&
          el.matches &&
          (() => {
            if (
              el.matches('input[name]') ||
              el.matches(`input[form="${this.id}"]`)
            ) return 'input';

            if (
              el.matches('select[name]') ||
              el.matches(`select[form="${this.id}"]`)
            ) return 'select';

            if (
              el.matches('.ui-form-behavior') ||
              el.matches(`.ui-form-behavior[form="${this.id}"]`)
            ) return 'formElement';

            return false;
          })();
      }

      get elements () {
        return this.id ?
          [
            ...new Set([
              ...this.selectAll('input[name], select[name], .ui-form-behavior'),
              ...__WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].querySelectorAll(`[form="${this.id}"]`)
            ])
          ] :
          this.selectAll('input[name], select[name], .ui-form-behavior');
      }

      get isValid () {
        return !this.querySelector(':invalid') && !this.querySelector('.invalid');
      }

      get data () {
        return this.elements.reduce((formdata, el) => {
          if (el.name) formdata.append(el.name, el.value || '');
          return formdata
        }, new FormData);
      }

      set data (data) {
        Object.entries(data).forEach(([name, val]) => {
          const els = this.elements.filter(el => el.matches(`[name="${name}"]`));
          els.forEach((el, i, arr) => {
            const type = this._isFormEligible(el);
            let value = Array.isArray(val) ?
              (val[i] || val[val.length - 1]) :
              val;

            if (value === 'undefined' || value === 'null') value = '';

            switch (type) {
              case 'formElement':
                if (el.value !== value) el.value = value;
                break;

              case 'select':
                [...sel.options].forEach((opt, j) => {
                  if (opt.value === value && j !== sel.selectedIndex) sel.selectedIndex = j;
                });
                break;
            }
          });
        });

        return this.data;
      }

      appendChild (node) {
        const isEligible = this._isFormEligible(node);
        if (isEligible) {
          super.appendChild(node);
          if (node.isUIComponent) {
            this._formUIComponents.push(node);
          }
          // this[`_${isEligible}s`].push(node);
        }

        return node;
      }

      serialize () {
        return [...this.data.entries()].reduce((acc, [k, v]) => {
          if (k in acc) {
            if (Array.isArray(acc[k])) {
              acc[k].push(v);
            } else {
              acc[k] = [acc[k], v];
            }
          } else {
            acc[k] = v;
          }
          return acc;
        }, {});
      }

      submit ({ url: argURL, method: meth, headers, responseType}) {
        const url = argURL || this.action;
        const method = meth || this.method || 'POST';
        const opts = {
          method,
          body: this.data,
        };

        if (headers) opts.headers = headers;
        const result = fetch(url, opts);
        const evt = new Event('submit');
        evt.pendingResult = result;
        this.dispatchEvent(evt);
        switch ((responseType || this.responseType || '').toLowerCase()) {
          case 'text':
          case 'html':
            return result.then(resp => resp.text());

          case 'json': return result.then(resp => resp.json());
          default: return result;
        }
      }

      init () {
        super.init();
        this.attr('is-data-element', true);

        this._beforeReady(_ => {
          // this._inputs = [
          //   ...new Set([
          //     ...this.selectAll('input[name]'),
          //     ...(document.querySelectorAll(`input[form="${this.id}"]`) || []),
          //   ])
          // ];
          //
          // this._selects = [...new Set([
          //     ...this.selectAll('select[name]'),
          //     ...(document.querySelectorAll(`select[form="${this.id}"]`) || []),
          //   ])
          // ];

          this._formUIComponents = [...new Set([
              ...this.selectAll('.ui-form-behavior'),
              ...(__WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].querySelectorAll(`.ui-form-behavior[form="${this.id}"]`) || []),
            ])
          ];

          this._formUIComponents.forEach(el => {
            el.addEventListener('change', e => {

            });
          });
        });
      }
    }
  });
})();
/* unused harmony export Form */


const FormBehavior = (() => {
  const reflectedAttrs = ['name', 'value', 'required', 'is-valid', 'placeholder'];
  return superclass => Object(__WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["b" /* defineUIComponent */])({
    name: 'ui-form-behavior',
    registerElement: false,
    reflectedAttrs,
    definition: class extends superclass {

      validate (validator) {
        return this.watchAttribute(this, 'value', (...args) => {
          this.isValid = validator.apply(this, args);
          this.classList.remove(this.isValid ? 'invalid' : 'valid');
          this.classList.add(this.isValid ? 'valid' : 'invalid');
        });
      }
    }
  });
})();
/* harmony export (immutable) */ __webpack_exports__["a"] = FormBehavior;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animations_rippler_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_float_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_centerer_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_dom_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);







const template = __WEBPACK_IMPORTED_MODULE_4__utils_dom_js__["c" /* document */].createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      height: 50px;
      width: 120px;
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-transform: uppercase;
      border-radius: 5%;
      background-color: var(--ui-theme-secondary-dark-color, blue);
      color: var(--ui-theme-light-text-color, #fff);
      margin: 5px;
    }

    :host(:hover) {
      box-shadow: inset 0 0 0 99999px rgba(150,150,150,0.2);
    }
  </style>
`;

const reflectedAttrs = [
  'dialog-dismiss',
  'dialog-confirm',
  'submit',
];

const Button = Object(__WEBPACK_IMPORTED_MODULE_4__utils_dom_js__["b" /* defineUIComponent */])({
  name: 'ui-button',
  template,
  reflectedAttrs,
  definition: class Button extends Object(__WEBPACK_IMPORTED_MODULE_5__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */]).with(__WEBPACK_IMPORTED_MODULE_3__utils_centerer_js__["b" /* default */], __WEBPACK_IMPORTED_MODULE_2__utils_float_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__animations_rippler_js__["a" /* default */]) {}
});

/* harmony default export */ __webpack_exports__["a"] = (Button);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * jsstring.js
 * @author jasmith79
 * @copyright Jared Smith 2017
 * @license MIT
 *
 * My JavaScript string utilities, because standard library, not so much.
 *
 */

const snakeCaseMatcher = /[\-\_0-9]+([a-zA-Z])/g;
const camelSplitter = /([A-Z0-9])/;
const firstLetter = /^(\w)/;
const allFirstLetters = /\b(\w)/g;
const printfMatch = /%([a-zA-Z%])/g;

const alphaNumericRange = [];
const alphaRange = [];
const numericRange = [];
const lowerCaseRange = [];
const upperCaseRange = [];
const asciiPrintableRange = [];

for (let i = 32; i < 127; ++i) {
  asciiPrintableRange.push(i);
  if (i > 47 && i < 58) {
    alphaNumericRange.push(i);
    numericRange.push(i);
  }

  if (i > 64 && i < 91) {
    alphaNumericRange.push(i);
    alphaRange.push(i);
    upperCaseRange.push(i);
  }

  if (i > 96 && i < 123) {
    alphaNumericRange.push(i);
    alphaRange.push(i);
    lowerCaseRange.push(i);
  }
}

const randomCharacter = range => () => {
  return String.fromCharCode(range[Math.random() * range.length | 0]);
};

const randomString = f => (length=32) => {
  let str = '';
  for (let i = 0; i < length; ++i) str += f();
  return str;
};

const printfFormat = (c, arg) => {
  let x = parseInt(arg, 10);
  switch (c) {
    case 'n': return '';
    case 'c':
    case '%':
      return arg ? arg[0] : '';

    case 'd':
      if (Number.isNaN(x)) throw new TypeError(`Non numeric argument ${arg} to %${c}`);
      return (x|0).toString();

    case 'b':
      if (Number.isNaN(x)) throw new TypeError(`Non numeric argument ${arg} to %${c}`);
      return '0b' + x.toString(2);

    case 'e':
      x = +arg;
      if (Number.isNaN(x)) throw new TypeError(`Non numeric argument ${arg} to %${c}`);
      return x.toExponential();

    case 'E':
      x = +arg;
      if (Number.isNaN(x)) throw new TypeError(`Non numeric argument ${arg} to %${c}`);
      return x.toExponential().toUpperCase();

    case 'o':
      if (Number.isNaN(x)) throw new TypeError(`Non numeric argument ${arg} to %${c}`);
      return '0o' + x.toString(8);

    case 'x':
      if (Number.isNaN(x)) throw new TypeError(`Non numeric argument ${arg} to %${c}`);
      return '0x' + x.toString(16);

    case 'X':
      if (Number.isNaN(x)) throw new TypeError(`Non numeric argument ${arg} to %${c}`);
      return '0x' + x.toString(16).toUpperCase();

    case 'f':
      x = +arg;
      if (Number.isNaN(x)) throw new TypeError(`Non numeric argument ${arg} to %${c}`);
      return '' + x;

    case 's': return arg.toString();

    default: throw new TypeError(`Unrecognized formatting option %${c} to sprintf`);
  }
};

const matchToUpper = m => m.toUpperCase();
const isUpper = s => s === s.toUpperCase();

const isNumeric = str => !Number.isNaN(+str);
/* unused harmony export isNumeric */


const capFirst = str => str.replace(firstLetter, matchToUpper);
/* unused harmony export capFirst */


const capFirstAll = str => str.replace(allFirstLetters, matchToUpper);
/* unused harmony export capFirstAll */


const toCamelCase = str => str.replace(snakeCaseMatcher, m => m.replace(/[\-\_]+/g, '').toUpperCase());
/* harmony export (immutable) */ __webpack_exports__["b"] = toCamelCase;


const toPascalCase = str => capFirst(toCamelCase(str));
/* unused harmony export toPascalCase */


const toClassCase = toPascalCase;
/* unused harmony export toClassCase */


const toSnakeCase = (str, char='_') => {
  const pieces = str.split(camelSplitter).filter(x => x);
  return pieces
    .map((piece, i, arr) => {
      if (isUpper(piece)) {
        const next = arr[i + 1];
        const prev = arr[i - 1];
        if (!prev) return piece;
        if (!isUpper(prev) || (next && !isUpper(next))) return char + piece;
      }
      return piece;
    })
    .join('')
    .toLowerCase();
};
/* harmony export (immutable) */ __webpack_exports__["c"] = toSnakeCase;


const padLeft = (n, str, char=' ') => str.length > n ? str : char.repeat(n - str.length) + str;
/* unused harmony export padLeft */

const padRight = (n, str, char=' ') => str.length > n ? str : str + char.repeat(n - str.length);
/* unused harmony export padRight */


// NOTE: does not support the full range of %[char] possiblities. If you need something more robust
// use https://github.com/alexei/sprintf.js/blob/master/src/sprintf.js
const sprintf = (str, ...args) => {
  let count = -1;
  return str.replace(printfMatch, m => printfFormat(m[1], args[++count]));
};
/* unused harmony export sprintf */


// NOTE: not cryptographically secure. For anything requiring a secure degree of
// randomness use the browser's/node's crypto implementation.
const random = {
  alphanumeric: randomString(randomCharacter(alphaNumericRange)),
  ascii: randomString(randomCharacter(asciiPrintableRange)),
  alpha: randomString(randomCharacter(alphaRange)),
  numeric: randomString(randomCharacter(numericRange)),
  upper: randomString(randomCharacter(upperCaseRange)),
  lower: randomString(randomCharacter(lowerCaseRange))
};
/* harmony export (immutable) */ __webpack_exports__["a"] = random;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);


const processHTMLAttr = attr => {
  switch (Object(__WEBPACK_IMPORTED_MODULE_0__node_modules_extracttype_extracttype_js__["a" /* default */])(attr)) {
    case 'Null':
    case 'Undefined':
      return null;

    case 'String':
      // return attr.toLowerCase() === 'false' ? false : attr || true;
      if (!attr) return true; // empty string, e.g. <ui-drawer is-modal></ui-drawer>
      let val;
      try {
        val = JSON.parse(attr); // numbers, bools, etc
      } catch (e) {
        val = attr;
      }
      return val;

    default: return attr;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (processHTMLAttr);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_dom_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);



const rippleEvents = ['click', 'tap', 'dblclick'];
const handlerRegistry = new WeakMap();
const registerHandler = f => {
  const cached = handlerRegistry.get(f);
  let fn = cached || (e => { setTimeout(f, 500, e); });
  handlerRegistry.set(f, fn);
  return fn;
};

const template = __WEBPACK_IMPORTED_MODULE_0__utils_dom_js__["c" /* document */].createElement('template');
template.innerHTML = `
  <style>
    :host {
      overflow: hidden;
      position: relative;
      cursor: pointer;
      transform: translate3d(0, 0, 0);
    }

    :host:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      transform: scale(10, 10);
      transition: transform .5s, opacity 1s;
      pointer-events: none;
      background-repeat: no-repeat;
      background-image: radial-gradient(circle, var(--ui-theme-ripple-color), 10%, transparent 10%);
      background-position: 50%;
    }

    :host(:active):after {
      opacity: .7;
      transform: scale(0, 0);
      transition: 0s;
      background-color: orange;
    }
  </style>
`;

/* harmony default export */ __webpack_exports__["a"] = (superclass => Object(__WEBPACK_IMPORTED_MODULE_0__utils_dom_js__["b" /* defineUIComponent */])({
  name: 'ui-ripples',
  template,
  registerElement: false,
  definition: class Ripples extends superclass {

    // Here we want to intercept any handlers on events that trigger a ripple and delay them
    // to give the animation time to complete.
    on (evts, f) {
      const events = evts.split(/\s+/g);
      events.forEach(evt => {
        if (rippleEvents.includes(evt)) {
          // Here we'll want to cache a canonical version for later removal
          const fn = registerHandler(f);
          super.on(evt, fn);
        } else {
          super.on(evt, f);
        }
      });
    }

    // Similar intercept here for function arguments
    remove (...args) {
      const correctArgs = args.reduce((acc, arg) => {
        if (Object(__WEBPACK_IMPORTED_MODULE_1__node_modules_extracttype_extracttype_js__["a" /* default */])(arg) === 'Function') {
          let cached = registerHandler(arg);
          acc.push(cached || arg);
        } else {
          acc.push(arg);
        }
        return acc;
      }, []);
      super.remove(...correctArgs);
    }
  }
}));


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export applyTheme */
/* unused harmony export revertTheme */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return generateCSSClassName; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_jsstring_src_jsstring_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dom_js__ = __webpack_require__(0);




const toCSSVar = s => `--ui-theme-${Object(__WEBPACK_IMPORTED_MODULE_1__node_modules_jsstring_src_jsstring_js__["c" /* toSnakeCase */])(s, '-')}`;

const defaultThemeObj = {
  primaryColor: '#00bcd4',
  primaryDarkColor: '#008ba3',
  primaryLightColor: '#62efff',
  darkTextColor: '#000',
  secondaryColor: '#ab47bc',
  secondaryDarkColor: '#79e08b',
  secondaryLightColor: '#df78ef',
  lightTextColor: '#fff',
  warningColor: '#ec407a',
  rippleColor: '#fff',
  accentColor: 'orange',
};

const themeRegistry = {};
const appliedThemes = [];
let currentTheme = null;

const applyTheme = (theme, name) => {
  const type = Object(__WEBPACK_IMPORTED_MODULE_0__node_modules_extracttype_extracttype_js__["a" /* default */])(theme);
  if (type === 'String') {
    let t = themeRegistry[theme];
    if (t) {
      currentTheme = t;
      __WEBPACK_IMPORTED_MODULE_2__dom_js__["c" /* document */].head.appendChild(t);
      appliedThemes.push(t);
      return t;
    } else {
      throw new Error(`Unrecognized theme ${theme}.`);
    }
  }

  const style = __WEBPACK_IMPORTED_MODULE_2__dom_js__["c" /* document */].createElement('style');
  style.innerHTML = ':root { ' + Object.entries(theme).reduce((s, [k, v]) => {
    return (k in defaultThemeObj) ?
      `${s} ${toCSSVar(k)}:${v};` : s;
  }, '') + ' }';

  if (name) themeRegistry[name] = style;
  __WEBPACK_IMPORTED_MODULE_2__dom_js__["c" /* document */].head.appendChild(style);
  appliedThemes.push(style);
  currentTheme = style;
  return style;
};

const defaultTheme = applyTheme(defaultThemeObj, 'default');
const revertTheme = () => {
  let current = appliedThemes.pop();
  if (current && current !== defaultTheme) __WEBPACK_IMPORTED_MODULE_2__dom_js__["c" /* document */].head.removeChild(current);
  return appliedThemes[appliedThemes.length - 1] || defaultTheme;
};

const generateCSSClassName = () => __WEBPACK_IMPORTED_MODULE_1__node_modules_jsstring_src_jsstring_js__["a" /* random */].alpha(1) + __WEBPACK_IMPORTED_MODULE_1__node_modules_jsstring_src_jsstring_js__["a" /* random */].alphanumeric(5);




/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__form_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);
/*
 * NOTE: it is not currently possible to extend specific HTMLElements, leading
 * to this element being rather convoluted. Once it's possible to extend input
 * directly this should be refactored.
 *
 */







// This is here to make input event consistent across browsers, all of these
// if the value is different than the last onfocus will trigger change event.
const changeTriggers = [
  'blur',
  'keyup',
  'paste',
  'input',
];

const reflectedAttrs = [

  // These values are here to mimic the behavior of the native, NOTE: incomplete.
  'type',
  'form',
  'placeholder',
  'pattern',
  'required',

   // NOTE: unlike placeholder which merely displays text to the user,
   // this is a true default value, i.e. it will be the value property/attribute
   // of the input if empty, will be the value if a form is submitted, etc.
   // Will override placeholder if both are set. Different input elements
   // implementing this interface should validate the value appropriately.
  'default-value',
];

const template = __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      border-bottom: solid 1px;
      border-bottom-color: #999;
      min-height: 25px;
      margin-bottom: 10px;
      margin-top: 10px;
      max-width: 200px;
    }

    :host(.focused) {
      border-bottom-color: var(--ui-theme-primary-dark-color, blue);
      box-shadow: 0px 4px 4px -4px;
    }

    #input {
      border: none;
      outline: none;
      width: 90%;
      margin-left: 5%;
      margin-bottom: 3px;
      height: 25px;
      font-size: 16px;
    }
  </style>
  <input id="input"/>
`;

const debounce = (n, immed, f) => {
  let [fn, now] = (() => {
    switch(Object(__WEBPACK_IMPORTED_MODULE_4__node_modules_extracttype_extracttype_js__["b" /* extractType */])(immed)) {
      case 'Boolean':
        return [f, immed];
      case 'Function':
        return [immed, false];
      default:
        throw new TypeError(`Unrecognized arguments ${immed} and ${f} to function debounce.`);
    }
  })();

  let timer = null;
  return function (...args) {
    if (timer === null && now) {
      fn.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), n);
    return timer;
  }
};

/* unused harmony default export */ var _unused_webpack_default_export = (Object(__WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["b" /* defineUIComponent */])({
  name: 'ui-input',
  template,
  reflectedAttrs,
  definition: class Input extends Object(__WEBPACK_IMPORTED_MODULE_3__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */]).with(__WEBPACK_IMPORTED_MODULE_1__form_js__["a" /* FormBehavior */]) {
    constructor () {
      super();
      this._input = null;
    }

    init () {
      super.init();
      this._input = this.shadowRoot.querySelector('#input');
      const placeholder = this.placeholder ||
        this.name ||
        this.defaultValue ||
        null;

      if (placeholder) this.placeholder = placeholder;

      if (!this.type) this.type = 'text';
      switch (this.type.toLowerCase()) {
        case 'text':
        case 'number':
        case 'password':
        case 'email':
          this._input.setAttribute('type', this.type);
          break;
      }

      this._input.addEventListener('focus', e => {
        this._before = this._input.value;
        this.classList.add('focused');
      });

      this._input.addEventListener('blur', e => {
        this.classList.remove('focused');
      })

      changeTriggers.forEach(evtName => this._input.addEventListener(evtName, debounce(500, e => {
        if (this._input.value !== this._before) {
          this._before = this._input.value;
          this.value = this._input.value;
          this.dispatchEvent(new Event('change', { bubbles: true }));
        }
      })));

      this.on('attribute-change', ({ changed: { now, name, was } } ) => {
        switch (name) {
          case 'name':
            this._input.name = now;
            this.name = now;
            break;

          case 'value':
            const val = now === true ? '' : now;
            if (val === '') {
              setTimeout(() => {
                if (!this._input.value) {
                  this._input.value = this.defaultValue || '';
                  this.dispatchEvent(new Event('change', { bubbles: 'true' }));
                }
              }, 500);
            } else if (this._input.value !== val) {
              this._input.value = now;
              this.dispatchEvent(new Event('change', { bubbles: 'true' }));
            }
            break;

          case 'default-value':
            if (!this.value) this.value = now;
            break;

          case 'type':
            if (now === 'hidden') {
              this.hide();
              return;
            }
            if (!['text', 'number', 'password', 'email'].includes(now)) return;
            // fall-through

          case 'placeholder':
          case 'required':
            if (now == null) {
              this._input.removeAttribute(name);
            } else {
              this._input.setAttribute(name, (now || true));
            }
            break;
        }
      });
    }
  }
}));


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_float_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);





const template = __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      width: 200px;
      height: 300px;
      padding: 2%;
    }
  </style>
  <slot></slot>
`;

const Card = Object(__WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["b" /* defineUIComponent */])({
  name: 'ui-card',
  template,
  definition: class Card extends Object(__WEBPACK_IMPORTED_MODULE_3__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */]).with(__WEBPACK_IMPORTED_MODULE_1__utils_float_js__["a" /* default */]) {
    init () {
      super.init();
      this.floatingY = true;
    }
  }
});

/* harmony default export */ __webpack_exports__["a"] = (Card);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__button_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__ = __webpack_require__(0);



const template = __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["c" /* document */].createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      width: 74px;
      height: 74px;
      border-radius: 50%;
      background-color: var(--ui-theme-accent-color, purple);
    }
  </style>
`;

/* unused harmony default export */ var _unused_webpack_default_export = (Object(__WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["b" /* defineUIComponent */])({
  name: 'ui-fab',
  template,
  definition: class Fab extends __WEBPACK_IMPORTED_MODULE_0__button_js__["a" /* default */] {
    init () {
      super.init();
      this.floatingY = true;
    }
  }
}));


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return centeredStyles; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_js__ = __webpack_require__(0);


const centeredStyles = `
    :host {
      transform-style: preserve-3d;
    }

    .content-wrapper {
      position: relative;
      top: 49%;
      transform: translateY(-51%);
    }
`;

const template = __WEBPACK_IMPORTED_MODULE_0__dom_js__["c" /* document */].createElement('template');
template.innerHTML = `
  <style>
    ${centeredStyles}
  </style>
  <div class="content-wrapper">
    <slot></slot>
  </div>
`;

/* harmony default export */ __webpack_exports__["b"] = (superclass => Object(__WEBPACK_IMPORTED_MODULE_0__dom_js__["b" /* defineUIComponent */])({
  name: 'ui-centered',
  template,
  registerElement: false,
  definition: class Centered extends superclass {}
}));





/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__ = __webpack_require__(0);



const template = __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["c" /* document */].createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      height: 100vh;
      width: 100vw;
      background-color: rgba(0,0,0,0.7);
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 10000;
    }
  </style>
`;

const Backdrop = Object(__WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["b" /* defineUIComponent */])({
  name: 'ui-backdrop',
  template,
  definition: class Backdrop extends __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */] {
    constructor () {
      super();

       // Elements that use this element should set this property to themselves as a
       // debugging aid.
      this.for = null;
    }

    init () {
      this.hide();
    }
  }
});

/* unused harmony default export */ var _unused_webpack_default_export = (Backdrop);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animations_rippler_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__checkbox_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__form_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_dom_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);








const ListBehavior = superclass => Object(__WEBPACK_IMPORTED_MODULE_4__utils_dom_js__["b" /* defineUIComponent */])({
  name: 'ui-list-behavior',
  reflectedAttrs: ['multiple', 'selected-index'],
  registerElement: false,
  definition: class extends Object(__WEBPACK_IMPORTED_MODULE_5__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(superclass).with(__WEBPACK_IMPORTED_MODULE_3__form_js__["a" /* FormBehavior */]) {
    constructor () {
      super();
      this._items = [];
      this._selected = null;
    }

    get value () {
      return this.selected && this.selected.map ?
        this.selected.map(x => x ? x.value : '').join(',') :
        (this.selected && this.selected.value) || null;
    }

    set value (value) {
      this.selected = value;
    }

    get selected () {
      return this._selected;
    }

    set selected (value) {
      if (value === null) {
        this._selected = null;
        return;
      }

      const type = Object(__WEBPACK_IMPORTED_MODULE_6__node_modules_extracttype_extracttype_js__["a" /* default */])(value);
      let selection;
      switch (type) {
        case 'Number':
          selection = this._items[value];
          break;

        case 'String':
          selection = this.querySelector(`[value="${value}"]`);
          if (!selection) selection = this._items.filter(x => x.textContent === value)[0];
          break;
      }

      if (type.match(/HTML\w*Element/) && this._items.includes(value)) selection = value;
      if (selection) {
        selection.isSelected = true;
        if (this.multiple) {
          this.selectedIndex = -1;
          this._selected.push(selection);
        } else {
          this.selectedIndex = this._items.indexOf(selection);
          this._selected = selection;
          this._items.forEach(item => {
            if (item !== selection) item.isSelected = false;
          });
        }
        const evt = new Event('change', { bubbles: true });
        evt.selection = this._selected;
        evt.value = this.value;
        this.dispatchEvent(evt);
      }

      return selection;
    }

    appendChild (node) {
      // let pendingAdditions = [];
      if (node && node.isReady) {
      //   pendingAdditions.push(node);
      //   this.isReady = this.isReady.then(_ => {
      //     return new Promise(res => {
      //       setTimeout(() => {
      //         Promise.all(pendingAdditions.map(x => x.isReady)).then(_ => {
      //           pendingAdditions = [];
      //           res();
      //         });
      //       }, 0);
      //     });
      //   });
      //
      //   if (node instanceof Item) {
      //     node.on('click', e => {
      //       this.selected = node;
      //       node.isSelected = true;
      //     });
      //     super.appendChild(node);
      //     this._items.push(node);
      //   }
      //
      //   node.isReady.then(node => {
      //     if (node.isSelected) this.selected = node;
      //   });
        node.onReady(el => {
          if (el instanceof Item) {
            node.on('click', e => {
              this.selected = node;
              node.isSelected = true;
            });
            super.appendChild(node);
            this._items.push(node);
            if (el.isSelected) this.onReady(_ => this.selected = node);
          }
        });
      }
      return node;
    }

    init () {
      super.init();
      this._beforeReady(_ => {
        this.selectAll('.ui-item').map(item => {
          this._items.push(item);
          if (item.isSelected) this.selected = item;
          item.on('click', e => {
            if (this.multiple) {
              item.isSelected = !item.isSelected;
              if (item.isSelected) {
                this.selected = item;
              } else {
                this._selected = this._selected.filter(x => x !== item);
              }
            } else {
              if (item !== this.selected) this.selected = item;
            }
          });
        });
      });

      this.on('attribute-change', ({ changed: { now, name } }) => {
        switch (name) {
          case 'multiple':
            if (now) {
              this.selectedIndex = -1;
              this._selected = [this.selected];
            } else {
              this.selected = this.selected == null ? null : this.selected[0];
            }
            break;

          case 'selected-index':
            if (now === -1 || this.multiple) return;
            if (!this._items[now]) {
              console.warn(`Attempted to set invalid index ${now} for element.`);
              this.attr('selected-index', was);
              return;
            }

            if (this._items[now] !== this.selected) this.selected = now;
            break;
        }
      });
    }
  }
});
/* harmony export (immutable) */ __webpack_exports__["b"] = ListBehavior;


const Item = (() => {
  const template = __WEBPACK_IMPORTED_MODULE_4__utils_dom_js__["c" /* document */].createElement('template');
  const reflectedAttrs = ['is-selected', 'value'];
  template.innerHTML = `
    <style>
      :host {
        --ui-theme-ripple-color: var(--ui-theme-primary-dark-color, rgb(0, 139, 163));
        display: block;
        margin-top: 10px;
        margin-bottom: 10px;
        min-height: 20px;
        background-color: inherit;
        color: inherit;
        border-radius: 0;
        text-transform: capitalize;
        width: 90%;
        margin-left: 5%;
        padding-top: 4px;
      }

      :host(:hover) {
        color: var(--ui-theme-primary-dark-color, #999);
      }

      :host(.selected) {
        border-bottom: 1px solid var(--ui-theme-primary-dark-color, rgb(0, 139, 163));
      }

      .ui-checkbox {
        display: none;
        height: 18px;
        width: 18px;
        float: left;
      }

      .ui-checkbox::before {
        top: 2px;
        height: 9px;
        left: 5px;
      }

      :host-context([multiple="true"]) {
        border-bottom: none;
      }

      :host-context([multiple="true"]) ui-checkbox {
        display: inline-block;
      }

      :host-context([multiple="true"]) #content {
        position: relative;
        left: -10px; /* offsets checkbox */
      }
    </style>
    <ui-checkbox></ui-checkbox>
    <span id="content"><slot></slot></span>
  `;

  return Object(__WEBPACK_IMPORTED_MODULE_4__utils_dom_js__["b" /* defineUIComponent */])({
    name: 'ui-item',
    template,
    reflectedAttrs,
    definition: class Item extends Object(__WEBPACK_IMPORTED_MODULE_5__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */]).with(__WEBPACK_IMPORTED_MODULE_1__animations_rippler_js__["a" /* default */]) {
      constructor () {
        super();
        this._checkbox = null;
        this._content = null;
      }

      init () {
        super.init();
        this._beforeReady(_ => {
          this._checkbox = this.shadowRoot.querySelector('ui-checkbox');
          this._content = this.shadowRoot.querySelector('#content');
          if (!this.value || this.value.toString() === 'true') this.value = this.textContent;
        });

        this.on('attribute-change', ({ changed: { now, name } }) => {
          switch (name) {
            case 'is-selected':
              this.onReady(_ => {
                if (now) {
                  this.classList.add('selected');
                  this._checkbox.checked = true;
                  this.dispatchEvent(new CustomEvent('component-selected'));
                } else {
                  this.classList.remove('selected');
                  this._checkbox.checked = false;
                  this.dispatchEvent(new CustomEvent('component-deselected'));
                }
              });
              break;
          }
        });
      }
    }
  });
})();
/* harmony export (immutable) */ __webpack_exports__["a"] = Item;


const List = (() => {
  const template = __WEBPACK_IMPORTED_MODULE_4__utils_dom_js__["c" /* document */].createElement('template');
  template.innerHTML = `
    <style>
      :host {
        display: block;
        text-align: center;
        margin: 5px;
      }
    </style>
    <slot></slot>
  `;

  return Object(__WEBPACK_IMPORTED_MODULE_4__utils_dom_js__["b" /* defineUIComponent */])({
    name: 'ui-list',
    template,
    definition: class List extends Object(__WEBPACK_IMPORTED_MODULE_5__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */]).with(ListBehavior) {}
  });
})();
/* unused harmony export List */



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_elements_login_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_elements_fab_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_elements_drop_down_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_elements_drawer_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_elements_hamburger_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_elements_input_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_elements_router_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_elements_tabs_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_elements_toolbar_js__ = __webpack_require__(34);



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__form_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__input_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__card_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__fab_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__alert_js__ = __webpack_require__(24);









const INVALID = `Invalid login credentials. Please double-check your username and password.`;
const FAILURE = `Could not connect to the server to verify your identity. Please check the console for details.`;

const reflectedAttrs = ['is-logged-in', 'data-url', 'session-timeout'];
const template = __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["c" /* document */].createElement('template');
template.innerHTML = `
  <style>
    ui-card {
      width: 300px;
      height: 315px;
    }

    ui-input {
      margin-bottom: 30px;
    }

    ui-fab {
      float: right;
      position: relative;
      top: 30px;
      left: 15px;
    }

    h2 {
      color: #AAA;
      font-style: italic;
      margin-bottom: 40px;
    }

    #heading {
      width: 70%;
      margin-left: 10%;
      border-bottom: var(--ui-theme-dark-text-color, #999);
    }

    .arrow {
      border: solid #fff;
      border-width: 0 4px 5px 0;
      display: inline-block;
      padding: 3px;
      position: relative;
      transform: rotate(45deg);
      height: 25px;
      width: 12px;
      top: -2px;
      left: 2px;
    }

    :host {
      position: relative;
      left: 50px;
      top: 50px;
    }
  </style>
  <ui-card>
    <h2 id="heading">Login</h2>
    <ui-form>
      <ui-input name="user" placeholder="User" required></ui-input>
      <ui-input name="pass" placeholder="Password" type="password" required></ui-input>
    </ui-form>
    <ui-fab><div class="arrow"></div></ui-fab>
  </ui-card>
`;

/* unused harmony default export */ var _unused_webpack_default_export = (Object(__WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["b" /* defineUIComponent */])({
  name: 'ui-login',
  reflectedAttrs,
  template,
  definition: class Login extends __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */] {
    constructor () {
      super();
      this._alert = null;
      this._form = null;
      this._sessionTimeoutHandle = null;
    }

    get credentials () {
      return this.selectInternalElement('ui-form').serialize();
    }

    login (resp) {
      this.isLoggedIn = true;
      const evt = new CustomEvent('login', { bubbles: true });
      evt.credentials = this.credentials;
      evt.response = resp;
      this.dispatchEvent(evt);
      this._sessionTimeoutHandle = this.countDown();
    }

    logout () {
      this.isLoggedIn = null;
      this.selectInternalElement('[name="user"]').value = '';
      this.selectInternalElement('[name="pass"]').value = '';
      __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["d" /* global */].sessionStorage.setItem('ui-credentials', '');
      this.dispatchEvent(new CustomEvent('logout', { bubbles: true }));
      return this;
    }

    userLogout () {
      let { name } = this.credentials;
      this.logout();
      this._alert.alert(`User ${name} is now logged out. Please close this tab.`);
    }

    countDown (h) {
      __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["d" /* global */].clearTimeout(h);
      return __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["d" /* global */].setTimeout(() => {
        this.logout();
        this._alert.alert(`Session timed out. Please login again or close the tab.`);
      }, (this.sessionTimeout || 30 * 60 * 1000));
    }

    init () {
      super.init();
      this._beforeReady(_ => {
        this._form = this.selectInternalElement('ui-form');
        this._alert = __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["c" /* document */].querySelector('ui-alert');
        if (!this._alert) {
          this._alert = __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["c" /* document */].createElement('ui-alert');
          __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["c" /* document */].body.appendChild(this._alert);
        }

        ['click', 'keydown'].forEach(evt => {
          __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["c" /* document */].addEventListener(evt, e => {
            if (this.isLoggedIn) this._sessionTimeoutHandle = this.countDown(this._sessionTimeoutHandle);
          });
        });

        this.selectInternalElement('ui-fab').on('click keydown', e => {
          if (!this.isLoggedIn && (!e.keyCode || e.keyCode === 13)) {
            if (!this.dataUrl) {
              throw new Error('No url for login, whatcha want me to do?');
            }

            if (!this._form.isValid) {
              this._alert.alert('Please supply a Username and Password.');
              return;
            }

            this.selectInternalElement('ui-form')
              .submit({ url: this.dataUrl, method: 'POST', responseType: 'json' })
              .then(valid => {
                if (valid) {
                  sessionStorage.setItem('ui-credentials', JSON.stringify(this.credentials));
                  this.login(valid);
                } else {
                  this._alert.alert(INVALID);
                }
              })
              .catch(err => {
                console.error(err);
                this._alert.alert(FAILURE);
              });
          }
        });

        let cached = __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["d" /* global */].sessionStorage.getItem('ui-credentials');
        if (cached) {
          try {
            let credentials = JSON.parse(cached);
            if (credentials.user && credentials.pass) {
              console.log('Logging in with session data...');
              this._form.data = credentials;
              this.login();
            }
          } catch (e) {
            // no-op
          }
        }
      });

      this.onReady(_ => {
        const bttn = __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["c" /* document */].querySelector('[logout-button]');
        // If added later event handling needs to be done manually.
        if (bttn) {
          bttn.on('click keydown', e => {
            if (!e.keyCode || e.keyCode === 13) {
              this.userLogout();
            }
          });
        }
      });
    }
  }
}));


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = (superclass => class DataBinder extends superclass {

  constructor () {
    super();
    this._oneWayBoundAttrs = {};
    this._twoWayBoundAttrs = {};
    this._internalMutationFlag = false;
  }

  // Set up data-binding. Any element attributes with a value matching the binding syntax
  // check up the DOM tree until it hits the document (in which case it throws) or finds
  // an element with a matching attribute.
  //
  // If the attribute uses the one-way syntax {{parentAttr}}, the element is updated when it's
  // parent changes, if two-way {{{parentAttr}}} then, well, it works both ways. Attempting to
  // change a one-way property logs a warning to the console and fails.
  //
  // As of right now, only works if the parent is a UIComponent. Otherwise, it log a warning
  // and no-ops.
  bindAttribute (attribute, parentAttribute, twoWay=false) {
    let parent = null;
    let node = this;
    while (node = (node.parentNode || node.host)) { // need host for shadowRoots
      if (node.getAttribute && node.getAttribute(parentAttribute) != null) {
        parent = node;
        break;
      }
    }

    if (!parent) {
      throw new Error(`Attempted to bind attribute ${attribute} to ${parentAttribute},` +
         'but no matching parent found.');
    }

    const bind = () => {
      if (!parent.isUIComponent) {
        console.warn(`Attempted to data-bind ${parentAttribute} to non-ui-component parent.`);
        return;
      }

      // Initial set
      this.attr(attribute, parent.attr(parentAttribute));

      // Watch changes.
      this.watchAttribute(parent, parentAttribute, (now, name, was) => {
        if (this.attr(attribute) !== now) {
          this._internalMutationFlag = true;
          this.attr(attribute, now);
        }
      });

      if (twoWay) {
        this.watchAttribute(this, attribute, (now, name, was) => {
          if (parent.attr(parentAttribute) !== now) {
            parent.attr(parentAttribute, now);
          }
        });
        this._twoWayBoundAttrs[attribute] = parentAttribute;
      } else {
        this._oneWayBoundAttrs[attribute] = parentAttribute;
      }
    };

    parent.onReady(bind);
  }
});


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__attribute_analyzer_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dom_js__ = __webpack_require__(0);




const attrConf = { attributes: true };

const isHTMLElement = arg => Boolean(Object(__WEBPACK_IMPORTED_MODULE_1__node_modules_extracttype_extracttype_js__["a" /* default */])(arg).match(/HTML[a-zA-Z]*Element/));

/* harmony default export */ __webpack_exports__["a"] = (superclass => class DOMutils extends superclass {
  constructor () {
    super();
    this._mutationObservers = [];
  }

  get isVisible () {
    const style = __WEBPACK_IMPORTED_MODULE_2__dom_js__["d" /* global */].getComputedStyle(this);
    return style.display !== 'none' && style.visibility !== 'hidden';
  }

  // Observes changes to the given attribute on the given node.
  watchAttribute (n, a, callb) {
    const [node, attr, cb] = (() => {
      if (isHTMLElement(n)) return [n, a, callb];
      return [this, n, a];
    })();
    if ((node.constructor.observedAttributes || []).includes(attr)) {
      node.on('attribute-change', ({ changed: { now, name, was } }) => {
        if (name === attr) cb(now, name, was);
      });
    } else {
      const observer = new MutationObserver(([mutation]) => {
        if (mutation.attributeName === attr) {
          cb(node.attr(mutation.attributeName), mutation.attributeName, mutation.oldValue);
        }
      });

      observer.observe(node, attrConf);
      this._mutationObservers.push([observer, node, attrConf]);
    }

    return this;
  }

  selectAll (selector) {
    const nodeList = this.querySelectorAll(selector);
    return nodeList ? [...nodeList] : [];
  }

  matches (selector) {
    if (super.matches) return super.matches(selector);
    if (super.msMatchesSelector) return super.msMatchesSelector(selector);
    throw new Error('HTMLElement does not implement the matches method.');
  }

  selectInternalElement (selector) {
    if (!this.shadowRoot) {
      console.warn(`Internal selector ${selector} called on ${this.identity} which has no shadowRoot.`);
      return null;
    }
    return this.shadowRoot.querySelector(selector);
  }

  selectInternalAll (selector) {
    if (!this.shadowRoot) {
      console.warn(`Internal selector ${selector} called on ${this.identity} which has no shadowRoot.`);
      return null;
    }
    return [...this.shadowRoot.querySelectorAll(selector)];
  }

  get identity () {
    let id = this.id ? '#' + this.id : '';
    let tag = this.tagName.toLowerCase();
    let classes = '.' + this.attr('class').split(' ').filter(c => c !== tag).join('.');
    return `${tag}${id}${classes}`;
  }

  /**
   * on :: Event, (Event -> *) -> this
   *
   * Registers an event listener. Listeners added via this method are
   * automatically removed and reattached on being removed from/added to the
   * DOM.
   */
  on (evts, fn) {
    evts.split(/\s+/g).forEach(evt => {
      const isDupe = this._listeners.some(([e, f]) => e === evt && fn === f);
      if (!isDupe) {
        this.addEventListener(evt, fn);
        this._listeners.push([evt, fn]);
      }
    });
    return this;
  }

  /**
   * remove :: Void -> this      -- removes this from parent
   * remove :: Node -> this      -- removes child from this
   * remove :: [Node] -> this    -- removes children from this
   * remove :: (* -> *) -> this  -- removes listener for all events from this
   * remove :: String, (* -> *) -> this -- removes listener for specified event
   *
   * Removes a child node(s) or event listener. If no event name is provided, it removes that
   * listener function for all events for which it is bound to the element. If no arguments arguments
   * provided the method removes the element from its parent element. So this method
   * responds to the following signatures and ignores all others:
   */
  remove (...args) {
    const [evt, fn, children] = (arr => {
      switch (arr.length) {
        case 0:
          this.parentElement && this.parentElement.removeChild(this);
          return [];

        case 1:
          return (([item]) => {
            const type = Object(__WEBPACK_IMPORTED_MODULE_1__node_modules_extracttype_extracttype_js__["a" /* default */])(item);
            // leaving this as a switch in case I think of more options later
            switch (type) {
              case 'Function': return [null, item]
              default:
                if (isHTMLElement(item) || type === 'Text') return [null, null, [item]];
                return [];
            }
          })(arr);

        default:
          return (args => {
            const [first] = args;
            if (isHTMLElement(first) || Object(__WEBPACK_IMPORTED_MODULE_1__node_modules_extracttype_extracttype_js__["a" /* default */])(first) === 'Text') {
              return [null, null, args];
            }
            return args.slice(0,2);
          })(arr);
      }
    })(args);

    if (fn && Object(__WEBPACK_IMPORTED_MODULE_1__node_modules_extracttype_extracttype_js__["a" /* default */])(fn) === 'Function') {
      this._listeners = this._listeners.filter(([e, f]) => {
        if (f === fn && (evt === null || evt === e)) {
          this.removeEventListener(e, f);
          return false;
        }
        return true;
      });
    }

    if (children) {
      children.forEach(child => this.removeChild(child));
    }

    return this;
  }

  // // Alias for the .on method. Intercepts addEventListener.
  // addEventListener(...args) {
  //   return this.on(...args);
  // }
  //
  // // Ditto for removal
  // removeEventListener(...args) {
  //   return this.remove(...args);
  // }

  hide () {
    this.style.display = 'none';
    return this;
  }

  show () {
    this.style.display = '';
    return this;
  }

  attr (name, value) {
    if (value === undefined) {
      return Object(__WEBPACK_IMPORTED_MODULE_0__attribute_analyzer_js__["a" /* default */])(this.getAttribute(name));
    } else {
      switch (Object(__WEBPACK_IMPORTED_MODULE_1__node_modules_extracttype_extracttype_js__["a" /* default */])(value)) {
        case 'Null':
          this.removeAttribute(name);
          break;

        default:
          this.setAttribute(name, value);
          break;
      }
      return this;
    }
  }
});


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (({ eventName, element, callback, timeout }) => {
  if (!eventName || !element) {
    throw new TypeError(`Missing required arguments to function.`);
  }

  return new Promise((res, rej) => {
    let timeoutHandle;
    if (timeout) {
      timeoutHandle = setTimeout(() => {
        rej(new Error(`The element did not fire the event before the ${timeout}ms timeout.`));
      }, timeout);
    }

    const listener = e => {
      clearTimeout(timeoutHandle);
      element.removeEventListener(eventName, listener);
      if (callback) res(callback(e));
      res(e);
    };

    element.addEventListener(eventName, listener);
  });
});


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var g,k="function"==typeof Object.defineProperties?Object.defineProperty:function(b,a,d){b!=Array.prototype&&b!=Object.prototype&&(b[a]=d.value)},l="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function n(){n=function(){};l.Symbol||(l.Symbol=p)}var p=function(){var b=0;return function(a){return"jscomp_symbol_"+(a||"")+b++}}();
function q(){n();var b=l.Symbol.iterator;b||(b=l.Symbol.iterator=l.Symbol("iterator"));"function"!=typeof Array.prototype[b]&&k(Array.prototype,b,{configurable:!0,writable:!0,value:function(){return u(this)}});q=function(){}}function u(b){var a=0;return v(function(){return a<b.length?{done:!1,value:b[a++]}:{done:!0}})}function v(b){q();b={next:b};b[l.Symbol.iterator]=function(){return this};return b}function w(b){q();n();q();var a=b[Symbol.iterator];return a?a.call(b):u(b)}
if(!window.FormData||!window.FormData.prototype.keys){var x=function(b,a,d){if(2>arguments.length)throw new TypeError("2 arguments required, but only "+arguments.length+" present.");return a instanceof Blob?[b+"",a,void 0!==d?d+"":"string"===typeof a.name?a.name:"Blob"]:[b+"",a+""]},y=function(b){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");return[b+""]},A=function(b){var a=w(b);b=a.next().value;a=a.next().value;b instanceof Blob&&(b=new File([b],a,{type:b.type,
lastModified:b.lastModified}));return b},B=window.FormData,C=window.XMLHttpRequest.prototype.send,D=window.Request&&window.fetch;n();var E=window.Symbol&&Symbol.toStringTag,F=new WeakMap,G=Array.from||function(b){return[].slice.call(b)};E&&(Blob.prototype[E]||(Blob.prototype[E]="Blob"),"File"in window&&!File.prototype[E]&&(File.prototype[E]="File"));try{new File([],"")}catch(b){window.File=function(a,d,c){a=new Blob(a,c);c=c&&void 0!==c.lastModified?new Date(c.lastModified):new Date;Object.defineProperties(a,
{name:{value:d},lastModifiedDate:{value:c},lastModified:{value:+c},toString:{value:function(){return"[object File]"}}});E&&Object.defineProperty(a,E,{value:"File"});return a}}var H=function(b){F.set(this,Object.create(null));if(!b)return this;b=w(G(b.elements));for(var a=b.next();!a.done;a=b.next())if(a=a.value,a.name&&!a.disabled)if("file"===a.type)for(var d=w(a.files),c=d.next();!c.done;c=d.next())this.append(a.name,c.value);else if("select-multiple"===a.type||"select-one"===a.type)for(d=w(G(a.options)),
c=d.next();!c.done;c=d.next())c=c.value,c.selected&&this.append(a.name,c.value);else"checkbox"===a.type||"radio"===a.type?a.checked&&this.append(a.name,a.value):this.append(a.name,a.value)};g=H.prototype;g.append=function(b,a,d){var c=F.get(this);c[b]||(c[b]=[]);c[b].push([a,d])};g["delete"]=function(b){delete F.get(this)[b]};g.entries=function(){function b(b,t,I){for(;;)switch(a){case 0:z=F.get(J);h=[];m=z;for(f in m)h.push(f);r=0;case 1:if(!(r<h.length)){a=3;break}f=h[r];if(f in m){a=4;break}a=
2;break;case 4:e=w(z[f]),c=e.next();case 5:if(c.done){a=7;break}d=c.value;a=8;return{value:[f,A(d)],done:!1};case 8:if(1!=b){a=9;break}a=-1;throw I;case 9:case 6:c=e.next();a=5;break;case 7:case 2:r++;a=1;break;case 3:a=-1;default:return{value:void 0,done:!0}}}var a=0,d,c,e,f,m,r,h,z,J=this,t={next:function(a){return b(0,a,void 0)},"throw":function(a){return b(1,void 0,a)},"return":function(){throw Error("Not yet implemented");}};q();t[Symbol.iterator]=function(){return this};return t};g.forEach=
function(b,a){for(var d=w(this),c=d.next();!c.done;c=d.next()){var e=w(c.value);c=e.next().value;e=e.next().value;b.call(a,e,c,this)}};g.get=function(b){var a=F.get(this);return a[b]?A(a[b][0]):null};g.getAll=function(b){return(F.get(this)[b]||[]).map(A)};g.has=function(b){return b in F.get(this)};g.keys=function(){function b(b,h,t){for(;;)switch(a){case 0:m=w(r),f=m.next();case 1:if(f.done){a=3;break}e=f.value;c=w(e);d=c.next().value;a=4;return{value:d,done:!1};case 4:if(1!=b){a=5;break}a=-1;throw t;
case 5:case 2:f=m.next();a=1;break;case 3:a=-1;default:return{value:void 0,done:!0}}}var a=0,d,c,e,f,m,r=this,h={next:function(a){return b(0,a,void 0)},"throw":function(a){return b(1,void 0,a)},"return":function(){throw Error("Not yet implemented");}};q();h[Symbol.iterator]=function(){return this};return h};g.set=function(b,a,d){F.get(this)[b]=[[a,d]]};g.values=function(){function b(b,h,t){for(;;)switch(a){case 0:m=w(r),f=m.next();case 1:if(f.done){a=3;break}e=f.value;c=w(e);c.next();d=c.next().value;
a=4;return{value:d,done:!1};case 4:if(1!=b){a=5;break}a=-1;throw t;case 5:case 2:f=m.next();a=1;break;case 3:a=-1;default:return{value:void 0,done:!0}}}var a=0,d,c,e,f,m,r=this,h={next:function(a){return b(0,a,void 0)},"throw":function(a){return b(1,void 0,a)},"return":function(){throw Error("Not yet implemented");}};q();h[Symbol.iterator]=function(){return this};return h};H.prototype._asNative=function(){for(var b=new B,a=w(this),d=a.next();!d.done;d=a.next()){var c=w(d.value);d=c.next().value;c=
c.next().value;b.append(d,c)}return b};H.prototype._blob=function(){for(var b="----formdata-polyfill-"+Math.random(),a=[],d=w(this),c=d.next();!c.done;c=d.next()){var e=w(c.value);c=e.next().value;e=e.next().value;a.push("--"+b+"\r\n");e instanceof Blob?a.push('Content-Disposition: form-data; name="'+c+'"; filename="'+e.name+'"\r\n',"Content-Type: "+(e.type||"application/octet-stream")+"\r\n\r\n",e,"\r\n"):a.push('Content-Disposition: form-data; name="'+c+'"\r\n\r\n'+e+"\r\n")}a.push("--"+b+"--");
return new Blob(a,{type:"multipart/form-data; boundary="+b})};n();q();H.prototype[Symbol.iterator]=function(){return this.entries()};H.prototype.toString=function(){return"[object FormData]"};E&&(H.prototype[E]="FormData");[["append",x],["delete",y],["get",y],["getAll",y],["has",y],["set",x]].forEach(function(b){var a=H.prototype[b[0]];H.prototype[b[0]]=function(){return a.apply(this,b[1].apply(this,G(arguments)))}});XMLHttpRequest.prototype.send=function(b){b instanceof H&&(b=b._blob(),this.setRequestHeader("Content-Type",
b.type));C.call(this,b)};if(D){var K=window.fetch;window.fetch=function(b,a){a&&a.body&&a.body instanceof H&&(a.body=a.body._blob());return K(b,a)}}window.FormData=H};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ }),
/* 23 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__button_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dialog_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__ = __webpack_require__(0);




const template = __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].createElement('template');
template.innerHTML = `
  <style>
    :host {
      top: 30%;
    }

    #content {
      width: 90%;
      margin-left: auto;
      margin-right: auto;
      height: 65%;
    }

    #closer {
      background-color: var(--ui-theme-warning-color, #e83673);
      color: var(--ui-theme-light-text-color, #fff);
      position: relative;
      width: 105px;
      height: 50px;
      top: 12px;
      left: calc(100% - 105px);
    }
  </style>
  <div id="content"></div>
  <ui-button id="closer">Close</ui-button>
`;

const Alert = Object(__WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["b" /* defineUIComponent */])({
  name: 'ui-alert',
  template,
  definition: class Alert extends __WEBPACK_IMPORTED_MODULE_1__dialog_js__["a" /* default */] {
    init () {
      super.init();
      this.scrollableDialog = false;
      this.smallDialog = true;
      this.watchAttribute(this, 'is-open', open => {
        open ? this._backdrop.show() : this._backdrop.hide();
      });

      this.shadowRoot.querySelector('#closer').on('click', e => this.close());
    }

    get textContent () {
      return this.shadowRoot.querySelector('#content').textContent;
    }

    set textContent (txt) {
      this.shadowRoot.querySelector('#content').textContent = txt;
      return this;
    }

    alert (txt) {
      this.textContent = txt;
      return this.open();
    }
  }
});

/* unused harmony default export */ var _unused_webpack_default_export = (Alert);


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_float_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__card_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__backdrop_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__button_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_dom_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);









const template = __WEBPACK_IMPORTED_MODULE_4__utils_dom_js__["c" /* document */].createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      position: absolute;
      padding: 20px;
      z-index: 10001;
      background-color: #fff;
      overflow: hidden;
    }

    :host(.large-dialog) {
      width: 80%;
      height: 80%;
      top: 8%;
      left: 9%;
    }

    :host(.small-dialog) {
      width: 250px;
      height: 185px;
      top: calc(50vh - 130px);
      left: calc(50vw - 155px);
    }

    :host(.medium-dialog) {
      width: 50%;
      height: 50%;
      top: 20%;
      left: 25%;
    }

    :host(.scrollable-dialog) {
      overflow: scroll;
    }
  </style>
`;

const reflectedAttrs = [
  'is-open',
  'is-modal',
  'small-dialog',
  'medium-dialog',
  'large-dialog',
  'scrollable-dialog',
];

const manipulators = new WeakMap();
const incorporateButtonChild = (el, child) => {
  let manip = manipulators.get(el);
  if (!manip) {
    manip = [
      e => { el.close(); el.dispatchEvent(new CustomEvent('dialog-dismiss')) },
      e => { el.close(); el.dispatchEvent(new CustomEvent('dialog-confirm')) },
    ];
    manipulators.set(el, manip);
  }

  const [dismisser, closer] = manip;
  if (child.attr('dialog-dismiss')) child.on('click', dismisser);
  if (child.attr('dialog-confirm')) child.on('click', confirmer);
  child.watchAttribute(child, 'dialog-dismiss', now => {
    now ? child.on('click', dismisser) : child.remove('click', dismisser);
  });

  child.watchAttribute(child, 'dialog-confirm', now => {
    now ? child.on('click', confirmer) : child.remove('click', confirmer);
  });

  return el;
};

const Dialog = Object(__WEBPACK_IMPORTED_MODULE_4__utils_dom_js__["b" /* defineUIComponent */])({
  name: 'ui-dialog',
  template,
  reflectedAttrs,
  definition: class Dialog extends __WEBPACK_IMPORTED_MODULE_1__card_js__["a" /* default */] {
    constructor () {
      super();
      this.hide();
      this._backdrop = null;
    }

    // Intercepts calls to appendChild so buttons can be appropriately used.
    appendChild (node) {
      if (node && node.onReady) {
        node.onReady(el => {
          if (el && el.matches && el.matches('.ui-button')) {
            incorporateButtonChild(this, el);
            this.shadowRoot.appendChild(el);
          } else {
            super.appendChild(node);
          }
        });
      }

      return node;
    }

    open (txt) {
      this.isOpen = true;
      return this;
    }

    close () {
      this.isOpen = false;
      return this;
    }

    init () {
      super.init();
      this._backdrop = __WEBPACK_IMPORTED_MODULE_4__utils_dom_js__["c" /* document */].createElement('ui-backdrop');
      this._backdrop.for = this;
      __WEBPACK_IMPORTED_MODULE_4__utils_dom_js__["c" /* document */].body.appendChild(this._backdrop);

      this._childrenUpgraded.then(children => {
        children
          .filter(el => el.matches && el.matches('.ui-button'))
          .forEach(el => incorporateButtonChild(this, el));
      });

      const closer = e => this.close();

      this.on('attribute-change', ({ changed: { now, name } }) => {
        switch (name) {
          case 'small-dialog':
            return now ?
              (this.classList.add('small-dialog'), this.classList.remove('medium-dialog', 'large-dialog')) :
              this.classList.remove('small-dialog');

          case 'medium-dialog':
            return now ?
              (this.classList.add('medium-dialog'), this.classList.remove('small-dialog', 'large-dialog')) :
              this.classList.remove('medium-dialog');

          case 'large-dialog':
            return now ?
              (this.classList.add('large-dialog'), this.classList.remove('small-dialog', 'medium-dialog')) :
              this.classList.remove('large-dialog');

          case 'scrollable-dialog':
            return now ?
              this.classList.add('scrollable-dialog') :
              this.classList.remove('scrollable-dialog');

          case 'is-modal':
            return now ? this._backdrop.on('click', closer) : this._backdrop.remove(closer);

          case 'is-open':
            if (now) {
              if (this.isModal) this._backdrop.show();
              this.show();
              this.dispatchEvent(new CustomEvent('dialog-opened'));
            } else {
              this._backdrop.hide();
              this.hide();
              this.dispatchEvent(new CustomEvent('dialog-closed'));
            }
        }
      });
    }
  }
});

/* harmony default export */ __webpack_exports__["a"] = (Dialog);


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__list_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);






const reflectedAttrs = ['selected-index', 'is-open', 'multiple'];
const template = __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].createElement('template');
template.innerHTML = `
  <style>
    ui-list {
      transition: transform 500ms cubic-bezier(0.165, 0.84, 0.44, 1);
      background: #fff;
      position: relative;
      left: -5px;
      z-index: 1000;
      width: 100%;
      max-height: 225px;
      overflow-y: scroll;
    }

    .arrow {
      border: solid #999;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 3px;
      float: right;
      position: relative;
      top: 6px;
      right: 2px;
      transform: rotate(45deg);
    }

    .not-overflowing {
      overflow: hidden !important;
    }

    #dummy-item {
      text-align: center;
      padding-bottom: 3px;
    }

    #dummy-item.default {
      letter-spacing: 3px;
    }

    #list-holder {
      height: 1px;
      overflow: visible;
      position: relative;
      top: -10px;
      border-top: 1px solid #999;
    }

    ::slotted(.ui-item) {
      border: none;
    }

    :host {
      display: block;
      max-width: 200px;
    }

    :host([multiple="true"]) #dummy-item #dummy-item-content {
      position: relative;
      left: 10px;
    }

    :host([is-open="true"]) .arrow {
      transform: rotate(-135deg);
    }

    :host([is-open="true"]) ui-list {
      box-shadow: 3px 5px 10px -4px #999;
      padding-bottom: 1px;
      transform: scale(1) translateY(0px);
    }

    :host([is-open="false"]) ui-list {
      transform: scale(0) translateY(-200px);
    }

    :host([is-open="true"]) #list-holder {
      border-color: var(--ui-theme-primary-dark-color, blue);
    }

    :host([is-open="false"]) ::slotted(.ui-item) {
      display: none;
    }

  </style>
  <ui-item id="dummy-item" class="default">
    <span id="dummy-item-content">...</span>
    <div class="arrow down"></div>
  </ui-item>
  <div id="list-holder" class="not-overflowing">
    <ui-list multiple="{{multiple}}">
      <slot></slot>
    </ui-list>
  </div>
`;

/* unused harmony default export */ var _unused_webpack_default_export = (Object(__WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["b" /* defineUIComponent */])({
  name: 'ui-drop-down',
  reflectedAttrs,
  template,
  definition: class DropDown extends Object(__WEBPACK_IMPORTED_MODULE_3__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */]).with(__WEBPACK_IMPORTED_MODULE_1__list_js__["b" /* ListBehavior */]) {
    constructor () {
      super();
      this._list = null;
      this._listHolder = null;
      this._dummyItem = null;
      this._textContent = '';
    }

    get textContent () {
      return (this._dummyItem && this._dummyItem.textContent) || this._textContent;
    }

    set textContent (val) {
      const txt = val ||
        this.placeholder ||
        this.name ||
        '...';

      this._textContent = txt;
      if (!this._dummyItem) this._dummyItem = this.selectInternalElement('#dummy-item');
      this._dummyItem.querySelector('#dummy-item-content').textContent = txt;
      if (txt === '...') {
        this._dummyItem.classList.add('default');
      } else {
        this._dummyItem.classList.remove('default');
      }

      return this;
    }

    appendChild (node) {
      if (node) {
        super.appendChild(node);
        node.on('click', e => {
          setTimeout(() => {
            this.close();
          }, 300);
        });
      }

      return node;
    }

    toggle () {
      this.isOpen = !this.isOpen;
      return this;
    }

    open () {
      this.isOpen = true;
      return this;
    }

    close () {
      this.isOpen = false;
      return this;
    }

    init () {
      let mouseon = false;
      super.init();
      this._beforeReady(_ => {
        this._list = this.shadowRoot.querySelector('ui-list');
        this._listHolder = this.shadowRoot.querySelector('#list-holder');
        this._dummyItem = this.shadowRoot.querySelector('#dummy-item');
        this._dummyItem.shadowRoot.querySelector('ui-checkbox').style.display = 'none';

        this._items.forEach(item => {
          if (item.isSelected) this.selected = item;
          item.on('click', e => {
            if (!this.multiple) {
              setTimeout(() => {
                this.close();
              }, 300);
            }
          });
        });

        if (this.name && !this.selected) this.textContent = null;
        this._listHolder.classList.remove('not-overflowing');

        this._dummyItem.on('click', e => {
          this.toggle();
          mouseon = this.isOpen;
        });
      });

      if (!this.multiple) this.multiple = false;
      if (!this.isOpen) this.isOpen = false;

      this.on('mouseenter', e => mouseon = true);
      this.on('mouseleave', e => {
        mouseon = false;
        setTimeout(() => { if (!mouseon) this.isOpen = false; }, 1000);
      });

      this.on('attribute-change', ({ changed: { now, name } }) => {
        switch (name) {
          case 'selected-index':
            if (this.selected && !this.multiple) {
              this.textContent = this.selected.textContent;
            } else {
              this.textContent = ''; // default
            }
            break;
        }
      });
    }
  }
}));


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animations_rippler_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__form_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);
/*
 * NOTE: it is not currently possible to extend specific HTMLElements, leading
 * to this element being rather convoluted. Once it's possible to extend input
 * directly this should be refactored.
 *
 */







const template = __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
      height: 25px;
      width: 25px;
      background-color: #DDD;
      position: relative;
      border-radius: 5%;
    }

    :host(:hover) {
      box-shadow: inset 0 0 0 99999px rgba(150,150,150,0.2);
    }

    :host:before {
      content:"";
      position: absolute;
      display: none;
      left: 9px;
      top: 5px;
      width: 5px;
      height: 10px;
      border: solid #fff;
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
    }

    :host(.checked) {
      background-color: var(--ui-theme-primary-dark-color, blue);
    }

    :host(.checked):before {
      display: block;
    }
  </style>
`;

const reflectedAttrs = ['checked'];

const Checkbox = Object(__WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["b" /* defineUIComponent */])({
  name: 'ui-checkbox',
  template,
  reflectedAttrs,
  definition: class Checkbox extends Object(__WEBPACK_IMPORTED_MODULE_4__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */]).with(__WEBPACK_IMPORTED_MODULE_1__animations_rippler_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__form_js__["a" /* FormBehavior */]) {
    constructor () {
      super();
      this._formElement = __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].createElement('input');
      this._formElement.style.opacity = 0;
      this._formElement.type = 'checkbox';
    }

    init () {
      super.init();
      this.watchAttribute(this, 'checked', now => {
        now ? this.classList.add('checked') : this.classList.remove('checked');
      });

      this.on('click', e => {
        this.checked = !this.checked;
      });
    }
  }
});

/* unused harmony default export */ var _unused_webpack_default_export = (Checkbox);


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_float_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__animations_easer_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_dom_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__backdrop_js__ = __webpack_require__(15);








const template = __WEBPACK_IMPORTED_MODULE_3__utils_dom_js__["c" /* document */].createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      position: absolute;
      top: 0;
      height: 100vh;
      z-index: 9001;
      max-width: 90vw;
      width: 320px;
      padding: 10px;
      background-color: #fff;
    }

    :host([left-oriented]) {
      left: -350px;
      border-right: solid 1px var(--ui-theme-dark-text-color, #000);
    }

    :host([right-oriented]) {
      left: 100vw;
      border-left: solid 1px var(--ui-theme-dark-text-color, #000);
    }
  </style>
  <slot></slot>
`;

const reflectedAttrs = ['is-modal', 'is-open'];

const Drawer = Object(__WEBPACK_IMPORTED_MODULE_3__utils_dom_js__["b" /* defineUIComponent */])({
  name: 'ui-drawer',
  template,
  reflectedAttrs,
  definition: class Drawer extends Object(__WEBPACK_IMPORTED_MODULE_4__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */]).with(__WEBPACK_IMPORTED_MODULE_1__utils_float_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__animations_easer_js__["a" /* default */]) {
    constructor () {
      super();
      this._backdrop = __WEBPACK_IMPORTED_MODULE_3__utils_dom_js__["c" /* document */].createElement('ui-backdrop');
      this._backdrop.for = this;
      this._backdrop.style.zIndex = '9000';
      this._toggleElem = null;
      this._isOpen = false;
      this._rightAnimator = null;
      this._leftAnimator = null;
    }

    toggledBy (elem) {
      if (elem) {
        this._toggleElem = elem;
        if (this._toggleElem.on) {
          this._toggleElem.on('click', e => { this.toggleState() });
        } else {
          this._toggleElem.addEventListener('click', e => { this.toggleState() })
        }
      }
      return this;
    }

    open () {
      this.isOpen = true;
      return this;
    }

    close () {
      this.isOpen = false;
      return this;
    }

    toggleState () {
      this.isOpen = !this.isOpen;
      return this;
    }

    init () {
      super.init();
      if (!this.rightOriented) this.leftOriented = true;
      this.floatingX = true;

      __WEBPACK_IMPORTED_MODULE_3__utils_dom_js__["c" /* document */].body.appendChild(this._backdrop);
      this._backdrop.on('click', e => this.close());

      // Check for the drawer toggle in the DOM. If not, you'll need to use the toggledBy method
      // or wire up the handlers yourself
      this.toggledBy(__WEBPACK_IMPORTED_MODULE_3__utils_dom_js__["c" /* document */].querySelector('[drawer-toggle]'));

      this._leftAnimator = this.defineSlideAnimation({ direction: 'right', distance: '350px'});
      this._rightAnimator = this.defineSlideAnimation({ direction: 'left', distance: '350px'});

      this.on('attribute-change', ({ changed: { now, name } }) => {
        const orient = this.rightOriented ? 'right' : 'left';
        const animator = this[`_${orient}Animator`];
        switch (name) {
          case 'is-open':
            if (now) {
              if (this.isModal) this._backdrop.show();
              animator.easeIn();
            } else {
              animator.easeOut().then(_ => this._backdrop.hide());
            }
            break;
        }
      });
    }
  }
});


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_dom_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_styler_js__ = __webpack_require__(10);



const orientations = {
  'left': ['X', '-'],
  'right': ['X', ''],
  'up': ['Y', '-'],
  'down': ['Y', ''],
};

/* harmony default export */ __webpack_exports__["a"] = (superclass => Object(__WEBPACK_IMPORTED_MODULE_0__utils_dom_js__["b" /* defineUIComponent */])({
  name: 'ui-easer',
  registerElement: false,
  definition: class Easer extends superclass {
    constructor () {
      super();
      this._animations = [];
    }

    defineSlideAnimation ({direction, timing=300, fn='ease-in', distance='100%'}) {
      if (!this._animations.sliding) this._animations.sliding = {};
      const [xy, min] = orientations[direction];
      const minus = min && distance.match('-') ? '' : min;
      const inClass = Object(__WEBPACK_IMPORTED_MODULE_1__utils_styler_js__["a" /* generateCSSClassName */])();
      const outClass = Object(__WEBPACK_IMPORTED_MODULE_1__utils_styler_js__["a" /* generateCSSClassName */])();
      const animationStyles = __WEBPACK_IMPORTED_MODULE_0__utils_dom_js__["c" /* document */].createElement('style');
      animationStyles.innerHTML = `
        :host(.${inClass}) {
          transform: translate${xy}(${minus}${distance});
          transition-property: transform;
          transition-duration: ${timing}ms;
          transition-timing-function: ${fn};
        }

        :host(.${outClass}) {
          transform: translate${xy}(0);
          transition-property: transform;
          transition-duration: ${timing}ms;
          transition-timing-function: ${fn === 'ease-in' ? 'ease-out' : fn};
        }
      `;

      this.shadowRoot.appendChild(animationStyles);
      const self = this;
      const obj = {
        _isIn: false,

        easeIn () {
          this._isIn = true;
          self.classList.add(inClass);
          if (__WEBPACK_IMPORTED_MODULE_0__utils_dom_js__["d" /* global */]._usingShady) {
            ShadyCSS.styleSubtree(this);
          }
          return new Promise(res => {
            setTimeout(() => {
              self.classList.remove(outClass);
              if (__WEBPACK_IMPORTED_MODULE_0__utils_dom_js__["d" /* global */]._usingShady) {
                ShadyCSS.styleSubtree(this);
              }
              res(true);
            }, timing);
          });
        },

        easeOut () {
          this._isIn = false;
          self.classList.add(outClass);
          if (__WEBPACK_IMPORTED_MODULE_0__utils_dom_js__["d" /* global */]._usingShady) {
            ShadyCSS.styleSubtree(this);
          }
          return new Promise(res => {
            setTimeout(() => {
              self.classList.remove(inClass);
              if (__WEBPACK_IMPORTED_MODULE_0__utils_dom_js__["d" /* global */]._usingShady) {
                ShadyCSS.styleSubtree(this);
              }
              res(true);
            }, timing);
          });
        },

        toggle () {
          return this._isIn ? this.easeOut() : this.easeIn();
        },

        get styles () {
          return styles;
        },
      };

      this._animations.sliding[direction.toLowerCase()] = obj;
      return obj;
    }
  }
}));


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__button_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__ = __webpack_require__(0);



const reflectedAttrs = ['line-color'];
const template = __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["c" /* document */].createElement('template');
template.innerHTML = `
  <style>
    .line {
      height: 5px;
      width: 100%;
      background-color: var(--ui-theme-dark-text-color, #000);
      position: relative;
      padding: 0;
    }

    .top-line {
      top: 0px;
    }

    .middle-line {
      top: 7px;
    }

    .bottom-line {
      top: 15px;
    }

    .content-wrapper {
      height: 30px;
      left: 10%;
    }

    :host {
      background: transparent;
      width: 48px;
      height: 48px;
    }
  </style>
`;

const lineDivTemplate = __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["c" /* document */].createElement('template');
lineDivTemplate.innerHTML = `
  <div>
    <div class="line top-line"></div>
    <div class="line middle-line"></div>
    <div class="line bottom-line"></div>
  </div>
`;

/* unused harmony default export */ var _unused_webpack_default_export = (Object(__WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["b" /* defineUIComponent */])({
  name: 'ui-hamburger',
  template,
  reflectedAttrs,
  definition: class Hamburger extends __WEBPACK_IMPORTED_MODULE_0__button_js__["a" /* default */] {
    init () {
      super.init();
      this.shadowRoot
        .querySelector('.content-wrapper')
        .appendChild(__WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["c" /* document */].importNode(lineDivTemplate.content, true));

      this.watchAttribute(this, 'line-color', now => {
        [...this.shadowRoot.querySelectorAll('.line')].forEach(el => {
          el.style.backgroundColor = now;
        });
      });
    }
  }
}));


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_url_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);






// TODO ui-component-ready handler being called more than once on each route?
// weird skips in the back button handling?

const Router = (() => {
  let historyManager = null;
  let localNavigationCounter = -1;
  let historyStack = [];
  const reflectedAttrs = [
    // updates-history: whether or not the router manages the navigation history. NOTE: can only be
    // set on one router element per page. Attempting to set more than one throws an error.
    'updates-history',

    // renders-current: whether or not the router renders the child element associated with the
    // current path. Routers do not render their children by default.
    'renders-current',

    // hash-bang: whether or not the history updates use hash-bang urls for client-side routing
    'hash-bang',
  ];

  const template = __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["c" /* document */].createElement('template');
  template.innerHTML = `<slot name="router-content"></slot>`;

  return Object(__WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["b" /* defineUIComponent */])({
    name: 'ui-router',
    template,
    reflectedAttrs,
    definition: class Router extends __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */] {
      constructor () {
        super();
        this._contentSlot = null;
        this._routes = {};
        this._currentRoute = null;
        this._managingHistory = false;
        this._login = null;
        this._popstateListener = ({ state: data }) => {
          // here we ignore querystring data, it may be stale
          const { route } = Object(__WEBPACK_IMPORTED_MODULE_3__utils_url_js__["a" /* parseURL */])(window.location.href);

          // detect if it was back or forward button:
          if (route === historyStack[historyStack.length - 2]) {
            historyStack.pop();
          }

          this._updateRoute(route);
          if (!historyStack.length || (historyStack.length === 1 && historyStack[0] === '/')) {
            __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["d" /* global */].removeEventListener('popstate', this._popstateListener);
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
          if (data && Object.keys(data).length) elem.update(data);
          elem.setAttribute('is-selected', true);
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
        __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["d" /* global */].history.pushState(data, '', url);
        historyStack.push(route);
      }

      route (val, outsidedata) {
        let { data: urldata, path } = Object(__WEBPACK_IMPORTED_MODULE_3__utils_url_js__["a" /* parseURL */])(window.location.href);
        const data = outsidedata || urldata;
        const type = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_extracttype_extracttype_js__["a" /* default */])(val);
        let route = null;
        if (type === 'String') route = val;
        if (type.match(/HTML\w*Element/)) route = val.getAttribute('route-path');
        const base = path.match(/\/$/) ? path : `${path}/`;
        const url = this.hashBang ? `${base}#!${route}` : `${base}${route}`;

        if (this._login && !this._login.isLoggedIn) {
          if (this.updatesHistory) this._updateHistory(route, url, data);
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
          this._contentSlot = this.shadowRoot.querySelector('slot');
          let selected = null;
          let { route, data } = Object(__WEBPACK_IMPORTED_MODULE_3__utils_url_js__["a" /* parseURL */])(window.location.href);
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
                  const { route } = Object(__WEBPACK_IMPORTED_MODULE_3__utils_url_js__["a" /* parseURL */])(window.location.href);
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
/* unused harmony export Router */


const Route = (() => {
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

  return Object(__WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["b" /* defineUIComponent */])({
    name: 'ui-route',
    reflectedAttrs,
    definition: class Route extends __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */] {
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
          const qs = Object(__WEBPACK_IMPORTED_MODULE_3__utils_url_js__["b" /* toQueryString */])(data);
          if (qs !== '?') {
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
              ...this.shadowRoot.querySelectorAll('[is-data-element]'),
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

          let data = localStorage.getItem(this.routePath);

          // Check to see if it was written from query string first.
          if (!this.data && data != null) this.update(JSON.parse(data));
        });

        this.on('attribute-change', ({ changed: { now, name } }) => {
          switch (name) {
            case 'is-selected':
              if (!now || (now && !this.isSelected)) {
                const evtName = now ? 'component-selected' : 'component-deselected';
                this.dispatchEvent(new CustomEvent(evtName));
              }
              break;
          }
        });
      }
    }
  });
})();
/* unused harmony export Route */



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parseURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return toQueryString; });
// At some point could use the following with named capture groups?
// const urlMatcher = /(?:(https?):\/\/)?(?:(\w+)\.)?(\w+)\.(\w+)(\/[\w\/]+)?(?:\?(.+))?/
const matchProtocol = /https?/i;
const matchDomain = /\/\/([\w\.]+)[\/\?#]{1}?/;
const matchQueryString = /\?(.+)/;

const parseQueryString = qs => {
  return qs.split('&').reduce((acc, pair) => {
    const [key, v] = pair.split('=').map(decodeURIComponent);
    let value;
    try {
      value = JSON.parse(v);
    } catch (e) {
      value = v;
    }
    acc[key] = value;
    return acc;
  }, {});
};

const parseURL = url => {
  let subdomain, domain, p, qs = '';
  let secure = false;
  let path = '';
  let data = {};
  let route = '';
  let [first, rest] = url.split('://');
  if (rest) secure = first.toLowerCase() === 'https';
  const protocol = secure ? 'https' : 'http';
  let [fullDomain, pAndQs] = (rest || first).split(/\/(.+)/);
  rest = fullDomain.split('.');
  subdomain = rest.length === 3 && rest[0];
  domain = rest.length === 3 ? rest.slice(1).join('.') : fullDomain;
  if (pAndQs) {
    ([p, qs] = pAndQs.split('?'));
    if (qs) data = parseQueryString(qs);
    let [serverPath, clientPath] = p.split('#!');
    if (clientPath) route = clientPath;
    path = '/' + serverPath;
  }

  return {
    protocol,
    secure,
    subdomain: subdomain || '',
    domain: domain || '',
    fullDomain,
    data,
    url,
    path,
    route,
    queryString: qs,
  };
};

const toQueryString = obj => '?' + Object.entries(obj)
  .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
  .join('&');

window.parseURL = parseURL;




/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__list_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);






const Tab = (() => {
  const template = __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].createElement('template');
  template.innerHTML = `
    <style>
      #content {
        position: relative;
        top: 16px;
      }

      :host {
        display: inline-block;
        background-color: inherit;
        height: 49px;
        width: 120px;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-transform: capitalize;
        border-radius: 5%;
        margin: 5px;
        padding: 0;
        text-align: center;
      }

      :host(:hover) {
        color: var(--ui-theme-light-text-color, #fff);
      }

      :host([is-selected="true"]) {
        box-shadow: 0px 0px 10px -1px var(--ui-theme-light-text-color, #fff);
      }

      :host-context(.tabs-centered) {
        left: -30px;
      }
    </style>
  `;

  return Object(__WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["b" /* defineUIComponent */])({
    name: 'ui-tab',
    template,
    definition: class Tab extends __WEBPACK_IMPORTED_MODULE_1__list_js__["a" /* Item */] {
      init () {
        super.init();
        this.on('click', e => {
          this.isSelected = true;
        });

        this.watchAttribute(this, 'is-selected', now => {
          if (now) {
            this.dispatchEvent(new CustomEvent('component-selected'));
          } else {
            this.dispatchEvent(new CustomEvent('component-deselected'));
          }
        });
      }
    }
  });
})();
/* unused harmony export Tab */


const Tabs = (() => {
  const reflectedAttrs = [
    'for', // css selector, gets notified of changes
  ];

  const template = __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].createElement('template');
  template.innerHTML = `
    <style>
      :host {
        display: block;
        height: 55px;
        background-color: var(--ui-theme-primary-dark-color, blue);
        width: 100%;
      }

      ::slotted(.ui-tab:hover) {
        text-shadow: 1px 1px 6px #fff;
      }
    </style>
    <slot></slot>
  `;

  return Object(__WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["b" /* defineUIComponent */])({
    name: 'ui-tabs',
    template,
    reflectedAttrs,
    definition: class Tabs extends Object(__WEBPACK_IMPORTED_MODULE_4__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */]).with(__WEBPACK_IMPORTED_MODULE_1__list_js__["b" /* ListBehavior */]) {
      constructor () {
        super();
        this._for = null;
      }

      appendChild (node) {
        if (node.matches && node.matches('.ui-tab')) {
          super.appendChild(node);
        }
      }

      init () {
        super.init();
        this.on('attribute-change', ({ changed: { now, name } }) => {
          switch (name) {
            case 'for':
              if (now) {
                this._for = now;
                const elem = __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].querySelector(this._for);
                if (elem) {
                  const method = elem.on ? 'on' : 'addEventListener';
                  elem[method]('change', ({ value }) => {
                    const matched = this._items.reduce((acc, item) => {
                      if (acc) return acc;
                      if (item.value === value) return item;
                      return acc;
                    }, null);

                    if (matched && matched !== this.selected) {
                      this.selected = value;
                    } else {
                      this.selected = null;
                    }
                  });
                }
              } else {
                this._for = null;
              }
              break;

            case 'selected-index':
              if (now > -1 && this._for) {
                __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].querySelector(this._for).route(this.selected.value);
              }
              break;
          }
        });
      }
    }
  });
})();
/* unused harmony export Tabs */



/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_float_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_centerer_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_dom_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_attribute_analyzer_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);







const reflectedAttrs = [
  'is-tall',
];

const template = __WEBPACK_IMPORTED_MODULE_3__utils_dom_js__["c" /* document */].createElement('template');
template.innerHTML = `
  <style>
    ${__WEBPACK_IMPORTED_MODULE_2__utils_centerer_js__["a" /* centeredStyles */]}

    :host {
      width: 100%;
      background-color: var(--ui-theme-primary-dark-color, blue);
      color: var(--ui-theme-light-text-color, #fff);
      height: 70px;
      display: block;
    }

    :host([is-tall]) {
      height: 192px;
    }

    :host(:not([is-tall]).has-secondary) {
      margin-bottom: 56px;
    }

    #title-holder {
      position: relative;
      margin-left: auto;
      margin-right: auto;
      max-width: 300px;
      text-align: center;
      text-transform: capitalize;
      overflow: hidden;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 22px;
    }

    :host([is-tall]) #title-holder {
      font-size: 40px;
    }

    ::slotted([slot="left-button-slot"]) {
      position: relative;
      top: -18px;
      left: 10px;
      float: left;
    }

    :host([is-tall]) ::slotted([slot="left-button-slot"]) {
      top: -35px;
    }

    ::slotted([slot="right-button-slot"]) {
      position: relative;
      top: -18px;
      right: 30px;
      float: right;
    }


    :host([is-tall]) ::slotted([slot="right-button-slot"]) {
      top: -35px;
    }

    ::slotted([slot="secondary-toolbar-slot"]) {
      position: relative;
      width: 100vw;
      top: 44px;
    }

    :host([is-tall]) ::slotted([slot="secondary-toolbar-slot"]) {
      top: 92px;
    }

    :host(:not([is-tall])) ::slotted([slot="secondary-toolbar-slot"]) {
      text-align: center;
    }
  </style>
  <div id="title-holder" class="content-wrapper">
    <slot></slot>
  </div>
  <slot name="left-button-slot"></slot>
  <slot name="right-button-slot"></slot>
  <slot name="secondary-toolbar-slot"></slot>
`;

/* unused harmony default export */ var _unused_webpack_default_export = (Object(__WEBPACK_IMPORTED_MODULE_3__utils_dom_js__["b" /* defineUIComponent */])({
  name: 'ui-toolbar',
  template,
  reflectedAttrs,
  definition: class Toolbar extends Object(__WEBPACK_IMPORTED_MODULE_5__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */]).with(__WEBPACK_IMPORTED_MODULE_1__utils_float_js__["a" /* default */]) {
    constructor () {
      super();
      this._secondaryToolbar = null;
    }

    init () {
      super.init();
      const secondarySlot = this.shadowRoot.querySelector('[name="secondary-toolbar-slot"]');
      const slotted = secondarySlot.assignedNodes();
      if (slotted.length) {
        this._secondaryToolbar = slotted[0];
        this.classList.add('has-secondary');
      }

      secondarySlot.addEventListener('slotchange', e => {
          this._secondaryToolbar = this.querySelector('[slot="secondary-toolbar-slot"]');
          if (this._secondaryToolbar) this.classList.add('has-secondary');
        });

      this.on('attribute-change', ({ changed: { name, now } }) => {
        if (name === 'is-tall') {
          if (now == null) {
            if (this._secondaryToolbar) {
              this._secondaryToolbar.classList.add('tabs-centered');
            }
          } else if (!now || now === "false") {
            this.isTall = null;
          } else {
            if (this._secondaryToolbar) {
              this._secondaryToolbar.classList.remove('tabs-centered');
            }
          }
        }
      });
    }
  }
}));


/***/ })
/******/ ]);