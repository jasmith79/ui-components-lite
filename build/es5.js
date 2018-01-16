'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
    /******/return __webpack_require__(__webpack_require__.s = 17);
    /******/
  })(
  /************************************************************************/
  /******/[
  /* 0 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony export (binding) */

    var _this3 = this;

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
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__node_modules_jsstring_src_jsstring_js__ = __webpack_require__(7);

    var global = new Function('return this')();
    var document = global.document;
    var baseClass = global.HTMLElement;
    var registry = {};

    var toPropertyObj = function toPropertyObj(propList) {
      return propList.reduce(function (acc, prop) {
        var property = Object(__WEBPACK_IMPORTED_MODULE_0__node_modules_jsstring_src_jsstring_js__["b" /* toCamelCase */])(prop);
        acc[property] = {
          get: function get() {
            return this['_' + property];
          },
          set: function set(val) {
            this['_' + property] = val;
            this.attr(Object(__WEBPACK_IMPORTED_MODULE_0__node_modules_jsstring_src_jsstring_js__["c" /* toSnakeCase */])(property, '-'), val);
          }
        };
        return acc;
      }, {});
    };

    var defineUIComponent = function defineUIComponent(_ref) {
      var name = _ref.name,
          definition = _ref.definition,
          _ref$reflectedAttrs = _ref.reflectedAttrs,
          reflectedAttrs = _ref$reflectedAttrs === undefined ? [] : _ref$reflectedAttrs,
          template = _ref.template,
          _ref$registerElement = _ref.registerElement,
          registerElement = _ref$registerElement === undefined ? true : _ref$registerElement,
          isShadowHost = _ref.isShadowHost;

      if (!name) throw new Error('ui-components must have a name.');
      if (!definition) throw new Error('ui-components must have a defining class');
      if (name in registry) throw new Error('ui-component named ' + name + ' already registered.');

      var tmpl = null;
      if (definition._template || template) tmpl = document.createElement('template');
      if (definition._template) tmpl.innerHTML += definition._template.innerHTML;
      if (template) tmpl.innerHTML += template.innerHTML;

      var class_ = function (_definition) {
        _inherits(class_, _definition);

        _createClass(class_, [{
          key: '_stamp',
          value: function _stamp() {
            // no call to super
            var temp = tmpl ? tmpl.cloneNode(true) : null;
            if (temp && global._usingShady) global.ShadyCSS.prepareTemplate(temp, name);
            return temp;
          }
        }, {
          key: '_reflectedAttrs',
          get: function get() {
            var rfs = _get(class_.prototype.__proto__ || Object.getPrototypeOf(class_.prototype), '_reflectedAttrs', this) || [];
            return [].concat(_toConsumableArray(rfs), _toConsumableArray(reflectedAttrs));
          }
        }], [{
          key: 'observedAttributes',
          get: function get() {
            return [].concat(_toConsumableArray(_get(class_.__proto__ || Object.getPrototypeOf(class_), 'observedAttributes', this)), _toConsumableArray(reflectedAttrs));
          }
        }, {
          key: '_template',
          get: function get() {
            return tmpl;
          }
        }]);

        function class_() {
          var _ref2;

          _classCallCheck(this, class_);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _possibleConstructorReturn(this, (_ref2 = class_.__proto__ || Object.getPrototypeOf(class_)).call.apply(_ref2, [this].concat(args)));
          // if ((isShadowHost || template) && !this.shadowRoot) this.attachShadow({ mode: 'open' });
          //
          // if (global._usingShady && this.shadowRoot && template) {
          //   global.ShadyCSS.prepareTemplate(template, name);
          // }
          //
          // if (template) this.shadowRoot.appendChild(document.importNode(template.content, true));
          // if (reflectedAttrs.length) {
          //   this.on('attribute-change', ({ changed: { name, now } }) => {
          //     if (reflectedAttrs.includes(name)) {
          //       this[toCamelCase(name)] = now;
          //     }
          //   });
          // }
        }

        _createClass(class_, [{
          key: 'init',
          value: function init() {
            var _this2 = this;

            _get(class_.prototype.__proto__ || Object.getPrototypeOf(class_.prototype), 'init', this).call(this);
            this.classList.add(name);
            this._beforeReady(function (_) {
              if (global._usingShady && _this2.shadowRoot && _this2.shadowRoot.querySelector('style')) {
                ShadyCSS.styleElement(_this2);
              }
            });
          }
        }]);

        return class_;
      }(definition);

      // Override with original name for debugging/reflection.
      Object.defineProperty(class_, 'name', {
        get: function get() {
          return _this3.name;
        }
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

    /***/
  },
  /* 1 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__styler_js__ = __webpack_require__(10);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__binder_js__ = __webpack_require__(19);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__dom_utils_js__ = __webpack_require__(20);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__attribute_analyzer_js__ = __webpack_require__(8);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__promise_from_event_js__ = __webpack_require__(21);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__dom_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_6__node_modules_jsstring_src_jsstring_js__ = __webpack_require__(7);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_7__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);

    var flag = true;

    var UIBase = function (_Object$with) {
      _inherits(UIBase, _Object$with);

      function UIBase() {
        _classCallCheck(this, UIBase);

        var _this4 = _possibleConstructorReturn(this, (UIBase.__proto__ || Object.getPrototypeOf(UIBase)).call(this));

        _this4._listeners = [];
        _this4._isCentered = false;
        _this4._beforeReadyHandlers = [];
        _this4._isReady = Object(__WEBPACK_IMPORTED_MODULE_4__promise_from_event_js__["a" /* default */])({
          element: _this4,
          eventName: 'ui-component-ready',
          callback: function callback() {
            return _this4;
          }
        });

        // This is because the spec doesn't allow attribute changes in an element constructor.
        setTimeout(function () {
          _this4.init();
        }, 0);
        return _this4;
      }

      _createClass(UIBase, [{
        key: '_beforeReady',
        value: function _beforeReady() {
          for (var _len2 = arguments.length, fs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            fs[_key2] = arguments[_key2];
          }

          this._beforeReadyHandlers.push.apply(this._beforeReadyHandlers, fs);
        }
      }, {
        key: 'onReady',
        value: function onReady() {
          var _this5 = this;

          for (var _len3 = arguments.length, fs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            fs[_key3] = arguments[_key3];
          }

          this._isReady.then(function (_) {
            fs.forEach(function (f) {
              return f(_this5);
            });
          });

          if (__WEBPACK_IMPORTED_MODULE_5__dom_js__["d" /* global */]._usingShady) {
            __WEBPACK_IMPORTED_MODULE_5__dom_js__["d" /* global */].ShadyCSS.styleSubtree(this);
          }

          return this;
        }
      }, {
        key: 'init',
        value: function init() {
          var _this6 = this;

          // Should be called by extension elements via super. setTimeout is so that any initialization
          // and event handlers in the descendant classes can be attached before the reflected attribute
          // setup.
          this.classList.add('is-ui-component');

          var tmpl = this._stamp();
          if (tmpl) {
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.appendChild(__WEBPACK_IMPORTED_MODULE_5__dom_js__["d" /* global */].document.importNode(tmpl.content, true));
          }

          // if (this.tagName.toLowerCase() === 'ui-drop-down') {
          //   debugger;
          // }

          // const children = this.shadowRoot ?
          //   [this._childrenUpgraded, ...this.shadowRoot.children] :
          //   this._childrenUpgraded;

          var elReady = function elReady(el) {
            return el._isReady || Promise.resolve(el);
          };
          var children = [].concat(_toConsumableArray([].concat(_toConsumableArray(this.children)).map(elReady)));
          if (this.shadowRoot) children.push.apply(children, [].concat(_toConsumableArray(this.shadowRoot.children)).map(elReady));

          Promise.all(children).then(function (_) {
            if (_this6._reflectedAttrs.length) {
              _this6.on('attribute-change', function (_ref3) {
                var _ref3$changed = _ref3.changed,
                    name = _ref3$changed.name,
                    now = _ref3$changed.now;

                if (_this6._reflectedAttrs.includes(name)) {
                  _this6[Object(__WEBPACK_IMPORTED_MODULE_6__node_modules_jsstring_src_jsstring_js__["b" /* toCamelCase */])(name)] = now;
                }
              });
            }

            _this6.constructor.observedAttributes.forEach(function (attr) {
              if (_this6.attr(attr)) {
                var evt = new CustomEvent('attribute-change');
                evt.changed = { name: attr, now: _this6.attr(attr), was: null };
                _this6.dispatchEvent(evt);
              }
            });

            [].concat(_toConsumableArray(_this6.attributes)).forEach(function (_ref4) {
              var attr = _ref4.name,
                  val = _ref4.value;

              var twoWay = val && val.match(/^\{\{\{(.+)\}\}\}$/);
              var oneWay = val && val.match(/^\{\{(.+)\}\}$/);
              var matched = twoWay ? twoWay[1] : oneWay ? oneWay[1] : null;
              var attrToWatch = matched ? Object(__WEBPACK_IMPORTED_MODULE_6__node_modules_jsstring_src_jsstring_js__["c" /* toSnakeCase */])(matched, '-') : null;
              if (attrToWatch) {
                _this6.bindAttribute(attr, attrToWatch, twoWay);
              }
            });

            return _this6._beforeReadyHandlers.length ? Promise.all(_this6._beforeReadyHandlers.map(function (f) {
              return f(_this6);
            })) : null;
          }).then(function (_) {
            _this6.dispatchEvent(new CustomEvent('ui-component-ready', { bubbles: true }));
          });
        }

        // If extension elements override the default connected and disconnected
        // Callbacks they need to call super to perform appropriate init/cleanup

      }, {
        key: 'connectedCallback',
        value: function connectedCallback() {
          var _this7 = this;

          // This allows the elements to be detatched/reattached without losing
          // handlers.
          this._listeners.forEach(function (_ref5) {
            var _ref6 = _slicedToArray(_ref5, 2),
                evt = _ref6[0],
                f = _ref6[1];

            return _this7.addEventListener(evt, f);
          });

          // Allows element to be detatched and reattached while automatically cleaning up
          // on eventual deletion.
          this._mutationObservers.forEach(function (_ref7) {
            var _ref8 = _slicedToArray(_ref7, 3),
                o = _ref8[0],
                target = _ref8[1],
                conf = _ref8[2];

            return o.observe(target, conf);
          });

          // This avoids Chrome firing the event before DOM is ready
          // setTimeout(() => { this.init(); }, 10)
        }
      }, {
        key: 'disconnectedCallback',
        value: function disconnectedCallback() {
          var _this8 = this;

          this._isCentered = false;
          this._shadowElement = null;
          this._listeners.forEach(function (_ref9) {
            var _ref10 = _slicedToArray(_ref9, 2),
                evt = _ref10[0],
                f = _ref10[1];

            return _this8.removeEventListener(evt, f);
          });
          this._mutationObservers.forEach(function (_ref11) {
            var _ref12 = _slicedToArray(_ref11, 1),
                o = _ref12[0];

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
          return 'ui-' + Object(__WEBPACK_IMPORTED_MODULE_6__node_modules_jsstring_src_jsstring_js__["c" /* toSnakeCase */])(this.constructor.name, '-');
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

    /* harmony default export */

    __webpack_exports__["a"] = UIBase;

    /***/
  },
  /* 2 */
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
        return as.every(function (_ref13, i) {
          var _ref14 = _slicedToArray(_ref13, 2),
              keyA = _ref14[0],
              valA = _ref14[1];

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
    var __WEBPACK_IMPORTED_MODULE_0__dom_js__ = __webpack_require__(0);

    var template = __WEBPACK_IMPORTED_MODULE_0__dom_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    :host(.left-x) {\n      box-shadow: 3px 0px 10px -3px #000;\n      margin-right: 3px;\n    }\n\n    :host(.right-x) {\n      box-shadow: -3px 0px 10px -3px #000;\n      margin-left: 3px;\n    }\n\n    :host(.float-y) {\n      box-shadow: 0px 3px 10px -3px #000;\n      margin-bottom: 3px;\n    }\n  </style>\n';

    var reflectedAttrs = ['floating-x', 'floating-y', 'right-oriented', 'left-oriented'];

    /* harmony default export */__webpack_exports__["a"] = function (superclass) {
      return Object(__WEBPACK_IMPORTED_MODULE_0__dom_js__["b" /* defineUIComponent */])({
        name: 'ui-floating',
        reflectedAttrs: reflectedAttrs,
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
              this.on('attribute-change', function (_ref15) {
                var _ref15$changed = _ref15.changed,
                    now = _ref15$changed.now,
                    name = _ref15$changed.name;

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
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__node_modules_formdata_polyfill_formdata_min_js__ = __webpack_require__(22);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__node_modules_formdata_polyfill_formdata_min_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__node_modules_formdata_polyfill_formdata_min_js__);

    // TODO external ui-input not getting cached data? input elements lose data sometimes
    // on multiple reloads?

    var Form = function () {
      var reflectedAttrs = ['action', 'method', 'autocomplete', 'response-type'];
      var template = __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].createElement('template');
      template.innerHTML = '\n    <style>\n      :host {\n        display: block;\n      }\n    </style>\n    <slot></slot>\n  ';

      return Object(__WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["b" /* defineUIComponent */])({
        name: 'ui-form',
        template: template,
        reflectedAttrs: reflectedAttrs,
        definition: function (_WEBPACK_IMPORTED_MO) {
          _inherits(Form, _WEBPACK_IMPORTED_MO);

          function Form() {
            _classCallCheck(this, Form);

            // this._inputs = null;
            // this._selects = null;
            var _this11 = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this));

            _this11._form = null;
            _this11._formUIComponents = null;
            return _this11;
          }

          _createClass(Form, [{
            key: '_isFormEligible',
            value: function _isFormEligible(el) {
              var _this12 = this;

              return el && el.matches && function () {
                if (el.matches('input[name]') || el.matches('input[form="' + _this12.id + '"]')) return 'input';

                if (el.matches('select[name]') || el.matches('select[form="' + _this12.id + '"]')) return 'select';

                if (el.matches('.ui-form-behavior') || el.matches('.ui-form-behavior[form="' + _this12.id + '"]')) return 'formElement';

                return false;
              }();
            }
          }, {
            key: 'appendChild',
            value: function appendChild(node) {
              var isEligible = this._isFormEligible(node);
              if (isEligible) {
                _get(Form.prototype.__proto__ || Object.getPrototypeOf(Form.prototype), 'appendChild', this).call(this, node);
                if (node.isUIComponent) {
                  this._formUIComponents.push(node);
                }
                // this[`_${isEligible}s`].push(node);
              }

              return node;
            }
          }, {
            key: 'serialize',
            value: function serialize() {
              return [].concat(_toConsumableArray(this.data.entries())).reduce(function (acc, _ref16) {
                var _ref17 = _slicedToArray(_ref16, 2),
                    k = _ref17[0],
                    v = _ref17[1];

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
          }, {
            key: 'submit',
            value: function submit(_ref18) {
              var argURL = _ref18.url,
                  meth = _ref18.method,
                  headers = _ref18.headers,
                  responseType = _ref18.responseType;

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
              switch ((responseType || this.responseType || '').toLowerCase()) {
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
              var _this13 = this;

              _get(Form.prototype.__proto__ || Object.getPrototypeOf(Form.prototype), 'init', this).call(this);
              this.attr('is-data-element', true);

              this._beforeReady(function (_) {
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

                _this13._formUIComponents = [].concat(_toConsumableArray(new Set([].concat(_toConsumableArray(_this13.selectAll('.ui-form-behavior')), _toConsumableArray(__WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].querySelectorAll('.ui-form-behavior[form="' + _this13.id + '"]') || [])))));

                _this13._formUIComponents.forEach(function (el) {
                  el.addEventListener('change', function (e) {});
                });
              });
            }
          }, {
            key: 'elements',
            get: function get() {
              return this.id ? [].concat(_toConsumableArray(new Set([].concat(_toConsumableArray(this.selectAll('input[name], select[name], .ui-form-behavior')), _toConsumableArray(__WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].querySelectorAll('[form="' + this.id + '"]')))))) : this.selectAll('input[name], select[name], .ui-form-behavior');
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
                if (el.name) formdata.append(el.name, el.value || '');
                return formdata;
              }, new FormData());
            },
            set: function set(data) {
              var _this14 = this;

              Object.entries(data).forEach(function (_ref19) {
                var _ref20 = _slicedToArray(_ref19, 2),
                    name = _ref20[0],
                    val = _ref20[1];

                var els = _this14.elements.filter(function (el) {
                  return el.matches('[name="' + name + '"]');
                });
                els.forEach(function (el, i, arr) {
                  var type = _this14._isFormEligible(el);
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
        }(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */])
      });
    }();
    /* unused harmony export Form */

    var FormBehavior = function () {
      var reflectedAttrs = ['name', 'value', 'required', 'is-valid', 'placeholder'];
      return function (superclass) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["b" /* defineUIComponent */])({
          name: 'ui-form-behavior',
          registerElement: false,
          reflectedAttrs: reflectedAttrs,
          definition: function (_superclass2) {
            _inherits(definition, _superclass2);

            function definition() {
              _classCallCheck(this, definition);

              return _possibleConstructorReturn(this, (definition.__proto__ || Object.getPrototypeOf(definition)).apply(this, arguments));
            }

            _createClass(definition, [{
              key: 'validate',
              value: function validate(validator) {
                var _this16 = this;

                return this.watchAttribute(this, 'value', function () {
                  for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                    args[_key4] = arguments[_key4];
                  }

                  _this16.isValid = validator.apply(_this16, args);
                  _this16.classList.remove(_this16.isValid ? 'invalid' : 'valid');
                  _this16.classList.add(_this16.isValid ? 'valid' : 'invalid');
                });
              }
            }]);

            return definition;
          }(superclass)
        });
      };
    }();
    /* harmony export (immutable) */__webpack_exports__["a"] = FormBehavior;

    /***/
  },
  /* 6 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__animations_rippler_js__ = __webpack_require__(9);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__utils_float_js__ = __webpack_require__(4);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__utils_centerer_js__ = __webpack_require__(14);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__utils_dom_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);

    var template = __WEBPACK_IMPORTED_MODULE_4__utils_dom_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    :host {\n      display: block;\n      height: 50px;\n      width: 120px;\n      text-align: center;\n      white-space: nowrap;\n      text-overflow: ellipsis;\n      text-transform: uppercase;\n      border-radius: 5%;\n      background-color: var(--ui-theme-secondary-dark-color, blue);\n      color: var(--ui-theme-light-text-color, #fff);\n      margin: 5px;\n    }\n\n    :host(:hover) {\n      box-shadow: inset 0 0 0 99999px rgba(150,150,150,0.2);\n    }\n  </style>\n';

    var reflectedAttrs = ['dialog-dismiss', 'dialog-confirm', 'submit'];

    var Button = Object(__WEBPACK_IMPORTED_MODULE_4__utils_dom_js__["b" /* defineUIComponent */])({
      name: 'ui-button',
      template: template,
      reflectedAttrs: reflectedAttrs,
      definition: function (_Object$with2) {
        _inherits(Button, _Object$with2);

        function Button() {
          _classCallCheck(this, Button);

          return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
        }

        return Button;
      }(Object(__WEBPACK_IMPORTED_MODULE_5__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */]).with(__WEBPACK_IMPORTED_MODULE_3__utils_centerer_js__["b" /* default */], __WEBPACK_IMPORTED_MODULE_2__utils_float_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__animations_rippler_js__["a" /* default */]))
    });

    /* harmony default export */__webpack_exports__["a"] = Button;

    /***/
  },
  /* 7 */
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
      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
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
  /* 8 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);

    var processHTMLAttr = function processHTMLAttr(attr) {
      switch (Object(__WEBPACK_IMPORTED_MODULE_0__node_modules_extracttype_extracttype_js__["a" /* default */])(attr)) {
        case 'Null':
        case 'Undefined':
          return null;

        case 'String':
          // return attr.toLowerCase() === 'false' ? false : attr || true;
          if (!attr) return true; // empty string, e.g. <ui-drawer is-modal></ui-drawer>
          var val = void 0;
          try {
            val = JSON.parse(attr); // numbers, bools, etc
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
  /* 9 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__utils_dom_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);

    var rippleEvents = ['click', 'tap', 'dblclick'];
    var handlerRegistry = new WeakMap();
    var registerHandler = function registerHandler(f) {
      var cached = handlerRegistry.get(f);
      var fn = cached || function (e) {
        setTimeout(f, 500, e);
      };
      handlerRegistry.set(f, fn);
      return fn;
    };

    var template = __WEBPACK_IMPORTED_MODULE_0__utils_dom_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    :host {\n      overflow: hidden;\n      position: relative;\n      cursor: pointer;\n      transform: translate3d(0, 0, 0);\n    }\n\n    :host:after {\n      content: "";\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      top: 0;\n      left: 0;\n      opacity: 0;\n      transform: scale(10, 10);\n      transition: transform .5s, opacity 1s;\n      pointer-events: none;\n      background-repeat: no-repeat;\n      background-image: radial-gradient(circle, var(--ui-theme-ripple-color), 10%, transparent 10%);\n      background-position: 50%;\n    }\n\n    :host(:active):after {\n      opacity: .7;\n      transform: scale(0, 0);\n      transition: 0s;\n      background-color: orange;\n    }\n  </style>\n';

    /* harmony default export */__webpack_exports__["a"] = function (superclass) {
      return Object(__WEBPACK_IMPORTED_MODULE_0__utils_dom_js__["b" /* defineUIComponent */])({
        name: 'ui-ripples',
        template: template,
        registerElement: false,
        definition: function (_superclass3) {
          _inherits(Ripples, _superclass3);

          function Ripples() {
            _classCallCheck(this, Ripples);

            return _possibleConstructorReturn(this, (Ripples.__proto__ || Object.getPrototypeOf(Ripples)).apply(this, arguments));
          }

          _createClass(Ripples, [{
            key: 'on',


            // Here we want to intercept any handlers on events that trigger a ripple and delay them
            // to give the animation time to complete.
            value: function on(evts, f) {
              var _this19 = this;

              var events = evts.split(/\s+/g);
              events.forEach(function (evt) {
                if (rippleEvents.includes(evt)) {
                  // Here we'll want to cache a canonical version for later removal
                  var fn = registerHandler(f);
                  _get(Ripples.prototype.__proto__ || Object.getPrototypeOf(Ripples.prototype), 'on', _this19).call(_this19, evt, fn);
                } else {
                  _get(Ripples.prototype.__proto__ || Object.getPrototypeOf(Ripples.prototype), 'on', _this19).call(_this19, evt, f);
                }
              });
            }

            // Similar intercept here for function arguments

          }, {
            key: 'remove',
            value: function remove() {
              var _get2;

              for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                args[_key6] = arguments[_key6];
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
  /* 10 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* unused harmony export applyTheme */
    /* unused harmony export revertTheme */
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "a", function () {
      return generateCSSClassName;
    });
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__node_modules_jsstring_src_jsstring_js__ = __webpack_require__(7);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__dom_js__ = __webpack_require__(0);

    var toCSSVar = function toCSSVar(s) {
      return '--ui-theme-' + Object(__WEBPACK_IMPORTED_MODULE_1__node_modules_jsstring_src_jsstring_js__["c" /* toSnakeCase */])(s, '-');
    };

    var defaultThemeObj = {
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
      accentColor: 'orange'
    };

    var themeRegistry = {};
    var appliedThemes = [];
    var currentTheme = null;

    var applyTheme = function applyTheme(theme, name) {
      var type = Object(__WEBPACK_IMPORTED_MODULE_0__node_modules_extracttype_extracttype_js__["a" /* default */])(theme);
      if (type === 'String') {
        var t = themeRegistry[theme];
        if (t) {
          currentTheme = t;
          __WEBPACK_IMPORTED_MODULE_2__dom_js__["c" /* document */].head.appendChild(t);
          appliedThemes.push(t);
          return t;
        } else {
          throw new Error('Unrecognized theme ' + theme + '.');
        }
      }

      var style = __WEBPACK_IMPORTED_MODULE_2__dom_js__["c" /* document */].createElement('style');
      style.innerHTML = ':root { ' + Object.entries(theme).reduce(function (s, _ref21) {
        var _ref22 = _slicedToArray(_ref21, 2),
            k = _ref22[0],
            v = _ref22[1];

        return k in defaultThemeObj ? s + ' ' + toCSSVar(k) + ':' + v + ';' : s;
      }, '') + ' }';

      if (name) themeRegistry[name] = style;
      __WEBPACK_IMPORTED_MODULE_2__dom_js__["c" /* document */].head.appendChild(style);
      appliedThemes.push(style);
      currentTheme = style;
      return style;
    };

    var defaultTheme = applyTheme(defaultThemeObj, 'default');
    var revertTheme = function revertTheme() {
      var current = appliedThemes.pop();
      if (current && current !== defaultTheme) __WEBPACK_IMPORTED_MODULE_2__dom_js__["c" /* document */].head.removeChild(current);
      return appliedThemes[appliedThemes.length - 1] || defaultTheme;
    };

    var generateCSSClassName = function generateCSSClassName() {
      return __WEBPACK_IMPORTED_MODULE_1__node_modules_jsstring_src_jsstring_js__["a" /* random */].alpha(1) + __WEBPACK_IMPORTED_MODULE_1__node_modules_jsstring_src_jsstring_js__["a" /* random */].alphanumeric(5);
    };

    /***/
  },
  /* 11 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__form_js__ = __webpack_require__(5);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);
    /*
     * NOTE: it is not currently possible to extend specific HTMLElements, leading
     * to this element being rather convoluted. Once it's possible to extend input
     * directly this should be refactored.
     *
     */

    // This is here to make input event consistent across browsers, all of these
    // if the value is different than the last onfocus will trigger change event.
    var changeTriggers = ['blur', 'keyup', 'paste', 'input'];

    var reflectedAttrs = [

    // These values are here to mimic the behavior of the native, NOTE: incomplete.
    'type', 'form', 'placeholder', 'pattern', 'required',

    // NOTE: unlike placeholder which merely displays text to the user,
    // this is a true default value, i.e. it will be the value property/attribute
    // of the input if empty, will be the value if a form is submitted, etc.
    // Will override placeholder if both are set. Different input elements
    // implementing this interface should validate the value appropriately.
    'default-value'];

    var template = __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    :host {\n      display: block;\n      border-bottom: solid 1px;\n      border-bottom-color: #999;\n      min-height: 25px;\n      margin-bottom: 10px;\n      margin-top: 10px;\n      max-width: 200px;\n    }\n\n    :host(.focused) {\n      border-bottom-color: var(--ui-theme-primary-dark-color, blue);\n      box-shadow: 0px 4px 4px -4px;\n    }\n\n    #input {\n      border: none;\n      outline: none;\n      width: 90%;\n      margin-left: 5%;\n      margin-bottom: 3px;\n      height: 25px;\n      font-size: 16px;\n    }\n  </style>\n  <input id="input"/>\n';

    var debounce = function debounce(n, immed, f) {
      var _ref23 = function () {
        switch (Object(__WEBPACK_IMPORTED_MODULE_4__node_modules_extracttype_extracttype_js__["b" /* extractType */])(immed)) {
          case 'Boolean':
            return [f, immed];
          case 'Function':
            return [immed, false];
          default:
            throw new TypeError('Unrecognized arguments ' + immed + ' and ' + f + ' to function debounce.');
        }
      }(),
          _ref24 = _slicedToArray(_ref23, 2),
          fn = _ref24[0],
          now = _ref24[1];

      var timer = null;
      return function () {
        var _this20 = this;

        for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
          args[_key7] = arguments[_key7];
        }

        if (timer === null && now) {
          fn.apply(this, args);
        }
        clearTimeout(timer);
        timer = setTimeout(function () {
          return fn.apply(_this20, args);
        }, n);
        return timer;
      };
    };

    /* unused harmony default export */var _unused_webpack_default_export = Object(__WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["b" /* defineUIComponent */])({
      name: 'ui-input',
      template: template,
      reflectedAttrs: reflectedAttrs,
      definition: function (_Object$with3) {
        _inherits(Input, _Object$with3);

        function Input() {
          _classCallCheck(this, Input);

          var _this21 = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this));

          _this21._input = null;
          return _this21;
        }

        _createClass(Input, [{
          key: 'init',
          value: function init() {
            var _this22 = this;

            _get(Input.prototype.__proto__ || Object.getPrototypeOf(Input.prototype), 'init', this).call(this);
            this._input = this.shadowRoot.querySelector('#input');
            var placeholder = this.placeholder || this.name || this.defaultValue || null;

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

            this._input.addEventListener('focus', function (e) {
              _this22._before = _this22._input.value;
              _this22.classList.add('focused');
            });

            this._input.addEventListener('blur', function (e) {
              _this22.classList.remove('focused');
            });

            changeTriggers.forEach(function (evtName) {
              return _this22._input.addEventListener(evtName, debounce(500, function (e) {
                if (_this22._input.value !== _this22._before) {
                  _this22._before = _this22._input.value;
                  _this22.value = _this22._input.value;
                  _this22.dispatchEvent(new Event('change', { bubbles: true }));
                }
              }));
            });

            this.on('attribute-change', function (_ref25) {
              var _ref25$changed = _ref25.changed,
                  now = _ref25$changed.now,
                  name = _ref25$changed.name,
                  was = _ref25$changed.was;

              switch (name) {
                case 'name':
                  _this22._input.name = now;
                  _this22.name = now;
                  break;

                case 'value':
                  var val = now === true ? '' : now;
                  if (val === '') {
                    setTimeout(function () {
                      if (!_this22._input.value) {
                        _this22._input.value = _this22.defaultValue || '';
                        _this22.dispatchEvent(new Event('change', { bubbles: 'true' }));
                      }
                    }, 500);
                  } else if (_this22._input.value !== val) {
                    _this22._input.value = now;
                    _this22.dispatchEvent(new Event('change', { bubbles: 'true' }));
                  }
                  break;

                case 'default-value':
                  if (!_this22.value) _this22.value = now;
                  break;

                case 'type':
                  if (now === 'hidden') {
                    _this22.hide();
                    return;
                  }
                  if (!['text', 'number', 'password', 'email'].includes(now)) return;
                // fall-through

                case 'placeholder':
                case 'required':
                  if (now == null) {
                    _this22._input.removeAttribute(name);
                  } else {
                    _this22._input.setAttribute(name, now || true);
                  }
                  break;
              }
            });
          }
        }]);

        return Input;
      }(Object(__WEBPACK_IMPORTED_MODULE_3__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */]).with(__WEBPACK_IMPORTED_MODULE_1__form_js__["a" /* FormBehavior */]))
    });

    /***/
  },
  /* 12 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__utils_float_js__ = __webpack_require__(4);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);

    var template = __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    :host {\n      display: block;\n      width: 200px;\n      height: 300px;\n      padding: 2%;\n    }\n  </style>\n  <slot></slot>\n';

    var Card = Object(__WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["b" /* defineUIComponent */])({
      name: 'ui-card',
      template: template,
      definition: function (_Object$with4) {
        _inherits(Card, _Object$with4);

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
      }(Object(__WEBPACK_IMPORTED_MODULE_3__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */]).with(__WEBPACK_IMPORTED_MODULE_1__utils_float_js__["a" /* default */]))
    });

    /* harmony default export */__webpack_exports__["a"] = Card;

    /***/
  },
  /* 13 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__button_js__ = __webpack_require__(6);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__ = __webpack_require__(0);

    var template = __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    :host {\n      display: block;\n      width: 74px;\n      height: 74px;\n      border-radius: 50%;\n      background-color: var(--ui-theme-accent-color, purple);\n    }\n  </style>\n';

    /* unused harmony default export */var _unused_webpack_default_export = Object(__WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["b" /* defineUIComponent */])({
      name: 'ui-fab',
      template: template,
      definition: function (_WEBPACK_IMPORTED_MO2) {
        _inherits(Fab, _WEBPACK_IMPORTED_MO2);

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
  /* 14 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "a", function () {
      return centeredStyles;
    });
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__dom_js__ = __webpack_require__(0);

    var centeredStyles = '\n    :host {\n      transform-style: preserve-3d;\n    }\n\n    .content-wrapper {\n      position: relative;\n      top: 49%;\n      transform: translateY(-51%);\n    }\n';

    var template = __WEBPACK_IMPORTED_MODULE_0__dom_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    ' + centeredStyles + '\n  </style>\n  <div class="content-wrapper">\n    <slot></slot>\n  </div>\n';

    /* harmony default export */__webpack_exports__["b"] = function (superclass) {
      return Object(__WEBPACK_IMPORTED_MODULE_0__dom_js__["b" /* defineUIComponent */])({
        name: 'ui-centered',
        template: template,
        registerElement: false,
        definition: function (_superclass4) {
          _inherits(Centered, _superclass4);

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
  /* 15 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__ = __webpack_require__(0);

    var template = __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    :host {\n      display: block;\n      height: 100vh;\n      width: 100vw;\n      background-color: rgba(0,0,0,0.7);\n      position: absolute;\n      top: 0px;\n      left: 0px;\n      z-index: 10000;\n    }\n  </style>\n';

    var Backdrop = Object(__WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["b" /* defineUIComponent */])({
      name: 'ui-backdrop',
      template: template,
      definition: function (_WEBPACK_IMPORTED_MO3) {
        _inherits(Backdrop, _WEBPACK_IMPORTED_MO3);

        function Backdrop() {
          _classCallCheck(this, Backdrop);

          // Elements that use this element should set this property to themselves as a
          // debugging aid.
          var _this26 = _possibleConstructorReturn(this, (Backdrop.__proto__ || Object.getPrototypeOf(Backdrop)).call(this));

          _this26.for = null;
          return _this26;
        }

        _createClass(Backdrop, [{
          key: 'init',
          value: function init() {
            this.hide();
          }
        }]);

        return Backdrop;
      }(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */])
    });

    /* unused harmony default export */var _unused_webpack_default_export = Backdrop;

    /***/
  },
  /* 16 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__animations_rippler_js__ = __webpack_require__(9);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__checkbox_js__ = __webpack_require__(27);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__form_js__ = __webpack_require__(5);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__utils_dom_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_6__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);

    var ListBehavior = function ListBehavior(superclass) {
      return Object(__WEBPACK_IMPORTED_MODULE_4__utils_dom_js__["b" /* defineUIComponent */])({
        name: 'ui-list-behavior',
        reflectedAttrs: ['multiple', 'selected-index'],
        registerElement: false,
        definition: function (_Object$with5) {
          _inherits(definition, _Object$with5);

          function definition() {
            _classCallCheck(this, definition);

            var _this27 = _possibleConstructorReturn(this, (definition.__proto__ || Object.getPrototypeOf(definition)).call(this));

            _this27._items = [];
            _this27._selected = null;
            return _this27;
          }

          _createClass(definition, [{
            key: 'appendChild',
            value: function appendChild(node) {
              var _this28 = this;

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
                node.onReady(function (el) {
                  if (el instanceof Item) {
                    node.on('click', function (e) {
                      _this28.selected = node;
                      node.isSelected = true;
                    });
                    _get(definition.prototype.__proto__ || Object.getPrototypeOf(definition.prototype), 'appendChild', _this28).call(_this28, node);
                    _this28._items.push(node);
                    if (el.isSelected) _this28.onReady(function (_) {
                      return _this28.selected = node;
                    });
                  }
                });
              }
              return node;
            }
          }, {
            key: 'init',
            value: function init() {
              var _this29 = this;

              _get(definition.prototype.__proto__ || Object.getPrototypeOf(definition.prototype), 'init', this).call(this);
              this._beforeReady(function (_) {
                _this29.selectAll('.ui-item').map(function (item) {
                  _this29._items.push(item);
                  if (item.isSelected) _this29.selected = item;
                  item.on('click', function (e) {
                    if (_this29.multiple) {
                      item.isSelected = !item.isSelected;
                      if (item.isSelected) {
                        _this29.selected = item;
                      } else {
                        _this29._selected = _this29._selected.filter(function (x) {
                          return x !== item;
                        });
                      }
                    } else {
                      if (item !== _this29.selected) _this29.selected = item;
                    }
                  });
                });
              });

              this.on('attribute-change', function (_ref26) {
                var _ref26$changed = _ref26.changed,
                    now = _ref26$changed.now,
                    name = _ref26$changed.name;

                switch (name) {
                  case 'multiple':
                    if (now) {
                      _this29.selectedIndex = -1;
                      _this29._selected = [_this29.selected];
                    } else {
                      _this29.selected = _this29.selected == null ? null : _this29.selected[0];
                    }
                    break;

                  case 'selected-index':
                    if (now === -1 || _this29.multiple) return;
                    if (!_this29._items[now]) {
                      console.warn('Attempted to set invalid index ' + now + ' for element.');
                      _this29.attr('selected-index', was);
                      return;
                    }

                    if (_this29._items[now] !== _this29.selected) _this29.selected = now;
                    break;
                }
              });
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

              var type = Object(__WEBPACK_IMPORTED_MODULE_6__node_modules_extracttype_extracttype_js__["a" /* default */])(value);
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
                selection.isSelected = true;
                if (this.multiple) {
                  this.selectedIndex = -1;
                  this._selected.push(selection);
                } else {
                  this.selectedIndex = this._items.indexOf(selection);
                  this._selected = selection;
                  this._items.forEach(function (item) {
                    if (item !== selection) item.isSelected = false;
                  });
                }
                var evt = new Event('change', { bubbles: true });
                evt.selection = this._selected;
                evt.value = this.value;
                this.dispatchEvent(evt);
              }

              return selection;
            }
          }]);

          return definition;
        }(Object(__WEBPACK_IMPORTED_MODULE_5__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(superclass).with(__WEBPACK_IMPORTED_MODULE_3__form_js__["a" /* FormBehavior */]))
      });
    };
    /* harmony export (immutable) */__webpack_exports__["b"] = ListBehavior;

    var Item = function () {
      var template = __WEBPACK_IMPORTED_MODULE_4__utils_dom_js__["c" /* document */].createElement('template');
      var reflectedAttrs = ['is-selected', 'value'];
      template.innerHTML = '\n    <style>\n      :host {\n        --ui-theme-ripple-color: var(--ui-theme-primary-dark-color, rgb(0, 139, 163));\n        display: block;\n        margin-top: 10px;\n        margin-bottom: 10px;\n        min-height: 20px;\n        background-color: inherit;\n        color: inherit;\n        border-radius: 0;\n        text-transform: capitalize;\n        width: 90%;\n        margin-left: 5%;\n        padding-top: 4px;\n      }\n\n      :host(:hover) {\n        color: var(--ui-theme-primary-dark-color, #999);\n      }\n\n      :host(.selected) {\n        border-bottom: 1px solid var(--ui-theme-primary-dark-color, rgb(0, 139, 163));\n      }\n\n      .ui-checkbox {\n        display: none;\n        height: 18px;\n        width: 18px;\n        float: left;\n      }\n\n      .ui-checkbox::before {\n        top: 2px;\n        height: 9px;\n        left: 5px;\n      }\n\n      :host-context([multiple="true"]) {\n        border-bottom: none;\n      }\n\n      :host-context([multiple="true"]) ui-checkbox {\n        display: inline-block;\n      }\n\n      :host-context([multiple="true"]) #content {\n        position: relative;\n        left: -10px; /* offsets checkbox */\n      }\n    </style>\n    <ui-checkbox></ui-checkbox>\n    <span id="content"><slot></slot></span>\n  ';

      return Object(__WEBPACK_IMPORTED_MODULE_4__utils_dom_js__["b" /* defineUIComponent */])({
        name: 'ui-item',
        template: template,
        reflectedAttrs: reflectedAttrs,
        definition: function (_Object$with6) {
          _inherits(Item, _Object$with6);

          function Item() {
            _classCallCheck(this, Item);

            var _this30 = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this));

            _this30._checkbox = null;
            _this30._content = null;
            return _this30;
          }

          _createClass(Item, [{
            key: 'init',
            value: function init() {
              var _this31 = this;

              _get(Item.prototype.__proto__ || Object.getPrototypeOf(Item.prototype), 'init', this).call(this);
              this._beforeReady(function (_) {
                _this31._checkbox = _this31.shadowRoot.querySelector('ui-checkbox');
                _this31._content = _this31.shadowRoot.querySelector('#content');
                if (!_this31.value || _this31.value.toString() === 'true') _this31.value = _this31.textContent;
              });

              this.on('attribute-change', function (_ref27) {
                var _ref27$changed = _ref27.changed,
                    now = _ref27$changed.now,
                    name = _ref27$changed.name;

                switch (name) {
                  case 'is-selected':
                    _this31.onReady(function (_) {
                      if (now) {
                        _this31.classList.add('selected');
                        _this31._checkbox.checked = true;
                        _this31.dispatchEvent(new CustomEvent('component-selected'));
                      } else {
                        _this31.classList.remove('selected');
                        _this31._checkbox.checked = false;
                        _this31.dispatchEvent(new CustomEvent('component-deselected'));
                      }
                    });
                    break;
                }
              });
            }
          }]);

          return Item;
        }(Object(__WEBPACK_IMPORTED_MODULE_5__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */]).with(__WEBPACK_IMPORTED_MODULE_1__animations_rippler_js__["a" /* default */]))
      });
    }();
    /* harmony export (immutable) */__webpack_exports__["a"] = Item;

    var List = function () {
      var template = __WEBPACK_IMPORTED_MODULE_4__utils_dom_js__["c" /* document */].createElement('template');
      template.innerHTML = '\n    <style>\n      :host {\n        display: block;\n        text-align: center;\n        margin: 5px;\n      }\n    </style>\n    <slot></slot>\n  ';

      return Object(__WEBPACK_IMPORTED_MODULE_4__utils_dom_js__["b" /* defineUIComponent */])({
        name: 'ui-list',
        template: template,
        definition: function (_Object$with7) {
          _inherits(List, _Object$with7);

          function List() {
            _classCallCheck(this, List);

            return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
          }

          return List;
        }(Object(__WEBPACK_IMPORTED_MODULE_5__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */]).with(ListBehavior))
      });
    }();
    /* unused harmony export List */

    /***/
  },
  /* 17 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__src_elements_login_js__ = __webpack_require__(18);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__src_elements_fab_js__ = __webpack_require__(13);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__src_elements_drop_down_js__ = __webpack_require__(26);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__src_elements_drawer_js__ = __webpack_require__(28);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__src_elements_hamburger_js__ = __webpack_require__(30);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__src_elements_input_js__ = __webpack_require__(11);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_6__src_elements_router_js__ = __webpack_require__(31);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_7__src_elements_tabs_js__ = __webpack_require__(33);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_8__src_elements_toolbar_js__ = __webpack_require__(34);

    /***/
  },
  /* 18 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__form_js__ = __webpack_require__(5);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__input_js__ = __webpack_require__(11);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__card_js__ = __webpack_require__(12);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__fab_js__ = __webpack_require__(13);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_6__alert_js__ = __webpack_require__(24);

    var INVALID = 'Invalid login credentials. Please double-check your username and password.';
    var FAILURE = 'Could not connect to the server to verify your identity. Please check the console for details.';

    var reflectedAttrs = ['is-logged-in', 'data-url', 'session-timeout'];
    var template = __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    ui-card {\n      width: 300px;\n      height: 315px;\n    }\n\n    ui-input {\n      margin-bottom: 30px;\n    }\n\n    ui-fab {\n      float: right;\n      position: relative;\n      top: 30px;\n      left: 15px;\n    }\n\n    h2 {\n      color: #AAA;\n      font-style: italic;\n      margin-bottom: 40px;\n    }\n\n    #heading {\n      width: 70%;\n      margin-left: 10%;\n      border-bottom: var(--ui-theme-dark-text-color, #999);\n    }\n\n    .arrow {\n      border: solid #fff;\n      border-width: 0 4px 5px 0;\n      display: inline-block;\n      padding: 3px;\n      position: relative;\n      transform: rotate(45deg);\n      height: 25px;\n      width: 12px;\n      top: -2px;\n      left: 2px;\n    }\n\n    :host {\n      position: relative;\n      left: 50px;\n      top: 50px;\n    }\n  </style>\n  <ui-card>\n    <h2 id="heading">Login</h2>\n    <ui-form>\n      <ui-input name="user" placeholder="User" required></ui-input>\n      <ui-input name="pass" placeholder="Password" type="password" required></ui-input>\n    </ui-form>\n    <ui-fab><div class="arrow"></div></ui-fab>\n  </ui-card>\n';

    /* unused harmony default export */var _unused_webpack_default_export = Object(__WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["b" /* defineUIComponent */])({
      name: 'ui-login',
      reflectedAttrs: reflectedAttrs,
      template: template,
      definition: function (_WEBPACK_IMPORTED_MO4) {
        _inherits(Login, _WEBPACK_IMPORTED_MO4);

        function Login() {
          _classCallCheck(this, Login);

          var _this33 = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this));

          _this33._alert = null;
          _this33._form = null;
          _this33._sessionTimeoutHandle = null;
          return _this33;
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
            __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["d" /* global */].sessionStorage.setItem('ui-credentials', '');
            this.dispatchEvent(new CustomEvent('logout', { bubbles: true }));
            return this;
          }
        }, {
          key: 'userLogout',
          value: function userLogout() {
            var name = this.credentials.name;

            this.logout();
            this._alert.alert('User ' + name + ' is now logged out. Please close this tab.');
          }
        }, {
          key: 'countDown',
          value: function countDown(h) {
            var _this34 = this;

            __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["d" /* global */].clearTimeout(h);
            return __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["d" /* global */].setTimeout(function () {
              _this34.logout();
              _this34._alert.alert('Session timed out. Please login again or close the tab.');
            }, this.sessionTimeout || 30 * 60 * 1000);
          }
        }, {
          key: 'init',
          value: function init() {
            var _this35 = this;

            _get(Login.prototype.__proto__ || Object.getPrototypeOf(Login.prototype), 'init', this).call(this);
            this._beforeReady(function (_) {
              _this35._form = _this35.selectInternalElement('ui-form');
              _this35._alert = __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["c" /* document */].querySelector('ui-alert');
              if (!_this35._alert) {
                _this35._alert = __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["c" /* document */].createElement('ui-alert');
                __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["c" /* document */].body.appendChild(_this35._alert);
              }

              ['click', 'keydown'].forEach(function (evt) {
                __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["c" /* document */].addEventListener(evt, function (e) {
                  if (_this35.isLoggedIn) _this35._sessionTimeoutHandle = _this35.countDown(_this35._sessionTimeoutHandle);
                });
              });

              _this35.selectInternalElement('ui-fab').on('click keydown', function (e) {
                if (!_this35.isLoggedIn && (!e.keyCode || e.keyCode === 13)) {
                  if (!_this35.dataUrl) {
                    throw new Error('No url for login, whatcha want me to do?');
                  }

                  if (!_this35._form.isValid) {
                    _this35._alert.alert('Please supply a Username and Password.');
                    return;
                  }

                  _this35.selectInternalElement('ui-form').submit({ url: _this35.dataUrl, method: 'POST', responseType: 'json' }).then(function (valid) {
                    if (valid) {
                      sessionStorage.setItem('ui-credentials', JSON.stringify(_this35.credentials));
                      _this35.login(valid);
                    } else {
                      _this35._alert.alert(INVALID);
                    }
                  }).catch(function (err) {
                    console.error(err);
                    _this35._alert.alert(FAILURE);
                  });
                }
              });

              var cached = __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["d" /* global */].sessionStorage.getItem('ui-credentials');
              if (cached) {
                try {
                  var credentials = JSON.parse(cached);
                  if (credentials.user && credentials.pass) {
                    console.log('Logging in with session data...');
                    _this35._form.data = credentials;
                    _this35.login();
                  }
                } catch (e) {
                  // no-op
                }
              }
            });

            this.onReady(function (_) {
              var bttn = __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["c" /* document */].querySelector('[logout-button]');
              // If added later event handling needs to be done manually.
              if (bttn) {
                bttn.on('click keydown', function (e) {
                  if (!e.keyCode || e.keyCode === 13) {
                    _this35.userLogout();
                  }
                });
              }
            });
          }
        }, {
          key: 'credentials',
          get: function get() {
            return this.selectInternalElement('ui-form').serialize();
          }
        }]);

        return Login;
      }(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */])
    });

    /***/
  },
  /* 19 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    /* harmony default export */
    __webpack_exports__["a"] = function (superclass) {
      return function (_superclass5) {
        _inherits(DataBinder, _superclass5);

        function DataBinder() {
          _classCallCheck(this, DataBinder);

          var _this36 = _possibleConstructorReturn(this, (DataBinder.__proto__ || Object.getPrototypeOf(DataBinder)).call(this));

          _this36._oneWayBoundAttrs = {};
          _this36._twoWayBoundAttrs = {};
          _this36._internalMutationFlag = false;
          return _this36;
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
            var _this37 = this;

            var twoWay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var parent = null;
            var node = this;
            while (node = node.parentNode || node.host) {
              // need host for shadowRoots
              if (node.getAttribute && node.getAttribute(parentAttribute) != null) {
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
              _this37.attr(attribute, parent.attr(parentAttribute));

              // Watch changes.
              _this37.watchAttribute(parent, parentAttribute, function (now, name, was) {
                if (_this37.attr(attribute) !== now) {
                  _this37._internalMutationFlag = true;
                  _this37.attr(attribute, now);
                }
              });

              if (twoWay) {
                _this37.watchAttribute(_this37, attribute, function (now, name, was) {
                  if (parent.attr(parentAttribute) !== now) {
                    parent.attr(parentAttribute, now);
                  }
                });
                _this37._twoWayBoundAttrs[attribute] = parentAttribute;
              } else {
                _this37._oneWayBoundAttrs[attribute] = parentAttribute;
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
  /* 20 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__attribute_analyzer_js__ = __webpack_require__(8);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__dom_js__ = __webpack_require__(0);

    var attrConf = { attributes: true };

    var isHTMLElement = function isHTMLElement(arg) {
      return Boolean(Object(__WEBPACK_IMPORTED_MODULE_1__node_modules_extracttype_extracttype_js__["a" /* default */])(arg).match(/HTML[a-zA-Z]*Element/));
    };

    /* harmony default export */__webpack_exports__["a"] = function (superclass) {
      return function (_superclass6) {
        _inherits(DOMutils, _superclass6);

        function DOMutils() {
          _classCallCheck(this, DOMutils);

          var _this38 = _possibleConstructorReturn(this, (DOMutils.__proto__ || Object.getPrototypeOf(DOMutils)).call(this));

          _this38._mutationObservers = [];
          return _this38;
        }

        _createClass(DOMutils, [{
          key: 'watchAttribute',


          // Observes changes to the given attribute on the given node.
          value: function watchAttribute(n, a, callb) {
            var _this39 = this;

            var _ref28 = function () {
              if (isHTMLElement(n)) return [n, a, callb];
              return [_this39, n, a];
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
            var _this40 = this;

            evts.split(/\s+/g).forEach(function (evt) {
              var isDupe = _this40._listeners.some(function (_ref33) {
                var _ref34 = _slicedToArray(_ref33, 2),
                    e = _ref34[0],
                    f = _ref34[1];

                return e === evt && fn === f;
              });
              if (!isDupe) {
                _this40.addEventListener(evt, fn);
                _this40._listeners.push([evt, fn]);
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
            var _this41 = this;

            for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
              args[_key8] = arguments[_key8];
            }

            var _ref35 = function (arr) {
              switch (arr.length) {
                case 0:
                  _this41.parentElement && _this41.parentElement.removeChild(_this41);
                  return [];

                case 1:
                  return function (_ref37) {
                    var _ref38 = _slicedToArray(_ref37, 1),
                        item = _ref38[0];

                    var type = Object(__WEBPACK_IMPORTED_MODULE_1__node_modules_extracttype_extracttype_js__["a" /* default */])(item);
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

                    if (isHTMLElement(first) || Object(__WEBPACK_IMPORTED_MODULE_1__node_modules_extracttype_extracttype_js__["a" /* default */])(first) === 'Text') {
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

            if (fn && Object(__WEBPACK_IMPORTED_MODULE_1__node_modules_extracttype_extracttype_js__["a" /* default */])(fn) === 'Function') {
              this._listeners = this._listeners.filter(function (_ref39) {
                var _ref40 = _slicedToArray(_ref39, 2),
                    e = _ref40[0],
                    f = _ref40[1];

                if (f === fn && (evt === null || evt === e)) {
                  _this41.removeEventListener(e, f);
                  return false;
                }
                return true;
              });
            }

            if (children) {
              children.forEach(function (child) {
                return _this41.removeChild(child);
              });
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

        }, {
          key: 'hide',
          value: function hide() {
            this.style.display = 'none';
            return this;
          }
        }, {
          key: 'show',
          value: function show() {
            this.style.display = '';
            return this;
          }
        }, {
          key: 'attr',
          value: function attr(name, value) {
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
        }, {
          key: 'isVisible',
          get: function get() {
            var style = __WEBPACK_IMPORTED_MODULE_2__dom_js__["d" /* global */].getComputedStyle(this);
            return style.display !== 'none' && style.visibility !== 'hidden';
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
  /* 21 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
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
  /* 22 */
  /***/function (module, exports, __webpack_require__) {

    /* WEBPACK VAR INJECTION */(function (global) {
      var g,
          k = "function" == typeof Object.defineProperties ? Object.defineProperty : function (b, a, d) {
        b != Array.prototype && b != Object.prototype && (b[a] = d.value);
      },
          l = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;function n() {
        n = function n() {};l.Symbol || (l.Symbol = p);
      }var p = function () {
        var b = 0;return function (a) {
          return "jscomp_symbol_" + (a || "") + b++;
        };
      }();
      function q() {
        n();var b = l.Symbol.iterator;b || (b = l.Symbol.iterator = l.Symbol("iterator"));"function" != typeof Array.prototype[b] && k(Array.prototype, b, { configurable: !0, writable: !0, value: function value() {
            return u(this);
          } });q = function q() {};
      }function u(b) {
        var a = 0;return v(function () {
          return a < b.length ? { done: !1, value: b[a++] } : { done: !0 };
        });
      }function v(b) {
        q();b = { next: b };b[l.Symbol.iterator] = function () {
          return this;
        };return b;
      }function w(b) {
        q();n();q();var a = b[Symbol.iterator];return a ? a.call(b) : u(b);
      }
      if (!window.FormData || !window.FormData.prototype.keys) {
        var x = function x(b, a, d) {
          if (2 > arguments.length) throw new TypeError("2 arguments required, but only " + arguments.length + " present.");return a instanceof Blob ? [b + "", a, void 0 !== d ? d + "" : "string" === typeof a.name ? a.name : "Blob"] : [b + "", a + ""];
        },
            y = function y(b) {
          if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");return [b + ""];
        },
            A = function A(b) {
          var a = w(b);b = a.next().value;a = a.next().value;b instanceof Blob && (b = new File([b], a, { type: b.type,
            lastModified: b.lastModified }));return b;
        },
            B = window.FormData,
            C = window.XMLHttpRequest.prototype.send,
            D = window.Request && window.fetch;n();var E = window.Symbol && Symbol.toStringTag,
            F = new WeakMap(),
            G = Array.from || function (b) {
          return [].slice.call(b);
        };E && (Blob.prototype[E] || (Blob.prototype[E] = "Blob"), "File" in window && !File.prototype[E] && (File.prototype[E] = "File"));try {
          new File([], "");
        } catch (b) {
          window.File = function (a, d, c) {
            a = new Blob(a, c);c = c && void 0 !== c.lastModified ? new Date(c.lastModified) : new Date();Object.defineProperties(a, { name: { value: d }, lastModifiedDate: { value: c }, lastModified: { value: +c }, toString: { value: function value() {
                  return "[object File]";
                } } });E && Object.defineProperty(a, E, { value: "File" });return a;
          };
        }var H = function H(b) {
          F.set(this, Object.create(null));if (!b) return this;b = w(G(b.elements));for (var a = b.next(); !a.done; a = b.next()) {
            if (a = a.value, a.name && !a.disabled) if ("file" === a.type) for (var d = w(a.files), c = d.next(); !c.done; c = d.next()) {
              this.append(a.name, c.value);
            } else if ("select-multiple" === a.type || "select-one" === a.type) for (d = w(G(a.options)), c = d.next(); !c.done; c = d.next()) {
              c = c.value, c.selected && this.append(a.name, c.value);
            } else "checkbox" === a.type || "radio" === a.type ? a.checked && this.append(a.name, a.value) : this.append(a.name, a.value);
          }
        };g = H.prototype;g.append = function (b, a, d) {
          var c = F.get(this);c[b] || (c[b] = []);c[b].push([a, d]);
        };g["delete"] = function (b) {
          delete F.get(this)[b];
        };g.entries = function () {
          function b(b, t, I) {
            for (;;) {
              switch (a) {case 0:
                  z = F.get(J);h = [];m = z;for (f in m) {
                    h.push(f);
                  }r = 0;case 1:
                  if (!(r < h.length)) {
                    a = 3;break;
                  }f = h[r];if (f in m) {
                    a = 4;break;
                  }a = 2;break;case 4:
                  e = w(z[f]), c = e.next();case 5:
                  if (c.done) {
                    a = 7;break;
                  }d = c.value;a = 8;return { value: [f, A(d)], done: !1 };case 8:
                  if (1 != b) {
                    a = 9;break;
                  }a = -1;throw I;case 9:case 6:
                  c = e.next();a = 5;break;case 7:case 2:
                  r++;a = 1;break;case 3:
                  a = -1;default:
                  return { value: void 0, done: !0 };}
            }
          }var a = 0,
              d,
              c,
              e,
              f,
              m,
              r,
              h,
              z,
              J = this,
              t = { next: function next(a) {
              return b(0, a, void 0);
            }, "throw": function _throw(a) {
              return b(1, void 0, a);
            }, "return": function _return() {
              throw Error("Not yet implemented");
            } };q();t[Symbol.iterator] = function () {
            return this;
          };return t;
        };g.forEach = function (b, a) {
          for (var d = w(this), c = d.next(); !c.done; c = d.next()) {
            var e = w(c.value);c = e.next().value;e = e.next().value;b.call(a, e, c, this);
          }
        };g.get = function (b) {
          var a = F.get(this);return a[b] ? A(a[b][0]) : null;
        };g.getAll = function (b) {
          return (F.get(this)[b] || []).map(A);
        };g.has = function (b) {
          return b in F.get(this);
        };g.keys = function () {
          function b(b, h, t) {
            for (;;) {
              switch (a) {case 0:
                  m = w(r), f = m.next();case 1:
                  if (f.done) {
                    a = 3;break;
                  }e = f.value;c = w(e);d = c.next().value;a = 4;return { value: d, done: !1 };case 4:
                  if (1 != b) {
                    a = 5;break;
                  }a = -1;throw t;
                case 5:case 2:
                  f = m.next();a = 1;break;case 3:
                  a = -1;default:
                  return { value: void 0, done: !0 };}
            }
          }var a = 0,
              d,
              c,
              e,
              f,
              m,
              r = this,
              h = { next: function next(a) {
              return b(0, a, void 0);
            }, "throw": function _throw(a) {
              return b(1, void 0, a);
            }, "return": function _return() {
              throw Error("Not yet implemented");
            } };q();h[Symbol.iterator] = function () {
            return this;
          };return h;
        };g.set = function (b, a, d) {
          F.get(this)[b] = [[a, d]];
        };g.values = function () {
          function b(b, h, t) {
            for (;;) {
              switch (a) {case 0:
                  m = w(r), f = m.next();case 1:
                  if (f.done) {
                    a = 3;break;
                  }e = f.value;c = w(e);c.next();d = c.next().value;
                  a = 4;return { value: d, done: !1 };case 4:
                  if (1 != b) {
                    a = 5;break;
                  }a = -1;throw t;case 5:case 2:
                  f = m.next();a = 1;break;case 3:
                  a = -1;default:
                  return { value: void 0, done: !0 };}
            }
          }var a = 0,
              d,
              c,
              e,
              f,
              m,
              r = this,
              h = { next: function next(a) {
              return b(0, a, void 0);
            }, "throw": function _throw(a) {
              return b(1, void 0, a);
            }, "return": function _return() {
              throw Error("Not yet implemented");
            } };q();h[Symbol.iterator] = function () {
            return this;
          };return h;
        };H.prototype._asNative = function () {
          for (var b = new B(), a = w(this), d = a.next(); !d.done; d = a.next()) {
            var c = w(d.value);d = c.next().value;c = c.next().value;b.append(d, c);
          }return b;
        };H.prototype._blob = function () {
          for (var b = "----formdata-polyfill-" + Math.random(), a = [], d = w(this), c = d.next(); !c.done; c = d.next()) {
            var e = w(c.value);c = e.next().value;e = e.next().value;a.push("--" + b + "\r\n");e instanceof Blob ? a.push('Content-Disposition: form-data; name="' + c + '"; filename="' + e.name + '"\r\n', "Content-Type: " + (e.type || "application/octet-stream") + "\r\n\r\n", e, "\r\n") : a.push('Content-Disposition: form-data; name="' + c + '"\r\n\r\n' + e + "\r\n");
          }a.push("--" + b + "--");
          return new Blob(a, { type: "multipart/form-data; boundary=" + b });
        };n();q();H.prototype[Symbol.iterator] = function () {
          return this.entries();
        };H.prototype.toString = function () {
          return "[object FormData]";
        };E && (H.prototype[E] = "FormData");[["append", x], ["delete", y], ["get", y], ["getAll", y], ["has", y], ["set", x]].forEach(function (b) {
          var a = H.prototype[b[0]];H.prototype[b[0]] = function () {
            return a.apply(this, b[1].apply(this, G(arguments)));
          };
        });XMLHttpRequest.prototype.send = function (b) {
          b instanceof H && (b = b._blob(), this.setRequestHeader("Content-Type", b.type));C.call(this, b);
        };if (D) {
          var K = window.fetch;window.fetch = function (b, a) {
            a && a.body && a.body instanceof H && (a.body = a.body._blob());return K(b, a);
          };
        }window.FormData = H;
      };

      /* WEBPACK VAR INJECTION */
    }).call(exports, __webpack_require__(23));

    /***/
  },
  /* 23 */
  /***/function (module, exports) {

    var g;

    // This works in non-strict mode
    g = function () {
      return this;
    }();

    try {
      // This works if eval is allowed (see CSP)
      g = g || Function("return this")() || (1, eval)("this");
    } catch (e) {
      // This works if the window reference is available
      if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === "object") g = window;
    }

    // g can still be undefined, but nothing to do about it...
    // We return undefined, instead of nothing here, so it's
    // easier to handle this case. if(!global) { ...}

    module.exports = g;

    /***/
  },
  /* 24 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__button_js__ = __webpack_require__(6);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__dialog_js__ = __webpack_require__(25);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__ = __webpack_require__(0);

    var template = __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    :host {\n      top: 30%;\n    }\n\n    #content {\n      width: 90%;\n      margin-left: auto;\n      margin-right: auto;\n      height: 65%;\n    }\n\n    #closer {\n      background-color: var(--ui-theme-warning-color, #e83673);\n      color: var(--ui-theme-light-text-color, #fff);\n      position: relative;\n      width: 105px;\n      height: 50px;\n      top: 12px;\n      left: calc(100% - 105px);\n    }\n  </style>\n  <div id="content"></div>\n  <ui-button id="closer">Close</ui-button>\n';

    var Alert = Object(__WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["b" /* defineUIComponent */])({
      name: 'ui-alert',
      template: template,
      definition: function (_WEBPACK_IMPORTED_MO5) {
        _inherits(Alert, _WEBPACK_IMPORTED_MO5);

        function Alert() {
          _classCallCheck(this, Alert);

          return _possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).apply(this, arguments));
        }

        _createClass(Alert, [{
          key: 'init',
          value: function init() {
            var _this43 = this;

            _get(Alert.prototype.__proto__ || Object.getPrototypeOf(Alert.prototype), 'init', this).call(this);
            this.scrollableDialog = false;
            this.smallDialog = true;
            this.watchAttribute(this, 'is-open', function (open) {
              open ? _this43._backdrop.show() : _this43._backdrop.hide();
            });

            this.shadowRoot.querySelector('#closer').on('click', function (e) {
              return _this43.close();
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
            return this.shadowRoot.querySelector('#content').textContent;
          },
          set: function set(txt) {
            this.shadowRoot.querySelector('#content').textContent = txt;
            return this;
          }
        }]);

        return Alert;
      }(__WEBPACK_IMPORTED_MODULE_1__dialog_js__["a" /* default */])
    });

    /* unused harmony default export */var _unused_webpack_default_export = Alert;

    /***/
  },
  /* 25 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__utils_float_js__ = __webpack_require__(4);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__card_js__ = __webpack_require__(12);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__backdrop_js__ = __webpack_require__(15);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__button_js__ = __webpack_require__(6);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__utils_dom_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);

    var template = __WEBPACK_IMPORTED_MODULE_4__utils_dom_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    :host {\n      display: block;\n      position: absolute;\n      padding: 20px;\n      z-index: 10001;\n      background-color: #fff;\n      overflow: hidden;\n    }\n\n    :host(.large-dialog) {\n      width: 80%;\n      height: 80%;\n      top: 8%;\n      left: 9%;\n    }\n\n    :host(.small-dialog) {\n      width: 250px;\n      height: 185px;\n      top: calc(50vh - 130px);\n      left: calc(50vw - 155px);\n    }\n\n    :host(.medium-dialog) {\n      width: 50%;\n      height: 50%;\n      top: 20%;\n      left: 25%;\n    }\n\n    :host(.scrollable-dialog) {\n      overflow: scroll;\n    }\n  </style>\n';

    var reflectedAttrs = ['is-open', 'is-modal', 'small-dialog', 'medium-dialog', 'large-dialog', 'scrollable-dialog'];

    var manipulators = new WeakMap();
    var incorporateButtonChild = function incorporateButtonChild(el, child) {
      var manip = manipulators.get(el);
      if (!manip) {
        manip = [function (e) {
          el.close();el.dispatchEvent(new CustomEvent('dialog-dismiss'));
        }, function (e) {
          el.close();el.dispatchEvent(new CustomEvent('dialog-confirm'));
        }];
        manipulators.set(el, manip);
      }

      var _manip = manip,
          _manip2 = _slicedToArray(_manip, 2),
          dismisser = _manip2[0],
          closer = _manip2[1];

      if (child.attr('dialog-dismiss')) child.on('click', dismisser);
      if (child.attr('dialog-confirm')) child.on('click', confirmer);
      child.watchAttribute(child, 'dialog-dismiss', function (now) {
        now ? child.on('click', dismisser) : child.remove('click', dismisser);
      });

      child.watchAttribute(child, 'dialog-confirm', function (now) {
        now ? child.on('click', confirmer) : child.remove('click', confirmer);
      });

      return el;
    };

    var Dialog = Object(__WEBPACK_IMPORTED_MODULE_4__utils_dom_js__["b" /* defineUIComponent */])({
      name: 'ui-dialog',
      template: template,
      reflectedAttrs: reflectedAttrs,
      definition: function (_WEBPACK_IMPORTED_MO6) {
        _inherits(Dialog, _WEBPACK_IMPORTED_MO6);

        function Dialog() {
          _classCallCheck(this, Dialog);

          var _this44 = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this));

          _this44.hide();
          _this44._backdrop = null;
          return _this44;
        }

        // Intercepts calls to appendChild so buttons can be appropriately used.


        _createClass(Dialog, [{
          key: 'appendChild',
          value: function appendChild(node) {
            var _this45 = this;

            if (node && node.onReady) {
              node.onReady(function (el) {
                if (el && el.matches && el.matches('.ui-button')) {
                  incorporateButtonChild(_this45, el);
                  _this45.shadowRoot.appendChild(el);
                } else {
                  _get(Dialog.prototype.__proto__ || Object.getPrototypeOf(Dialog.prototype), 'appendChild', _this45).call(_this45, node);
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
            var _this46 = this;

            _get(Dialog.prototype.__proto__ || Object.getPrototypeOf(Dialog.prototype), 'init', this).call(this);
            this._backdrop = __WEBPACK_IMPORTED_MODULE_4__utils_dom_js__["c" /* document */].createElement('ui-backdrop');
            this._backdrop.for = this;
            __WEBPACK_IMPORTED_MODULE_4__utils_dom_js__["c" /* document */].body.appendChild(this._backdrop);

            this._childrenUpgraded.then(function (children) {
              children.filter(function (el) {
                return el.matches && el.matches('.ui-button');
              }).forEach(function (el) {
                return incorporateButtonChild(_this46, el);
              });
            });

            var closer = function closer(e) {
              return _this46.close();
            };

            this.on('attribute-change', function (_ref42) {
              var _ref42$changed = _ref42.changed,
                  now = _ref42$changed.now,
                  name = _ref42$changed.name;

              switch (name) {
                case 'small-dialog':
                  return now ? (_this46.classList.add('small-dialog'), _this46.classList.remove('medium-dialog', 'large-dialog')) : _this46.classList.remove('small-dialog');

                case 'medium-dialog':
                  return now ? (_this46.classList.add('medium-dialog'), _this46.classList.remove('small-dialog', 'large-dialog')) : _this46.classList.remove('medium-dialog');

                case 'large-dialog':
                  return now ? (_this46.classList.add('large-dialog'), _this46.classList.remove('small-dialog', 'medium-dialog')) : _this46.classList.remove('large-dialog');

                case 'scrollable-dialog':
                  return now ? _this46.classList.add('scrollable-dialog') : _this46.classList.remove('scrollable-dialog');

                case 'is-modal':
                  return now ? _this46._backdrop.on('click', closer) : _this46._backdrop.remove(closer);

                case 'is-open':
                  if (now) {
                    if (_this46.isModal) _this46._backdrop.show();
                    _this46.show();
                    _this46.dispatchEvent(new CustomEvent('dialog-opened'));
                  } else {
                    _this46._backdrop.hide();
                    _this46.hide();
                    _this46.dispatchEvent(new CustomEvent('dialog-closed'));
                  }
              }
            });
          }
        }]);

        return Dialog;
      }(__WEBPACK_IMPORTED_MODULE_1__card_js__["a" /* default */])
    });

    /* harmony default export */__webpack_exports__["a"] = Dialog;

    /***/
  },
  /* 26 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__list_js__ = __webpack_require__(16);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);

    var reflectedAttrs = ['selected-index', 'is-open', 'multiple'];
    var template = __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    ui-list {\n      transition: transform 500ms cubic-bezier(0.165, 0.84, 0.44, 1);\n      background: #fff;\n      position: relative;\n      left: -5px;\n      z-index: 1000;\n      width: 100%;\n      max-height: 225px;\n      overflow-y: scroll;\n    }\n\n    .arrow {\n      border: solid #999;\n      border-width: 0 2px 2px 0;\n      display: inline-block;\n      padding: 3px;\n      float: right;\n      position: relative;\n      top: 6px;\n      right: 2px;\n      transform: rotate(45deg);\n    }\n\n    .not-overflowing {\n      overflow: hidden !important;\n    }\n\n    #dummy-item {\n      text-align: center;\n      padding-bottom: 3px;\n    }\n\n    #dummy-item.default {\n      letter-spacing: 3px;\n    }\n\n    #list-holder {\n      height: 1px;\n      overflow: visible;\n      position: relative;\n      top: -10px;\n      border-top: 1px solid #999;\n    }\n\n    ::slotted(.ui-item) {\n      border: none;\n    }\n\n    :host {\n      display: block;\n      max-width: 200px;\n    }\n\n    :host([multiple="true"]) #dummy-item #dummy-item-content {\n      position: relative;\n      left: 10px;\n    }\n\n    :host([is-open="true"]) .arrow {\n      transform: rotate(-135deg);\n    }\n\n    :host([is-open="true"]) ui-list {\n      box-shadow: 3px 5px 10px -4px #999;\n      padding-bottom: 1px;\n      transform: scale(1) translateY(0px);\n    }\n\n    :host([is-open="false"]) ui-list {\n      transform: scale(0) translateY(-200px);\n    }\n\n    :host([is-open="true"]) #list-holder {\n      border-color: var(--ui-theme-primary-dark-color, blue);\n    }\n\n    :host([is-open="false"]) ::slotted(.ui-item) {\n      display: none;\n    }\n\n  </style>\n  <ui-item id="dummy-item" class="default">\n    <span id="dummy-item-content">...</span>\n    <div class="arrow down"></div>\n  </ui-item>\n  <div id="list-holder" class="not-overflowing">\n    <ui-list multiple="{{multiple}}">\n      <slot></slot>\n    </ui-list>\n  </div>\n';

    /* unused harmony default export */var _unused_webpack_default_export = Object(__WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["b" /* defineUIComponent */])({
      name: 'ui-drop-down',
      reflectedAttrs: reflectedAttrs,
      template: template,
      definition: function (_Object$with8) {
        _inherits(DropDown, _Object$with8);

        function DropDown() {
          _classCallCheck(this, DropDown);

          var _this47 = _possibleConstructorReturn(this, (DropDown.__proto__ || Object.getPrototypeOf(DropDown)).call(this));

          _this47._list = null;
          _this47._listHolder = null;
          _this47._dummyItem = null;
          _this47._textContent = '';
          return _this47;
        }

        _createClass(DropDown, [{
          key: 'appendChild',
          value: function appendChild(node) {
            var _this48 = this;

            if (node) {
              _get(DropDown.prototype.__proto__ || Object.getPrototypeOf(DropDown.prototype), 'appendChild', this).call(this, node);
              node.on('click', function (e) {
                setTimeout(function () {
                  _this48.close();
                }, 300);
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
            var _this49 = this;

            var mouseon = false;
            _get(DropDown.prototype.__proto__ || Object.getPrototypeOf(DropDown.prototype), 'init', this).call(this);
            this._beforeReady(function (_) {
              _this49._list = _this49.shadowRoot.querySelector('ui-list');
              _this49._listHolder = _this49.shadowRoot.querySelector('#list-holder');
              _this49._dummyItem = _this49.shadowRoot.querySelector('#dummy-item');
              _this49._dummyItem.shadowRoot.querySelector('ui-checkbox').style.display = 'none';

              _this49._items.forEach(function (item) {
                if (item.isSelected) _this49.selected = item;
                item.on('click', function (e) {
                  if (!_this49.multiple) {
                    setTimeout(function () {
                      _this49.close();
                    }, 300);
                  }
                });
              });

              if (_this49.name && !_this49.selected) _this49.textContent = null;
              _this49._listHolder.classList.remove('not-overflowing');

              _this49._dummyItem.on('click', function (e) {
                _this49.toggle();
                mouseon = _this49.isOpen;
              });
            });

            if (!this.multiple) this.multiple = false;
            if (!this.isOpen) this.isOpen = false;

            this.on('mouseenter', function (e) {
              return mouseon = true;
            });
            this.on('mouseleave', function (e) {
              mouseon = false;
              setTimeout(function () {
                if (!mouseon) _this49.isOpen = false;
              }, 1000);
            });

            this.on('attribute-change', function (_ref43) {
              var _ref43$changed = _ref43.changed,
                  now = _ref43$changed.now,
                  name = _ref43$changed.name;

              switch (name) {
                case 'selected-index':
                  if (_this49.selected && !_this49.multiple) {
                    _this49.textContent = _this49.selected.textContent;
                  } else {
                    _this49.textContent = ''; // default
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
            var txt = val || this.placeholder || this.name || '...';

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
      }(Object(__WEBPACK_IMPORTED_MODULE_3__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */]).with(__WEBPACK_IMPORTED_MODULE_1__list_js__["b" /* ListBehavior */]))
    });

    /***/
  },
  /* 27 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__animations_rippler_js__ = __webpack_require__(9);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__form_js__ = __webpack_require__(5);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);
    /*
     * NOTE: it is not currently possible to extend specific HTMLElements, leading
     * to this element being rather convoluted. Once it's possible to extend input
     * directly this should be refactored.
     *
     */

    var template = __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    :host {\n      display: inline-block;\n      height: 25px;\n      width: 25px;\n      background-color: #DDD;\n      position: relative;\n      border-radius: 5%;\n    }\n\n    :host(:hover) {\n      box-shadow: inset 0 0 0 99999px rgba(150,150,150,0.2);\n    }\n\n    :host:before {\n      content:"";\n      position: absolute;\n      display: none;\n      left: 9px;\n      top: 5px;\n      width: 5px;\n      height: 10px;\n      border: solid #fff;\n      border-width: 0 3px 3px 0;\n      transform: rotate(45deg);\n    }\n\n    :host(.checked) {\n      background-color: var(--ui-theme-primary-dark-color, blue);\n    }\n\n    :host(.checked):before {\n      display: block;\n    }\n  </style>\n';

    var reflectedAttrs = ['checked'];

    var Checkbox = Object(__WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["b" /* defineUIComponent */])({
      name: 'ui-checkbox',
      template: template,
      reflectedAttrs: reflectedAttrs,
      definition: function (_Object$with9) {
        _inherits(Checkbox, _Object$with9);

        function Checkbox() {
          _classCallCheck(this, Checkbox);

          var _this50 = _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this));

          _this50._formElement = __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].createElement('input');
          _this50._formElement.style.opacity = 0;
          _this50._formElement.type = 'checkbox';
          return _this50;
        }

        _createClass(Checkbox, [{
          key: 'init',
          value: function init() {
            var _this51 = this;

            _get(Checkbox.prototype.__proto__ || Object.getPrototypeOf(Checkbox.prototype), 'init', this).call(this);
            this.watchAttribute(this, 'checked', function (now) {
              now ? _this51.classList.add('checked') : _this51.classList.remove('checked');
            });

            this.on('click', function (e) {
              _this51.checked = !_this51.checked;
            });
          }
        }]);

        return Checkbox;
      }(Object(__WEBPACK_IMPORTED_MODULE_4__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */]).with(__WEBPACK_IMPORTED_MODULE_1__animations_rippler_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__form_js__["a" /* FormBehavior */]))
    });

    /* unused harmony default export */var _unused_webpack_default_export = Checkbox;

    /***/
  },
  /* 28 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__utils_float_js__ = __webpack_require__(4);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__animations_easer_js__ = __webpack_require__(29);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__utils_dom_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__backdrop_js__ = __webpack_require__(15);

    var template = __WEBPACK_IMPORTED_MODULE_3__utils_dom_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    :host {\n      display: block;\n      position: absolute;\n      top: 0;\n      height: 100vh;\n      z-index: 9001;\n      max-width: 90vw;\n      width: 320px;\n      padding: 10px;\n      background-color: #fff;\n    }\n\n    :host([left-oriented]) {\n      left: -350px;\n      border-right: solid 1px var(--ui-theme-dark-text-color, #000);\n    }\n\n    :host([right-oriented]) {\n      left: 100vw;\n      border-left: solid 1px var(--ui-theme-dark-text-color, #000);\n    }\n  </style>\n  <slot></slot>\n';

    var reflectedAttrs = ['is-modal', 'is-open'];

    var Drawer = Object(__WEBPACK_IMPORTED_MODULE_3__utils_dom_js__["b" /* defineUIComponent */])({
      name: 'ui-drawer',
      template: template,
      reflectedAttrs: reflectedAttrs,
      definition: function (_Object$with10) {
        _inherits(Drawer, _Object$with10);

        function Drawer() {
          _classCallCheck(this, Drawer);

          var _this52 = _possibleConstructorReturn(this, (Drawer.__proto__ || Object.getPrototypeOf(Drawer)).call(this));

          _this52._backdrop = __WEBPACK_IMPORTED_MODULE_3__utils_dom_js__["c" /* document */].createElement('ui-backdrop');
          _this52._backdrop.for = _this52;
          _this52._backdrop.style.zIndex = '9000';
          _this52._toggleElem = null;
          _this52._isOpen = false;
          _this52._rightAnimator = null;
          _this52._leftAnimator = null;
          return _this52;
        }

        _createClass(Drawer, [{
          key: 'toggledBy',
          value: function toggledBy(elem) {
            var _this53 = this;

            if (elem) {
              this._toggleElem = elem;
              if (this._toggleElem.on) {
                this._toggleElem.on('click', function (e) {
                  _this53.toggleState();
                });
              } else {
                this._toggleElem.addEventListener('click', function (e) {
                  _this53.toggleState();
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
            var _this54 = this;

            _get(Drawer.prototype.__proto__ || Object.getPrototypeOf(Drawer.prototype), 'init', this).call(this);
            if (!this.rightOriented) this.leftOriented = true;
            this.floatingX = true;

            __WEBPACK_IMPORTED_MODULE_3__utils_dom_js__["c" /* document */].body.appendChild(this._backdrop);
            this._backdrop.on('click', function (e) {
              return _this54.close();
            });

            // Check for the drawer toggle in the DOM. If not, you'll need to use the toggledBy method
            // or wire up the handlers yourself
            this.toggledBy(__WEBPACK_IMPORTED_MODULE_3__utils_dom_js__["c" /* document */].querySelector('[drawer-toggle]'));

            this._leftAnimator = this.defineSlideAnimation({ direction: 'right', distance: '350px' });
            this._rightAnimator = this.defineSlideAnimation({ direction: 'left', distance: '350px' });

            this.on('attribute-change', function (_ref44) {
              var _ref44$changed = _ref44.changed,
                  now = _ref44$changed.now,
                  name = _ref44$changed.name;

              var orient = _this54.rightOriented ? 'right' : 'left';
              var animator = _this54['_' + orient + 'Animator'];
              switch (name) {
                case 'is-open':
                  if (now) {
                    if (_this54.isModal) _this54._backdrop.show();
                    animator.easeIn();
                  } else {
                    animator.easeOut().then(function (_) {
                      return _this54._backdrop.hide();
                    });
                  }
                  break;
              }
            });
          }
        }]);

        return Drawer;
      }(Object(__WEBPACK_IMPORTED_MODULE_4__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */]).with(__WEBPACK_IMPORTED_MODULE_1__utils_float_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__animations_easer_js__["a" /* default */]))
    });

    /***/
  },
  /* 29 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__utils_dom_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__utils_styler_js__ = __webpack_require__(10);

    var orientations = {
      'left': ['X', '-'],
      'right': ['X', ''],
      'up': ['Y', '-'],
      'down': ['Y', '']
    };

    /* harmony default export */__webpack_exports__["a"] = function (superclass) {
      return Object(__WEBPACK_IMPORTED_MODULE_0__utils_dom_js__["b" /* defineUIComponent */])({
        name: 'ui-easer',
        registerElement: false,
        definition: function (_superclass7) {
          _inherits(Easer, _superclass7);

          function Easer() {
            _classCallCheck(this, Easer);

            var _this55 = _possibleConstructorReturn(this, (Easer.__proto__ || Object.getPrototypeOf(Easer)).call(this));

            _this55._animations = [];
            return _this55;
          }

          _createClass(Easer, [{
            key: 'defineSlideAnimation',
            value: function defineSlideAnimation(_ref45) {
              var direction = _ref45.direction,
                  _ref45$timing = _ref45.timing,
                  timing = _ref45$timing === undefined ? 300 : _ref45$timing,
                  _ref45$fn = _ref45.fn,
                  fn = _ref45$fn === undefined ? 'ease-in' : _ref45$fn,
                  _ref45$distance = _ref45.distance,
                  distance = _ref45$distance === undefined ? '100%' : _ref45$distance;

              if (!this._animations.sliding) this._animations.sliding = {};

              var _orientations$directi = _slicedToArray(orientations[direction], 2),
                  xy = _orientations$directi[0],
                  min = _orientations$directi[1];

              var minus = min && distance.match('-') ? '' : min;
              var inClass = Object(__WEBPACK_IMPORTED_MODULE_1__utils_styler_js__["a" /* generateCSSClassName */])();
              var outClass = Object(__WEBPACK_IMPORTED_MODULE_1__utils_styler_js__["a" /* generateCSSClassName */])();
              var animationStyles = __WEBPACK_IMPORTED_MODULE_0__utils_dom_js__["c" /* document */].createElement('style');
              animationStyles.innerHTML = '\n        :host(.' + inClass + ') {\n          transform: translate' + xy + '(' + minus + distance + ');\n          transition-property: transform;\n          transition-duration: ' + timing + 'ms;\n          transition-timing-function: ' + fn + ';\n        }\n\n        :host(.' + outClass + ') {\n          transform: translate' + xy + '(0);\n          transition-property: transform;\n          transition-duration: ' + timing + 'ms;\n          transition-timing-function: ' + (fn === 'ease-in' ? 'ease-out' : fn) + ';\n        }\n      ';

              this.shadowRoot.appendChild(animationStyles);
              var self = this;
              var obj = {
                _isIn: false,

                easeIn: function easeIn() {
                  var _this56 = this;

                  this._isIn = true;
                  self.classList.add(inClass);
                  if (__WEBPACK_IMPORTED_MODULE_0__utils_dom_js__["d" /* global */]._usingShady) {
                    ShadyCSS.styleSubtree(this);
                  }
                  return new Promise(function (res) {
                    setTimeout(function () {
                      self.classList.remove(outClass);
                      if (__WEBPACK_IMPORTED_MODULE_0__utils_dom_js__["d" /* global */]._usingShady) {
                        ShadyCSS.styleSubtree(_this56);
                      }
                      res(true);
                    }, timing);
                  });
                },
                easeOut: function easeOut() {
                  var _this57 = this;

                  this._isIn = false;
                  self.classList.add(outClass);
                  if (__WEBPACK_IMPORTED_MODULE_0__utils_dom_js__["d" /* global */]._usingShady) {
                    ShadyCSS.styleSubtree(this);
                  }
                  return new Promise(function (res) {
                    setTimeout(function () {
                      self.classList.remove(inClass);
                      if (__WEBPACK_IMPORTED_MODULE_0__utils_dom_js__["d" /* global */]._usingShady) {
                        ShadyCSS.styleSubtree(_this57);
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
  /* 30 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__button_js__ = __webpack_require__(6);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__ = __webpack_require__(0);

    var reflectedAttrs = ['line-color'];
    var template = __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    .line {\n      height: 5px;\n      width: 100%;\n      background-color: var(--ui-theme-dark-text-color, #000);\n      position: relative;\n      padding: 0;\n    }\n\n    .top-line {\n      top: 0px;\n    }\n\n    .middle-line {\n      top: 7px;\n    }\n\n    .bottom-line {\n      top: 15px;\n    }\n\n    .content-wrapper {\n      height: 30px;\n      left: 10%;\n    }\n\n    :host {\n      background: transparent;\n      width: 48px;\n      height: 48px;\n    }\n  </style>\n';

    var lineDivTemplate = __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["c" /* document */].createElement('template');
    lineDivTemplate.innerHTML = '\n  <div>\n    <div class="line top-line"></div>\n    <div class="line middle-line"></div>\n    <div class="line bottom-line"></div>\n  </div>\n';

    /* unused harmony default export */var _unused_webpack_default_export = Object(__WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["b" /* defineUIComponent */])({
      name: 'ui-hamburger',
      template: template,
      reflectedAttrs: reflectedAttrs,
      definition: function (_WEBPACK_IMPORTED_MO7) {
        _inherits(Hamburger, _WEBPACK_IMPORTED_MO7);

        function Hamburger() {
          _classCallCheck(this, Hamburger);

          return _possibleConstructorReturn(this, (Hamburger.__proto__ || Object.getPrototypeOf(Hamburger)).apply(this, arguments));
        }

        _createClass(Hamburger, [{
          key: 'init',
          value: function init() {
            var _this59 = this;

            _get(Hamburger.prototype.__proto__ || Object.getPrototypeOf(Hamburger.prototype), 'init', this).call(this);
            this.shadowRoot.querySelector('.content-wrapper').appendChild(__WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["c" /* document */].importNode(lineDivTemplate.content, true));

            this.watchAttribute(this, 'line-color', function (now) {
              [].concat(_toConsumableArray(_this59.shadowRoot.querySelectorAll('.line'))).forEach(function (el) {
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
  /* 31 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__utils_url_js__ = __webpack_require__(32);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);

    // TODO ui-component-ready handler being called more than once on each route?
    // weird skips in the back button handling?

    var Router = function () {
      var historyManager = null;
      var localNavigationCounter = -1;
      var historyStack = [];
      var reflectedAttrs = [
      // updates-history: whether or not the router manages the navigation history. NOTE: can only be
      // set on one router element per page. Attempting to set more than one throws an error.
      'updates-history',

      // renders-current: whether or not the router renders the child element associated with the
      // current path. Routers do not render their children by default.
      'renders-current',

      // hash-bang: whether or not the history updates use hash-bang urls for client-side routing
      'hash-bang'];

      var template = __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["c" /* document */].createElement('template');
      template.innerHTML = '<slot name="router-content"></slot>';

      return Object(__WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["b" /* defineUIComponent */])({
        name: 'ui-router',
        template: template,
        reflectedAttrs: reflectedAttrs,
        definition: function (_WEBPACK_IMPORTED_MO8) {
          _inherits(Router, _WEBPACK_IMPORTED_MO8);

          function Router() {
            _classCallCheck(this, Router);

            var _this60 = _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).call(this));

            _this60._contentSlot = null;
            _this60._routes = {};
            _this60._currentRoute = null;
            _this60._managingHistory = false;
            _this60._login = null;
            _this60._popstateListener = function (_ref46) {
              var data = _ref46.state;

              // here we ignore querystring data, it may be stale
              var _Object = Object(__WEBPACK_IMPORTED_MODULE_3__utils_url_js__["a" /* parseURL */])(window.location.href),
                  route = _Object.route;

              // detect if it was back or forward button:


              if (route === historyStack[historyStack.length - 2]) {
                historyStack.pop();
              }

              _this60._updateRoute(route);
              if (!historyStack.length || historyStack.length === 1 && historyStack[0] === '/') {
                __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["d" /* global */].removeEventListener('popstate', _this60._popstateListener);
                _this60._managingHistory = false;
              }
            };
            return _this60;
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

                // TODO: this makes maps work. Fix this.
                setTimeout(function () {
                  __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["d" /* global */].dispatchEvent(new Event('resize'));
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

              __WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["d" /* global */].history.pushState(data, '', url);
              historyStack.push(route);
            }
          }, {
            key: 'route',
            value: function route(val, outsidedata) {
              var _Object2 = Object(__WEBPACK_IMPORTED_MODULE_3__utils_url_js__["a" /* parseURL */])(window.location.href),
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
              var _this61 = this;

              _get(Router.prototype.__proto__ || Object.getPrototypeOf(Router.prototype), 'init', this).call(this);

              this._beforeReady(function (_) {
                _this61._contentSlot = _this61.shadowRoot.querySelector('slot');
                var selected = null;

                var _Object3 = Object(__WEBPACK_IMPORTED_MODULE_3__utils_url_js__["a" /* parseURL */])(window.location.href),
                    route = _Object3.route,
                    data = _Object3.data;

                if (route) selected = route;

                var flag = false;
                _this61.selectAll('[route-path]').forEach(function (el, i) {
                  var path = el.getAttribute('route-path');
                  _this61._routes[path] = el;
                  if (!i && !selected) selected = path;
                  if (el.matches && el.matches('[selected]')) selected = path;
                  if (path === '/login') {
                    flag = true;
                    el.onReady(function (_) {
                      var login = el.querySelector('.ui-login');
                      _this61._login = login;
                      login.on('login', function (e) {
                        var _Object4 = Object(__WEBPACK_IMPORTED_MODULE_3__utils_url_js__["a" /* parseURL */])(window.location.href),
                            route = _Object4.route;

                        _this61._updateRoute(route);
                      });

                      login.on('logout', function (e) {
                        _this61.route('/login');
                      });
                      _this61.route(selected);
                    });
                  }
                });

                if (!flag) {
                  _this61.onReady(function (_) {
                    _this61.route(selected);
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
                    if (_this61.selected) {
                      if (now) {
                        _this61.selected.setAttribute('slot', 'router-content');
                      } else {
                        _this61.selected.removeAttribute('slot');
                      }
                    }
                    break;

                  case 'updates-history':
                    if (now && historyManager !== _this61) {
                      if (historyManager) {
                        throw new Error('Only one router per page can manage the navigation history\n                     at a time. Please listen for that router\'s route-changed\n                     event to update other elements.');
                      }
                      historyManager = _this61;
                      _this61._managingHistory = true;
                      window.addEventListener('popstate', _this61._popstateListener);
                    } else {
                      historyManager = null;
                      _this61._managingHistory = false;
                      window.removeEventListener('popstate', _this61._popstateListener);
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
        }(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */])
      });
    }();
    /* unused harmony export Router */

    var Route = function () {
      var reflectedAttrs = [
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

      return Object(__WEBPACK_IMPORTED_MODULE_1__utils_dom_js__["b" /* defineUIComponent */])({
        name: 'ui-route',
        reflectedAttrs: reflectedAttrs,
        definition: function (_WEBPACK_IMPORTED_MO9) {
          _inherits(Route, _WEBPACK_IMPORTED_MO9);

          function Route() {
            _classCallCheck(this, Route);

            var _this62 = _possibleConstructorReturn(this, (Route.__proto__ || Object.getPrototypeOf(Route)).call(this));

            _this62._data = null;
            _this62._dataElements = [];
            _this62._fromChangeHandler = false;
            _this62._unloadListener = function (e) {
              if (_this62.data) localStorage.setItem(_this62.routePath, JSON.stringify(elem.data));
            };
            return _this62;
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
                var qs = Object(__WEBPACK_IMPORTED_MODULE_3__utils_url_js__["b" /* toQueryString */])(data);
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
              var _this63 = this;

              _get(Route.prototype.__proto__ || Object.getPrototypeOf(Route.prototype), 'init', this).call(this);

              this.onReady(function (_) {
                _this63._dataElements = _this63.shadowRoot ? [].concat(_toConsumableArray(_this63.shadowRoot.querySelectorAll('[is-data-element]')), _toConsumableArray(_this63.selectAll('[is-data-element]'))) : _this63.selectAll('[is-data-element]');

                _this63._dataElements.forEach(function (el) {
                  el.on('change', function (_) {
                    _this63._fromChangeHandler = true;
                    _this63.update(_this63._dataElements.reduce(function (acc, el) {
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

                var data = localStorage.getItem(_this63.routePath);

                // Check to see if it was written from query string first.
                if (!_this63.data && data != null) _this63.update(JSON.parse(data));
              });

              this.on('attribute-change', function (_ref50) {
                var _ref50$changed = _ref50.changed,
                    now = _ref50$changed.now,
                    name = _ref50$changed.name;

                switch (name) {
                  case 'is-selected':
                    if (!now || now && !_this63.isSelected) {
                      var evtName = now ? 'component-selected' : 'component-deselected';
                      _this63.dispatchEvent(new CustomEvent(evtName));
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
        }(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */])
      });
    }();
    /* unused harmony export Route */

    /***/
  },
  /* 32 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "a", function () {
      return parseURL;
    });
    /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "b", function () {
      return toQueryString;
    });
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
        queryString: qs
      };
    };

    var toQueryString = function toQueryString(obj) {
      return '?' + Object.entries(obj).map(function (_ref51) {
        var _ref52 = _slicedToArray(_ref51, 2),
            k = _ref52[0],
            v = _ref52[1];

        return encodeURIComponent(k) + '=' + encodeURIComponent(v);
      }).join('&');
    };

    window.parseURL = parseURL;

    /***/
  },
  /* 33 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__list_js__ = __webpack_require__(16);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__node_modules_extracttype_extracttype_js__ = __webpack_require__(3);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);

    var Tab = function () {
      var template = __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].createElement('template');
      template.innerHTML = '\n    <style>\n      #content {\n        position: relative;\n        top: 16px;\n      }\n\n      :host {\n        display: inline-block;\n        background-color: inherit;\n        height: 49px;\n        width: 120px;\n        white-space: nowrap;\n        text-overflow: ellipsis;\n        text-transform: capitalize;\n        border-radius: 5%;\n        margin: 5px;\n        padding: 0;\n        text-align: center;\n      }\n\n      :host(:hover) {\n        color: var(--ui-theme-light-text-color, #fff);\n      }\n\n      :host([is-selected="true"]) {\n        box-shadow: 0px 0px 10px -1px var(--ui-theme-light-text-color, #fff);\n      }\n\n      :host-context(.tabs-centered) {\n        left: -30px;\n      }\n    </style>\n  ';

      return Object(__WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["b" /* defineUIComponent */])({
        name: 'ui-tab',
        template: template,
        definition: function (_WEBPACK_IMPORTED_MO10) {
          _inherits(Tab, _WEBPACK_IMPORTED_MO10);

          function Tab() {
            _classCallCheck(this, Tab);

            return _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).apply(this, arguments));
          }

          _createClass(Tab, [{
            key: 'init',
            value: function init() {
              var _this65 = this;

              _get(Tab.prototype.__proto__ || Object.getPrototypeOf(Tab.prototype), 'init', this).call(this);
              this.on('click', function (e) {
                _this65.isSelected = true;
              });

              this.watchAttribute(this, 'is-selected', function (now) {
                if (now) {
                  _this65.dispatchEvent(new CustomEvent('component-selected'));
                } else {
                  _this65.dispatchEvent(new CustomEvent('component-deselected'));
                }
              });
            }
          }]);

          return Tab;
        }(__WEBPACK_IMPORTED_MODULE_1__list_js__["a" /* Item */])
      });
    }();
    /* unused harmony export Tab */

    var Tabs = function () {
      var reflectedAttrs = ['for'];

      var template = __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].createElement('template');
      template.innerHTML = '\n    <style>\n      :host {\n        display: block;\n        height: 55px;\n        background-color: var(--ui-theme-primary-dark-color, blue);\n        width: 100%;\n      }\n\n      ::slotted(.ui-tab:hover) {\n        text-shadow: 1px 1px 6px #fff;\n      }\n    </style>\n    <slot></slot>\n  ';

      return Object(__WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["b" /* defineUIComponent */])({
        name: 'ui-tabs',
        template: template,
        reflectedAttrs: reflectedAttrs,
        definition: function (_Object$with11) {
          _inherits(Tabs, _Object$with11);

          function Tabs() {
            _classCallCheck(this, Tabs);

            var _this66 = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this));

            _this66._for = null;
            return _this66;
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
              var _this67 = this;

              _get(Tabs.prototype.__proto__ || Object.getPrototypeOf(Tabs.prototype), 'init', this).call(this);
              this.on('attribute-change', function (_ref53) {
                var _ref53$changed = _ref53.changed,
                    now = _ref53$changed.now,
                    name = _ref53$changed.name;

                switch (name) {
                  case 'for':
                    if (now) {
                      _this67._for = now;
                      var _elem = __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].querySelector(_this67._for);
                      if (_elem) {
                        var method = _elem.on ? 'on' : 'addEventListener';
                        _elem[method]('change', function (_ref54) {
                          var value = _ref54.value;

                          var matched = _this67._items.reduce(function (acc, item) {
                            if (acc) return acc;
                            if (item.value === value) return item;
                            return acc;
                          }, null);

                          if (matched && matched !== _this67.selected) {
                            _this67.selected = value;
                          } else {
                            _this67.selected = null;
                          }
                        });
                      }
                    } else {
                      _this67._for = null;
                    }
                    break;

                  case 'selected-index':
                    if (now > -1 && _this67._for) {
                      __WEBPACK_IMPORTED_MODULE_2__utils_dom_js__["c" /* document */].querySelector(_this67._for).route(_this67.selected.value);
                    }
                    break;
                }
              });
            }
          }]);

          return Tabs;
        }(Object(__WEBPACK_IMPORTED_MODULE_4__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */]).with(__WEBPACK_IMPORTED_MODULE_1__list_js__["b" /* ListBehavior */]))
      });
    }();
    /* unused harmony export Tabs */

    /***/
  },
  /* 34 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__ = __webpack_require__(1);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__utils_float_js__ = __webpack_require__(4);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__utils_centerer_js__ = __webpack_require__(14);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__utils_dom_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__utils_attribute_analyzer_js__ = __webpack_require__(8);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__node_modules_mixwith_src_mixwith_js__ = __webpack_require__(2);

    var reflectedAttrs = ['is-tall'];

    var template = __WEBPACK_IMPORTED_MODULE_3__utils_dom_js__["c" /* document */].createElement('template');
    template.innerHTML = '\n  <style>\n    ' + __WEBPACK_IMPORTED_MODULE_2__utils_centerer_js__["a" /* centeredStyles */] + '\n\n    :host {\n      width: 100%;\n      background-color: var(--ui-theme-primary-dark-color, blue);\n      color: var(--ui-theme-light-text-color, #fff);\n      height: 70px;\n      display: block;\n    }\n\n    :host([is-tall]) {\n      height: 192px;\n    }\n\n    :host(:not([is-tall]).has-secondary) {\n      margin-bottom: 56px;\n    }\n\n    #title-holder {\n      position: relative;\n      margin-left: auto;\n      margin-right: auto;\n      max-width: 300px;\n      text-align: center;\n      text-transform: capitalize;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      overflow: hidden;\n      white-space: nowrap;\n      font-size: 22px;\n    }\n\n    :host([is-tall]) #title-holder {\n      font-size: 40px;\n    }\n\n    ::slotted([slot="left-button-slot"]) {\n      position: relative;\n      top: -18px;\n      left: 10px;\n      float: left;\n    }\n\n    :host([is-tall]) ::slotted([slot="left-button-slot"]) {\n      top: -35px;\n    }\n\n    ::slotted([slot="right-button-slot"]) {\n      position: relative;\n      top: -18px;\n      right: 30px;\n      float: right;\n    }\n\n\n    :host([is-tall]) ::slotted([slot="right-button-slot"]) {\n      top: -35px;\n    }\n\n    ::slotted([slot="secondary-toolbar-slot"]) {\n      position: relative;\n      width: 100vw;\n      top: 44px;\n    }\n\n    :host([is-tall]) ::slotted([slot="secondary-toolbar-slot"]) {\n      top: 92px;\n    }\n\n    :host(:not([is-tall])) ::slotted([slot="secondary-toolbar-slot"]) {\n      text-align: center;\n    }\n  </style>\n  <div id="title-holder" class="content-wrapper">\n    <slot></slot>\n  </div>\n  <slot name="left-button-slot"></slot>\n  <slot name="right-button-slot"></slot>\n  <slot name="secondary-toolbar-slot"></slot>\n';

    /* unused harmony default export */var _unused_webpack_default_export = Object(__WEBPACK_IMPORTED_MODULE_3__utils_dom_js__["b" /* defineUIComponent */])({
      name: 'ui-toolbar',
      template: template,
      reflectedAttrs: reflectedAttrs,
      definition: function (_Object$with12) {
        _inherits(Toolbar, _Object$with12);

        function Toolbar() {
          _classCallCheck(this, Toolbar);

          var _this68 = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this));

          _this68._secondaryToolbar = null;
          return _this68;
        }

        _createClass(Toolbar, [{
          key: 'init',
          value: function init() {
            var _this69 = this;

            _get(Toolbar.prototype.__proto__ || Object.getPrototypeOf(Toolbar.prototype), 'init', this).call(this);
            var secondarySlot = this.shadowRoot.querySelector('[name="secondary-toolbar-slot"]');
            var slotted = secondarySlot.assignedNodes();
            if (slotted.length) {
              this._secondaryToolbar = slotted[0];
              this.classList.add('has-secondary');
            }

            secondarySlot.addEventListener('slotchange', function (e) {
              _this69._secondaryToolbar = _this69.querySelector('[slot="secondary-toolbar-slot"]');
              if (_this69._secondaryToolbar) _this69.classList.add('has-secondary');
            });

            this.on('attribute-change', function (_ref55) {
              var _ref55$changed = _ref55.changed,
                  name = _ref55$changed.name,
                  now = _ref55$changed.now;

              if (name === 'is-tall') {
                if (now == null) {
                  if (_this69._secondaryToolbar) {
                    _this69._secondaryToolbar.classList.add('tabs-centered');
                  }
                } else if (!now || now === "false") {
                  _this69.isTall = null;
                } else {
                  if (_this69._secondaryToolbar) {
                    _this69._secondaryToolbar.classList.remove('tabs-centered');
                  }
                }
              }
            });
          }
        }]);

        return Toolbar;
      }(Object(__WEBPACK_IMPORTED_MODULE_5__node_modules_mixwith_src_mixwith_js__["a" /* mix */])(__WEBPACK_IMPORTED_MODULE_0__utils_ui_component_base_js__["a" /* default */]).with(__WEBPACK_IMPORTED_MODULE_1__utils_float_js__["a" /* default */]))
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
