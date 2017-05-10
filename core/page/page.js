/*
 * page.js
 * @author Jared Smith <jasmith79@gmail.com>
 * @copyright 2017
 * @license MIT
 *
 * JavaScript file for ui-component page.
 */

import { CoreElementMixin, debounce } from 'core';

const specialChildrenRoles = {
  'close-page': {
    click: evt => {
      let page = (evt.currentTarget || evt.target)._parentUIComponent;
      page.hide();
      page.dispatchEvent(new CustomEvent('page-closed', {
        detail: {
          userInit: true
        }
      }));
    }
  }
};

const inputHandler = parent => debounce(500, false, evt => {
  let el = evt.currentTarget || evt.target;
  let val = el.value;
  let cls = Array.from(el.classList).filter(cl => cl.match(/^bind\-/));
  if (cls.length) {
    let key = cls[0].replace('bind-', '');
    parent.setTemplateValue(key, val);
    if (parent._boundValues) parent._boundValues[key] = val;
  }
});

const PageMixin = {
  // If you dynamically modify the element attributes or contents, be sure to call this afterwards.
  initialize () {
    let isTemplate = this.getAttribute('template') != null;
    let title = this.querySelector('.ui-component-page-title');
    if (title) {
      this.removeChild(title);
      Object.defineProperty(this, 'title', {
        get: _ => this.querySelector('.ui-component-page-title').textContent,
        configurable: true
      });
      Object.assign(title, CoreElementMixin);
      title.wrapContent();
      if (title.getAttribute('centered') != null) title.centerContent({text: true});
    }

    this.wrapContent();

    if (isTemplate) {
      // Just here as a catch, to prevent FOUC add class to markup
      this.classList.add('is-hidden');
      this.initTemplate();
    } else {
      this.initializeChildren(specialChildrenRoles);
    }

    this.isOpen = !isTemplate;

    if (title) {
      let content = this.querySelector('.ui-component-content-wrapper')
      this.insertBefore(title, content);
      content.style.height = `calc(100% - ${window.getComputedStyle(title).height})`;
    }

    return this;
  },

  close () {
    this.isOpen = false;
    this.hide();
    this.dispatchEvent(new CustomEvent('page-closed'));
    return this;
  },

  open () {
    this.isOpen = true;
    this.show();
    this.dispatchEvent(new CustomEvent('page-opened'));
    return this;
  },

  // NOTE: initTemplate is *destructive*, make sure you bind event handlers *after* initializing.
  initTemplate () {
    this.querySelectorAll('input, [ui-role="input"]').forEach(el => {
      let match = el.value.match(/^\{\{(.+)\}\}$/);
      if (match) {
        let key = match[1];
        el.setAttribute('value', '');
        el.classList.add(`bind-${key}`);
      }
    });

    this.innerHTML = this.innerHTML.replace(/\{\{([\w $\-]+)\}\}/g, '<span class="bind-$1"></span>');
    this.querySelectorAll('input, [ui-role="input"]').forEach(el => {
      let evt = el.tagName === 'INPUT' ? 'input' : 'ui-component-input';
      el.addEventListener(evt, inputHandler(this));
    });
    this.show();
    return this.initializeChildren(specialChildrenRoles);
  },

  setTemplateValue (k, v) {
    this.querySelectorAll(`span.bind-${k}`).forEach(el => el.textContent = v);
    this.querySelectorAll(`input.bind-${k}, [ui-role="input"].bind-${k}`)
      .forEach(el => el.setAttribute('value', v));
    return this;
  },

  stamp (opts) {
    if (this.getAttribute('template') == null) {
      console.warn('Method \'stamp\' called on non-template ui-component-page.');
    } else if (opts) {
      if (this._boundData) {
        Object.assign(this._boundData, opts);
      } else {
        Object.entries(opts).forEach(([key, val]) => {
          this.setTemplateValue(k, v);
        });
      }
    }

    this.show();
    return this;
  },

  bind (opts) {
    if (this.getAttribute('template') == null) {
      console.warn('Method \'bind\' called on non-template ui-component-page.');
      return null;
    } else {
      this._boundData = {};
      this._boundValues = {};
      Object.entries(opts).forEach(([key, val]) => {
        this._boundValues[key] = val;
        Object.defineProperty(this._boundData, key, {
          get: _ => this._boundValues[key],
          set: newVal => {
            this._boundValues[key] = newVal;
            this.setTemplateValue(key, newVal);
            this.querySelectorAll(`input[class="bind-${key}"]`).forEach(el => {
              el.value = newVal;
            });
          }
        });
      });

      return this._boundData;
    }
  }
};

const Page = function Page(el=document.createElement('div')) {
  el.classList.add('ui-component-page');
  el.addEventListener('ui-component-select', evt => {
    let parent = el._parentUIComponent;
    if (parent && parent.select && parent.unselectAll) {
      parent.unselectAll(el);
      parent.select(el);
    }
  });
  return Object.assign(el, CoreElementMixin, PageMixin).initialize();
};

// Initialize any page elements in DOM
document.querySelectorAll('.ui-component-page').forEach(Page);

export default Page;