(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.polyfill = mod.exports;
  }
})(this, function () {
  'use strict';

  // POLYFILLS
  // Here's for all the stuff Babel doesn't do without configuring a hot mess o'plugins

  var convertNullErr = new TypeError('Cannot convert null or undefined to object');
  var toStr = function toStr(o) {
    return Object.prototype.toString.call(o);
  };
  var identity = function identity(x) {
    return x

    // Function.prototype.name
    (function (p) {
      var f = function hasName() {};
      if (f.name === 'hasName') {
        return;
      }

      Object.defineProperty(p, 'name', {
        get: function get() {
          return (this.toString().match(/^\s*function\s*(\S*)\s*\(/) || [])[1] || '';
        }
      });

      return;
    })(Function.prototype);
  };

  // CustomEvent, IE only
  (function (_) {
    if (toStr(window.CustomEvent) === '[object Function]') return;

    var CustomEvent = function CustomEvent(event) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { bubbles: false, cancelable: false, detail: undefined };

      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
    return;
  })();

  // Array.from
  (function (_) {
    if (Array.from == null) {
      Object.defineProperty(Array, 'from', {
        value: function value(o, f, thisArg) {
          if (o == null) throw convertNullErr; // per spec
          if (f != null && toStr(f) !== '[object Function]') {
            throw new TypeError('Mapping function must be a callable function.');
          }

          var res = [];

          if (toStr(o.forEach) === '[object Function]') {
            o.forEach(function (v) {
              return res.push((f || identity).call(thisArg || o, v));
            });
          } else if (Symbol && Symbol.iterator && obj[Symbol.iterator]) {
            // need this for generators
            var iter = obj[Symbol.iterator]();
            var done = false;
            while (!done) {
              var v = iter.next();
              res.push(v.value);
              done = v.done;
            }
          } else if (o.length) {
            for (var i = 0; i < o.length; ++i) {
              res.push((f || identity).call(thisArg || o, o[i]));
            }
          }

          return res;
        }
      });
    }

    return;
  })();

  // Array.prototype.includes
  (function (p) {
    if ([].includes == null) {
      Object.defineProperty(p, 'includes', {
        value: function value(item) {
          return this.indexOf(item) !== -1;
        }
      });
    }
  })(Array.prototype);

  // Object.assign
  if (Object.assign == null) {
    Object.defineProperty(Object, 'assign', {
      value: function value() {
        var args = Array.from(arguments);
        var target = args.shift();

        if (target == null) {
          throw convertNullErr;
        }

        var i = 0,
            j = 0,
            jlen = 0,
            ilen = args.length,
            keys = [],
            key = '';
        for (i; i < ilen; ++i) {
          // unlike above, having a null here just has no effect rather than throwing a conversion
          // error
          if (args[i] != null) {
            keys = Object.keys(args[i]);
            j = 0;
            jlen = keys.length;
            for (j; j < jlen; ++j) {
              key = keys[j];
              target[key] = args[i][key];
            }
          }
        }
        return target;
      }
    });
  }

  // Object.values
  if (Object.values == null) {
    Object.defineProperty(Object, 'values', {
      value: function value(obl) {
        if (obj == null) throw convertNullErr;
        return Object.key(obj).map(function (k) {
          return obj[k];
        });
      }
    });
  }

  // Object.entries
  if (Object.entries == null) {
    Object.defineProperty(Object, 'entries', {
      value: function value(obj) {
        if (obj == null) throw convertNullErr;
        return Object.key(obj).map(function (k) {
          return [k, obj[k]];
        });
      }
    });
  }

  // NodeList.prototype.forEach
  if (NodeList.prototype.forEach == null) {
    NodeList.prototype.forEach = function (callback) {
      for (var i = 0; i < this.length; i++) {
        callback.call(this, this[i], i, this);
      }
    };
  }
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.core = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  /*
   * core.js
   * @author Jared Smith <jasmith79@gmail.com>
   * @copyright 2017
   * @license MIT
   *
   * Upgrades HTMLElements to use the convenience methods afforded by this library.
   */

  var CoreElementMixin = {
    _isCoreElement: true,

    hide: function hide() {
      this.classList.add('is-hidden');
      return this;
    },
    show: function show() {
      this.classList.remove('is-hidden');
    },
    centerContent: function centerContent() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var text = args.text;

      var wrapper = this.querySelector('.ui-component-content-wrapper');
      if (text) wrapper.classList.add('ui-component-text-centered');
      var height = +window.getComputedStyle(wrapper).height.match(/\d+/);
      var parentHeight = +window.getComputedStyle(this).height.match(/\d+/);
      wrapper.style.top = (parentHeight - height) / 2 + 'px';
      return this;
    },
    wrapContent: function wrapContent(cls) {
      var wrapper = document.createElement('div');
      var html = this.innerHTML;
      wrapper.innerHTML = html;
      wrapper.classList.add('ui-component-content-wrapper');
      if (cls) {
        wrapper.classList.add(cls);
      }
      this.innerHTML = '';
      this.appendChild(wrapper);
      return this;
    },
    initializeChildren: function initializeChildren(roles) {
      var _this = this;

      Object.entries(roles).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            role = _ref2[0],
            evts = _ref2[1];

        _this.querySelectorAll('[ui-role="' + role + '"]').forEach(function (subEl) {
          subEl._parentUIComponent = _this;
          Object.entries(evts).forEach(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                evt = _ref4[0],
                handler = _ref4[1];

            subEl.addEventListener(evt, handler);
          });
        });
      });
      return this;
    }
  };

  // Although upgraded elements have these as methods for easy chaining, export them as convenience
  // functions for other elements.

  var hide = function hide(el) {
    el.classList.add('is-hidden');
    return el;
  };

  var show = function show(el) {
    el.classList.remove('is-hidden');
    return el;
  };

  var debounce = function debounce(n, now, fn) {
    var timer = null;
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (timer === null && now) {
        fn.apply(undefined, args);
      }
      clearTimeout(timer);
      timer = setTimeout(function () {
        return fn.apply(undefined, args);
      }, n);
      return timer;
    };
  };

  // Extracts the hidden internal [[Class]] slot of a JavaScript object.
  var _extractHiddenClass = function (r) {
    return function (a) {
      return Object.prototype.toString.call(a).match(r)[1];
    };
  }(/ ([a-z]+)]$/i);

  var _getConstructorName = function _getConstructorName(obj) {
    return obj && obj.constructor && obj.constructor.name || '';
  };

  // Somewhat reliably types JavaScript objects, mostly built-ins.
  var extractType = function extractType(item) {
    var clazz = _extractHiddenClass(item); // covers all built-ins, primitives, etc.
    if (clazz !== 'object') {
      return clazz;
    }
    clazz = _getConstructorName(item);
    return clazz; // returns '' for Object.create(null);
  };

  exports.CoreElementMixin = CoreElementMixin;
  exports.hide = hide;
  exports.show = show;
  exports.debounce = debounce;
  exports.extractType = extractType;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'core'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('core'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.core);
    global.button = mod.exports;
  }
})(this, function (exports, _core) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Button = function Button() {
    var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.createElement('div');

    el.classList.add('ui-component-button', 'ui-component-ripple');
    return Object.assign(el, _core.CoreElementMixin).wrapContent().centerContent({ text: true });
  };

  // Initialize all the buttons in the DOM
  /*
   * button.js
   * @author Jared Smith <jasmith79@gmail.com>
   * @copyright 2017
   * @license MIT
   *
   * JavaScript file for ui-component button.
   */

  document.querySelectorAll('.ui-component-button').forEach(Button);

  exports.default = Button;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'core'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('core'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.core);
    global.modal = mod.exports;
  }
})(this, function (exports, _core) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AlertView = exports.Dialog = exports.Backdrop = undefined;


  var specialChildrenRoles = {
    // On these two setTimeout gives ripple effect chance to complete
    'dialog-dismiss': {
      click: function click(evt) {
        var target = evt.currentTarget;
        setTimeout(function (_) {
          target._parentUIComponent.dispatchEvent(new CustomEvent('dialog-dismiss'));
          target._parentUIComponent.close();
        }, 400);
      }
    },
    'dialog-confirm': {
      click: function click(evt) {
        var target = evt.currentTarget;
        setTimeout(function (_) {
          target._parentUIComponent.dispatchEvent(new CustomEvent('dialog-confirm'));
          target._parentUIComponent.close();
        }, 400);
      }
    }
  }; /*
      * modal.js
      * @author Jared Smith <jasmith79@gmail.com>
      * @copyright 2017
      * @license MIT
      *
      * JavaScript file for ui-component modal dialog and backdrop.
      */

  var ModalMixin = {
    open: function open(cb) {
      if (cb) {
        cb(this);
      }
      this.show();
      this._backdrop.show();
      this.querySelectorAll('.ui-component-button').forEach(function (b) {
        return b.centerContent({ text: true });
      });
      this.dispatchEvent(new CustomEvent('modal-opened'));
      return this;
    },
    close: function close(cb) {
      this.hide();
      this._backdrop.hide();
      this.dispatchEvent(new CustomEvent('dialog-close'));
      if (cb) {
        cb(this);
      }
      return this;
    },
    initialize: function initialize() {
      if (this.getAttribute('small') != null) this.classList.add('ui-component-modal-dialog-small');
      if (this.getAttribute('medium') != null) this.classList.add('ui-component-modal-dialog-medium');
      if (this.getAttribute('large') != null) this.classList.add('ui-component-modal-dialog-large');
      return this.initializeChildren(specialChildrenRoles);
    }
  };

  var AlertViewMixin = {
    setContents: function setContents(html) {
      this.querySelector('.alert-view-contents').innerHTML = html;
      return this;
    }
  };

  var Backdrop = function Backdrop() {
    var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.createElement('div');

    el.classList.add('ui-component-modal-backdrop', 'is-hidden');
    return Object.assign(el, _core.CoreElementMixin);
  };

  var Dialog = function Dialog() {
    var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.createElement('div');

    el.classList.add('ui-component-modal-dialog', 'is-hidden');
    el._backdrop = Backdrop();
    document.body.appendChild(el._backdrop);
    el._backdrop.addEventListener('click', function (evt) {
      if (el.getAttribute('dismiss') != null) {
        el.close();
      }
    });

    return Object.assign(el, _core.CoreElementMixin, ModalMixin).initialize();
  };

  var AlertView = function AlertView() {
    var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.createElement('div');

    Dialog(el).setAttribute('ui-role', 'alertview');
    var textDiv = el.querySelector('.alert-view-contents');
    if (!textDiv) {
      var div = document.createElement('div');
      div.classList.add('alert-view-contents');
      el.appendChild(div);
    }

    return Object.assign(el, AlertViewMixin);
  };

  // initialize any Modals in the DOM
  document.querySelectorAll('.ui-component-modal-backdrop').forEach(Backdrop);
  document.querySelectorAll('.ui-component-modal-dialog').forEach(Dialog);
  document.querySelectorAll('[ui-role="alertview"]').forEach(AlertView);

  exports.Backdrop = Backdrop;
  exports.Dialog = Dialog;
  exports.AlertView = AlertView;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.gmap = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /*
   * gmap.js
   * @author Jared Smith <jasmith79@gmail.com>
   * @copyright 2017
   * @license MIT
   *
   * JavaScript file for ui-component-google-map. Note that this file loads the google maps API,
   * don't include multiple times.
   */

  if (!window._requestedMapsAPI) {
    window._requestedMapsAPI = true;
    window._fireMapsEvent = function (_) {
      return window.dispatchEvent(new CustomEvent('google-map-ready'));
    };
    var mapsAPI = document.createElement('script');
    mapsAPI.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyACpPQQ7wSblRm4I_4ETxg37-rs16ggrSc&libraries=geometry,visualization&callback=_fireMapsEvent";
    document.head.appendChild(mapsAPI);
  }

  var tooLongMessage = 'Sorry but google maps is taking longer than expected to load.\nIf this message does not disappear in the next couple of seconds please refresh the page.';

  var mapsAPILoaded = new Promise(function (res, rej) {
    var google = window.google;
    if (google && google.maps && google.maps.Map) {
      res(true);
    }
    var tooLong = setTimeout(function (_) {
      var alertView = document.querySelector('[ui-role="alertview"]');
      if (alertView) {
        alertView.open(function (av) {
          return av.setContents(tooLongMessage);
        });
      } else {
        alert(tooLongMessage);
      }
    }, 8000);
    var timeout = setTimeout(function (_) {
      rej(new Error('Google maps failed to load in 10 seconds, please refresh.'));
    }, 12000);
    window.addEventListener('google-map-ready', function (evt) {
      clearTimeout(tooLong);
      clearTimeout(timeout);
      res(true);
    });
  });

  mapsAPILoaded.catch(function (err) {
    var alertView = document.querySelector('[ui-role="alertview"]');
    if (alertView) {
      alertView.open(function (av) {
        return av.setContents(err.message);
      });
    } else {
      alert(tooLongMessage);
    }
  });

  // This is primarily for my own use after all.
  var INDY_DEFAULTS = function INDY_DEFAULTS(_) {
    return {
      zoom: 11,
      center: new google.maps.LatLng(39.805, -86.16),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  };

  var Gmap = function Gmap() {
    var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.createElement('div');
    var opts = arguments[1];

    el.classList.add('ui-component-google-map');
    el.loaded = mapsAPILoaded.then(function (_) {
      return new google.maps.Map(el, opts || INDY_DEFAULTS());
    });
    return el;
  };

  document.querySelectorAll('.ui-component-google-map').forEach(function (el) {
    return Gmap(el);
  });

  exports.default = Gmap;
});
