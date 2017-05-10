// POLYFILLS
// Here's for all the stuff Babel doesn't do without configuring a hot mess o'plugins

let convertNullErr = new TypeError('Cannot convert null or undefined to object');
let toStr = o => Object.prototype.toString.call(o);
let identity = x => x

// Function.prototype.name
(p => {
  let f = function hasName() {};
  if (f.name === 'hasName') {
    return;
  }

  Object.defineProperty(p, 'name', {
    get: function () {
      return (this.toString().match(/^\s*function\s*(\S*)\s*\(/) || [])[1] || '';
    }
  });

  return;
})(Function.prototype);

// CustomEvent, IE only
(_ => {
  if (toStr(window.CustomEvent) === '[object Function]') return;

  let CustomEvent = function CustomEvent(event, params = { bubbles: false, cancelable: false, detail: undefined }) {
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  };

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
  return;
})();

// Array.from
(_ => {
  if (Array.from == null) {
    Object.defineProperty(Array, 'from', {
      value: function (o, f, thisArg) {
        if (o == null) throw convertNullErr; // per spec
        if (f != null && toStr(f) !== '[object Function]') {
          throw new TypeError('Mapping function must be a callable function.');
        }

        let res = [];

        if (toStr(o.forEach) === '[object Function]') {
          o.forEach(v => res.push((f || identity).call(thisArg || o, v)));
        } else if (Symbol && Symbol.iterator && obj[Symbol.iterator]) {
          // need this for generators
          let iter = obj[Symbol.iterator]();
          let done = false;
          while (!done) {
            let v = iter.next();
            res.push(v.value);
            done = v.done;
          }
        } else if (o.length) {
          for (let i = 0; i < o.length; ++i) {
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
(p => {
  if ([].includes == null) {
    Object.defineProperty(p, 'includes', {
      value: function (item) {
        return this.indexOf(item) !== -1;
      }
    });
  }
})(Array.prototype);

// Object.assign
if (Object.assign == null) {
  Object.defineProperty(Object, 'assign', {
    value: function () {
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
    value: obl => {
      if (obj == null) throw convertNullErr;
      return Object.key(obj).map(k => obj[k]);
    }
  });
}

// Object.entries
if (Object.entries == null) {
  Object.defineProperty(Object, 'entries', {
    value: obj => {
      if (obj == null) throw convertNullErr;
      return Object.key(obj).map(k => [k, obj[k]]);
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
var _this = this;

/*
 * core.js
 * @author Jared Smith <jasmith79@gmail.com>
 * @copyright 2017
 * @license MIT
 *
 * Upgrades HTMLElements to use the convenience methods afforded by this library.
 */

const CoreElementMixin = {
  _isCoreElement: true,

  hide() {
    this.classList.add('is-hidden');
    return this;
  },

  show() {
    this.classList.remove('is-hidden');
  },

  // Elements that use this method should wrap their content in a ui-component-content-wrapper
  // element via the wrapContent method.
  centerContent(args = {}) {
    let { text } = args;
    let wrapper = this.querySelector('.ui-component-content-wrapper');
    if (text) wrapper.classList.add('ui-component-text-centered');
    let height = +window.getComputedStyle(wrapper).height.match(/\d+/);
    let parentHeight = +window.getComputedStyle(this).height.match(/\d+/);
    wrapper.style.top = `${(parentHeight - height) / 2}px`;
    return this;
  },

  wrapContent(cls) {
    let wrapper = document.createElement('div');
    let html = this.innerHTML;
    wrapper.innerHTML = html;
    wrapper.classList.add('ui-component-content-wrapper');
    if (cls) {
      wrapper.classList.add(cls);
    }
    this.innerHTML = '';
    this.appendChild(wrapper);
    return this;
  },

  initializeChildren(roles) {
    Object.entries(roles).forEach(([role, evts]) => {
      this.querySelectorAll(`[ui-role="${role}"]`).forEach(subEl => {
        subEl._parentUIComponent = this;
        Object.entries(evts).forEach(([evt, handler]) => {
          subEl.addEventListener(evt, handler);
        });
      });
    });
    return this;
  }
};

// Although upgraded elements have these as methods for easy chaining, export them as convenience
// functions for other elements.

const hide = function hide(el) {
  el.classList.add('is-hidden');
  return el;
};

const show = function show(el) {
  el.classList.remove('is-hidden');
  return el;
};

const debounce = (n, now, fn) => {
  let timer = null;
  return (...args) => {
    if (timer === null && now) {
      fn.apply(_this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(_this, args), n);
    return timer;
  };
};

// Extracts the hidden internal [[Class]] slot of a JavaScript object.
const _extractHiddenClass = (r => a => {
  return Object.prototype.toString.call(a).match(r)[1];
})(/ ([a-z]+)]$/i);

const _getConstructorName = obj => {
  return obj && obj.constructor && obj.constructor.name || '';
};

// Somewhat reliably types JavaScript objects, mostly built-ins.
const extractType = function extractType(item) {
  let clazz = _extractHiddenClass(item); // covers all built-ins, primitives, etc.
  if (clazz !== 'object') {
    return clazz;
  }
  clazz = _getConstructorName(item);
  return clazz; // returns '' for Object.create(null);
};

export { CoreElementMixin, hide, show, debounce, extractType };
/*
 * button.js
 * @author Jared Smith <jasmith79@gmail.com>
 * @copyright 2017
 * @license MIT
 *
 * JavaScript file for ui-component button.
 */

import { CoreElementMixin } from 'core';

const Button = function Button(el = document.createElement('div')) {
  el.classList.add('ui-component-button', 'ui-component-ripple');
  return Object.assign(el, CoreElementMixin).wrapContent().centerContent({ text: true });
};

// Initialize all the buttons in the DOM
document.querySelectorAll('.ui-component-button').forEach(Button);

export default Button;
/*
 * modal.js
 * @author Jared Smith <jasmith79@gmail.com>
 * @copyright 2017
 * @license MIT
 *
 * JavaScript file for ui-component modal dialog and backdrop.
 */

import { CoreElementMixin } from 'core';

const specialChildrenRoles = {
  // On these two setTimeout gives ripple effect chance to complete
  'dialog-dismiss': {
    click: evt => {
      let target = evt.currentTarget;
      setTimeout(_ => {
        target._parentUIComponent.dispatchEvent(new CustomEvent('dialog-dismiss'));
        target._parentUIComponent.close();
      }, 400);
    }
  },
  'dialog-confirm': {
    click: evt => {
      let target = evt.currentTarget;
      setTimeout(_ => {
        target._parentUIComponent.dispatchEvent(new CustomEvent('dialog-confirm'));
        target._parentUIComponent.close();
      }, 400);
    }
  }
};

const ModalMixin = {
  open(cb) {
    if (cb) {
      cb(this);
    }
    this.show();
    this._backdrop.show();
    this.querySelectorAll('.ui-component-button').forEach(b => b.centerContent({ text: true }));
    this.dispatchEvent(new CustomEvent('modal-opened'));
    return this;
  },

  close(cb) {
    this.hide();
    this._backdrop.hide();
    this.dispatchEvent(new CustomEvent('dialog-close'));
    if (cb) {
      cb(this);
    }
    return this;
  },

  // If you dynamically add child elements with ui-roles, be sure to call this on the dialog
  // afterwards. Avoids the need for DOMMutationObserver polyfill.
  initialize() {
    if (this.getAttribute('small') != null) this.classList.add('ui-component-modal-dialog-small');
    if (this.getAttribute('medium') != null) this.classList.add('ui-component-modal-dialog-medium');
    if (this.getAttribute('large') != null) this.classList.add('ui-component-modal-dialog-large');
    return this.initializeChildren(specialChildrenRoles);
  }
};

const AlertViewMixin = {
  setContents(html) {
    this.querySelector('.alert-view-contents').innerHTML = html;
    return this;
  }
};

const Backdrop = function Backdrop(el = document.createElement('div')) {
  el.classList.add('ui-component-modal-backdrop', 'is-hidden');
  return Object.assign(el, CoreElementMixin);
};

const Dialog = function Dialog(el = document.createElement('div')) {
  el.classList.add('ui-component-modal-dialog', 'is-hidden');
  el._backdrop = Backdrop();
  document.body.appendChild(el._backdrop);
  el._backdrop.addEventListener('click', evt => {
    if (el.getAttribute('dismiss') != null) {
      el.close();
    }
  });

  return Object.assign(el, CoreElementMixin, ModalMixin).initialize();
};

const AlertView = function AlertView(el = document.createElement('div')) {
  Dialog(el).setAttribute('ui-role', 'alertview');
  let textDiv = el.querySelector('.alert-view-contents');
  if (!textDiv) {
    let div = document.createElement('div');
    div.classList.add('alert-view-contents');
    el.appendChild(div);
  }

  return Object.assign(el, AlertViewMixin);
};

// initialize any Modals in the DOM
document.querySelectorAll('.ui-component-modal-backdrop').forEach(Backdrop);
document.querySelectorAll('.ui-component-modal-dialog').forEach(Dialog);
document.querySelectorAll('[ui-role="alertview"]').forEach(AlertView);

export { Backdrop, Dialog, AlertView };
