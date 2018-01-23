/*
 * NOTE: it is not currently possible to extend specific HTMLElements, leading
 * to this element being rather convoluted. Once it's possible to extend input
 * directly this should be refactored.
 *
 */

import UIBase from '../utils/ui-component-base.js';
import { FormBehavior } from './form.js';
import { document, defineUIComponent } from '../utils/dom.js';
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
  'required',

   // NOTE: unlike placeholder which merely displays text to the user,
   // this is a true default value, i.e. it will be the value property/attribute
   // of the input if empty, will be the value if a form is submitted, etc.
   // Will override placeholder if both are set. Different input elements
   // implementing this interface should validate the value appropriately.
  'default-value',
];

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

const pad = n => val => {
  const s = '' + val;
  if (Number.isNaN(+s)) {
    console.warn(`Attempted to pad non-numeric argument ${s}.`);
    return '';
  }
  return s.length >= n ? s : '0'.repeat(n - s.length) + s;
};
const pad2 = pad(2);
const pad4 = pad(4);

// Not foolproof, but good quick-and-dirty check.
const VALID_INPUT_DATE = /^\d{4}\-[0-1][1-9]\-[1-3][1-9]$/;
const VALID_INPUT_TIME = /^[0-2][0-9]:[0-5][0-9]$/;

export const DATE_TYPE_SUPPORTED = (() => {
  const input = document.createElement('input');
  const notDate = 'not-a-date';
  input.setAttribute('type', 'date');
  input.setAttribute('value', notDate);
  return input.value !== notDate;
})();

// Need this because Edge supports date but not time
export const TIME_TYPE_SUPPORTED = (() => {
  const input = document.createElement('input');
  const notTime = 'not-a-time';
  input.setAttribute('type', 'time');
  input.setAttribute('value', notTime);
  return input.value !== notTime;
})();

const destructureDateObj = date => {
  return Number.isNaN(date.getTime()) ?
    [] :
    [
      date.getFullYear(),
      date.getMonth(), //no +1
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ];
};

const formatAsDateInputValue = date => {
  const [yr, mn, dy] = destructureDateObj(date);
  if ([yr, mn, dy].some(n => n == null || Number.isNaN(n))) return null;
  return `${pad4(yr)}-${pad2(mn + 1)}-${pad2(dy)}`;
};

const formatAsDateInputDisplay = date => {
  const [yr, mn, dy] = destructureDateObj(date);
  if ([yr, mn, dy].some(n => n == null || Number.isNaN(n))) return null;
  return `${pad2(mn + 1)}/${pad2(dy)}-${pad4(yr)}`;
};

const formatAsTimeInputValue = date => {
  // Currently, the step attribute needed for seconds is not supported in iOS Safari so for now
  // limiting to just minutes and hours.
  const [,,,hr, min] = destructureDateObj(date);
  if ([hr, min].some(n => n == null || Number.isNaN(n))) return null;
  return `${pad2(hr)}:${pad2(min)}`;
};

const formatAsTimeInputDisplay = date => {
  const [,,,hr, min] = destructureDateObj(date);
  if ([hr, min].some(n => n == null || Number.isNaN(n))) return null;
  const afternoon = hr > 11;
  const meridian = afternoon ? 'PM' : 'AM';
  const hour = '' + (afternoon ? hr - 12 : hr);
  return `${pad2(hour)}:${pad2(min)} ${meridian}`;
};

const input2Date = s => {
  if (!s.trim()) return null;
  let yr, mn, dy;
  if (s.includes('/')) {
    ([mn, dy, yr] = s.split('/').map(Number));
  } else {
    ([yr, mn, dy] = s.split('-').map(Number));
  }
  return new Date(yr, mn - 1, dy);
};

const parseTimeString = s => {
  if (!s) return [];
  let [t, meridian] = s.split(' ');
  let [h, m] = t.split(':').map(Number);
  let hr = meridian && meridian.toLowerCase() === 'pm' ? 12 + h : h;
  return [hr, m];
};

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
      color: var(--ui-theme-dark-text-color, #333);
    }

    :host(.focused) {
      border-bottom-color: var(--ui-theme-primary-dark-color, blue);
      box-shadow: 0px 4px 4px -4px;
    }

    :host(.empty) {
      color: #999;
    }

    #input {
      border: none;
      outline: none;
      width: 90%;
      margin-left: 5%;
      margin-bottom: 3px;
      height: 25px;
      font-size: 16px;
      color: inherit;
    }
  </style>
  <input id="input"/>
`;

export const Input = defineUIComponent({
  name: 'ui-input',
  template,
  reflectedAttrs,
  definition: class Input extends mix(UIBase).with(FormBehavior) {
    constructor () {
      super();
      this._input = null;
    }

    get value () {
      switch (this.attr('type').toLowerCase()) {
        case 'date':
          return input2Date(this._input.value);
          break;

        case 'time':
          let value = super.value;
          return value ? parseTimeString(value) : null;

        default: return super.value;

      }
    }

    set value (val) {
      let value = '';
      switch (this.attr('type').toLowerCase()) {
        case 'date':
          switch (extractType(val)) {
            case 'Null':
            case 'Undefined':
              value = null;
              break;

            case 'Date':
              value = DATE_TYPE_SUPPORTED ?
                formatAsDateInputValue(val) :
                formatAsDateInputDisplay(val);

              break;

            case 'String':
              if (!DATE_TYPE_SUPPORTED && !val.match(VALID_INPUT_DATE)) {
                console.warn(`The specified value "${val}" does not conform to the required format, "yyyy-MM-dd".`);
              } else {
                value = val.includes('T') ? val.split('T')[0] : val;
              }
              break;
          }
          break;

        case 'time':
          switch (extractType(val)) {
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
            console.warn(`VM71763:1 The specified value "${val}" does not conform to the required format.  The format is "HH:mm", "HH:mm:ss" or "HH:mm:ss.SSS" where HH is 00-23, mm is 00-59, ss is 00-59, and SSS is 000-999.`);
          }

        default: value = val;
      }

      const empty = (() => {
        switch (extractType(value)) {
          case 'Array':
          case 'String':
            return value.length === 0;
          case 'Null':
          case 'Undefined':
            return true;
          default: return false;
        }
      })();

      if (empty) {
        this.classList.add('empty');
      } else {
        this.classList.remove('empty');
      }

      return (super.value = value == null ? '' : value);
    }

    init () {
      super.init();
      this._input = this.shadowRoot.querySelector('#input');
      const placeholder = this.attr('placeholder') ||
        this.attr('name') ||
        this.attr('default-value') ||
        null;

      if (placeholder) this.placeholder = placeholder;
      if (!this.attr('type')) this.type = 'text';
      if (!((this.value && this.value.length) || this.attr('value'))) this.classList.add('empty');

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
        }
      })));

      this.on('attribute-change', ({ changed: { now, name, was } } ) => {
        switch (name) {
          case 'name':
            this._input.name = now;
            this.name = now;
            if (!this.attr('placeholder')) this._input.setAttribute('placeholder', now);
            break;

          case 'value':
            let val = now === true ? '' : now;
            if (this._input.value !== val) {
              this._input.value = !val && this.defaultValue ? this.defaultValue : val;
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
});
