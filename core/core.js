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

  hide () {
    this.classList.add('is-hidden');
    return this;
  },

  show () {
    this.classList.remove('is-hidden');
  },

  // Elements that use this method should wrap their content in a ui-component-content-wrapper
  // element via the wrapContent method.
  centerContent (args={}) {
    let { text } = args;
    let wrapper = this.querySelector('.ui-component-content-wrapper');
    if (text) wrapper.classList.add('ui-component-text-centered');
    let height = +window.getComputedStyle(wrapper).height.match(/\d+/);
    let parentHeight = +window.getComputedStyle(this).height.match(/\d+/);
    wrapper.style.top = `${(parentHeight - height) / 2}px`;
    return this;
  },

  wrapContent (cls) {
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

  initializeChildren (roles) {
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
}

const debounce = (n, now, fn) => {
  let timer = null;
  return (...args) => {
    if (timer === null && now) {
      fn.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), n);
    return timer;
  }
};

// Extracts the hidden internal [[Class]] slot of a JavaScript object.
const _extractHiddenClass = (r => a => {
  return Object.prototype.toString.call(a).match(r)[1];
})(/ ([a-z]+)]$/i);

const _getConstructorName = obj => {
  return (obj && obj.constructor && obj.constructor.name) || '';
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

export {
  CoreElementMixin,
  hide,
  show,
  debounce,
  extractType
};