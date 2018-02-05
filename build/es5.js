'use strict';

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __run = function __run() {
  /******/(function (modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/var installedModules = {};
    /******/
    /******/ // The require function
    /******/function __webpack_require__(moduleId) {
      /******/
      /******/ // Check if module is in cache
      /******/if (installedModules[moduleId]) {
        /******/return installedModules[moduleId].exports;
        /******/
      }
      /******/ // Create a new module (and put it into the cache)
      /******/var module = installedModules[moduleId] = {
        /******/i: moduleId,
        /******/l: false,
        /******/exports: {}
        /******/ };
      /******/
      /******/ // Execute the module function
      /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      /******/
      /******/ // Flag the module as loaded
      /******/module.l = true;
      /******/
      /******/ // Return the exports of the module
      /******/return module.exports;
      /******/
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/__webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/__webpack_require__.c = installedModules;
    /******/
    /******/ // define getter function for harmony exports
    /******/__webpack_require__.d = function (exports, name, getter) {
      /******/if (!__webpack_require__.o(exports, name)) {
        /******/Object.defineProperty(exports, name, {
          /******/configurable: false,
          /******/enumerable: true,
          /******/get: getter
          /******/ });
        /******/
      }
      /******/
    };
    /******/
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/__webpack_require__.n = function (module) {
      /******/var getter = module && module.__esModule ?
      /******/function getDefault() {
        return module['default'];
      } :
      /******/function getModuleExports() {
        return module;
      };
      /******/__webpack_require__.d(getter, 'a', getter);
      /******/return getter;
      /******/
    };
    /******/
    /******/ // Object.prototype.hasOwnProperty.call
    /******/__webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/
    /******/ // __webpack_public_path__
    /******/__webpack_require__.p = "";
    /******/
    /******/ // Load entry module and return exports
    /******/return __webpack_require__(__webpack_require__.s = 21);
    /******/
  })(
  /************************************************************************/
  /******/[
  /* 0 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "a", function () {
      return UIBase;
    });
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__styler_js__ = __webpack_require__(13);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__binder_js__ = __webpack_require__(23);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__dom_utils_js__ = __webpack_require__(24);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__attribute_analyzer_js__ = __webpack_require__(9);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__promise_from_event_js__ = __webpack_require__(25);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__dom_js__ = __webpack_require__(2);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_6__node_modules_jsstring_src_jsstring_js__ = __webpack_require__(8);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_7__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(1);
    /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "d", function () {
      return __WEBPACK_IMPORTED_MODULE_5__dom_js__["d"];
    });
    /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "c", function () {
      return __WEBPACK_IMPORTED_MODULE_5__dom_js__["c"];
    });
    /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "b", function () {
      return __WEBPACK_IMPORTED_MODULE_5__dom_js__["b"];
    });
    /*
     * ui-component-base.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * base class for ui-components-lite custom elements.
     */

    var flag = true;

    var UIBase = function (_Object$with) {
      _inherits(UIBase, _Object$with);

      function UIBase() {
        _classCallCheck(this, UIBase);

        var _this = _possibleConstructorReturn(this, (UIBase.__proto__ || Object.getPrototypeOf(UIBase)).call(this));

        _this._listeners = [];
        _this._beforeReadyHandlers = [];
        _this._pendingDOM = [];
        _this._isReady = Object(__WEBPACK_IMPORTED_MODULE_4__promise_from_event_js__["a" /* default */])({
          element: _this,
          eventName: 'ui-component-ready',
          callback: function callback() {
            return _this;
          }
        });

        var tmpl = _this._stamp();
        if (tmpl) {
          if (!_this.shadowRoot) _this.attachShadow({ mode: 'open' });
          _this.shadowRoot.appendChild(__WEBPACK_IMPORTED_MODULE_5__dom_js__["d" /* global */].document.importNode(tmpl.content, true));
        }

        var rfs = _this.constructor.observedAttributes;
        if (rfs.length) {
          _this.on('attribute-change', function (_ref) {
            var _ref$changed = _ref.changed,
                name = _ref$changed.name,
                now = _ref$changed.now;

            if (rfs.includes(name)) {
              _this[Object(__WEBPACK_IMPORTED_MODULE_6__node_modules_jsstring_src_jsstring_js__["b" /* toCamelCase */])(name)] = now;
            }
          });
        }

        // This is because the spec doesn't allow attribute changes in an element constructor.
        __WEBPACK_IMPORTED_MODULE_5__dom_js__["d" /* global */].setTimeout(function () {
          _this.init();
        }, 0);
        return _this;
      }

      _createClass(UIBase, [{
        key: '_beforeReady',
        value: function _beforeReady() {
          for (var _len = arguments.length, fs = Array(_len), _key = 0; _key < _len; _key++) {
            fs[_key] = arguments[_key];
          }

          this._beforeReadyHandlers.push.apply(this._beforeReadyHandlers, fs);
        }
      }, {
        key: 'onReady',
        value: function onReady() {
          var _this2 = this;

          for (var _len2 = arguments.length, fs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            fs[_key2] = arguments[_key2];
          }

          var p = this._isReady.then(function (_) {
            return Promise.all(fs.map(function (f) {
              return f(_this2);
            }));
          });

          if (__WEBPACK_IMPORTED_MODULE_5__dom_js__["d" /* global */]._usingShady) {
            __WEBPACK_IMPORTED_MODULE_5__dom_js__["d" /* global */].ShadyCSS.styleSubtree(this);
          }

          return p;
        }

        // Should be called by extension elements via super.

      }, {
        key: 'init',
        value: function init() {
          var _this3 = this;

          this.classList.add('is-ui-component');

          var elReady = function elReady(el) {
            return el._isReady || Promise.resolve(el);
          };
          var children = [].concat(_toConsumableArray([].concat(_toConsumableArray(this.children)).map(elReady)));
          if (this.shadowRoot) children.push.apply(children, [].concat(_toConsumableArray(this.shadowRoot.children)).map(elReady));

          [].concat(_toConsumableArray(this.attributes)).forEach(function (_ref2) {
            var attr = _ref2.name,
                val = _ref2.value;

            var twoWay = val && val.match(/^\{\{\{(.+)\}\}\}$/);
            var oneWay = val && val.match(/^\{\{(.+)\}\}$/);
            var matched = twoWay ? twoWay[1] : oneWay ? oneWay[1] : null;
            var attrToWatch = matched ? Object(__WEBPACK_IMPORTED_MODULE_6__node_modules_jsstring_src_jsstring_js__["c" /* toSnakeCase */])(matched, '-') : null;
            if (attrToWatch) {
              _this3.bindAttribute(attr, attrToWatch, twoWay);
            }
          });

          Promise.all(children).then(function (chlds) {
            // have to wait for children to be ready in case they're listening
            var rfs = _this3.constructor.observedAttributes;
            rfs.forEach(function (attr) {
              if (_this3.attr(attr)) {
                var evt = new CustomEvent('attribute-change');
                evt.changed = { name: attr, now: _this3.attr(attr), was: null };
                _this3.dispatchEvent(evt);
              }
            });

            return _this3._beforeReadyHandlers.length ? Promise.all(_this3._beforeReadyHandlers.map(function (f) {
              return f(_this3);
            })) : null;
          }).then(function (_) {
            return Promise.all(_this3._pendingDOM);
          }).then(function (_) {
            _this3.dispatchEvent(new CustomEvent('ui-component-ready', { bubbles: false }));
            _this3._pendingDOM = null;
          }).catch(function (err) {
            throw err;
          });
        }

        // If extension elements override the default connected and disconnected
        // Callbacks they need to call super to perform appropriate init/cleanup

      }, {
        key: 'connectedCallback',
        value: function connectedCallback() {
          var _this4 = this;

          // This allows the elements to be detatched/reattached without losing
          // handlers.
          this._listeners.forEach(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                evt = _ref4[0],
                f = _ref4[1];

            return _this4.addEventListener(evt, f);
          });

          // Allows element to be detatched and reattached while automatically cleaning up
          // on eventual deletion.
          this._mutationObservers.forEach(function (_ref5) {
            var _ref6 = _slicedToArray(_ref5, 3),
                o = _ref6[0],
                target = _ref6[1],
                conf = _ref6[2];

            return o.observe(target, conf);
          });
        }
      }, {
        key: 'disconnectedCallback',
        value: function disconnectedCallback() {
          var _this5 = this;

          this._shadowElement = null;
          this._listeners.forEach(function (_ref7) {
            var _ref8 = _slicedToArray(_ref7, 2),
                evt = _ref8[0],
                f = _ref8[1];

            return _this5.removeEventListener(evt, f);
          });
          this._mutationObservers.forEach(function (_ref9) {
            var _ref10 = _slicedToArray(_ref9, 1),
                o = _ref10[0];

            return o.disconnect();
          });
        }
      }, {
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback(name, was, now) {
          if (was !== now) {
            if (name in this._oneWayBoundAttrs && !this._internalMutationFlag) {
              console.warn('Attempted to manually set data-bound attribute ' + name + ' of ' + this.componentName + '.');
              this._internalMutationFlag = true;
              this.attr(name, was);
              this._internalMutationFlag = false;
            } else {
              this._internalMutationFlag = false;
              var evt = new CustomEvent('attribute-change');
              evt.changed = { name: name, was: was, now: Object(__WEBPACK_IMPORTED_MODULE_3__attribute_analyzer_js__["a" /* default */])(now), raw: now };
              this.dispatchEvent(evt);
            }
          }
        }
      }, {
        key: 'componentName',
        get: function get() {
          return this.tagName.toLowerCase();
        }
      }, {
        key: 'isUIComponent',
        get: function get() {
          return true;
        }
      }, {
        key: '_childrenUpgraded',
        get: function get() {
          return Promise.all([].concat(_toConsumableArray(this.children)).map(function (ch) {
            return Promise.resolve(ch._isReady || ch);
          }));
        }
      }], [{
        key: 'observedAttributes',
        get: function get() {
          // If extension elements have additional, be sure to call super.
          return ['style', 'class'];
        }
      }]);

      return UIBase;
    }(Object(__WEBPACK_IMPORTED_MODULE_7__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_5__dom_js__["a" /* baseClass */]).with(__WEBPACK_IMPORTED_MODULE_2__dom_utils_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__binder_js__["a" /* default */]));

    /* unused harmony default export */

    var _unused_webpack_default_export = UIBase;

    // re-export stuff from dom.js for convenience


    /***/
  },
  /* 1 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    var _cachedApplicationRef = Symbol('_cachedApplicationRef');
    /* unused harmony export _cachedApplicationRef */

    var _mixinRef = Symbol('_mixinRef');
    /* unused harmony export _mixinRef */

    var _originalMixin = Symbol('_originalMixin');
    /* unused harmony export _originalMixin */

    /**
     * Sets the prototype of mixin to wrapper so that properties set on mixin are
     * inherited by the wrapper.
     *
     * This is needed in order to implement @@hasInstance as a decorator function.
     */
    var wrap = function wrap(mixin, wrapper) {
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
    var Cached = function Cached(mixin) {
      return wrap(mixin, function (superclass) {
        // Get or create a symbol used to look up a previous application of mixin
        // to the class. This symbol is unique per mixin definition, so a class will have N
        // applicationRefs if it has had N mixins applied to it. A mixin will have
        // exactly one _cachedApplicationRef used to store its applications.
        var applicationRef = mixin[_cachedApplicationRef];
        if (!applicationRef) {
          applicationRef = mixin[_cachedApplicationRef] = Symbol(mixin.name);
        }
        // Look up an existing application of `mixin` to `c`, return it if found.
        if (superclass.hasOwnProperty(applicationRef)) {
          return superclass[applicationRef];
        }
        // Apply the mixin
        var application = mixin(superclass);
        // Cache the mixin application on the superclass
        superclass[applicationRef] = application;
        return application;
      });
    };
    /* unused harmony export Cached */

    /**
     * Adds @@hasInstance (ES2015 instanceof support) to mixin.
     * Note: @@hasInstance is not supported in any browsers yet.
     */
    var HasInstance = function HasInstance(mixin) {
      if (Symbol.hasInstance && !mixin.hasOwnProperty(Symbol.hasInstance)) {
        Object.defineProperty(mixin, Symbol.hasInstance, {
          value: function value(o) {
            var originalMixin = this[_originalMixin];
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
    var BareMixin = function BareMixin(mixin) {
      return wrap(mixin, function (superclass) {
        // Apply the mixin
        var application = mixin(superclass);

        // Attach a reference from mixin applition to wrapped mixin for RTTI
        // mixin[@@hasInstance] should use this.
        application.prototype[_mixinRef] = mixin[_originalMixin];
        return application;
      });
    };
    /* unused harmony export BareMixin */

    /**
     * Decorates a mixin function to add application caching and instanceof
     * support.
     */
    var Mixin = function Mixin(mixin) {
      return Cached(HasInstance(BareMixin(mixin)));
    };
    /* unused harmony export Mixin */

    var mix = function mix(superClass) {
      return new MixinBuilder(superClass);
    };
    /* harmony export (immutable) */__webpack_exports__["a"] = mix;

    var MixinBuilder = function () {
      function MixinBuilder(superclass) {
        _classCallCheck(this, MixinBuilder);

        this.superclass = superclass;
      }

      _createClass(MixinBuilder, [{
        key: 'with',
        value: function _with() {
          return Array.from(arguments).reduce(function (c, m) {
            return m(c);
          }, this.superclass);
        }
      }]);

      return MixinBuilder;
    }();

    /***/
  },
  /* 2 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony export (binding) */

    var _this8 = this;

    __webpack_require__.d(__webpack_exports__, "c", function () {
      return document;
    });
    /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "a", function () {
      return baseClass;
    });
    /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "b", function () {
      return defineUIComponent;
    });
    /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "d", function () {
      return global;
    });
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__node_modules_jsstring_src_jsstring_js__ = __webpack_require__(8);
    /*
     * dom.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * utility file for ui-components-lite.
     */

    var global = new Function('return this')();
    var document = global.document;
    var baseClass = global.HTMLElement;
    var registry = {};

    var toPropertyObj = function toPropertyObj(propList) {
      return propList.reduce(function (acc, prop) {
        var property = Object(__WEBPACK_IMPORTED_MODULE_0__node_modules_jsstring_src_jsstring_js__["b" /* toCamelCase */])(prop);
        acc[property] = {
          get: function get() {
            return this['_' + property] === undefined ? null : this['_' + property];
          },
          set: function set(val) {
            if (this['_' + property] !== val) {
              this['_' + property] = val;
              this.attr(Object(__WEBPACK_IMPORTED_MODULE_0__node_modules_jsstring_src_jsstring_js__["c" /* toSnakeCase */])(property, '-'), val);
            }

            return val;
          }
        };
        return acc;
      }, {});
    };

    var defineUIComponent = function defineUIComponent(_ref11) {
      var name = _ref11.name,
          definition = _ref11.definition,
          _ref11$reflectedAttri = _ref11.reflectedAttributes,
          reflectedAttributes = _ref11$reflectedAttri === undefined ? [] : _ref11$reflectedAttri,
          template = _ref11.template,
          _ref11$registerElemen = _ref11.registerElement,
          registerElement = _ref11$registerElemen === undefined ? true : _ref11$registerElemen,
          isShadowHost = _ref11.isShadowHost;

      if (!name) throw new Error('ui-components must have a name.');
      if (!definition) throw new Error('ui-components must have a defining class');
      if (name in registry) throw new Error('ui-component named ' + name + ' already registered.');

      var tmpl = null;
      if (definition._template || template) tmpl = document.createElement('template');
      if (definition._template) tmpl.innerHTML += definition._template.innerHTML;
      if (template) tmpl.innerHTML += template.innerHTML;

      var class_ = function (_definition) {
        _inherits(class_, _definition);

        function class_() {
          _classCallCheck(this, class_);

          return _possibleConstructorReturn(this, (class_.__proto__ || Object.getPrototypeOf(class_)).apply(this, arguments));
        }

        _createClass(class_, [{
          key: '_stamp',
          value: function _stamp() {
            // no call to super
            var temp = tmpl ? tmpl.cloneNode(true) : null;
            if (temp && global._usingShady) global.ShadyCSS.prepareTemplate(temp, name);
            return temp;
          }
        }, {
          key: 'init',
          value: function init() {
            var _this7 = this;

            _get(class_.prototype.__proto__ || Object.getPrototypeOf(class_.prototype), 'init', this).call(this);
            this.classList.add(name);
            this._beforeReady(function (_) {
              if (global._usingShady && _this7.shadowRoot && _this7.selectInternalElement('style')) {
                ShadyCSS.styleElement(_this7);
              }
            });
          }
        }], [{
          key: 'observedAttributes',
          get: function get() {
            return [].concat(_toConsumableArray(_get(class_.__proto__ || Object.getPrototypeOf(class_), 'observedAttributes', this)), _toConsumableArray(reflectedAttributes));
          }
        }, {
          key: '_template',
          get: function get() {
            return tmpl;
          }
        }]);

        return class_;
      }(definition);

      // Override with original name for debugging/reflection.
      Object.defineProperty(class_, 'name', {
        get: function get() {
          return _this8.name;
        }
      });

      // Set up the autogenerated getters/setters for reflected attributes. If you want additional
      // actions to occur when these are set, use a handler for the 'attribute-change' event or the
      // watchAttribute shorthand method.
      Object.defineProperties(class_.prototype, toPropertyObj(reflectedAttributes));

      if (registerElement) {
        global.customElements.define(name, class_);
        registry[name] = class_;
      }

      return class_;
    };

    /***/
  },
  /* 3 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "b", function () {
      return extractType;
    });
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
    var BUILTINS = [
    // All JavaScript. Object deliberately omitted.
    'Math', 'JSON', 'RegExp', 'Date', 'String', 'Number', 'Symbol', 'Boolean', 'Undefined', 'Null', 'Function', 'Array', 'Map', 'WeakMap', 'Set', 'WeakSet', 'Error', 'Promise', 'ArrayBuffer', 'Uint8Array', 'Int8Array', 'Uint8ClampedArray', 'Int16Array', 'Uint16Array', 'Int32Array', 'Uint32Array', 'Float32Array', 'Float64Array', 'Arguments',

    // Browser specific
    'NodeList', 'DOMTokenList', 'CSSStyleDeclaration', 'Text', // text node
    'DocumentFragment', 'Event', 'CustomEvent', 'XMLHTTPRequest'];

    var CLASS_REGEX = / ([a-z0-9]+)]$/i;
    var HTML_ELEMENT_REGEX = /^HTML[a-zA-Z]*Element$/;

    // Extracts the hidden internal [[Class]] slot of a JavaScript object.
    var _extractHiddenClass = function _extractHiddenClass(a) {
      return Object.prototype.toString.call(a).match(CLASS_REGEX)[1];
    };

    var _getConstructorName = function _getConstructorName(obj) {
      return obj != null && obj.constructor && obj.constructor.name || '';
    };

    // Somewhat reliably types JavaScript objects, mostly built-ins.
    var extractType = function extractType(item) {
      var clazz = _extractHiddenClass(item); // covers all built-ins, primitives, etc.
      if (clazz !== 'Object') {
        return clazz;
      }
      clazz = _getConstructorName(item);
      return clazz; // returns '' for Object.create(null);
    };

    var _isBuiltIn = function _isBuiltIn(type) {
      return BUILTINS.includes(type) || type.match(HTML_ELEMENT_REGEX);
    };

    var isSameType = function isSameType(a, b) {
      var tA = typeof a === 'undefined' ? 'undefined' : _typeof(a);
      var tB = typeof b === 'undefined' ? 'undefined' : _typeof(b);

      // This can fail in older Safari as typeof (function(){}) returns 'Object'
      if (tA !== 'object' && tA === tB) return true;

      // This can give a misleading response if the code does not follow the
      // Liskov Substitution Prinicple.
      if (a != null && b != null) {
        if (a.constructor && a.constructor !== Object && b instanceof a.constructor) return true;
        if (b.constructor && b.constructor !== Object && a instanceof b.constructor) return true;
      }

      var typeA = extractType(a);
      var typeB = extractType(b);

      if (typeA !== typeB) return false;

      // This is necessary because the instanceof test above fails in
      // cross-realm scenarios.
      if (_isBuiltIn(typeA) && _isBuiltIn(typeB)) return true;

      // If all attempts at nominal typing have failed to yield a definitive answer,
      // fall back to structural. This avoids the false positive from two constructors
      // that coincidentally share a name.
      var as = Object.entries(a).sort();
      var bs = Object.entries(b).sort();
      if (as.length === bs.length) {
        return as.every(function (_ref12, i) {
          var _ref13 = _slicedToArray(_ref12, 2),
              keyA = _ref13[0],
              valA = _ref13[1];

          var _bs$i = _slicedToArray(bs[i], 2),
              keyB = _bs$i[0],
              valB = _bs$i[1];

          return keyA === keyB && (valA === valB || isSameType(valA, valB));
        });
      }

      return false;
    };

    /* harmony default export */__webpack_exports__["a"] = extractType;

    /***/
  },
  /* 4 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__dom_js__ = __webpack_require__(2);
    /*
     * float.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * floating mixin for ui-components-lite. Allows elements to easily add a vertical or horizontal
     * floating effect.
     */

    var template = __WEBPACK_IMPORTED_MODULE_0__dom_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    :host(.left-x) {\n      box-shadow: 3px 0px 10px -3px #000;\n      margin-right: 3px;\n    }\n\n    :host(.right-x) {\n      box-shadow: -3px 0px 10px -3px #000;\n      margin-left: 3px;\n    }\n\n    :host(.float-y) {\n      box-shadow: 0px 3px 10px -3px #000;\n      margin-bottom: 3px;\n    }\n  </style>\n';

    var reflectedAttributes = ['floating-x', 'floating-y', 'right-oriented', 'left-oriented'];

    /* harmony default export */__webpack_exports__["a"] = function (superclass) {
      return Object(__WEBPACK_IMPORTED_MODULE_0__dom_js__["b" /* defineUIComponent */])({
        name: 'ui-floating',
        reflectedAttributes: reflectedAttributes,
        template: template,
        registerElement: false,
        definition: function (_superclass) {
          _inherits(Floating, _superclass);

          function Floating() {
            _classCallCheck(this, Floating);

            return _possibleConstructorReturn(this, (Floating.__proto__ || Object.getPrototypeOf(Floating)).apply(this, arguments));
          }

          _createClass(Floating, [{
            key: 'init',
            value: function init() {
              var _this10 = this;

              _get(Floating.prototype.__proto__ || Object.getPrototypeOf(Floating.prototype), 'init', this).call(this);
              this.on('attribute-change', function (_ref14) {
                var _ref14$changed = _ref14.changed,
                    now = _ref14$changed.now,
                    name = _ref14$changed.name;

                switch (name) {
                  case 'floating-y':
                    return now ? _this10.classList.add('float-y') : _this10.classList.remove('float-y');

                  case 'floating-x':
                    var class_ = _this10.attr('right-oriented') ? 'right-x' : 'left-x';
                    return now ? _this10.classList.add(class_) : _this10.classList.remove(class_);

                  case 'right-oriented':
                    if (_this10.classList.contains('left-x')) {
                      _this10.classList.remove('left-x');
                      _this10.classList.add('right-x');
                    }
                    return;

                  case 'left-oriented':
                    if (_this10.classList.contains('right-x')) {
                      _this10.classList.remove('right-x');
                      _this10.classList.add('left-x');
                    }
                    return;
                }
              });
            }
          }, {
            key: 'isFloating',
            get: function get() {
              return this.floatingX || this.floatingY;
            }
          }]);

          return Floating;
        }(superclass)
      });
    };

    /***/
  },
  /* 5 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /*
     * focusable.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * Mixin for custom elements that can receive keyboard focus.
     */

    /* harmony default export */
    __webpack_exports__["a"] = function (superclass) {
      return function (_superclass2) {
        _inherits(Focusable, _superclass2);

        function Focusable() {
          _classCallCheck(this, Focusable);

          return _possibleConstructorReturn(this, (Focusable.__proto__ || Object.getPrototypeOf(Focusable)).call(this));
        }

        _createClass(Focusable, [{
          key: 'setActive',
          value: function setActive() {
            var index = this.attr('tabindex');
            if (index === null || index < 0) this.attr('tabindex', '0');
            return this;
          }
        }, {
          key: 'setInactive',
          value: function setInactive() {
            this.attr('tabindex', '-1');
            return this;
          }
        }, {
          key: 'init',
          value: function init() {
            var _this12 = this;

            _get(Focusable.prototype.__proto__ || Object.getPrototypeOf(Focusable.prototype), 'init', this).call(this);
            if (this.attr('tabindex') === null) this.attr('tabindex', '-1');
            this.on('keydown', function (e) {
              if (e.keyCode === 13) {
                var evt = new CustomEvent('enter-key');
                evt.keyCode = 13;
                _this12.dispatchEvent(evt);
              }
            });
          }
        }]);

        return Focusable;
      }(superclass);
    };

    /***/
  },
  /* 6 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__temp_animations_rippler_js__ = __webpack_require__(10);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__temp_utils_float_js__ = __webpack_require__(4);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__temp_utils_centerer_js__ = __webpack_require__(15);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__temp_utils_focusable_js__ = __webpack_require__(5);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__temp_utils_ui_component_base_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(1);
    /*
     * button.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * button component for ui-components-lite.
     *
     * NOTE: it is not currently (and may never) be possible to extend built-in elements like Button.
     * If it does become possible this can be refactored to support extending HTMLButtonElement.
     */

    var template = __WEBPACK_IMPORTED_MODULE_4__temp_utils_ui_component_base_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    :host {\n      display: block;\n      height: 50px;\n      width: 120px;\n      text-align: center;\n      white-space: nowrap;\n      text-overflow: ellipsis;\n      text-transform: uppercase;\n      border-radius: 5%;\n      background-color: var(--ui-theme-secondary-dark-color, blue);\n      color: var(--ui-theme-light-text-color, #fff);\n      margin: 5px;\n    }\n\n    :host(:hover) {\n      box-shadow: inset 0 0 0 99999px rgba(150,150,150,0.2);\n    }\n  </style>\n';

    var reflectedAttributes = ['dialog-dismiss', 'dialog-confirm', 'submit'];

    var Button = Object(__WEBPACK_IMPORTED_MODULE_4__temp_utils_ui_component_base_js__["b" /* defineUIComponent */])({
      name: 'ui-button',
      template: template,
      reflectedAttributes: reflectedAttributes,
      definition: function (_Object$with2) {
        _inherits(Button, _Object$with2);

        function Button() {
          _classCallCheck(this, Button);

          return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
        }

        _createClass(Button, [{
          key: 'init',
          value: function init() {
            _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'init', this).call(this);
            this.attr('role', 'button');
            var index = this.attr('tabindex');
            if (index === null || index < 0) this.attr('tabindex', '0');
          }
        }]);

        return Button;
      }(Object(__WEBPACK_IMPORTED_MODULE_5__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_4__temp_utils_ui_component_base_js__["a" /* UIBase */]).with(__WEBPACK_IMPORTED_MODULE_2__temp_utils_centerer_js__["b" /* default */], __WEBPACK_IMPORTED_MODULE_1__temp_utils_float_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__temp_animations_rippler_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__temp_utils_focusable_js__["a" /* default */]))
    });

    /* harmony default export */__webpack_exports__["a"] = Button;

    /***/
  },
  /* 7 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__temp_utils_normalizer_js__ = __webpack_require__(17);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__temp_utils_url_js__ = __webpack_require__(18);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__temp_utils_ui_component_base_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(1);
    /*
     * form.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * form component for ui-components-lite.
     *
     * NOTE: it is not currently (and may never) be possible to extend built-in elements like Form.
     * If it does become possible this can be refactored to support extending HTMLFormElement.
     */

    // TODO external ui-input not getting cached data? input elements lose data sometimes
    // on multiple reloads?

    var Form = function () {
      var reflectedAttributes = ['action', 'method', 'autocomplete', 'response-type', 'updates-history'];
      var template = __WEBPACK_IMPORTED_MODULE_2__temp_utils_ui_component_base_js__["c" /* document */].createElement('template');
      template.innerHTML = '\n    <style>\n      :host {\n        display: block;\n      }\n    </style>\n    <slot></slot>\n  ';

      return Object(__WEBPACK_IMPORTED_MODULE_2__temp_utils_ui_component_base_js__["b" /* defineUIComponent */])({
        name: 'ui-form',
        template: template,
        reflectedAttributes: reflectedAttributes,
        definition: function (_WEBPACK_IMPORTED_MO) {
          _inherits(Form, _WEBPACK_IMPORTED_MO);

          function Form() {
            _classCallCheck(this, Form);

            var _this14 = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this));

            _this14._form = null;
            _this14._formUIComponents = null;
            return _this14;
          }

          _createClass(Form, [{
            key: '_formControlType',
            value: function _formControlType(el) {
              var _this15 = this;

              return el && el.matches && function () {
                if (el.matches('input[name]') || el.matches('input[form="' + _this15.id + '"]')) return 'input';

                if (el.matches('select[name]') || el.matches('select[form="' + _this15.id + '"]')) return 'select';

                if (el.matches('.ui-form-behavior') || el.matches('.ui-form-behavior[form="' + _this15.id + '"]')) return 'formElement';

                return false;
              }();
            }
          }, {
            key: 'appendChild',
            value: function appendChild(node) {
              if (node) {
                _get(Form.prototype.__proto__ || Object.getPrototypeOf(Form.prototype), 'appendChild', this).call(this, node);
                if (node.isUIComponent) {
                  this._formUIComponents.push(node);
                }
              }

              return node;
            }
          }, {
            key: 'serialize',
            value: function serialize() {
              return this.elements.reduce(function (acc, el) {
                var val = void 0;
                try {
                  val = JSON.parse(el.value);
                } catch (e) {
                  val = el.value;
                }
                acc[el.getAttribute('name')] = val;
                return acc;
              }, {});
            }
          }, {
            key: 'submit',
            value: function submit() {
              var _ref15 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                  argURL = _ref15.url,
                  meth = _ref15.method,
                  headers = _ref15.headers,
                  responseType = _ref15.responseType;

              var url = argURL || this.action;
              var method = meth || this.method || 'POST';
              var opts = {
                method: method,
                body: this.data
              };

              if (headers) opts.headers = headers;
              var result = fetch(url, opts);
              var evt = new Event('submit');
              evt.pendingResult = result;
              this.dispatchEvent(evt);
              switch ((responseType || this.responseType || 'text').toLowerCase()) {
                case 'text':
                case 'html':
                  return result.then(function (resp) {
                    return resp.text();
                  });

                case 'json':
                  return result.then(function (resp) {
                    return resp.json();
                  });
                default:
                  return result;
              }
            }
          }, {
            key: 'init',
            value: function init() {
              var _this16 = this;

              _get(Form.prototype.__proto__ || Object.getPrototypeOf(Form.prototype), 'init', this).call(this);
              this.attr('is-data-element', true);
              this.attr('role', 'form');

              var historyListener = function historyListener(e) {
                var data = _this16.serialize();
                var parsed = Object(__WEBPACK_IMPORTED_MODULE_1__temp_utils_url_js__["a" /* parseURL */])(__WEBPACK_IMPORTED_MODULE_2__temp_utils_ui_component_base_js__["d" /* global */].location.href);
                var path = parsed.path,
                    route = parsed.route,
                    hashBang = parsed.hashBang;

                var url = path;
                if (hashBang) url += '#!';
                if (route) url += route;
                url += Object(__WEBPACK_IMPORTED_MODULE_1__temp_utils_url_js__["b" /* toQueryString */])(data);
                __WEBPACK_IMPORTED_MODULE_2__temp_utils_ui_component_base_js__["d" /* global */].history.replaceState(data, '', url);
              };

              this._beforeReady(function (_) {
                _this16._formUIComponents = [].concat(_toConsumableArray(new Set([].concat(_toConsumableArray(_this16.selectAll('.ui-form-behavior')), _toConsumableArray(__WEBPACK_IMPORTED_MODULE_2__temp_utils_ui_component_base_js__["c" /* document */].querySelectorAll('[form="' + _this16.id + '"]') || [])))));

                _this16._formUIComponents.forEach(function (el) {
                  if (el.tagName === 'INPUT') Object(__WEBPACK_IMPORTED_MODULE_0__temp_utils_normalizer_js__["a" /* inputNormalizer */])(el);
                  if (_this16.updatesHistory) el[el.on ? 'on' : 'addEventListener']('change', historyListener);
                  el[el.on ? 'on' : 'addEventListener']('change', function (e) {
                    if (_this16.id) __WEBPACK_IMPORTED_MODULE_2__temp_utils_ui_component_base_js__["d" /* global */].localStorage.setItem(_this16.id, JSON.stringify(_this16.serialize()));
                  });
                });
              });
            }
          }, {
            key: 'elements',
            get: function get() {
              return this.id ? [].concat(_toConsumableArray(new Set([].concat(_toConsumableArray(this.selectAll('input[name], select[name], .ui-form-behavior[name]')), _toConsumableArray(__WEBPACK_IMPORTED_MODULE_2__temp_utils_ui_component_base_js__["c" /* document */].querySelectorAll('[form="' + this.id + '"]')))))) : this.selectAll('input[name], select[name], .ui-form-behavior');
            }
          }, {
            key: 'isValid',
            get: function get() {
              return !this.querySelector(':invalid') && !this.querySelector('.invalid');
            }
          }, {
            key: 'data',
            get: function get() {
              return this.elements.reduce(function (formdata, el) {
                var name = el.getAttribute('name');
                if (name) formdata.append(name, el.value == null ? '' : el.value);
                return formdata;
              }, new FormData());
            },
            set: function set(data) {
              var _this17 = this;

              Object.entries(data).forEach(function (_ref16) {
                var _ref17 = _slicedToArray(_ref16, 2),
                    name = _ref17[0],
                    val = _ref17[1];

                var els = _this17.elements.filter(function (el) {
                  return el.matches('[name="' + name + '"]');
                });
                els.forEach(function (el, i, arr) {
                  var type = _this17._formControlType(el);
                  var value = Array.isArray(val) ? val[i] || val[val.length - 1] : val;

                  if (value === 'undefined' || value === 'null') value = '';

                  switch (type) {
                    case 'formElement':
                      if (el.value !== value) el.value = value;
                      break;

                    case 'select':
                      [].concat(_toConsumableArray(sel.options)).forEach(function (opt, j) {
                        if (opt.value === value && j !== sel.selectedIndex) sel.selectedIndex = j;
                      });
                      break;
                  }
                });
              });

              return this.data;
            }
          }]);

          return Form;
        }(__WEBPACK_IMPORTED_MODULE_2__temp_utils_ui_component_base_js__["a" /* UIBase */])
      });
    }();
    /* unused harmony export Form */

    var FormControlBehavior = function () {
      var reflectedAttributes = ['name', 'value', 'required', 'is-valid', 'placeholder'];
      return function (superclass) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__temp_utils_ui_component_base_js__["b" /* defineUIComponent */])({
          name: 'ui-form-behavior',
          registerElement: false,
          reflectedAttributes: reflectedAttributes,
          definition: function (_superclass3) {
            _inherits(definition, _superclass3);

            function definition() {
              _classCallCheck(this, definition);

              var _this18 = _possibleConstructorReturn(this, (definition.__proto__ || Object.getPrototypeOf(definition)).call(this));

              _this18._validators = [];
              return _this18;
            }

            _createClass(definition, [{
              key: '_validate',
              value: function _validate() {
                var _this19 = this;

                var isValid = this._validators.length ? this._validators.every(function (f) {
                  return f(_this19.value);
                }) : true;

                this.isValid = isValid;
                this.classList.remove(isValid ? 'invalid' : 'valid');
                this.classList.add(isValid ? 'valid' : 'invalid');
                return isValid;
              }
            }, {
              key: 'validate',
              value: function validate(validator) {
                if (!this._validators.includes(validator)) {
                  this._validators.push(validator);
                  this._validate();
                }
                return this;
              }
            }, {
              key: 'removeValidator',
              value: function removeValidator(validator) {
                this._validators = this._validators.filter(function (f) {
                  return f !== validator;
                });
                this._validate();
                return this;
              }
            }, {
              key: 'init',
              value: function init() {
                var _this20 = this;

                _get(definition.prototype.__proto__ || Object.getPrototypeOf(definition.prototype), 'init', this).call(this);
                var val = this.value;
                this.on('attribute-change', function (_ref18) {
                  var _ref18$changed = _ref18.changed,
                      now = _ref18$changed.now,
                      name = _ref18$changed.name;

                  switch (name) {
                    case 'value':
                    case 'selected-index':
                      if (now !== val) {
                        val = now;
                        _this20._validate();

                        var evt = new Event('change');
                        evt.value = _this20.value;
                        evt.isValid = _this20.isValid;
                        _this20.dispatchEvent(evt);
                      }

                      break;

                    case 'required':
                      var reqHandler = function reqHandler(value) {
                        return value != null && value !== '';
                      };
                      if (now) {
                        _this20.validate(reqHandler);
                      } else {
                        _this20.removeValidator(reqHandler);
                      }

                      break;
                  }
                });
              }
            }]);

            return definition;
          }(superclass)
        });
      };
    }();
    /* harmony export (immutable) */__webpack_exports__["a"] = FormControlBehavior;

    /***/
  },
  /* 8 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

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

    var snakeCaseMatcher = /[\-\_0-9]+([a-zA-Z])/g;
    var camelSplitter = /([A-Z0-9])/;
    var firstLetter = /^(\w)/;
    var allFirstLetters = /\b(\w)/g;
    var printfMatch = /%([a-zA-Z%])/g;

    var alphaNumericRange = [];
    var alphaRange = [];
    var numericRange = [];
    var lowerCaseRange = [];
    var upperCaseRange = [];
    var asciiPrintableRange = [];

    for (var i = 32; i < 127; ++i) {
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

    var randomCharacter = function randomCharacter(range) {
      return function () {
        return String.fromCharCode(range[Math.random() * range.length | 0]);
      };
    };

    var randomString = function randomString(f) {
      return function () {
        var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;

        var str = '';
        for (var _i = 0; _i < length; ++_i) {
          str += f();
        }return str;
      };
    };

    var printfFormat = function printfFormat(c, arg) {
      var x = parseInt(arg, 10);
      switch (c) {
        case 'n':
          return '';
        case 'c':
        case '%':
          return arg ? arg[0] : '';

        case 'd':
          if (Number.isNaN(x)) throw new TypeError('Non numeric argument ' + arg + ' to %' + c);
          return (x | 0).toString();

        case 'b':
          if (Number.isNaN(x)) throw new TypeError('Non numeric argument ' + arg + ' to %' + c);
          return '0b' + x.toString(2);

        case 'e':
          x = +arg;
          if (Number.isNaN(x)) throw new TypeError('Non numeric argument ' + arg + ' to %' + c);
          return x.toExponential();

        case 'E':
          x = +arg;
          if (Number.isNaN(x)) throw new TypeError('Non numeric argument ' + arg + ' to %' + c);
          return x.toExponential().toUpperCase();

        case 'o':
          if (Number.isNaN(x)) throw new TypeError('Non numeric argument ' + arg + ' to %' + c);
          return '0o' + x.toString(8);

        case 'x':
          if (Number.isNaN(x)) throw new TypeError('Non numeric argument ' + arg + ' to %' + c);
          return '0x' + x.toString(16);

        case 'X':
          if (Number.isNaN(x)) throw new TypeError('Non numeric argument ' + arg + ' to %' + c);
          return '0x' + x.toString(16).toUpperCase();

        case 'f':
          x = +arg;
          if (Number.isNaN(x)) throw new TypeError('Non numeric argument ' + arg + ' to %' + c);
          return '' + x;

        case 's':
          return arg.toString();

        default:
          throw new TypeError('Unrecognized formatting option %' + c + ' to sprintf');
      }
    };

    var matchToUpper = function matchToUpper(m) {
      return m.toUpperCase();
    };
    var isUpper = function isUpper(s) {
      return s === s.toUpperCase();
    };

    var isNumeric = function isNumeric(str) {
      return !Number.isNaN(+str);
    };
    /* unused harmony export isNumeric */

    var capFirst = function capFirst(str) {
      return str.replace(firstLetter, matchToUpper);
    };
    /* unused harmony export capFirst */

    var capFirstAll = function capFirstAll(str) {
      return str.replace(allFirstLetters, matchToUpper);
    };
    /* unused harmony export capFirstAll */

    var toCamelCase = function toCamelCase(str) {
      return str.replace(snakeCaseMatcher, function (m) {
        return m.replace(/[\-\_]+/g, '').toUpperCase();
      });
    };
    /* harmony export (immutable) */__webpack_exports__["b"] = toCamelCase;

    var toPascalCase = function toPascalCase(str) {
      return capFirst(toCamelCase(str));
    };
    /* unused harmony export toPascalCase */

    var toClassCase = toPascalCase;
    /* unused harmony export toClassCase */

    var toSnakeCase = function toSnakeCase(str) {
      var char = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';

      var pieces = str.split(camelSplitter).filter(function (x) {
        return x;
      });
      return pieces.map(function (piece, i, arr) {
        if (isUpper(piece)) {
          var next = arr[i + 1];
          var prev = arr[i - 1];
          if (!prev) return piece;
          if (!isUpper(prev) || next && !isUpper(next)) return char + piece;
        }
        return piece;
      }).join('').toLowerCase();
    };
    /* harmony export (immutable) */__webpack_exports__["c"] = toSnakeCase;

    var padLeft = function padLeft(n, str) {
      var char = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ' ';
      return str.length > n ? str : char.repeat(n - str.length) + str;
    };
    /* unused harmony export padLeft */

    var padRight = function padRight(n, str) {
      var char = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ' ';
      return str.length > n ? str : str + char.repeat(n - str.length);
    };
    /* unused harmony export padRight */

    // NOTE: does not support the full range of %[char] possiblities. If you need something more robust
    // use https://github.com/alexei/sprintf.js/blob/master/src/sprintf.js
    var sprintf = function sprintf(str) {
      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      var count = -1;
      return str.replace(printfMatch, function (m) {
        return printfFormat(m[1], args[++count]);
      });
    };
    /* unused harmony export sprintf */

    // NOTE: not cryptographically secure. For anything requiring a secure degree of
    // randomness use the browser's/node's crypto implementation.
    var random = {
      alphanumeric: randomString(randomCharacter(alphaNumericRange)),
      ascii: randomString(randomCharacter(asciiPrintableRange)),
      alpha: randomString(randomCharacter(alphaRange)),
      numeric: randomString(randomCharacter(numericRange)),
      upper: randomString(randomCharacter(upperCaseRange)),
      lower: randomString(randomCharacter(lowerCaseRange))
    };
    /* harmony export (immutable) */__webpack_exports__["a"] = random;

    /***/
  },
  /* 9 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);
    /*
     * attribute-analyzer.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * attribute-analyzer utility for ui-components-lite. Takes the value returned by
     * HTMLElement.getAttribute and returns an appropriate value: if the attribute is a valid string
     * representation of e.g. a number or boolean, then this will return the number or boolean rather
     * than a string.
     */

    var processHTMLAttr = function processHTMLAttr(attr) {
      switch (Object(__WEBPACK_IMPORTED_MODULE_0__node_modules_extracttype_extracttype_js__["a" /* default */])(attr)) {
        case 'Null':
        case 'Undefined':
          return null;

        case 'String':
          if (!attr) return true; // empty string, e.g. <ui-drawer is-modal></ui-drawer>
          var val = void 0;
          if (attr === 'NaN') return NaN;
          if (attr === 'undefined') return undefined;
          try {
            val = JSON.parse(attr); // numbers, bools, null, etc
          } catch (e) {
            val = attr;
          }
          return val;

        default:
          return attr;
      }
    };

    /* harmony default export */__webpack_exports__["a"] = processHTMLAttr;

    /***/
  },
  /* 10 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__temp_utils_dom_js__ = __webpack_require__(2);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);
    /*
     * rippler.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * rippler animation component for ui-components-lite.
     */

    var rippleEvents = ['click', 'tap', 'dblclick', 'enter-key'];
    var handlerRegistry = new WeakMap();
    var registerHandler = function registerHandler(f) {
      var cached = handlerRegistry.get(f);
      var fn = cached || function (e) {
        __WEBPACK_IMPORTED_MODULE_0__temp_utils_dom_js__["d" /* global */].setTimeout(f, 500, e);
      };
      handlerRegistry.set(f, fn);
      return fn;
    };

    var template = __WEBPACK_IMPORTED_MODULE_0__temp_utils_dom_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    :host {\n      overflow: hidden;\n      position: relative;\n      cursor: pointer;\n      transform: translate3d(0, 0, 0);\n    }\n\n    :host:after {\n      content: "";\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      top: 0;\n      left: 0;\n      opacity: 0;\n      transform: scale(10, 10);\n      transition: transform .5s, opacity 1s;\n      pointer-events: none;\n      background-repeat: no-repeat;\n      background-image: radial-gradient(circle, var(--ui-theme-ripple-color), 10%, transparent 10%);\n      background-position: 50%;\n    }\n\n    :host(:active):after {\n      opacity: .7;\n      transform: scale(0, 0);\n      transition: 0s;\n      background-color: orange;\n    }\n  </style>\n';

    /* harmony default export */__webpack_exports__["a"] = function (superclass) {
      return Object(__WEBPACK_IMPORTED_MODULE_0__temp_utils_dom_js__["b" /* defineUIComponent */])({
        name: 'ui-ripples',
        template: template,
        registerElement: false,
        definition: function (_superclass4) {
          _inherits(Ripples, _superclass4);

          function Ripples() {
            _classCallCheck(this, Ripples);

            return _possibleConstructorReturn(this, (Ripples.__proto__ || Object.getPrototypeOf(Ripples)).apply(this, arguments));
          }

          _createClass(Ripples, [{
            key: 'on',


            // Here we want to intercept any handlers on events that trigger a ripple and delay them
            // to give the animation time to complete.
            value: function on(evts, f) {
              var _this22 = this;

              var events = evts.split(/\s+/g);
              events.forEach(function (evt) {
                if (rippleEvents.includes(evt)) {
                  // Here we'll want to cache a canonical version for later removal
                  var fn = registerHandler(f);
                  _get(Ripples.prototype.__proto__ || Object.getPrototypeOf(Ripples.prototype), 'on', _this22).call(_this22, evt, fn);
                } else {
                  _get(Ripples.prototype.__proto__ || Object.getPrototypeOf(Ripples.prototype), 'on', _this22).call(_this22, evt, f);
                }
              });
            }

            // Similar intercept here for function arguments

          }, {
            key: 'remove',
            value: function remove() {
              var _get2;

              for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
              }

              var correctArgs = args.reduce(function (acc, arg) {
                if (Object(__WEBPACK_IMPORTED_MODULE_1__node_modules_extracttype_extracttype_js__["a" /* default */])(arg) === 'Function') {
                  var cached = registerHandler(arg);
                  acc.push(cached || arg);
                } else {
                  acc.push(arg);
                }
                return acc;
              }, []);
              (_get2 = _get(Ripples.prototype.__proto__ || Object.getPrototypeOf(Ripples.prototype), 'remove', this)).call.apply(_get2, [this].concat(_toConsumableArray(correctArgs)));
            }
          }]);

          return Ripples;
        }(superclass)
      });
    };

    /***/
  },
  /* 11 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__temp_utils_ui_component_base_js__ = __webpack_require__(0);
    /*
     * text.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * text-holder component for ui-components-lite.
     *
     * NOTE: it is not currently (and may never) be possible to extend built-in elements like Span.
     * If it does become possible this can be refactored to support extending HTMLSpanElement.
     */

    var reflectedAttributes = ['view-text'];
    var template = __WEBPACK_IMPORTED_MODULE_0__temp_utils_ui_component_base_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    :host {\n      display: inline;\n    }\n\n    #text-holder {\n      color: inherit;\n    }\n  </style>\n  <span id="text-holder"></span>\n';

    var Text = Object(__WEBPACK_IMPORTED_MODULE_0__temp_utils_ui_component_base_js__["b" /* defineUIComponent */])({
      name: 'ui-text',
      reflectedAttributes: reflectedAttributes,
      template: template,
      definition: function (_WEBPACK_IMPORTED_MO2) {
        _inherits(Text, _WEBPACK_IMPORTED_MO2);

        function Text() {
          _classCallCheck(this, Text);

          var _this23 = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this));

          _this23._textHolder = null;
          return _this23;
        }

        // Override the default textContent property


        _createClass(Text, [{
          key: 'init',
          value: function init() {
            var _this24 = this;

            _get(Text.prototype.__proto__ || Object.getPrototypeOf(Text.prototype), 'init', this).call(this);
            this._textHolder = this.selectInternalElement('#text-holder');
            this.watchAttribute(this, 'view-text', function (val) {
              _this24._textHolder.textContent = val || _this24.innerHTML; // render innerHTML as a fallback
            });

            if (this.innerHTML && !this.viewText) this.viewText = this.innerHTML;
          }
        }, {
          key: 'textContent',
          get: function get() {
            return this._textHolder.textContent;
          },
          set: function set(text) {
            this.viewText = text;
            return text;
          }
        }]);

        return Text;
      }(__WEBPACK_IMPORTED_MODULE_0__temp_utils_ui_component_base_js__["a" /* UIBase */])
    });

    /* unused harmony default export */var _unused_webpack_default_export = Text;

    /***/
  },
  /* 12 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__temp_utils_float_js__ = __webpack_require__(4);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__temp_utils_ui_component_base_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(1);
    /*
     * card.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * card component for ui-components-lite.
     */

    var template = __WEBPACK_IMPORTED_MODULE_1__temp_utils_ui_component_base_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    :host {\n      display: block;\n      width: 200px;\n      height: 300px;\n      padding: 2%;\n    }\n  </style>\n  <slot></slot>\n';

    var Card = Object(__WEBPACK_IMPORTED_MODULE_1__temp_utils_ui_component_base_js__["b" /* defineUIComponent */])({
      name: 'ui-card',
      template: template,
      definition: function (_Object$with3) {
        _inherits(Card, _Object$with3);

        function Card() {
          _classCallCheck(this, Card);

          return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
        }

        _createClass(Card, [{
          key: 'init',
          value: function init() {
            _get(Card.prototype.__proto__ || Object.getPrototypeOf(Card.prototype), 'init', this).call(this);
            this.floatingY = true;
          }
        }]);

        return Card;
      }(Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_1__temp_utils_ui_component_base_js__["a" /* UIBase */]).with(__WEBPACK_IMPORTED_MODULE_0__temp_utils_float_js__["a" /* default */]))
    });

    /* harmony default export */__webpack_exports__["a"] = Card;

    /***/
  },
  /* 13 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* unused harmony export applyTheme */
    /* unused harmony export revertTheme */
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "a", function () {
      return generateCSSClassName;
    });
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__dom_js__ = __webpack_require__(2);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__node_modules_jsstring_src_jsstring_js__ = __webpack_require__(8);
    /*
     * styler.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * themeing utility for ui-components-lite.
     */

    var toCSSVar = function toCSSVar(s) {
      return '--ui-theme-' + Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_jsstring_src_jsstring_js__["c" /* toSnakeCase */])(s, '-');
    };

    var defaultThemeObj = {
      primaryColor: '#00bcd4',
      primaryDarkColor: '#008ba3',
      primaryLightColor: '#62efff',
      darkTextColor: '#333',
      secondaryColor: '#ab47bc',
      secondaryDarkColor: '#79e08b',
      secondaryLightColor: '#df78ef',
      lightTextColor: '#fff',
      warningColor: '#ec407a',
      rippleColor: '#fff',
      accentColor: 'orange'
    };

    var themeRegistry = {};
    var appliedThemes = [];
    var currentTheme = null;

    var applyTheme = function applyTheme(theme, name) {
      var type = Object(__WEBPACK_IMPORTED_MODULE_1__node_modules_extracttype_extracttype_js__["a" /* default */])(theme);
      if (type === 'String') {
        var t = themeRegistry[theme];
        if (t) {
          currentTheme = t;
          __WEBPACK_IMPORTED_MODULE_0__dom_js__["c" /* document */].head.appendChild(t);
          appliedThemes.push(t);
          return t;
        } else {
          throw new Error('Unrecognized theme ' + theme + '.');
        }
      }

      var style = __WEBPACK_IMPORTED_MODULE_0__dom_js__["c" /* document */].createElement('style');
      style.innerHTML = ':root { ' + Object.entries(theme).reduce(function (s, _ref19) {
        var _ref20 = _slicedToArray(_ref19, 2),
            k = _ref20[0],
            v = _ref20[1];

        return k in defaultThemeObj ? s + ' ' + toCSSVar(k) + ':' + v + ';' : s;
      }, '') + ' }';

      if (name) themeRegistry[name] = style;
      __WEBPACK_IMPORTED_MODULE_0__dom_js__["c" /* document */].head.appendChild(style);
      appliedThemes.push(style);
      currentTheme = style;
      return style;
    };

    var defaultTheme = applyTheme(defaultThemeObj, 'default');
    var revertTheme = function revertTheme() {
      var current = appliedThemes.pop();
      if (current && current !== defaultTheme) __WEBPACK_IMPORTED_MODULE_0__dom_js__["c" /* document */].head.removeChild(current);
      return appliedThemes[appliedThemes.length - 1] || defaultTheme;
    };

    var generateCSSClassName = function generateCSSClassName() {
      return __WEBPACK_IMPORTED_MODULE_2__node_modules_jsstring_src_jsstring_js__["a" /* random */].alpha(1) + __WEBPACK_IMPORTED_MODULE_2__node_modules_jsstring_src_jsstring_js__["a" /* random */].alphanumeric(5);
    };

    /***/
  },
  /* 14 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__button_js__ = __webpack_require__(6);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__temp_utils_dom_js__ = __webpack_require__(2);
    /*
     * fab.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * floating action button component for ui-components-lite.
     */

    var template = __WEBPACK_IMPORTED_MODULE_1__temp_utils_dom_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    :host {\n      display: block;\n      width: 74px;\n      height: 74px;\n      border-radius: 50%;\n      background-color: var(--ui-theme-accent-color, purple);\n    }\n  </style>\n';

    /* unused harmony default export */var _unused_webpack_default_export = Object(__WEBPACK_IMPORTED_MODULE_1__temp_utils_dom_js__["b" /* defineUIComponent */])({
      name: 'ui-fab',
      template: template,
      definition: function (_WEBPACK_IMPORTED_MO3) {
        _inherits(Fab, _WEBPACK_IMPORTED_MO3);

        function Fab() {
          _classCallCheck(this, Fab);

          return _possibleConstructorReturn(this, (Fab.__proto__ || Object.getPrototypeOf(Fab)).apply(this, arguments));
        }

        _createClass(Fab, [{
          key: 'init',
          value: function init() {
            _get(Fab.prototype.__proto__ || Object.getPrototypeOf(Fab.prototype), 'init', this).call(this);
            this.floatingY = true;
          }
        }]);

        return Fab;
      }(__WEBPACK_IMPORTED_MODULE_0__button_js__["a" /* default */])
    });

    /***/
  },
  /* 15 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "a", function () {
      return centeredStyles;
    });
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__dom_js__ = __webpack_require__(2);
    /*
     * centerer.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * vertical centering mixin for ui-components-lite.
     */

    var centeredStyles = '\n    :host {\n      transform-style: preserve-3d;\n    }\n\n    .content-wrapper {\n      position: relative;\n      top: 49%;\n      transform: translateY(-51%);\n    }\n';

    var template = __WEBPACK_IMPORTED_MODULE_0__dom_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    ' + centeredStyles + '\n  </style>\n  <div class="content-wrapper">\n    <slot></slot>\n  </div>\n';

    /* harmony default export */__webpack_exports__["b"] = function (superclass) {
      return Object(__WEBPACK_IMPORTED_MODULE_0__dom_js__["b" /* defineUIComponent */])({
        name: 'ui-centered',
        template: template,
        registerElement: false,
        definition: function (_superclass5) {
          _inherits(Centered, _superclass5);

          function Centered() {
            _classCallCheck(this, Centered);

            return _possibleConstructorReturn(this, (Centered.__proto__ || Object.getPrototypeOf(Centered)).apply(this, arguments));
          }

          return Centered;
        }(superclass)
      });
    };

    /***/
  },
  /* 16 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__temp_utils_ui_component_base_js__ = __webpack_require__(0);
    /*
     * backdrop.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * backdrop component for ui-components-lite. Meant primarily for use in modal components.
     */

    var template = __WEBPACK_IMPORTED_MODULE_0__temp_utils_ui_component_base_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    :host {\n      display: block;\n      height: 100vh;\n      width: 100vw;\n      background-color: rgba(0,0,0,0.7);\n      position: absolute;\n      top: 0px;\n      left: 0px;\n      z-index: 10000;\n    }\n  </style>\n';

    var Backdrop = Object(__WEBPACK_IMPORTED_MODULE_0__temp_utils_ui_component_base_js__["b" /* defineUIComponent */])({
      name: 'ui-backdrop',
      template: template,
      definition: function (_WEBPACK_IMPORTED_MO4) {
        _inherits(Backdrop, _WEBPACK_IMPORTED_MO4);

        function Backdrop() {
          _classCallCheck(this, Backdrop);

          // Elements that use this element should set this property to themselves as a
          // debugging aid.
          var _this28 = _possibleConstructorReturn(this, (Backdrop.__proto__ || Object.getPrototypeOf(Backdrop)).call(this));

          _this28.for = null;
          return _this28;
        }

        _createClass(Backdrop, [{
          key: 'init',
          value: function init() {
            _get(Backdrop.prototype.__proto__ || Object.getPrototypeOf(Backdrop.prototype), 'init', this).call(this);
            this.hide();
          }
        }]);

        return Backdrop;
      }(__WEBPACK_IMPORTED_MODULE_0__temp_utils_ui_component_base_js__["a" /* UIBase */])
    });

    /* unused harmony default export */var _unused_webpack_default_export = Backdrop;

    /***/
  },
  /* 17 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__ui_component_base_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);

    var changeTriggers = ['blur', 'keyup', 'paste', 'input'];

    var debounce = function debounce(n, immed, f) {
      var _ref21 = function () {
        switch (Object(__WEBPACK_IMPORTED_MODULE_1__node_modules_extracttype_extracttype_js__["a" /* default */])(immed)) {
          case 'Boolean':
            return [f, immed];
          case 'Function':
            return [immed, false];
          default:
            throw new TypeError('Unrecognized arguments ' + immed + ' and ' + f + ' to function debounce.');
        }
      }(),
          _ref22 = _slicedToArray(_ref21, 2),
          fn = _ref22[0],
          now = _ref22[1];

      var timer = null;
      return function () {
        var _this29 = this;

        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        if (timer === null && now) {
          fn.apply(this, args);
        }
        __WEBPACK_IMPORTED_MODULE_0__ui_component_base_js__["d" /* global */].clearTimeout(timer);
        timer = __WEBPACK_IMPORTED_MODULE_0__ui_component_base_js__["d" /* global */].setTimeout(function () {
          return fn.apply(_this29, args);
        }, n);
        return timer;
      };
    };

    // Makes input change event consistent across browsers
    var inputNormalizer = function inputNormalizer(input) {
      var before = null;
      changeTriggers.forEach(function (evtName) {
        return input.addEventListener(evtName, debounce(500, function (e) {
          if (input.value !== before) {
            before = input.value;
            var evt = new Event('change');
            evt.value = input.value;
            input.dispatchEvent('change');
          }
        }));
      });

      input.addEventListener('focus', function (e) {
        before = input.value;
      });
    };
    /* harmony export (immutable) */__webpack_exports__["a"] = inputNormalizer;

    /***/
  },
  /* 18 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "a", function () {
      return parseURL;
    });
    /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "b", function () {
      return toQueryString;
    });
    /*
     * url.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * url processing utility for ui-components-lite.
     */

    // At some point could use the following with named capture groups?
    // const urlMatcher = /(?:(https?):\/\/)?(?:(\w+)\.)?(\w+)\.(\w+)(\/[\w\/]+)?(?:\?(.+))?/
    var matchProtocol = /https?/i;
    var matchDomain = /\/\/([\w\.]+)[\/\?#]{1}?/;
    var matchQueryString = /\?(.+)/;

    var parseQueryString = function parseQueryString(qs) {
      return qs.split('&').reduce(function (acc, pair) {
        var _pair$split$map = pair.split('=').map(decodeURIComponent),
            _pair$split$map2 = _slicedToArray(_pair$split$map, 2),
            key = _pair$split$map2[0],
            v = _pair$split$map2[1];

        var value = void 0;
        try {
          value = JSON.parse(v);
        } catch (e) {
          value = v;
        }
        acc[key] = value;
        return acc;
      }, {});
    };

    var parseURL = function parseURL(url) {
      var subdomain = void 0,
          domain = void 0,
          p = void 0,
          qs = '';
      var secure = false;
      var path = '';
      var data = {};
      var route = '';
      var hashBang = url.match('#!');

      var _url$split = url.split('://'),
          _url$split2 = _slicedToArray(_url$split, 2),
          first = _url$split2[0],
          rest = _url$split2[1];

      if (rest) secure = first.toLowerCase() === 'https';
      var protocol = secure ? 'https' : 'http';

      var _split = (rest || first).split(/\/(.+)/),
          _split2 = _slicedToArray(_split, 2),
          fullDomain = _split2[0],
          pAndQs = _split2[1];

      rest = fullDomain.split('.');
      subdomain = rest.length === 3 && rest[0];
      domain = rest.length === 3 ? rest.slice(1).join('.') : fullDomain;
      if (pAndQs) {
        var _pAndQs$split = pAndQs.split('?');

        var _pAndQs$split2 = _slicedToArray(_pAndQs$split, 2);

        p = _pAndQs$split2[0];
        qs = _pAndQs$split2[1];

        if (qs) data = parseQueryString(qs);

        var _p$split = p.split('#!'),
            _p$split2 = _slicedToArray(_p$split, 2),
            serverPath = _p$split2[0],
            clientPath = _p$split2[1];

        if (clientPath) route = clientPath;
        path = '/' + serverPath;
      }

      return {
        protocol: protocol,
        secure: secure,
        subdomain: subdomain || '',
        domain: domain || '',
        fullDomain: fullDomain,
        data: data,
        url: url,
        path: path,
        route: route,
        queryString: qs,
        hashBang: hashBang
      };
    };

    var toQueryString = function toQueryString(obj) {
      return '?' + Object.entries(obj).map(function (_ref23) {
        var _ref24 = _slicedToArray(_ref23, 2),
            k = _ref24[0],
            v = _ref24[1];

        return encodeURIComponent(k) + '=' + encodeURIComponent(v);
      }).join('&');
    };

    window.parseURL = parseURL;

    /***/
  },
  /* 19 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__text_js__ = __webpack_require__(11);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__form_js__ = __webpack_require__(7);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__temp_utils_focusable_js__ = __webpack_require__(5);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__temp_utils_normalizer_js__ = __webpack_require__(17);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__temp_utils_ui_component_base_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(1);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_6__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);
    /*
     * input.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * input component for ui-components-lite.
     *
     * NOTE: it is not currently (and may never) be possible to extend built-in elements like Input
     * If it does become possible this can be refactored to support extending HTMLInputElement.
     */

    var reflectedAttributes = ['label',

    // These values are here to mimic the behavior of the native, NOTE: incomplete.
    'type', 'form', 'placeholder', 'pattern', 'required',

    // NOTE: unlike placeholder which merely displays text to the user,
    // this is a true default value, i.e. it will be the value property/attribute
    // of the input if empty, will be the value if a form is submitted, etc.
    // Will override placeholder if both are set.
    'default-value'];

    var pad = function pad(n) {
      return function (val) {
        var s = '' + val;
        if (Number.isNaN(+s)) {
          console.warn('Attempted to pad non-numeric argument ' + s + '.');
          return '';
        }
        return s.length >= n ? s : '0'.repeat(n - s.length) + s;
      };
    };
    var pad2 = pad(2);
    var pad4 = pad(4);

    // Not foolproof, but good quick-and-dirty check.
    var VALID_INPUT_DATE = /^\d{4}\-[0-1][1-9]\-[1-3][1-9]$/;
    var VALID_INPUT_TIME = /^[0-2][0-9]:[0-5][0-9]$/;

    var DATE_TYPE_SUPPORTED = function () {
      var input = __WEBPACK_IMPORTED_MODULE_4__temp_utils_ui_component_base_js__["c" /* document */].createElement('input');
      var notDate = 'not-a-date';
      input.setAttribute('type', 'date');
      input.setAttribute('value', notDate);
      return input.value !== notDate;
    }();
    /* unused harmony export DATE_TYPE_SUPPORTED */

    // Need this because Edge supports date but not time
    var TIME_TYPE_SUPPORTED = function () {
      var input = __WEBPACK_IMPORTED_MODULE_4__temp_utils_ui_component_base_js__["c" /* document */].createElement('input');
      var notTime = 'not-a-time';
      input.setAttribute('type', 'time');
      input.setAttribute('value', notTime);
      return input.value !== notTime;
    }();
    /* unused harmony export TIME_TYPE_SUPPORTED */

    var destructureDateObj = function destructureDateObj(date) {
      return Number.isNaN(date.getTime()) ? [] : [date.getFullYear(), date.getMonth(), //no +1
      date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
    };

    var formatAsDateInputValue = function formatAsDateInputValue(date) {
      var _destructureDateObj = destructureDateObj(date),
          _destructureDateObj2 = _slicedToArray(_destructureDateObj, 3),
          yr = _destructureDateObj2[0],
          mn = _destructureDateObj2[1],
          dy = _destructureDateObj2[2];

      if ([yr, mn, dy].some(function (n) {
        return n == null || Number.isNaN(n);
      })) return null;
      return pad4(yr) + '-' + pad2(mn + 1) + '-' + pad2(dy);
    };

    var formatAsDateInputDisplay = function formatAsDateInputDisplay(date) {
      var _destructureDateObj3 = destructureDateObj(date),
          _destructureDateObj4 = _slicedToArray(_destructureDateObj3, 3),
          yr = _destructureDateObj4[0],
          mn = _destructureDateObj4[1],
          dy = _destructureDateObj4[2];

      if ([yr, mn, dy].some(function (n) {
        return n == null || Number.isNaN(n);
      })) return null;
      return pad2(mn + 1) + '/' + pad2(dy) + '-' + pad4(yr);
    };

    var formatAsTimeInputValue = function formatAsTimeInputValue(date) {
      // Currently, the step attribute needed for seconds is not supported in iOS Safari so for now
      // limiting to just minutes and hours.
      var _destructureDateObj5 = destructureDateObj(date),
          _destructureDateObj6 = _slicedToArray(_destructureDateObj5, 5),
          hr = _destructureDateObj6[3],
          min = _destructureDateObj6[4];

      if ([hr, min].some(function (n) {
        return n == null || Number.isNaN(n);
      })) return null;
      return pad2(hr) + ':' + pad2(min);
    };

    var formatAsTimeInputDisplay = function formatAsTimeInputDisplay(date) {
      var _destructureDateObj7 = destructureDateObj(date),
          _destructureDateObj8 = _slicedToArray(_destructureDateObj7, 5),
          hr = _destructureDateObj8[3],
          min = _destructureDateObj8[4];

      if ([hr, min].some(function (n) {
        return n == null || Number.isNaN(n);
      })) return null;
      var afternoon = hr > 11;
      var meridian = afternoon ? 'PM' : 'AM';
      var hour = '' + (afternoon ? hr - 12 : hr);
      return pad2(hour) + ':' + pad2(min) + ' ' + meridian;
    };

    var input2Date = function input2Date(s) {
      if (!s.trim()) return null;
      var yr = void 0,
          mn = void 0,
          dy = void 0;
      if (s.includes('/')) {
        var _s$split$map = s.split('/').map(Number);

        var _s$split$map2 = _slicedToArray(_s$split$map, 3);

        mn = _s$split$map2[0];
        dy = _s$split$map2[1];
        yr = _s$split$map2[2];
      } else {
        var _s$split$map3 = s.split('-').map(Number);

        var _s$split$map4 = _slicedToArray(_s$split$map3, 3);

        yr = _s$split$map4[0];
        mn = _s$split$map4[1];
        dy = _s$split$map4[2];
      }
      return new Date(yr, mn - 1, dy);
    };

    var parseTimeString = function parseTimeString(s) {
      if (!s) return [];

      var _s$split = s.split(' '),
          _s$split2 = _slicedToArray(_s$split, 2),
          t = _s$split2[0],
          meridian = _s$split2[1];

      var _t$split$map = t.split(':').map(Number),
          _t$split$map2 = _slicedToArray(_t$split$map, 2),
          h = _t$split$map2[0],
          m = _t$split$map2[1];

      var hr = meridian && meridian.toLowerCase() === 'pm' ? 12 + h : h;
      return [hr, m];
    };

    var template = __WEBPACK_IMPORTED_MODULE_4__temp_utils_ui_component_base_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    :host {\n      display: block;\n      border-bottom: solid 1px;\n      border-bottom-color: #999;\n      min-height: 25px;\n      margin-bottom: 10px;\n      margin-top: 10px;\n      max-width: 200px;\n      color: var(--ui-theme-dark-text-color, #333);\n      outline-width: 0px;\n    }\n\n    :host(.focused) {\n      border-bottom-color: var(--ui-theme-primary-dark-color, blue);\n      box-shadow: 0px 4px 4px -4px;\n    }\n\n    :host(.empty) {\n      color: #999;\n    }\n\n    label {\n      /* janky, I know. TODO: find a way to make this work with transform: translate */\n      transition-property: top, left;\n      transition-timing-function: ease;\n      transition-duration: 1s;\n      position: relative;\n      top: 0px;\n      left: 0px;\n    }\n\n    #input {\n      border: none;\n      outline: none;\n      width: 90%;\n      margin-left: 5%;\n      margin-bottom: 3px;\n      height: 25px;\n      font-size: 16px;\n      color: inherit;\n      background-color: inherit; /* firefox changes the color */\n    }\n\n    .text-moved {\n      top: 20px;\n      left: 10px;\n    }\n  </style>\n  <label><ui-text view-text="{{label}}"></ui-text></label>\n  <input id="input"/>\n';

    var Input = Object(__WEBPACK_IMPORTED_MODULE_4__temp_utils_ui_component_base_js__["b" /* defineUIComponent */])({
      name: 'ui-input',
      template: template,
      reflectedAttributes: reflectedAttributes,
      definition: function (_Object$with4) {
        _inherits(Input, _Object$with4);

        function Input() {
          _classCallCheck(this, Input);

          var _this30 = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this));

          _this30._input = null;
          return _this30;
        }

        _createClass(Input, [{
          key: 'init',
          value: function init() {
            var _this31 = this;

            _get(Input.prototype.__proto__ || Object.getPrototypeOf(Input.prototype), 'init', this).call(this);
            this._input = this.selectInternalElement('#input');
            var placeholder = this.attr('placeholder') || this.attr('default-value') || null;

            if (this.attr('name')) {
              if (!this.attr('label')) this.attr('label', this.attr('name'));
              this.selectInternalElement('label').setAttribute('for', this.attr('name'));
            }

            if (placeholder) this.placeholder = placeholder;

            if (this.attr('label') && !placeholder) this.selectInternalElement('label').classList.add('text-moved');
            this.on('focus', function (e) {
              return _this31.selectInternalElement('label').classList.remove('text-moved');
            });
            this.on('blur', function (e) {
              __WEBPACK_IMPORTED_MODULE_4__temp_utils_ui_component_base_js__["d" /* global */].setTimeout(function () {
                if (_this31.label && !_this31.placeholder && !_this31.value) {
                  _this31.selectInternalElement('label').classList.add('text-moved');
                }
              }, 1);
            });

            if (!this.attr('type')) this.type = 'text';
            if (!(this.value && this.value.length || this.attr('value'))) this.classList.add('empty');

            switch (this.attr('type').toLowerCase()) {
              // TODO: replace these two with cross-platform date and time pickers?
              case 'date':
              case 'time':

              case 'text':
              case 'number':
              case 'password':
              case 'email':
              case 'tel':
              case 'url':
                this._input.setAttribute('type', this.attr('type'));
                break;
            }

            if (this.attr('type').toLowerCase() === 'date' && !DATE_TYPE_SUPPORTED) {
              this.attr('placeholder', 'mm/dd/yyyy');
              this.attr('pattern', '^[0-1][1-9]\/[1-3][1-9]\/\d{4}$');
            }

            if (this.attr('type').toLowerCase() === 'time' && !TIME_TYPE_SUPPORTED) {
              this.attr('placeholder', '00:00 AM/PM');
              this.attr('pattern', '^[0-2][0-9]:[0-5][0-9] [AP]M$');
            }

            this._input.addEventListener('focus', function (e) {
              _this31.classList.add('focused');
            });

            this._input.addEventListener('blur', function (e) {
              _this31.classList.remove('focused');
            });

            Object(__WEBPACK_IMPORTED_MODULE_3__temp_utils_normalizer_js__["a" /* inputNormalizer */])(this._input);

            this.on('focus', function (_) {
              _this31._input.focus();
            });

            this.on('attribute-change', function (_ref25) {
              var _ref25$changed = _ref25.changed,
                  now = _ref25$changed.now,
                  name = _ref25$changed.name,
                  was = _ref25$changed.was;

              switch (name) {
                case 'name':
                  _this31._input.name = now;
                  _this31.name = now;
                  _this31.selectInternalElement('label').setAttribute('for', _this31.name);
                  break;

                case 'value':
                  var val = now === true ? '' : now;
                  if (_this31._input.value !== val) {
                    _this31._input.value = !val && _this31.defaultValue ? _this31.defaultValue : val;
                  }
                  break;

                case 'default-value':
                  if (!_this31.value) _this31.value = now;
                  break;

                case 'type':
                  if (now === 'hidden') {
                    _this31.hide();
                    return;
                  }
                  if (!['text', 'number', 'password', 'email'].includes(now)) return;
                // fall-through

                case 'placeholder':
                case 'required':
                  if (now == null) {
                    _this31._input.removeAttribute(name);
                  } else {
                    _this31._input.setAttribute(name, now || true);
                  }
                  break;
              }
            });
          }
        }, {
          key: 'value',
          get: function get() {
            switch ((this.attr('type') || 'text').toLowerCase()) {
              case 'date':
                return input2Date(this._input.value);
                break;

              case 'time':
                var value = _get(Input.prototype.__proto__ || Object.getPrototypeOf(Input.prototype), 'value', this);
                return value ? parseTimeString(value) : null;

              default:
                return _get(Input.prototype.__proto__ || Object.getPrototypeOf(Input.prototype), 'value', this);

            }
          },
          set: function set(val) {
            var value = '';
            switch ((this.attr('type') || 'text').toLowerCase()) {
              case 'date':
                switch (Object(__WEBPACK_IMPORTED_MODULE_6__node_modules_extracttype_extracttype_js__["b" /* extractType */])(val)) {
                  case 'Null':
                  case 'Undefined':
                    value = null;
                    break;

                  case 'Date':
                    value = DATE_TYPE_SUPPORTED ? formatAsDateInputValue(val) : formatAsDateInputDisplay(val);

                    break;

                  case 'String':
                    if (!DATE_TYPE_SUPPORTED && !val.match(VALID_INPUT_DATE)) {
                      console.warn('The specified value "' + val + '" does not conform to the required format, "yyyy-MM-dd".');
                    } else {
                      value = val.includes('T') ? val.split('T')[0] : val;
                    }
                    break;
                }
                break;

              case 'time':
                switch (Object(__WEBPACK_IMPORTED_MODULE_6__node_modules_extracttype_extracttype_js__["b" /* extractType */])(val)) {
                  case 'Array':
                    value = val.length ? val.map(pad2).join(':') : '';
                    break;

                  case 'String':
                    value = val;
                    break;

                  case 'Date':
                    value = destructureDateObj(val).slice(3, 5).map(pad2).join(':');
                    break;
                }

                if (!TIME_TYPE_SUPPORTED && !value.match(VALID_INPUT_TIME)) {
                  console.warn('VM71763:1 The specified value "' + val + '" does not conform to the required format.  The format is "HH:mm", "HH:mm:ss" or "HH:mm:ss.SSS" where HH is 00-23, mm is 00-59, ss is 00-59, and SSS is 000-999.');
                }

              default:
                value = val;
            }

            var empty = function () {
              switch (Object(__WEBPACK_IMPORTED_MODULE_6__node_modules_extracttype_extracttype_js__["b" /* extractType */])(value)) {
                case 'Array':
                case 'String':
                  return value.length === 0;
                case 'Null':
                case 'Undefined':
                  return true;
                default:
                  return false;
              }
            }();

            if (empty) {
              this.classList.add('empty');
            } else {
              this.classList.remove('empty');
              this.selectInternalElement('label').classList.remove('text-moved');
            }

            return _set(Input.prototype.__proto__ || Object.getPrototypeOf(Input.prototype), 'value', value == null ? '' : value, this);
          }
        }]);

        return Input;
      }(Object(__WEBPACK_IMPORTED_MODULE_5__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_4__temp_utils_ui_component_base_js__["a" /* UIBase */]).with(__WEBPACK_IMPORTED_MODULE_1__form_js__["a" /* FormControlBehavior */], __WEBPACK_IMPORTED_MODULE_2__temp_utils_focusable_js__["a" /* default */]))
    });
    /* unused harmony export Input */

    /***/
  },
  /* 20 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__checkbox_js__ = __webpack_require__(29);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__form_js__ = __webpack_require__(7);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__temp_animations_rippler_js__ = __webpack_require__(10);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__temp_utils_focusable_js__ = __webpack_require__(5);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__temp_utils_ui_component_base_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_6__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(1);
    /*
     * list.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * list component for ui-components-lite.
     *
     * NOTE: it is not currently (and may never) be possible to extend built-in elements like <ul>.
     * If it does become possible this can be refactored to support extending <ul> or <ol>.
     */

    var handlerCache = new WeakMap();
    var ListBehavior = function ListBehavior(superclass) {
      return Object(__WEBPACK_IMPORTED_MODULE_4__temp_utils_ui_component_base_js__["b" /* defineUIComponent */])({
        name: 'ui-list-behavior',
        reflectedAttributes: ['multiple', 'selected-index'],
        registerElement: false,
        definition: function (_Object$with5) {
          _inherits(definition, _Object$with5);

          function definition() {
            _classCallCheck(this, definition);

            var _this32 = _possibleConstructorReturn(this, (definition.__proto__ || Object.getPrototypeOf(definition)).call(this));

            _this32._items = [];
            _this32._selected = null;
            return _this32;
          }

          // Using a closure here because getting the item back out of the Event object is unreliable.


          _createClass(definition, [{
            key: '_itemHandlerFactory',
            value: function _itemHandlerFactory(item) {
              var _this33 = this;

              var h = handlerCache.get(item);
              if (h) return h;
              var f = function f(e) {
                if (_this33.multiple === true) {
                  if (!item.isSelected && !_this33.selected.includes(item)) {
                    item.isSelected = true;
                    _this33.selected = item; // pushes in setter
                  } else if (item.isSelected) {
                    item.isSelected = false;
                    _this33._deSelect(item);
                  }
                } else {
                  if (!item.isSelected && item !== _this33.selected) {
                    item.isSelected = true;
                    _this33.selected = item;
                  }
                }

                return;
              };

              handlerCache.set(item, f);
              return f;
            }
          }, {
            key: '_deSelect',
            value: function _deSelect(item) {
              if (this.multiple === true) {
                this._selected = this._selected.filter(function (x) {
                  return x !== item;
                });
                this.dispatchEvent(new Event('change'));
              }
              return this;
            }
          }, {
            key: 'appendChild',
            value: function appendChild(node) {
              var _this34 = this;

              var p = node.onReady(function (el) {
                if (el.matches && el.matches('.ui-item')) {
                  el.on('click', _this34._itemHandlerFactory(el));
                  _get(definition.prototype.__proto__ || Object.getPrototypeOf(definition.prototype), 'appendChild', _this34).call(_this34, el);
                  _this34._items.push(el);
                  if (el.isSelected) _this34.selected = el;
                }
              });
              if (this._pendingDOM) this._pendingDOM.push(p);
              return node;
            }
          }, {
            key: 'init',
            value: function init() {
              var _this35 = this;

              _get(definition.prototype.__proto__ || Object.getPrototypeOf(definition.prototype), 'init', this).call(this);
              this.on('keydown', function (e) {
                var el = function () {
                  switch (e.keyCode) {
                    case 40:
                      return _this35._items[(_this35._items.indexOf(el) + 1) % _this35._items.length];
                    case 38:
                      return _this35._items[+(_this35._items.indexOf(el) - 1)];
                    default:
                      return null;
                  }
                }();

                if (el) el.focus();
              });

              this.on('attribute-change', function (_ref26) {
                var _ref26$changed = _ref26.changed,
                    now = _ref26$changed.now,
                    name = _ref26$changed.name;

                switch (name) {
                  case 'multiple':
                    if (now === true) {
                      _this35.selectedIndex = -1;
                      _this35._selected = _this35._selected ? [_this35._selected] : [];
                      _this35.attr('aria-multiselectable', true);
                    } else {
                      _this35.attr('aria-multiselectable', false);
                      _this35.selected = _this35.selected == null ? null : _this35.selected[0];
                    }
                    break;

                  case 'selected-index':
                    if (now === -1 || _this35.multiple) return;
                    if (!_this35._items[now]) {
                      console.warn('Attempted to set invalid index ' + now + ' for element.');
                      _this35.attr('selected-index', was);
                      return;
                    }

                    if (_this35._items[now] !== _this35.selected) _this35.selected = now;
                    break;
                }
              });

              this._beforeReady(function (_) {
                _this35.selectAll('.ui-item').map(function (item) {
                  _this35._items.push(item);
                  if (item.attr('is-selected')) _this35.selected = item;
                  item.on('click enter-key', _this35._itemHandlerFactory(item));
                });
              });
            }
          }, {
            key: 'items',
            get: function get() {
              return this.selectAll('.ui-item');
            }
          }, {
            key: 'value',
            get: function get() {
              return this.selected && this.selected.map ? this.selected.map(function (x) {
                return x ? x.value : '';
              }).join(',') : this.selected && this.selected.value || null;
            },
            set: function set(value) {
              this.selected = value;
            }
          }, {
            key: 'selected',
            get: function get() {
              return this._selected;
            },
            set: function set(value) {
              if (value === null) {
                this._selected = null;
                return;
              }

              var type = Object(__WEBPACK_IMPORTED_MODULE_5__node_modules_extracttype_extracttype_js__["a" /* default */])(value);
              var selection = void 0;
              switch (type) {
                case 'Number':
                  selection = this._items[value];
                  break;

                case 'String':
                  selection = this.querySelector('[value="' + value + '"]');
                  if (!selection) selection = this._items.filter(function (x) {
                    return x.textContent === value;
                  })[0];
                  break;
              }

              if (type.match(/HTML\w*Element/) && this._items.includes(value)) selection = value;
              if (selection) {
                selection.attr('aria-selected', true);
                selection.isSelected = true;
                if (this.multiple === true) {
                  this._selected.push(selection);
                  this.dispatchEvent(new Event('change'));
                } else {
                  this.selectedIndex = this._items.indexOf(selection);
                  this._selected = selection;
                  this._items.forEach(function (item) {
                    if (item !== selection) item.isSelected = false;
                    item.attr('aria-selected', false);
                  });
                }
              }

              return selection;
            }
          }]);

          return definition;
        }(Object(__WEBPACK_IMPORTED_MODULE_6__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(superclass).with(__WEBPACK_IMPORTED_MODULE_1__form_js__["a" /* FormControlBehavior */]))
      });
    };
    /* harmony export (immutable) */__webpack_exports__["b"] = ListBehavior;

    var Item = function () {
      var template = __WEBPACK_IMPORTED_MODULE_4__temp_utils_ui_component_base_js__["c" /* document */].createElement('template');
      var reflectedAttributes = ['is-selected', 'value'];
      template.innerHTML = '\n    <style>\n      :host {\n        --ui-theme-ripple-color: var(--ui-theme-primary-dark-color, rgb(0, 139, 163));\n        display: block;\n        margin-top: 10px;\n        margin-bottom: 10px;\n        min-height: 20px;\n        background-color: inherit;\n        color: inherit;\n        border-radius: 0;\n        text-transform: capitalize;\n        width: 90%;\n        margin-left: 5%;\n        padding-top: 4px;\n      }\n\n      :host(:hover) {\n        color: var(--ui-theme-primary-dark-color, #999);\n      }\n\n      :host(.selected) {\n        border-bottom: 1px solid var(--ui-theme-primary-dark-color, rgb(0, 139, 163));\n      }\n\n      .ui-checkbox {\n        display: none;\n        height: 18px;\n        width: 18px;\n        float: left;\n      }\n\n      .ui-checkbox::before {\n        top: 2px;\n        height: 9px;\n        left: 5px;\n      }\n\n      :host-context([multiple="true"]) {\n        border-bottom: none;\n      }\n\n      :host-context([multiple="true"]) ui-checkbox {\n        display: inline-block;\n      }\n\n      :host-context([multiple="true"]) #content {\n        position: relative;\n        left: -10px; /* offsets checkbox */\n      }\n    </style>\n    <ui-checkbox></ui-checkbox>\n    <span id="content"><slot></slot></span>\n  ';

      return Object(__WEBPACK_IMPORTED_MODULE_4__temp_utils_ui_component_base_js__["b" /* defineUIComponent */])({
        name: 'ui-item',
        template: template,
        reflectedAttributes: reflectedAttributes,
        definition: function (_Object$with6) {
          _inherits(Item, _Object$with6);

          function Item() {
            _classCallCheck(this, Item);

            var _this36 = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this));

            _this36._checkbox = null;
            _this36._content = null;
            return _this36;
          }

          _createClass(Item, [{
            key: 'init',
            value: function init() {
              var _this37 = this;

              _get(Item.prototype.__proto__ || Object.getPrototypeOf(Item.prototype), 'init', this).call(this);
              this.attr('role', 'listoption');
              this._beforeReady(function (_) {
                _this37._checkbox = _this37.selectInternalElement('ui-checkbox');
                _this37._content = _this37.selectInternalElement('#content');
                if (!_this37.value || _this37.value.toString() === 'true') _this37.value = _this37.textContent;
                if (!_this37.isSelected) _this37.isSelected = false;
              });

              this.on('attribute-change', function (_ref27) {
                var _ref27$changed = _ref27.changed,
                    now = _ref27$changed.now,
                    name = _ref27$changed.name;

                switch (name) {
                  case 'is-selected':
                    _this37.onReady(function (_) {
                      if (now) {
                        _this37.classList.add('selected');
                        _this37._checkbox.checked = true;
                        _this37.dispatchEvent(new CustomEvent('component-selected'));
                      } else {
                        _this37.classList.remove('selected');
                        _this37._checkbox.checked = false;
                        _this37.dispatchEvent(new CustomEvent('component-deselected'));
                      }
                    });
                    break;
                }
              });
            }
          }]);

          return Item;
        }(Object(__WEBPACK_IMPORTED_MODULE_6__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_4__temp_utils_ui_component_base_js__["a" /* UIBase */]).with(__WEBPACK_IMPORTED_MODULE_2__temp_animations_rippler_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__temp_utils_focusable_js__["a" /* default */]))
      });
    }();
    /* harmony export (immutable) */__webpack_exports__["a"] = Item;

    var List = function () {
      var template = __WEBPACK_IMPORTED_MODULE_4__temp_utils_ui_component_base_js__["c" /* document */].createElement('template');
      template.innerHTML = '\n    <style>\n      :host {\n        display: block;\n        text-align: center;\n        margin: 5px;\n      }\n    </style>\n    <slot></slot>\n  ';

      return Object(__WEBPACK_IMPORTED_MODULE_4__temp_utils_ui_component_base_js__["b" /* defineUIComponent */])({
        name: 'ui-list',
        template: template,
        definition: function (_Object$with7) {
          _inherits(List, _Object$with7);

          function List() {
            _classCallCheck(this, List);

            return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
          }

          _createClass(List, [{
            key: 'init',
            value: function init() {
              _get(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), 'init', this).call(this);
              this.attr('role', 'list');
            }
          }]);

          return List;
        }(Object(__WEBPACK_IMPORTED_MODULE_6__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_4__temp_utils_ui_component_base_js__["a" /* UIBase */]).with(ListBehavior))
      });
    }();
    /* unused harmony export List */

    /***/
  },
  /* 21 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__temp_elements_login_js__ = __webpack_require__(22);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__temp_elements_fab_js__ = __webpack_require__(14);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__temp_elements_drop_down_js__ = __webpack_require__(28);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__temp_elements_drawer_js__ = __webpack_require__(30);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__temp_elements_hamburger_js__ = __webpack_require__(32);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__temp_elements_input_js__ = __webpack_require__(19);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_6__temp_elements_router_js__ = __webpack_require__(33);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_7__temp_elements_tabs_js__ = __webpack_require__(34);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_8__temp_elements_text_js__ = __webpack_require__(11);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_9__temp_elements_toolbar_js__ = __webpack_require__(35);

    /***/
  },
  /* 22 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__card_js__ = __webpack_require__(12);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__fab_js__ = __webpack_require__(14);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__alert_js__ = __webpack_require__(26);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__form_js__ = __webpack_require__(7);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__input_js__ = __webpack_require__(19);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__temp_utils_ui_component_base_js__ = __webpack_require__(0);
    /*
     * login.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * login component for ui-components-lite.
     */

    var INVALID = 'Invalid login credentials. Please double-check your username and password.';
    var FAILURE = 'Could not connect to the server to verify your identity. Please check the console for details.';

    var reflectedAttributes = ['is-logged-in', 'data-url', 'session-timeout'];
    var template = __WEBPACK_IMPORTED_MODULE_5__temp_utils_ui_component_base_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    ui-card {\n      width: 300px;\n      height: 315px;\n    }\n\n    ui-input {\n      margin-bottom: 30px;\n    }\n\n    ui-fab {\n      float: right;\n      position: relative;\n      left: 15px;\n    }\n\n    h2 {\n      color: #AAA;\n      font-style: italic;\n      margin-bottom: 40px;\n    }\n\n    #heading {\n      width: 70%;\n      margin-left: 10%;\n      border-bottom: var(--ui-theme-dark-text-color, #999);\n    }\n\n    .arrow {\n      border: solid #fff;\n      border-width: 0 4px 5px 0;\n      display: inline-block;\n      padding: 3px;\n      position: relative;\n      transform: rotate(45deg);\n      height: 25px;\n      width: 12px;\n      top: -2px;\n      left: 2px;\n    }\n\n    :host {\n      position: relative;\n      left: 50px;\n      top: 50px;\n    }\n  </style>\n  <ui-card>\n    <h2 id="heading">Login</h2>\n    <ui-form>\n      <ui-input name="user" label="User" tabindex="1" required></ui-input>\n      <ui-input name="pass" label="Password" type="password" tabindex="1" required></ui-input>\n      <ui-fab tabindex="1"><div class="arrow"></div></ui-fab>\n    </ui-form>\n  </ui-card>\n';

    /* unused harmony default export */var _unused_webpack_default_export = Object(__WEBPACK_IMPORTED_MODULE_5__temp_utils_ui_component_base_js__["b" /* defineUIComponent */])({
      name: 'ui-login',
      reflectedAttributes: reflectedAttributes,
      template: template,
      definition: function (_WEBPACK_IMPORTED_MO5) {
        _inherits(Login, _WEBPACK_IMPORTED_MO5);

        function Login() {
          _classCallCheck(this, Login);

          var _this39 = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this));

          _this39._alert = null;
          _this39._form = null;
          _this39._sessionTimeoutHandle = null;
          return _this39;
        }

        _createClass(Login, [{
          key: 'login',
          value: function login(resp) {
            this.isLoggedIn = true;
            var evt = new CustomEvent('login', { bubbles: true });
            evt.credentials = this.credentials;
            evt.response = resp;
            this.dispatchEvent(evt);
            this._sessionTimeoutHandle = this.countDown();
          }
        }, {
          key: 'logout',
          value: function logout() {
            this.isLoggedIn = null;
            this.selectInternalElement('[name="user"]').value = '';
            this.selectInternalElement('[name="pass"]').value = '';
            __WEBPACK_IMPORTED_MODULE_5__temp_utils_ui_component_base_js__["d" /* global */].sessionStorage.setItem('ui-credentials', '');
            this.dispatchEvent(new CustomEvent('logout', { bubbles: true }));
            return this;
          }
        }, {
          key: 'userLogout',
          value: function userLogout() {
            var name = this.credentials.name;

            this.logout();
            this._alert.alert('User ' + name + ' is now logged out. Please close this tab.');
            this._alert.selectInternalElement('#closer');
          }
        }, {
          key: 'countDown',
          value: function countDown(h) {
            var _this40 = this;

            __WEBPACK_IMPORTED_MODULE_5__temp_utils_ui_component_base_js__["d" /* global */].clearTimeout(h);
            return __WEBPACK_IMPORTED_MODULE_5__temp_utils_ui_component_base_js__["d" /* global */].setTimeout(function () {
              _this40.logout();
              _this40._alert.alert('Session timed out. Please login again or close the tab.');
              _this40._alert.selectInternalElement('#closer');
            }, this.sessionTimeout || 30 * 60 * 1000);
          }
        }, {
          key: 'init',
          value: function init() {
            var _this41 = this;

            _get(Login.prototype.__proto__ || Object.getPrototypeOf(Login.prototype), 'init', this).call(this);
            this._beforeReady(function (_) {
              _this41._form = _this41.selectInternalElement('ui-form');
              _this41._alert = __WEBPACK_IMPORTED_MODULE_5__temp_utils_ui_component_base_js__["c" /* document */].querySelector('ui-alert');
              if (!_this41._alert) {
                _this41._alert = __WEBPACK_IMPORTED_MODULE_5__temp_utils_ui_component_base_js__["c" /* document */].createElement('ui-alert');
                __WEBPACK_IMPORTED_MODULE_5__temp_utils_ui_component_base_js__["c" /* document */].body.appendChild(_this41._alert);
              }

              // Reset the session timeout on interaction.
              ['click', 'keydown'].forEach(function (evt) {
                __WEBPACK_IMPORTED_MODULE_5__temp_utils_ui_component_base_js__["c" /* document */].addEventListener(evt, function (e) {
                  if (_this41.isLoggedIn) _this41._sessionTimeoutHandle = _this41.countDown(_this41._sessionTimeoutHandle);
                });
              });

              var handler = function handler(_) {
                if (!_this41.isLoggedIn) {
                  if (!_this41.dataUrl) {
                    throw new Error('No url for login, whatcha want me to do?');
                  }

                  if (!_this41._form.isValid) {
                    _this41._alert.alert('Please supply a Username and Password.');
                    return;
                  }

                  var _credentials = _this41.credentials,
                      user = _credentials.user,
                      pass = _credentials.pass;

                  var headers = {
                    'Authorization': 'Basic ' + btoa(user + ':' + pass),
                    'Content-Type': 'application/x-www-form-urlencoded'
                  };

                  fetch(_this41.dataUrl, { method: 'POST', headers: headers }).then(function (resp) {
                    return resp.json();
                  }).then(function (valid) {
                    if (valid) {
                      sessionStorage.setItem('ui-credentials', JSON.stringify(_this41.credentials));
                      _this41.login(valid);
                    } else {
                      _this41._alert.alert(INVALID);
                    }
                  }).catch(function (err) {
                    console.error(err);
                    _this41._alert.alert(FAILURE);
                  });
                }
              };

              _this41.selectInternalElement('ui-fab').on('click enter-key', handler);
              _this41.selectInternalElement('[name="pass"]').on('enter-key', handler);
            });

            this.onReady(function (_) {
              var bttn = __WEBPACK_IMPORTED_MODULE_5__temp_utils_ui_component_base_js__["c" /* document */].querySelector('[logout-button]');
              // If added later event handling needs to be done manually.
              if (bttn) {
                bttn.on('click keydown', function (e) {
                  if (!e.keyCode || e.keyCode === 13) {
                    _this41.userLogout();
                  }
                });
              }

              // Wait a bit to allow handlers to be set if anything wants to listen for the login
              // event.
              __WEBPACK_IMPORTED_MODULE_5__temp_utils_ui_component_base_js__["d" /* global */].setTimeout(function () {
                var cached = __WEBPACK_IMPORTED_MODULE_5__temp_utils_ui_component_base_js__["d" /* global */].sessionStorage.getItem('ui-credentials');
                if (cached) {
                  try {
                    var credentials = JSON.parse(cached);
                    if (credentials.user && credentials.pass) {
                      console.log('Logging in with session data...');
                      _this41.login();
                      _this41._form.data = credentials;
                    }
                  } catch (e) {
                    // no-op
                  }
                }
              }, 500);
            });
          }
        }, {
          key: 'credentials',
          get: function get() {
            return this.selectInternalElement('ui-form').serialize();
          }
        }]);

        return Login;
      }(__WEBPACK_IMPORTED_MODULE_5__temp_utils_ui_component_base_js__["a" /* UIBase */])
    });

    /***/
  },
  /* 23 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /*
     * binder.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * data-binding mixin for ui-components-lite.
     */

    /* harmony default export */
    __webpack_exports__["a"] = function (superclass) {
      return function (_superclass6) {
        _inherits(DataBinder, _superclass6);

        function DataBinder() {
          _classCallCheck(this, DataBinder);

          var _this42 = _possibleConstructorReturn(this, (DataBinder.__proto__ || Object.getPrototypeOf(DataBinder)).call(this));

          _this42._oneWayBoundAttrs = {};
          _this42._twoWayBoundAttrs = {};
          _this42._internalMutationFlag = false;
          return _this42;
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


        _createClass(DataBinder, [{
          key: 'bindAttribute',
          value: function bindAttribute(attribute, parentAttribute) {
            var _this43 = this;

            var twoWay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var parent = null;
            var node = this;
            while (node = node.parentNode || node.host) {
              // need host for shadowRoots
              if (node.getAttribute && node.getAttribute(parentAttribute) != null || node.constructor && node.constructor.observedAttributes && node.constructor.observedAttributes.includes(parentAttribute)) {
                parent = node;
                break;
              }
            }

            if (!parent) {
              throw new Error('Attempted to bind attribute ' + attribute + ' to ' + parentAttribute + ',' + 'but no matching parent found.');
            }

            var bind = function bind() {
              if (!parent.isUIComponent) {
                console.warn('Attempted to data-bind ' + parentAttribute + ' to non-ui-component parent.');
                return;
              }

              // Initial set
              _this43.attr(attribute, parent.attr(parentAttribute));

              // Watch changes.
              _this43.watchAttribute(parent, parentAttribute, function (now, name, was) {
                if (_this43.attr(attribute) !== now) {
                  _this43._internalMutationFlag = true;
                  _this43.attr(attribute, now);
                }
              });

              if (twoWay) {
                _this43.watchAttribute(_this43, attribute, function (now, name, was) {
                  if (parent.attr(parentAttribute) !== now) {
                    parent.attr(parentAttribute, now);
                  }
                });
                _this43._twoWayBoundAttrs[attribute] = parentAttribute;
              } else {
                _this43._oneWayBoundAttrs[attribute] = parentAttribute;
              }
            };

            parent.onReady(bind);
          }
        }]);

        return DataBinder;
      }(superclass);
    };

    /***/
  },
  /* 24 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__dom_js__ = __webpack_require__(2);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__attribute_analyzer_js__ = __webpack_require__(9);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);
    /*
     * dom-utils.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * DOM manipulation mixin for ui-components-lite.
     */

    var attrConf = { attributes: true };
    var isHTMLElement = function isHTMLElement(arg) {
      return Boolean(Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_extracttype_extracttype_js__["a" /* default */])(arg).match(/HTML[a-zA-Z]*Element/));
    };
    /* harmony default export */__webpack_exports__["a"] = function (superclass) {
      return function (_superclass7) {
        _inherits(DOMutils, _superclass7);

        function DOMutils() {
          _classCallCheck(this, DOMutils);

          var _this44 = _possibleConstructorReturn(this, (DOMutils.__proto__ || Object.getPrototypeOf(DOMutils)).call(this));

          _this44._mutationObservers = [];
          _this44._prevDisplay = '';
          _this44._isHidden = false;
          return _this44;
        }

        _createClass(DOMutils, [{
          key: 'watchAttribute',


          // Observes changes to the given attribute on the given node.
          value: function watchAttribute(n, a, callb) {
            var _this45 = this;

            var _ref28 = function () {
              if (isHTMLElement(n)) return [n, a, callb];
              return [_this45, n, a];
            }(),
                _ref29 = _slicedToArray(_ref28, 3),
                node = _ref29[0],
                attr = _ref29[1],
                cb = _ref29[2];

            if ((node.constructor.observedAttributes || []).includes(attr)) {
              node.on('attribute-change', function (_ref30) {
                var _ref30$changed = _ref30.changed,
                    now = _ref30$changed.now,
                    name = _ref30$changed.name,
                    was = _ref30$changed.was;

                if (name === attr) cb(now, name, was);
              });
            } else {
              var observer = new MutationObserver(function (_ref31) {
                var _ref32 = _slicedToArray(_ref31, 1),
                    mutation = _ref32[0];

                if (mutation.attributeName === attr) {
                  cb(node.attr(mutation.attributeName), mutation.attributeName, mutation.oldValue);
                }
              });

              observer.observe(node, attrConf);
              this._mutationObservers.push([observer, node, attrConf]);
            }

            return this;
          }
        }, {
          key: 'selectAll',
          value: function selectAll(selector) {
            var nodeList = this.querySelectorAll(selector);
            return nodeList ? [].concat(_toConsumableArray(nodeList)) : [];
          }
        }, {
          key: 'matches',
          value: function matches(selector) {
            if (_get(DOMutils.prototype.__proto__ || Object.getPrototypeOf(DOMutils.prototype), 'matches', this)) return _get(DOMutils.prototype.__proto__ || Object.getPrototypeOf(DOMutils.prototype), 'matches', this).call(this, selector);
            if (_get(DOMutils.prototype.__proto__ || Object.getPrototypeOf(DOMutils.prototype), 'msMatchesSelector', this)) return _get(DOMutils.prototype.__proto__ || Object.getPrototypeOf(DOMutils.prototype), 'msMatchesSelector', this).call(this, selector);
            throw new Error('HTMLElement does not implement the matches method.');
          }
        }, {
          key: 'selectInternalElement',
          value: function selectInternalElement(selector) {
            if (!this.shadowRoot) {
              console.warn('Internal selector ' + selector + ' called on ' + this.identity + ' which has no shadowRoot.');
              return null;
            }
            return this.shadowRoot.querySelector(selector);
          }
        }, {
          key: 'selectInternalAll',
          value: function selectInternalAll(selector) {
            if (!this.shadowRoot) {
              console.warn('Internal selector ' + selector + ' called on ' + this.identity + ' which has no shadowRoot.');
              return null;
            }
            return [].concat(_toConsumableArray(this.shadowRoot.querySelectorAll(selector)));
          }
        }, {
          key: 'on',


          /**
           * on :: Event, (Event -> *) -> this
           *
           * Registers an event listener. Listeners added via this method are
           * automatically removed and reattached on being removed from/added to the
           * DOM.
           */
          value: function on(evts, fn) {
            var _this46 = this;

            evts.split(/\s+/g).forEach(function (evt) {
              var isDupe = _this46._listeners.some(function (_ref33) {
                var _ref34 = _slicedToArray(_ref33, 2),
                    e = _ref34[0],
                    f = _ref34[1];

                return e === evt && fn === f;
              });
              if (!isDupe) {
                _this46.addEventListener(evt, fn);
                _this46._listeners.push([evt, fn]);
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

        }, {
          key: 'remove',
          value: function remove() {
            var _this47 = this;

            for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
              args[_key6] = arguments[_key6];
            }

            var _ref35 = function (arr) {
              switch (arr.length) {
                case 0:
                  _this47.parentElement && _this47.parentElement.removeChild(_this47);
                  return [];

                case 1:
                  return function (_ref37) {
                    var _ref38 = _slicedToArray(_ref37, 1),
                        item = _ref38[0];

                    var type = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_extracttype_extracttype_js__["a" /* default */])(item);
                    // leaving this as a switch in case I think of more options later
                    switch (type) {
                      case 'Function':
                        return [null, item];
                      default:
                        if (isHTMLElement(item) || type === 'Text') return [null, null, [item]];
                        return [];
                    }
                  }(arr);

                default:
                  return function (args) {
                    var _args = _slicedToArray(args, 1),
                        first = _args[0];

                    if (isHTMLElement(first) || Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_extracttype_extracttype_js__["a" /* default */])(first) === 'Text') {
                      return [null, null, args];
                    }
                    return args.slice(0, 2);
                  }(arr);
              }
            }(args),
                _ref36 = _slicedToArray(_ref35, 3),
                evt = _ref36[0],
                fn = _ref36[1],
                children = _ref36[2];

            if (fn && Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_extracttype_extracttype_js__["a" /* default */])(fn) === 'Function') {
              this._listeners = this._listeners.filter(function (_ref39) {
                var _ref40 = _slicedToArray(_ref39, 2),
                    e = _ref40[0],
                    f = _ref40[1];

                if (f === fn && (evt === null || evt === e)) {
                  _this47.removeEventListener(e, f);
                  return false;
                }
                return true;
              });
            }

            if (children) {
              children.forEach(function (child) {
                return _this47.removeChild(child);
              });
            }

            return this;
          }
        }, {
          key: 'hide',
          value: function hide() {
            if (!this._isHidden) {
              this._prevDisplay = this.style.display;
              this._isHidden = true;
              this.style.display = 'none';
            }
            return this;
          }
        }, {
          key: 'show',
          value: function show() {
            if (this._isHidden) {
              this.style.display = this._prevDisplay;
              this._isHidden = false;
            }
            return this;
          }
        }, {
          key: 'attr',
          value: function attr(name, value) {
            if (value === undefined) {
              return Object(__WEBPACK_IMPORTED_MODULE_1__attribute_analyzer_js__["a" /* default */])(this.getAttribute(name));
            } else {
              switch (Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_extracttype_extracttype_js__["a" /* default */])(value)) {
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
        }, {
          key: 'appendFirst',
          value: function appendFirst(node, shadow) {
            var parent = shadow ? this.shadowRoot : this;
            if (!parent) {
              throw new TypeError('Attempted to append to shadowRoot but none exists on element ' + this.identity);
            }
            if (parent.children.length) {
              parent.insertBefore(node, parent.children[0]);
            } else {
              parent.appendChild(node);
            }

            return this;
          }
        }, {
          key: 'isVisible',
          get: function get() {
            var style = __WEBPACK_IMPORTED_MODULE_0__dom_js__["d" /* global */].getComputedStyle(this);
            return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
          }
        }, {
          key: 'identity',
          get: function get() {
            var id = this.id ? '#' + this.id : '';
            var tag = this.tagName.toLowerCase();
            var classes = '.' + this.attr('class').split(' ').filter(function (c) {
              return c !== tag;
            }).join('.');
            return '' + tag + id + classes;
          }
        }]);

        return DOMutils;
      }(superclass);
    };

    /***/
  },
  /* 25 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /*
     * promise-from-event.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * Utility function that returns a Promise that resolves as soon as the associated event fires.
     *
     * NOTE: the listener is automatically removed when the event fires, so no memory leak and
     * side effects will only happen once.
     */

    /* harmony default export */
    __webpack_exports__["a"] = function (_ref41) {
      var eventName = _ref41.eventName,
          element = _ref41.element,
          callback = _ref41.callback,
          timeout = _ref41.timeout;

      if (!eventName || !element) {
        throw new TypeError('Missing required arguments to function.');
      }

      return new Promise(function (res, rej) {
        var timeoutHandle = void 0;
        if (timeout) {
          timeoutHandle = setTimeout(function () {
            rej(new Error('The element did not fire the event before the ' + timeout + 'ms timeout.'));
          }, timeout);
        }

        var listener = function listener(e) {
          clearTimeout(timeoutHandle);
          element.removeEventListener(eventName, listener);
          if (callback) res(callback(e));
          res(e);
        };

        element.addEventListener(eventName, listener);
      });
    };

    /***/
  },
  /* 26 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__button_js__ = __webpack_require__(6);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__dialog_js__ = __webpack_require__(27);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__temp_utils_dom_js__ = __webpack_require__(2);
    /*
     * alert.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * alert component for ui-components-lite.
     */

    var template = __WEBPACK_IMPORTED_MODULE_2__temp_utils_dom_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    :host {\n      top: 30%;\n    }\n\n    #content {\n      width: 90%;\n      margin-left: auto;\n      margin-right: auto;\n      height: 65%;\n    }\n\n    #closer {\n      background-color: var(--ui-theme-warning-color, #e83673);\n      color: var(--ui-theme-light-text-color, #fff);\n      position: relative;\n      width: 105px;\n      height: 50px;\n      top: 12px;\n      left: calc(100% - 105px);\n    }\n  </style>\n  <div id="content"></div>\n  <ui-button id="closer" dialog-dismiss>Close</ui-button>\n';

    var Alert = Object(__WEBPACK_IMPORTED_MODULE_2__temp_utils_dom_js__["b" /* defineUIComponent */])({
      name: 'ui-alert',
      template: template,
      definition: function (_WEBPACK_IMPORTED_MO6) {
        _inherits(Alert, _WEBPACK_IMPORTED_MO6);

        function Alert() {
          _classCallCheck(this, Alert);

          return _possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).apply(this, arguments));
        }

        _createClass(Alert, [{
          key: 'init',
          value: function init() {
            var _this49 = this;

            _get(Alert.prototype.__proto__ || Object.getPrototypeOf(Alert.prototype), 'init', this).call(this);
            this.attr('role', 'alert');
            this.scrollableDialog = false;
            this.smallDialog = true;
            this.attr('is-modal', true);
            this.watchAttribute(this, 'is-open', function (open) {
              open ? _this49._backdrop.show() : _this49._backdrop.hide();
            });

            var closer = this.selectInternalElement('#closer');
            this.on('dialog-opened', function (e) {
              closer.focus();
            });
          }
        }, {
          key: 'alert',
          value: function alert(txt) {
            this.textContent = txt;
            return this.open();
          }
        }, {
          key: 'textContent',
          get: function get() {
            return this.selectInternalElement('#content').textContent;
          },
          set: function set(txt) {
            this.selectInternalElement('#content').textContent = txt;
            return this;
          }
        }]);

        return Alert;
      }(__WEBPACK_IMPORTED_MODULE_1__dialog_js__["a" /* default */])
    });

    /* unused harmony default export */var _unused_webpack_default_export = Alert;

    /***/
  },
  /* 27 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__card_js__ = __webpack_require__(12);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__backdrop_js__ = __webpack_require__(16);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__button_js__ = __webpack_require__(6);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__temp_utils_float_js__ = __webpack_require__(4);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__temp_utils_dom_js__ = __webpack_require__(2);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(1);
    /*
     * dialog.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * dialog component for ui-components-lite.
     */

    var template = __WEBPACK_IMPORTED_MODULE_4__temp_utils_dom_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    :host {\n      display: block;\n      position: absolute;\n      padding: 20px;\n      z-index: 10001;\n      background-color: #fff;\n      overflow: hidden;\n    }\n\n    :host(.large-dialog) {\n      width: 80%;\n      height: 80%;\n      top: 8%;\n      left: 9%;\n    }\n\n    :host(.small-dialog) {\n      width: 250px;\n      height: 185px;\n      top: calc(50vh - 130px);\n      left: calc(50vw - 155px);\n    }\n\n    :host(.medium-dialog) {\n      width: 50%;\n      height: 50%;\n      top: 20%;\n      left: 25%;\n    }\n\n    :host(.scrollable-dialog) {\n      overflow: scroll;\n    }\n  </style>\n';

    var reflectedAttributes = ['is-open', 'is-modal', 'small-dialog', 'medium-dialog', 'large-dialog', 'scrollable-dialog'];

    var manipulators = new WeakMap();
    var incorporateButtonChild = function incorporateButtonChild(el, child) {
      var manip = manipulators.get(el);
      if (!manip) {
        manip = [function (e) {
          el.close();
          el.dispatchEvent(new CustomEvent('dialog-dismiss'));
        }, function (e) {
          el.close();
          el.dispatchEvent(new CustomEvent('dialog-confirm'));
        }];
        manipulators.set(el, manip);
      }

      var _manip = manip,
          _manip2 = _slicedToArray(_manip, 2),
          dismisser = _manip2[0],
          confirmer = _manip2[1];

      if (child.attr('dialog-dismiss')) child.on('click enter-key', dismisser);
      if (child.attr('dialog-confirm')) child.on('click enter-key', confirmer);
      child.watchAttribute(child, 'dialog-dismiss', function (now) {
        now ? child.on('click enter-key', dismisser) : child.remove(dismisser);
      });

      child.watchAttribute(child, 'dialog-confirm', function (now) {
        now ? child.on('click enter-key', confirmer) : child.remove(confirmer);
      });

      return el;
    };

    var Dialog = Object(__WEBPACK_IMPORTED_MODULE_4__temp_utils_dom_js__["b" /* defineUIComponent */])({
      name: 'ui-dialog',
      template: template,
      reflectedAttributes: reflectedAttributes,
      definition: function (_WEBPACK_IMPORTED_MO7) {
        _inherits(Dialog, _WEBPACK_IMPORTED_MO7);

        function Dialog() {
          _classCallCheck(this, Dialog);

          var _this50 = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this));

          _this50._backdrop = null;
          __WEBPACK_IMPORTED_MODULE_4__temp_utils_dom_js__["d" /* global */].addEventListener('logout', function (e) {
            _this50.close();
          });
          return _this50;
        }

        // Intercepts calls to appendChild so buttons can be appropriately used.


        _createClass(Dialog, [{
          key: 'appendChild',
          value: function appendChild(node) {
            var _this51 = this;

            if (node && node.onReady) {
              node.onReady(function (el) {
                if (el && el.matches && el.matches('.ui-button')) {
                  incorporateButtonChild(_this51, el);
                  _this51.shadowRoot.appendChild(el);
                } else {
                  _get(Dialog.prototype.__proto__ || Object.getPrototypeOf(Dialog.prototype), 'appendChild', _this51).call(_this51, node);
                }
              });
            }

            return node;
          }
        }, {
          key: 'open',
          value: function open(txt) {
            this.isOpen = true;
            return this;
          }
        }, {
          key: 'close',
          value: function close() {
            this.isOpen = false;
            return this;
          }
        }, {
          key: 'init',
          value: function init() {
            var _this52 = this;

            _get(Dialog.prototype.__proto__ || Object.getPrototypeOf(Dialog.prototype), 'init', this).call(this);
            this.hide();
            this.attr('role', 'dialog');
            this._backdrop = __WEBPACK_IMPORTED_MODULE_4__temp_utils_dom_js__["c" /* document */].createElement('ui-backdrop');
            this._backdrop.for = this;
            __WEBPACK_IMPORTED_MODULE_4__temp_utils_dom_js__["c" /* document */].body.appendChild(this._backdrop);

            this._beforeReady(function (_) {
              [].concat(_toConsumableArray(_this52.selectInternalAll('.ui-button')), _toConsumableArray(_this52.selectAll('.ui-button'))).forEach(function (el) {
                return incorporateButtonChild(_this52, el);
              });
            });

            var closer = function closer(e) {
              _this52.close();
            };

            this.on('attribute-change', function (_ref42) {
              var _ref42$changed = _ref42.changed,
                  now = _ref42$changed.now,
                  name = _ref42$changed.name;

              switch (name) {
                case 'small-dialog':
                  return now ? (_this52.classList.add('small-dialog'), _this52.classList.remove('medium-dialog', 'large-dialog')) : _this52.classList.remove('small-dialog');

                case 'medium-dialog':
                  return now ? (_this52.classList.add('medium-dialog'), _this52.classList.remove('small-dialog', 'large-dialog')) : _this52.classList.remove('medium-dialog');

                case 'large-dialog':
                  return now ? (_this52.classList.add('large-dialog'), _this52.classList.remove('small-dialog', 'medium-dialog')) : _this52.classList.remove('large-dialog');

                case 'scrollable-dialog':
                  return now ? _this52.classList.add('scrollable-dialog') : _this52.classList.remove('scrollable-dialog');

                case 'is-modal':
                  return now ? _this52._backdrop.on('click', closer) : _this52._backdrop.remove(closer);

                case 'is-open':
                  if (now) {
                    if (_this52.isModal) _this52._backdrop.show();
                    _this52.show();
                    _this52.dispatchEvent(new CustomEvent('dialog-opened'));
                  } else {
                    _this52._backdrop.hide();
                    _this52.hide();
                    _this52.dispatchEvent(new CustomEvent('dialog-closed'));
                  }
              }
            });
          }
        }]);

        return Dialog;
      }(__WEBPACK_IMPORTED_MODULE_0__card_js__["a" /* default */])
    });

    /* harmony default export */__webpack_exports__["a"] = Dialog;

    /***/
  },
  /* 28 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__text_js__ = __webpack_require__(11);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__list_js__ = __webpack_require__(20);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__temp_utils_focusable_js__ = __webpack_require__(5);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__temp_utils_ui_component_base_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(1);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);
    /*
     * drop-down.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * drop-down component for ui-components-lite.
     *
     * NOTE: it is not currently (and may never) be possible to extend built-in elements like select.
     * If it does become possible this can be refactored to support extending HTMLSelectElement.
     */

    var reflectedAttributes = ['selected-index', 'is-open', 'multiple', 'label'];
    var template = __WEBPACK_IMPORTED_MODULE_3__temp_utils_ui_component_base_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    ui-list {\n      transition: transform 500ms cubic-bezier(0.165, 0.84, 0.44, 1);\n      background: #fff;\n      position: relative;\n      left: -5px;\n      z-index: 1000;\n      width: 100%;\n      max-height: 225px;\n      overflow-y: scroll;\n    }\n\n    .arrow {\n      border: solid #999;\n      border-width: 0 2px 2px 0;\n      display: inline-block;\n      padding: 3px;\n      float: right;\n      position: relative;\n      top: 6px;\n      right: 2px;\n      transform: rotate(45deg);\n    }\n\n    .not-overflowing {\n      overflow: hidden !important;\n    }\n\n    #dummy-item {\n      text-align: center;\n      padding-bottom: 3px;\n    }\n\n    #dummy-item.default {\n      letter-spacing: 3px;\n    }\n\n    #list-holder {\n      height: 1px;\n      overflow: visible;\n      position: relative;\n      top: -10px;\n      border-top: 1px solid #999;\n    }\n\n    ui-list ::slotted(.ui-item) {\n      border: none;\n    }\n\n    :host {\n      display: block;\n      max-width: 200px;\n    }\n\n    :host([multiple="true"]) #dummy-item #dummy-item-content {\n      position: relative;\n      left: 10px;\n    }\n\n    :host([is-open="true"]) .arrow {\n      transform: rotate(-135deg);\n    }\n\n    :host([is-open="true"]) ui-list {\n      box-shadow: 3px 5px 10px -4px #999;\n      padding-bottom: 1px;\n      transform: scale(1) translateY(0px);\n    }\n\n    :host([is-open="false"]) ui-list {\n      transform: scale(0) translateY(-200px);\n    }\n\n    :host([is-open="true"]) #list-holder {\n      border-color: var(--ui-theme-primary-dark-color, blue);\n    }\n\n    :host([is-open="false"]) ui-list ::slotted(.ui-item) {\n      display: none;\n    }\n\n    label {\n      /* janky, I know. TODO: find a way to make this work with transform: translate */\n      transition-property: top, left;\n      transition-timing-function: ease;\n      transition-duration: 1s;\n      position: relative;\n      top: 0px;\n      left: 0px;\n    }\n\n    .text-moved {\n      top: 20px;\n      left: 10px;\n    }\n\n  </style>\n  <label><ui-text view-text="{{label}}"></ui-text></label>\n  <ui-item id="dummy-item" class="default">\n    <span id="dummy-item-content">...</span>\n    <div class="arrow down"></div>\n  </ui-item>\n  <div id="list-holder" class="not-overflowing">\n    <ui-list multiple="{{multiple}}">\n      <slot></slot>\n    </ui-list>\n  </div>\n';

    /* unused harmony default export */var _unused_webpack_default_export = Object(__WEBPACK_IMPORTED_MODULE_3__temp_utils_ui_component_base_js__["b" /* defineUIComponent */])({
      name: 'ui-drop-down',
      reflectedAttributes: reflectedAttributes,
      template: template,
      definition: function (_Object$with8) {
        _inherits(DropDown, _Object$with8);

        function DropDown() {
          _classCallCheck(this, DropDown);

          var _this53 = _possibleConstructorReturn(this, (DropDown.__proto__ || Object.getPrototypeOf(DropDown)).call(this));

          _this53._list = null;
          _this53._listHolder = null;
          _this53._dummyItem = null;
          _this53._textContent = '';
          return _this53;
        }

        _createClass(DropDown, [{
          key: 'appendChild',
          value: function appendChild(node) {
            var _this54 = this;

            if (node) {
              _get(DropDown.prototype.__proto__ || Object.getPrototypeOf(DropDown.prototype), 'appendChild', this).call(this, node);
              node.on('click', function (e) {
                if (!_this54.multiple) {
                  // wait for the animations to finish
                  __WEBPACK_IMPORTED_MODULE_3__temp_utils_ui_component_base_js__["d" /* global */].setTimeout(function () {
                    _this54.close();
                  }, 300);
                }
              });
            }

            return node;
          }
        }, {
          key: 'toggle',
          value: function toggle() {
            this.isOpen = !this.isOpen;
            return this;
          }
        }, {
          key: 'open',
          value: function open() {
            this.isOpen = true;
            return this;
          }
        }, {
          key: 'close',
          value: function close() {
            this.isOpen = false;
            return this;
          }
        }, {
          key: 'init',
          value: function init() {
            var _this55 = this;

            var mouseon = false;
            _get(DropDown.prototype.__proto__ || Object.getPrototypeOf(DropDown.prototype), 'init', this).call(this);
            var index = this.attr('tabindex');
            if (index === null || index < 0) this.attr('tabindex', '0');

            this.on('enter-key', function (e) {
              _this55.open();
            });

            if (this.attr('name')) {
              if (!this.attr('label')) this.attr('label', this.attr('name'));
              this.selectInternalElement('label').setAttribute('for', this.attr('name'));
            }

            if (this.attr('label')) this.selectInternalElement('label').classList.add('text-moved');
            this.on('focus', function (e) {
              return _this55.selectInternalElement('label').classList.remove('text-moved');
            });
            this.on('blur', function (e) {
              __WEBPACK_IMPORTED_MODULE_3__temp_utils_ui_component_base_js__["d" /* global */].setTimeout(function () {
                if (_this55.label && !_this55.value) {
                  _this55.selectInternalElement('label').classList.add('text-moved');
                }
              }, 600); // ripple animation is 500 on the ui-item
            });

            this._beforeReady(function (_) {
              _this55._list = _this55.selectInternalElement('ui-list');
              _this55._listHolder = _this55.selectInternalElement('#list-holder');
              _this55._dummyItem = _this55.selectInternalElement('#dummy-item');
              _this55._dummyItem.selectInternalElement('ui-checkbox').style.display = 'none';

              _this55._items.forEach(function (item) {
                if (item.isSelected) _this55.selected = item;
                item.on('click', function (e) {
                  if (!_this55.multiple) {
                    __WEBPACK_IMPORTED_MODULE_3__temp_utils_ui_component_base_js__["d" /* global */].setTimeout(function () {
                      _this55.close();
                    }, 300);
                  }
                });
              });

              if (_this55.name && !_this55.selected) _this55.textContent = null;
              _this55._listHolder.classList.remove('not-overflowing');

              _this55._dummyItem.on('click', function (e) {
                if (_this55.attr('tabindex') === null) _this55.attr('tabindex', '0');
                _this55.toggle();
                mouseon = _this55.isOpen;
              });
            });

            if (!this.multiple) this.multiple = false;
            if (!this.isOpen) this.isOpen = false;

            this.on('mouseenter', function (e) {
              return mouseon = true;
            });
            this.on('mouseleave', function (e) {
              mouseon = false;
              __WEBPACK_IMPORTED_MODULE_3__temp_utils_ui_component_base_js__["d" /* global */].setTimeout(function () {
                if (!mouseon) _this55.isOpen = false;
              }, 1000);
            });

            this.on('attribute-change', function (_ref43) {
              var _ref43$changed = _ref43.changed,
                  now = _ref43$changed.now,
                  name = _ref43$changed.name;

              switch (name) {
                case 'selected-index':
                  if (_this55.selected && !_this55.multiple) {
                    _this55.textContent = _this55.selected.textContent;
                  } else {
                    _this55.textContent = ''; // default
                  }
                  break;
              }
            });
          }
        }, {
          key: 'textContent',
          get: function get() {
            return this._dummyItem && this._dummyItem.textContent || this._textContent;
          },
          set: function set(val) {
            var txt = val || '';

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
        }]);

        return DropDown;
      }(Object(__WEBPACK_IMPORTED_MODULE_4__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_3__temp_utils_ui_component_base_js__["a" /* UIBase */]).with(__WEBPACK_IMPORTED_MODULE_1__list_js__["b" /* ListBehavior */], __WEBPACK_IMPORTED_MODULE_2__temp_utils_focusable_js__["a" /* default */]))
    });

    /***/
  },
  /* 29 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__form_js__ = __webpack_require__(7);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__temp_animations_rippler_js__ = __webpack_require__(10);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__temp_utils_focusable_js__ = __webpack_require__(5);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__temp_utils_ui_component_base_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(1);
    /*
     * checkbox.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * checkbox component for ui-components-lite.
    
     * NOTE: it is not currently possible to extend specific HTMLElements, leading
     * to this element being rather convoluted. Once it's possible to extend input
     * directly this should be refactored.
     */

    var template = __WEBPACK_IMPORTED_MODULE_3__temp_utils_ui_component_base_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    :host {\n      display: inline-block;\n      height: 25px;\n      width: 25px;\n      background-color: #DDD;\n      position: relative;\n      border-radius: 5%;\n    }\n\n    :host(:hover) {\n      box-shadow: inset 0 0 0 99999px rgba(150,150,150,0.2);\n    }\n\n    :host:before {\n      content:"";\n      position: absolute;\n      display: none;\n      left: 9px;\n      top: 5px;\n      width: 5px;\n      height: 10px;\n      border: solid #fff;\n      border-width: 0 3px 3px 0;\n      transform: rotate(45deg);\n    }\n\n    :host(.checked) {\n      background-color: var(--ui-theme-primary-dark-color, blue);\n    }\n\n    :host(.checked):before {\n      display: block;\n    }\n  </style>\n';

    var reflectedAttributes = ['checked'];

    var Checkbox = Object(__WEBPACK_IMPORTED_MODULE_3__temp_utils_ui_component_base_js__["b" /* defineUIComponent */])({
      name: 'ui-checkbox',
      template: template,
      reflectedAttributes: reflectedAttributes,
      definition: function (_Object$with9) {
        _inherits(Checkbox, _Object$with9);

        function Checkbox() {
          _classCallCheck(this, Checkbox);

          var _this56 = _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this));

          _this56._formElement = __WEBPACK_IMPORTED_MODULE_3__temp_utils_ui_component_base_js__["c" /* document */].createElement('input');
          _this56._formElement.style.opacity = 0;
          _this56._formElement.type = 'checkbox';
          return _this56;
        }

        _createClass(Checkbox, [{
          key: 'init',
          value: function init() {
            var _this57 = this;

            _get(Checkbox.prototype.__proto__ || Object.getPrototypeOf(Checkbox.prototype), 'init', this).call(this);
            this.attr('role', 'checkbox');
            this.watchAttribute(this, 'checked', function (now) {
              now ? _this57.classList.add('checked') : _this57.classList.remove('checked');
            });

            this.on('click', function (e) {
              _this57.checked = !_this57.checked;
              _this57.attr('aria-checked', _this57.checked);
            });
          }
        }, {
          key: 'value',
          get: function get() {
            return this.checked != null;
          }
        }]);

        return Checkbox;
      }(Object(__WEBPACK_IMPORTED_MODULE_4__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_3__temp_utils_ui_component_base_js__["a" /* UIBase */]).with(__WEBPACK_IMPORTED_MODULE_1__temp_animations_rippler_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__temp_utils_focusable_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__form_js__["a" /* FormControlBehavior */]))
    });

    /* unused harmony default export */var _unused_webpack_default_export = Checkbox;

    /***/
  },
  /* 30 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__backdrop_js__ = __webpack_require__(16);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__temp_animations_easer_js__ = __webpack_require__(31);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__temp_utils_float_js__ = __webpack_require__(4);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__temp_utils_ui_component_base_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(1);
    /*
     * drawer.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * sliding drawer component for ui-components-lite. Works in conjunction with a menu button.
     */

    var template = __WEBPACK_IMPORTED_MODULE_3__temp_utils_ui_component_base_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    :host {\n      display: block;\n      position: absolute;\n      top: 0;\n      height: 100vh;\n      z-index: 9001;\n      max-width: 90vw;\n      width: 320px;\n      padding: 10px;\n      background-color: #fff;\n    }\n\n    :host([left-oriented]) {\n      left: -350px;\n      border-right: solid 1px var(--ui-theme-dark-text-color, #000);\n    }\n\n    :host([right-oriented]) {\n      left: 100vw;\n      border-left: solid 1px var(--ui-theme-dark-text-color, #000);\n    }\n  </style>\n  <slot></slot>\n';

    var reflectedAttributes = ['is-modal', 'is-open'];

    /* unused harmony default export */var _unused_webpack_default_export = Object(__WEBPACK_IMPORTED_MODULE_3__temp_utils_ui_component_base_js__["b" /* defineUIComponent */])({
      name: 'ui-drawer',
      template: template,
      reflectedAttributes: reflectedAttributes,
      definition: function (_Object$with10) {
        _inherits(Drawer, _Object$with10);

        function Drawer() {
          _classCallCheck(this, Drawer);

          var _this58 = _possibleConstructorReturn(this, (Drawer.__proto__ || Object.getPrototypeOf(Drawer)).call(this));

          _this58._backdrop = __WEBPACK_IMPORTED_MODULE_3__temp_utils_ui_component_base_js__["c" /* document */].createElement('ui-backdrop');
          _this58._backdrop.for = _this58;
          _this58._backdrop.style.zIndex = '9000';
          _this58._toggleElem = null;
          _this58._isOpen = false;
          _this58._rightAnimator = null;
          _this58._leftAnimator = null;
          return _this58;
        }

        _createClass(Drawer, [{
          key: 'toggledBy',
          value: function toggledBy(elem) {
            var _this59 = this;

            if (elem) {
              this._toggleElem = elem;
              if (this._toggleElem.on) {
                this._toggleElem.on('click enter-key', function (e) {
                  _this59.toggleState();
                });
              } else {
                this._toggleElem.addEventListener('enter-key', function (e) {
                  _this59.toggleState();
                });
                this._toggleElem.addEventListener('click', function (e) {
                  _this59.toggleState();
                });
              }
            }
            return this;
          }
        }, {
          key: 'open',
          value: function open() {
            this.isOpen = true;
            return this;
          }
        }, {
          key: 'close',
          value: function close() {
            this.isOpen = false;
            return this;
          }
        }, {
          key: 'toggleState',
          value: function toggleState() {
            this.isOpen = !this.isOpen;
            return this;
          }
        }, {
          key: 'init',
          value: function init() {
            var _this60 = this;

            _get(Drawer.prototype.__proto__ || Object.getPrototypeOf(Drawer.prototype), 'init', this).call(this);
            if (!this.rightOriented) this.leftOriented = true;
            this.floatingX = true;

            __WEBPACK_IMPORTED_MODULE_3__temp_utils_ui_component_base_js__["c" /* document */].body.appendChild(this._backdrop);
            this._backdrop.on('click', function (e) {
              return _this60.close();
            });

            // Check for the drawer toggle in the DOM. If not, you'll need to use the toggledBy method
            // or wire up the handlers yourself
            this.toggledBy(__WEBPACK_IMPORTED_MODULE_3__temp_utils_ui_component_base_js__["c" /* document */].querySelector('[drawer-toggle]'));

            this._leftAnimator = this.defineSlideAnimation({ direction: 'right', distance: '350px' });
            this._rightAnimator = this.defineSlideAnimation({ direction: 'left', distance: '350px' });

            this.on('attribute-change', function (_ref44) {
              var _ref44$changed = _ref44.changed,
                  now = _ref44$changed.now,
                  name = _ref44$changed.name;

              var orient = _this60.rightOriented ? 'right' : 'left';
              var animator = _this60['_' + orient + 'Animator'];
              switch (name) {
                case 'is-open':
                  if (now) {
                    if (_this60.isModal) _this60._backdrop.show();
                    animator.easeIn().then(function (_) {
                      _this60.dispatchEvent(new CustomEvent('drawer-opened'));
                    });
                  } else {
                    animator.easeOut().then(function (_) {
                      _this60._backdrop.hide();
                      _this60.dispatchEvent(new CustomEvent('drawer-closed'));
                    });
                  }
                  break;
              }
            });
          }
        }]);

        return Drawer;
      }(Object(__WEBPACK_IMPORTED_MODULE_4__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_3__temp_utils_ui_component_base_js__["a" /* UIBase */]).with(__WEBPACK_IMPORTED_MODULE_2__temp_utils_float_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__temp_animations_easer_js__["a" /* default */]))
    });

    /***/
  },
  /* 31 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__temp_utils_dom_js__ = __webpack_require__(2);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__temp_utils_styler_js__ = __webpack_require__(13);
    /*
     * easer.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * easer animation component for ui-components-lite.
     */

    var orientations = {
      'left': ['X', '-'],
      'right': ['X', ''],
      'up': ['Y', '-'],
      'down': ['Y', '']
    };

    /* harmony default export */__webpack_exports__["a"] = function (superclass) {
      return Object(__WEBPACK_IMPORTED_MODULE_0__temp_utils_dom_js__["b" /* defineUIComponent */])({
        name: 'ui-easer',
        registerElement: false,
        definition: function (_superclass8) {
          _inherits(Easer, _superclass8);

          function Easer() {
            _classCallCheck(this, Easer);

            var _this61 = _possibleConstructorReturn(this, (Easer.__proto__ || Object.getPrototypeOf(Easer)).call(this));

            _this61._animations = [];
            return _this61;
          }

          _createClass(Easer, [{
            key: 'defineSlideAnimation',
            value: function defineSlideAnimation(_ref45) {
              var direction = _ref45.direction,
                  _ref45$timing = _ref45.timing,
                  timing = _ref45$timing === undefined ? 500 : _ref45$timing,
                  _ref45$fn = _ref45.fn,
                  fn = _ref45$fn === undefined ? 'ease' : _ref45$fn,
                  _ref45$distance = _ref45.distance,
                  distance = _ref45$distance === undefined ? '100%' : _ref45$distance;

              if (!this._animations.sliding) this._animations.sliding = {};

              var _orientations$directi = _slicedToArray(orientations[direction], 2),
                  xy = _orientations$directi[0],
                  min = _orientations$directi[1];

              var minus = min && distance.match('-') ? '' : min;
              var inClass = Object(__WEBPACK_IMPORTED_MODULE_1__temp_utils_styler_js__["a" /* generateCSSClassName */])();
              var outClass = Object(__WEBPACK_IMPORTED_MODULE_1__temp_utils_styler_js__["a" /* generateCSSClassName */])();
              var animationStyles = __WEBPACK_IMPORTED_MODULE_0__temp_utils_dom_js__["c" /* document */].createElement('template');
              animationStyles.innerHTML = '\n        <style>\n          :host {\n            transition-property: transform;\n            transition-duration: ' + timing + 'ms;\n            transition-timing-function: ' + fn + ';\n            transform: translate3d(0, 0, 0);\n          }\n\n          :host(.' + inClass + ') {\n            transform: translate' + xy + '(' + minus + distance + ');\n          }\n\n          :host(.' + outClass + ') {\n            transform: translate' + xy + '(0);\n          }\n        </style>\n      ';

              if (__WEBPACK_IMPORTED_MODULE_0__temp_utils_dom_js__["d" /* global */]._usingShady) __WEBPACK_IMPORTED_MODULE_0__temp_utils_dom_js__["d" /* global */].ShadyCSS.prepareTemplate(animationStyles, this.tagName.toLowerCase());

              this.shadowRoot.appendChild(__WEBPACK_IMPORTED_MODULE_0__temp_utils_dom_js__["c" /* document */].importNode(animationStyles.content, true));

              var self = this;
              var obj = {
                _isIn: false,

                easeIn: function easeIn() {
                  this._isIn = true;
                  self.classList.add(inClass);
                  if (__WEBPACK_IMPORTED_MODULE_0__temp_utils_dom_js__["d" /* global */]._usingShady) {
                    ShadyCSS.styleSubtree(self);
                  }
                  return new Promise(function (res) {
                    __WEBPACK_IMPORTED_MODULE_0__temp_utils_dom_js__["d" /* global */].setTimeout(function () {
                      self.classList.remove(outClass);
                      if (__WEBPACK_IMPORTED_MODULE_0__temp_utils_dom_js__["d" /* global */]._usingShady) {
                        ShadyCSS.styleSubtree(self);
                      }
                      res(true);
                    }, timing);
                  });
                },
                easeOut: function easeOut() {
                  this._isIn = false;
                  self.classList.add(outClass);
                  if (__WEBPACK_IMPORTED_MODULE_0__temp_utils_dom_js__["d" /* global */]._usingShady) {
                    ShadyCSS.styleSubtree(self);
                  }
                  return new Promise(function (res) {
                    __WEBPACK_IMPORTED_MODULE_0__temp_utils_dom_js__["d" /* global */].setTimeout(function () {
                      self.classList.remove(inClass);
                      if (__WEBPACK_IMPORTED_MODULE_0__temp_utils_dom_js__["d" /* global */]._usingShady) {
                        ShadyCSS.styleSubtree(self);
                      }
                      res(true);
                    }, timing);
                  });
                },
                toggle: function toggle() {
                  return this._isIn ? this.easeOut() : this.easeIn();
                },


                get styles() {
                  return styles;
                }
              };

              this._animations.sliding[direction.toLowerCase()] = obj;
              return obj;
            }
          }]);

          return Easer;
        }(superclass)
      });
    };

    /***/
  },
  /* 32 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__button_js__ = __webpack_require__(6);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__temp_utils_dom_js__ = __webpack_require__(2);
    /*
     * hamburger.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * menu-button component for ui-components-lite.
     */

    var reflectedAttributes = ['line-color'];
    var template = __WEBPACK_IMPORTED_MODULE_1__temp_utils_dom_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    .line {\n      height: 5px;\n      width: 100%;\n      background-color: var(--ui-theme-dark-text-color, #000);\n      position: relative;\n      padding: 0;\n    }\n\n    .top-line {\n      top: 0px;\n    }\n\n    .middle-line {\n      top: 7px;\n    }\n\n    .bottom-line {\n      top: 15px;\n    }\n\n    .content-wrapper {\n      height: 30px;\n      left: 10%;\n    }\n\n    :host {\n      background: transparent;\n      width: 48px;\n      height: 48px;\n    }\n  </style>\n';

    var lineDivTemplate = __WEBPACK_IMPORTED_MODULE_1__temp_utils_dom_js__["c" /* document */].createElement('template');
    lineDivTemplate.innerHTML = '\n  <div>\n    <div class="line top-line"></div>\n    <div class="line middle-line"></div>\n    <div class="line bottom-line"></div>\n  </div>\n';

    /* unused harmony default export */var _unused_webpack_default_export = Object(__WEBPACK_IMPORTED_MODULE_1__temp_utils_dom_js__["b" /* defineUIComponent */])({
      name: 'ui-hamburger',
      template: template,
      reflectedAttributes: reflectedAttributes,
      definition: function (_WEBPACK_IMPORTED_MO8) {
        _inherits(Hamburger, _WEBPACK_IMPORTED_MO8);

        function Hamburger() {
          _classCallCheck(this, Hamburger);

          return _possibleConstructorReturn(this, (Hamburger.__proto__ || Object.getPrototypeOf(Hamburger)).apply(this, arguments));
        }

        _createClass(Hamburger, [{
          key: 'init',
          value: function init() {
            var _this63 = this;

            _get(Hamburger.prototype.__proto__ || Object.getPrototypeOf(Hamburger.prototype), 'init', this).call(this);
            this.selectInternalElement('.content-wrapper').appendChild(__WEBPACK_IMPORTED_MODULE_1__temp_utils_dom_js__["c" /* document */].importNode(lineDivTemplate.content, true));

            this.watchAttribute(this, 'line-color', function (now) {
              [].concat(_toConsumableArray(_this63.selectInternalAll('.line'))).forEach(function (el) {
                el.style.backgroundColor = now;
              });
            });
          }
        }]);

        return Hamburger;
      }(__WEBPACK_IMPORTED_MODULE_0__button_js__["a" /* default */])
    });

    /***/
  },
  /* 33 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__temp_utils_ui_component_base_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__temp_utils_url_js__ = __webpack_require__(18);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(1);
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

    var Router = function () {
      var historyManager = null;
      var localNavigationCounter = -1;
      var historyStack = [];
      var reflectedAttributes = [
      // updates-history: whether or not the router manages the navigation history. NOTE: can only be
      // set on one router element per page. Attempting to set more than one throws an error.
      'updates-history',

      // renders-current: whether or not the router renders the child element associated with the
      // current path. Routers do not render their children by default.
      'renders-current',

      // hash-bang: whether or not the history updates use hash-bang urls for client-side routing
      'hash-bang'];

      var template = __WEBPACK_IMPORTED_MODULE_0__temp_utils_ui_component_base_js__["c" /* document */].createElement('template');
      template.innerHTML = '<slot name="router-content"></slot>';

      return Object(__WEBPACK_IMPORTED_MODULE_0__temp_utils_ui_component_base_js__["b" /* defineUIComponent */])({
        name: 'ui-router',
        template: template,
        reflectedAttributes: reflectedAttributes,
        definition: function (_WEBPACK_IMPORTED_MO9) {
          _inherits(Router, _WEBPACK_IMPORTED_MO9);

          function Router() {
            _classCallCheck(this, Router);

            var _this64 = _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).call(this));

            _this64._contentSlot = null;
            _this64._routes = {};
            _this64._currentRoute = null;
            _this64._managingHistory = false;
            _this64._login = null;
            _this64._popstateListener = function (_ref46) {
              var data = _ref46.state;

              // here we ignore querystring data, it may be stale
              var _Object = Object(__WEBPACK_IMPORTED_MODULE_1__temp_utils_url_js__["a" /* parseURL */])(window.location.href),
                  route = _Object.route;

              // detect if it was back or forward button:


              if (route === historyStack[historyStack.length - 2]) {
                historyStack.pop();
              }

              _this64._updateRoute(route);
              if (!historyStack.length || historyStack.length === 1 && historyStack[0] === '/') {
                __WEBPACK_IMPORTED_MODULE_0__temp_utils_ui_component_base_js__["d" /* global */].removeEventListener('popstate', _this64._popstateListener);
                _this64._managingHistory = false;
              }
            };
            return _this64;
          }

          _createClass(Router, [{
            key: 'appendChild',
            value: function appendChild(node) {
              if (node.matches && node.matches('[route-path]')) {
                this._routes[node.getAttribute('route-path')] = node;
                _get(Router.prototype.__proto__ || Object.getPrototypeOf(Router.prototype), 'appendChild', this).call(this, node);
              }
            }
          }, {
            key: '_internalRoute',
            value: function _internalRoute(route, data) {
              if (!route) {
                if ('/' in this._routes) route = '/';
                if (!route || !this._routes[route]) throw new Error('Unknown route ' + (route || 'empty') + '.');
              }

              var elem = this._routes[route];
              if (!elem && route !== '/') {
                console.warn('No element matches path ' + route + ',\n            perhaps the ui-route has no path set?');

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

                if (route === '/login') {
                  var username = elem.querySelector('.ui-login').selectInternalElement('[name="user"]');
                  if (username) username.focus();
                }

                // TODO: this makes maps work. Fix this.
                __WEBPACK_IMPORTED_MODULE_0__temp_utils_ui_component_base_js__["d" /* global */].setTimeout(function () {
                  __WEBPACK_IMPORTED_MODULE_0__temp_utils_ui_component_base_js__["d" /* global */].dispatchEvent(new Event('resize'));
                }, 0);

                return elem;
              }
              return null;
            }
          }, {
            key: '_updateRoute',
            value: function _updateRoute(route, data) {
              var changed = this._internalRoute(route, data);
              if (changed) {
                var evt = new Event('change');
                evt.data = changed.data;
                evt.value = route;
                evt.targetComponent = changed;

                this.dispatchEvent(evt);
              }
              return changed;
            }
          }, {
            key: '_updateHistory',
            value: function _updateHistory(route, url) {
              var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

              __WEBPACK_IMPORTED_MODULE_0__temp_utils_ui_component_base_js__["d" /* global */].history.pushState(data, '', url);
              historyStack.push(route);
            }
          }, {
            key: 'route',
            value: function route(val, outsidedata) {
              var _Object2 = Object(__WEBPACK_IMPORTED_MODULE_1__temp_utils_url_js__["a" /* parseURL */])(window.location.href),
                  urldata = _Object2.data,
                  path = _Object2.path;

              var data = outsidedata || urldata;
              var type = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_extracttype_extracttype_js__["a" /* default */])(val);
              var route = null;
              if (type === 'String') route = val;
              if (type.match(/HTML\w*Element/)) route = val.getAttribute('route-path');
              var base = path.match(/\/$/) ? path : path + '/';
              var url = this.hashBang ? base + '#!' + route : '' + base + route;

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
          }, {
            key: 'init',
            value: function init() {
              var _this65 = this;

              _get(Router.prototype.__proto__ || Object.getPrototypeOf(Router.prototype), 'init', this).call(this);

              this._beforeReady(function (_) {
                _this65._contentSlot = _this65.selectInternalElement('slot');
                var selected = null;

                var _Object3 = Object(__WEBPACK_IMPORTED_MODULE_1__temp_utils_url_js__["a" /* parseURL */])(window.location.href),
                    route = _Object3.route,
                    data = _Object3.data;

                if (route) selected = route;

                var flag = false;
                _this65.selectAll('[route-path]').forEach(function (el, i) {
                  var path = el.getAttribute('route-path');
                  _this65._routes[path] = el;
                  if (!i && !selected) selected = path;
                  if (el.matches && el.matches('[selected]')) selected = path;
                  if (path === '/login') {
                    flag = true;
                    el.onReady(function (_) {
                      var login = el.querySelector('.ui-login');
                      _this65._login = login;
                      login.on('login', function (e) {
                        var _Object4 = Object(__WEBPACK_IMPORTED_MODULE_1__temp_utils_url_js__["a" /* parseURL */])(window.location.href),
                            route = _Object4.route;

                        _this65._updateRoute(route);
                      });

                      login.on('logout', function (e) {
                        _this65.route('/login');
                      });
                      _this65.route(selected);
                    });
                  }
                });

                if (!flag) {
                  _this65.onReady(function (_) {
                    _this65.route(selected);
                  });
                }
              });

              this.on('attribute-change', function (_ref47) {
                var _ref47$changed = _ref47.changed,
                    now = _ref47$changed.now,
                    name = _ref47$changed.name,
                    was = _ref47$changed.was;

                switch (name) {
                  case 'renders-current':
                    if (_this65.selected) {
                      if (now) {
                        _this65.selected.setAttribute('slot', 'router-content');
                      } else {
                        _this65.selected.removeAttribute('slot');
                      }
                    }
                    break;

                  case 'updates-history':
                    if (now && historyManager !== _this65) {
                      if (historyManager) {
                        throw new Error('Only one router per page can manage the navigation history\n                     at a time. Please listen for that router\'s route-changed\n                     event to update other elements.');
                      }
                      historyManager = _this65;
                      _this65._managingHistory = true;
                      window.addEventListener('popstate', _this65._popstateListener);
                    } else {
                      historyManager = null;
                      _this65._managingHistory = false;
                      window.removeEventListener('popstate', _this65._popstateListener);
                    }
                }
              });
            }
          }, {
            key: 'currentRoute',
            get: function get() {
              return this._currentRoute;
            },
            set: function set(route) {
              if (route in this._routes) {
                return this.route(route);
              }

              return null;
            }
          }]);

          return Router;
        }(__WEBPACK_IMPORTED_MODULE_0__temp_utils_ui_component_base_js__["a" /* UIBase */])
      });
    }();
    /* unused harmony export Router */

    var Route = function () {
      var reflectedAttributes = [
      // updates-history: whether or not the route's data is converted to a url query string
      // and added to the current browser url if the parent router manages the navigation history.
      'updates-history',

      // route-path: The url path associated with the element.
      'route-path',

      // selected: if the route is the current route of it's parent router.
      'is-selected',

      // warns-on-unload: whether or not data-changes to the route prompt user before leaving the
      // current page.
      'warns-on-unload'];

      return Object(__WEBPACK_IMPORTED_MODULE_0__temp_utils_ui_component_base_js__["b" /* defineUIComponent */])({
        name: 'ui-route',
        reflectedAttributes: reflectedAttributes,
        definition: function (_WEBPACK_IMPORTED_MO10) {
          _inherits(Route, _WEBPACK_IMPORTED_MO10);

          function Route() {
            _classCallCheck(this, Route);

            var _this66 = _possibleConstructorReturn(this, (Route.__proto__ || Object.getPrototypeOf(Route)).call(this));

            _this66._data = null;
            _this66._dataElements = [];
            _this66._fromChangeHandler = false;
            _this66._unloadListener = function (e) {
              if (_this66.data) localStorage.setItem(_this66.routePath, JSON.stringify(elem.data));
            };
            return _this66;
          }

          _createClass(Route, [{
            key: 'update',
            value: function update(data) {
              this._data = data;
              var evt = new CustomEvent('data-changed');
              evt.data = data;
              localStorage.setItem(this.routePath, JSON.stringify(this.data));

              if (!this._fromChangeHandler) {
                this._dataElements.forEach(function (el) {
                  return el.data = data;
                });
              }
              this._fromChangeHandler = false;

              if (this.updatesHistory) {
                var qs = Object(__WEBPACK_IMPORTED_MODULE_1__temp_utils_url_js__["b" /* toQueryString */])(data);
                if (qs !== '?') {
                  history.replaceState(data, '', window.location.href, window.location.href + qs);
                }
              }
              this.dispatchEvent(evt);
              return this;
            }
          }, {
            key: 'appendChild',
            value: function appendChild(node) {
              if (node.matches && node.matches('[is-data-element]')) this._dataElements.push(node);
              _get(Route.prototype.__proto__ || Object.getPrototypeOf(Route.prototype), 'appendChild', this).call(this);
            }
          }, {
            key: 'init',
            value: function init() {
              var _this67 = this;

              _get(Route.prototype.__proto__ || Object.getPrototypeOf(Route.prototype), 'init', this).call(this);

              this.onReady(function (_) {
                _this67._dataElements = _this67.shadowRoot ? [].concat(_toConsumableArray(_this67.selectInternalAll('[is-data-element]')), _toConsumableArray(_this67.selectAll('[is-data-element]'))) : _this67.selectAll('[is-data-element]');

                _this67._dataElements.forEach(function (el) {
                  el.on('change', function (_) {
                    _this67._fromChangeHandler = true;
                    _this67.update(_this67._dataElements.reduce(function (acc, el) {
                      var data = el.serialize();
                      Object.entries(data).forEach(function (_ref48) {
                        var _ref49 = _slicedToArray(_ref48, 2),
                            k = _ref49[0],
                            v = _ref49[1];

                        if (k in acc) {
                          console.warn('Overwriting duplicate data-element property ' + k + '.');
                        }
                        acc[k] = v;
                      });
                      return acc;
                    }, {}));
                  });
                });

                var data = localStorage.getItem(_this67.routePath);

                // Check to see if it was written from query string first.
                if (!_this67.data && data != null) _this67.update(JSON.parse(data));
              });

              this.on('attribute-change', function (_ref50) {
                var _ref50$changed = _ref50.changed,
                    now = _ref50$changed.now,
                    name = _ref50$changed.name;

                switch (name) {
                  case 'is-selected':
                    if (!now || now && !_this67.isSelected) {
                      var evtName = now ? 'component-selected' : 'component-deselected';
                      _this67.dispatchEvent(new CustomEvent(evtName));
                    }
                    break;
                }
              });
            }
          }, {
            key: 'data',
            get: function get() {
              return this._data;
            }
          }]);

          return Route;
        }(__WEBPACK_IMPORTED_MODULE_0__temp_utils_ui_component_base_js__["a" /* UIBase */])
      });
    }();
    /* unused harmony export Route */

    /***/
  },
  /* 34 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__list_js__ = __webpack_require__(20);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__temp_utils_ui_component_base_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(1);
    /*
     * tabs.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * ltabscomponent for ui-components-lite.
     */

    var Tab = function () {
      var template = __WEBPACK_IMPORTED_MODULE_1__temp_utils_ui_component_base_js__["c" /* document */].createElement('template');
      template.innerHTML = '\n    <style>\n      #content {\n        position: relative;\n        top: 16px;\n      }\n\n      :host {\n        display: inline-block;\n        background-color: inherit;\n        height: 49px;\n        width: 120px;\n        white-space: nowrap;\n        text-overflow: ellipsis;\n        text-transform: capitalize;\n        border-radius: 5%;\n        margin: 5px;\n        padding: 0;\n        text-align: center;\n      }\n\n      :host(:hover) {\n        color: var(--ui-theme-light-text-color, #fff);\n      }\n\n      :host([is-selected="true"]) {\n        box-shadow: 0px 0px 10px -1px var(--ui-theme-light-text-color, #fff);\n      }\n\n      :host-context(.tabs-centered) {\n        left: -30px;\n      }\n    </style>\n  ';

      return Object(__WEBPACK_IMPORTED_MODULE_1__temp_utils_ui_component_base_js__["b" /* defineUIComponent */])({
        name: 'ui-tab',
        template: template,
        definition: function (_WEBPACK_IMPORTED_MO11) {
          _inherits(Tab, _WEBPACK_IMPORTED_MO11);

          function Tab() {
            _classCallCheck(this, Tab);

            return _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).apply(this, arguments));
          }

          _createClass(Tab, [{
            key: 'init',
            value: function init() {
              _get(Tab.prototype.__proto__ || Object.getPrototypeOf(Tab.prototype), 'init', this).call(this);
              this.attr('role', 'tab');
              var index = this.attr('tabindex');
              if (index === null || index < 0) this.attr('tabindex', '0');
            }
          }]);

          return Tab;
        }(__WEBPACK_IMPORTED_MODULE_0__list_js__["a" /* Item */])
      });
    }();
    /* unused harmony export Tab */

    var Tabs = function () {
      var reflectedAttributes = ['for'];

      var template = __WEBPACK_IMPORTED_MODULE_1__temp_utils_ui_component_base_js__["c" /* document */].createElement('template');
      template.innerHTML = '\n    <style>\n      :host {\n        display: block;\n        height: 55px;\n        background-color: var(--ui-theme-primary-dark-color, blue);\n        width: 100%;\n      }\n\n      :host ::slotted(.ui-tab:hover) {\n        text-shadow: 1px 1px 6px #fff;\n      }\n    </style>\n    <slot></slot>\n  ';

      return Object(__WEBPACK_IMPORTED_MODULE_1__temp_utils_ui_component_base_js__["b" /* defineUIComponent */])({
        name: 'ui-tabs',
        template: template,
        reflectedAttributes: reflectedAttributes,
        definition: function (_Object$with11) {
          _inherits(Tabs, _Object$with11);

          function Tabs() {
            _classCallCheck(this, Tabs);

            var _this69 = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this));

            _this69._for = null;
            return _this69;
          }

          _createClass(Tabs, [{
            key: 'appendChild',
            value: function appendChild(node) {
              if (node.matches && node.matches('.ui-tab')) {
                _get(Tabs.prototype.__proto__ || Object.getPrototypeOf(Tabs.prototype), 'appendChild', this).call(this, node);
              }
            }
          }, {
            key: 'init',
            value: function init() {
              var _this70 = this;

              _get(Tabs.prototype.__proto__ || Object.getPrototypeOf(Tabs.prototype), 'init', this).call(this);
              this.attr('role', 'tabpanel');
              this.on('attribute-change', function (_ref51) {
                var _ref51$changed = _ref51.changed,
                    now = _ref51$changed.now,
                    name = _ref51$changed.name;

                switch (name) {
                  case 'for':
                    if (now) {
                      _this70._for = now;
                      var _elem = __WEBPACK_IMPORTED_MODULE_1__temp_utils_ui_component_base_js__["c" /* document */].querySelector(_this70._for);
                      if (_elem) {
                        var method = _elem.on ? 'on' : 'addEventListener';
                        _elem[method]('change', function (_ref52) {
                          var value = _ref52.value;

                          var matched = _this70._items.reduce(function (acc, item) {
                            if (acc) return acc;
                            if (item.value === value) return item;
                            return acc;
                          }, null);

                          if (matched && matched !== _this70.selected) {
                            _this70.selected = value;
                          } else {
                            _this70.selected = null;
                          }
                        });
                      }
                    } else {
                      _this70._for = null;
                    }
                    break;

                  case 'selected-index':
                    if (now > -1 && _this70._for) {
                      __WEBPACK_IMPORTED_MODULE_1__temp_utils_ui_component_base_js__["c" /* document */].querySelector(_this70._for).route(_this70.selected.value);
                    }
                    break;
                }
              });
            }
          }]);

          return Tabs;
        }(Object(__WEBPACK_IMPORTED_MODULE_3__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_1__temp_utils_ui_component_base_js__["a" /* UIBase */]).with(__WEBPACK_IMPORTED_MODULE_0__list_js__["b" /* ListBehavior */]))
      });
    }();
    /* unused harmony export Tabs */

    /***/
  },
  /* 35 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__temp_utils_float_js__ = __webpack_require__(4);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__temp_utils_attribute_analyzer_js__ = __webpack_require__(9);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__temp_utils_ui_component_base_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__temp_utils_centerer_js__ = __webpack_require__(15);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(1);
    /*
     * toolbar.js
     * @author jasmith79
     * @copyright Jared Smith
     * @license MIT
     * You should have received a copy of the license with this work but it may also be found at
     * https://opensource.org/licenses/MIT
     *
     * toolbar component for ui-components-lite.
     */

    var reflectedAttributes = ['is-tall'];

    var template = __WEBPACK_IMPORTED_MODULE_2__temp_utils_ui_component_base_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    ' + __WEBPACK_IMPORTED_MODULE_3__temp_utils_centerer_js__["a" /* centeredStyles */] + '\n\n    :host {\n      width: 100%;\n      background-color: var(--ui-theme-primary-dark-color, blue);\n      color: var(--ui-theme-light-text-color, #fff);\n      height: 70px;\n      display: block;\n    }\n\n    :host([is-tall]) {\n      height: 192px;\n    }\n\n    :host(:not([is-tall]).has-secondary) {\n      margin-bottom: 56px;\n    }\n\n    header {\n      height: 100%;\n      width: 100%;\n    }\n\n    #title-holder {\n      position: relative;\n      margin-left: auto;\n      margin-right: auto;\n      max-width: 80%;\n      text-align: center;\n      text-transform: capitalize;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      font-size: 22px;\n    }\n\n    :host([is-tall]) #title-holder {\n      font-size: 40px;\n    }\n\n    header ::slotted([slot="left-button-slot"]) {\n      position: relative;\n      top: -18px;\n      left: 10px;\n      float: left;\n    }\n\n    :host([is-tall]) header ::slotted([slot="left-button-slot"]) {\n      top: -35px;\n    }\n\n    header ::slotted([slot="right-button-slot"]) {\n      position: relative;\n      top: -18px;\n      right: 30px;\n      float: right;\n    }\n\n\n    :host([is-tall]) header ::slotted([slot="right-button-slot"]) {\n      top: -35px;\n    }\n\n    header ::slotted([slot="secondary-toolbar-slot"]) {\n      position: relative;\n      width: 100vw;\n      top: 44px;\n    }\n\n    :host([is-tall]) header ::slotted([slot="secondary-toolbar-slot"]) {\n      top: 92px;\n    }\n\n    :host(:not([is-tall])) header ::slotted([slot="secondary-toolbar-slot"]) {\n      text-align: center;\n    }\n  </style>\n  <header>\n    <div id="title-holder" class="content-wrapper">\n      <slot></slot>\n    </div>\n    <slot name="left-button-slot"></slot>\n    <slot name="right-button-slot"></slot>\n    <slot name="secondary-toolbar-slot"></slot>\n  </header>\n';

    /* unused harmony default export */var _unused_webpack_default_export = Object(__WEBPACK_IMPORTED_MODULE_2__temp_utils_ui_component_base_js__["b" /* defineUIComponent */])({
      name: 'ui-toolbar',
      template: template,
      reflectedAttributes: reflectedAttributes,
      definition: function (_Object$with12) {
        _inherits(Toolbar, _Object$with12);

        function Toolbar() {
          _classCallCheck(this, Toolbar);

          var _this71 = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this));

          _this71._secondaryToolbar = null;
          return _this71;
        }

        _createClass(Toolbar, [{
          key: 'init',
          value: function init() {
            var _this72 = this;

            _get(Toolbar.prototype.__proto__ || Object.getPrototypeOf(Toolbar.prototype), 'init', this).call(this);
            this.attr('role', 'toolbar');
            var secondarySlot = this.selectInternalElement('[name="secondary-toolbar-slot"]');
            var slotted = secondarySlot.assignedNodes();
            if (slotted.length) {
              this._secondaryToolbar = slotted[0];
              this.classList.add('has-secondary');
              this._secondaryToolbar.attr('role', 'menubar');
              this._secondaryToolbar.selectAll('.ui-item').forEach(function (item) {
                item.attr('role', 'menuitem');
              });
            }

            secondarySlot.addEventListener('slotchange', function (e) {
              _this72._secondaryToolbar = _this72.querySelector('[slot="secondary-toolbar-slot"]');
              if (_this72._secondaryToolbar) _this72.classList.add('has-secondary');
            });

            this.on('attribute-change', function (_ref53) {
              var _ref53$changed = _ref53.changed,
                  name = _ref53$changed.name,
                  now = _ref53$changed.now;

              if (name === 'is-tall') {
                if (now == null) {
                  if (_this72._secondaryToolbar) {
                    _this72._secondaryToolbar.classList.add('tabs-centered');
                  }
                } else if (!now || now === "false") {
                  _this72.isTall = null;
                } else {
                  if (_this72._secondaryToolbar) {
                    _this72._secondaryToolbar.classList.remove('tabs-centered');
                  }
                }
              }
            });
          }
        }]);

        return Toolbar;
      }(Object(__WEBPACK_IMPORTED_MODULE_4__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_2__temp_utils_ui_component_base_js__["a" /* UIBase */]).with(__WEBPACK_IMPORTED_MODULE_0__temp_utils_float_js__["a" /* default */]))
    });

    /***/
  }]
  /******/);
};if (window.customElements) {
  __run();
} else {
  var __listener = function __listener() {
    window.removeEventListener('WebComponentsReady', __listener);__run();
  };window.addEventListener('WebComponentsReady', __listener);
}
