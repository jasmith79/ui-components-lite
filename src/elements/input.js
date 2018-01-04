/*
 * NOTE: it is not currently possible to extend specific HTMLElements, leading
 * to this element being rather convoluted. Once it's possible to extend input
 * directly this should be refactored.
 *
 */

import UIBase from '../utils/ui-component-base.js';
import { FormBehavior } from './form.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';
import { extractType } from '../../node_modules/extracttype/extracttype.js';

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

   // NOTE: unlike placeholder which merely displays text to the user,
   // this is a true default value, i.e. it will be the value property/attribute
   // of the input if empty, will be the value if a form is submitted, etc.
   // Will override placeholder if both are set. Different input elements
   // implementing this interface should validate the value appropriately.
  'default-value',
];

const template = document.createElement('template');
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
    switch(extractType(immed)) {
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

export default defineUIComponent({
  name: 'ui-input';
  template,
  reflectedAttrs,
  definition: class Input extends mix(UIBase).with(FormBehavior) {
    constructor () {
      super();
      this._input = null;
    }

    init () {
      super.init();
      this._input = this.shadowRoot.querySelector('#input');
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
});
