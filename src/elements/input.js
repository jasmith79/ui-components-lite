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

import Text from './text.js';
import { TooltipMixin } from './tooltip.js';
import { FormControlBehavior } from './form.js';

import Focusable from '../utils/focusable.js';
import { inputNormalizer } from '../utils/normalizer.js';
import { UIBase, document, defineUIComponent, global } from '../utils/ui-component-base.js';

import { mix } from '../../../mixwith/src/mixwith.js';
import { extractType } from '../../../extracttype/extracttype.js';

const reflectedAttributes = [
  'label',

  // These values are here to mimic the behavior of the native, NOTE: incomplete.
  'type',
  'form',
  'placeholder',
  'pattern',
  'required',

   // NOTE: unlike placeholder which merely displays text to the user,
   // this is a true default value, i.e. it will be the value property/attribute
   // of the input if empty, will be the value if a form is submitted, etc.
   // Will override placeholder if both are set.
  'default-value',
];

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
  if (!s || !s.trim || !s.trim()) return null;
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

const ipv4Validator = value => {
  if (!value) return false;
  if (!value.match(/^[\.\d]+$/)) return false;
  const arr = value.split('.').filter(x => x);
  return arr.length === 4 && 
    arr.every(s => {
      if (s.length > 3) return false;
      let n = parseInt(s, 10);
      return !Number.isNaN(n) && n >= 0 && n <= 255;
    });
};

// not perfect, but like date and time probably close enough for now
const ipv6Validator = value => {
  if (!value) return false;
  // cannot have more than one ::
  let doubleColon = value.match(/::/g);
  if (doubleColon && doubleColon.length > 1) return false;
  // must start with and end with either :: or hex digit, must contain only : and hex digits
  if (!value.match(/^(?:::|[a-fA-F0-9]{1,4})[:a-fA-F0-9]*(?:::|[a-fA-F0-9]{1,4})$/)) return false;
  
  let s;
  let groups = value.split(':').filter(x => x);
  if (groups.length < 8) {
		let index = value.indexOf('::');
    if (index === -1) return false;
    let rep = 8 - groups.length;
    let lead = index ? '' : '0000:'.repeat(rep);
    let tail = index === (value.length - 2) ? ':0000'.repeat(rep) : '';
    s = lead || tail ? 
      `${lead}${value.replace('::', '')}${tail}` :
      value.replace('::', `:${'0000:'.repeat(rep)}`);

    groups = s.split(':');
  }
  if (groups.length > 8) return false;
  if (groups.some(s => s.length > 4)) return false;
  return groups
    .map(n => parseInt(n, 16))
    .every(n => !Number.isNaN(n) && n < 65536 && n > -1);
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
      outline-width: 0px;
    }

    :host(.focused) {
      border-bottom-color: var(--ui-theme-primary-dark-color, blue);
      box-shadow: 0px 4px 4px -4px;
    }

    :host(.empty) {
      color: #999;
    }

    ui-text {
      /* janky, I know. TODO: find a way to make this work with transform: translate */
      transition-property: top, left, font-size;
      transition-timing-function: ease;
      transition-duration: 1s;
      position: relative;
      top: 0px;
      left: 0px;
      font-size: 14px;
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
      background-color: inherit; /* firefox changes the color */
    }

    .text-moved {
      top: 20px;
      left: 10px;
      font-size: 16px;
    }
  </style>
  <label><ui-text view-text="{{label}}"></ui-text></label>
  <input id="input"/>
`;

export const Input = defineUIComponent({
  name: 'ui-input',
  template,
  reflectedAttributes,
  definition: class Input extends mix(UIBase).with(FormControlBehavior, Focusable, TooltipMixin) {
    constructor () {
      super();
      this._input = null;
    }

    _typeSetup (type='text') {
      switch (type.toLowerCase()) {
        // TODO: replace these two with cross-platform date and time pickers?
        case 'date':
        case 'time':

        case 'text':
        case 'number':
        case 'password':
        case 'email':
        case 'tel':
        case 'url':
          this.removeValidator(ipv4Validator);
          this.removeValidator(ipv6Validator);
          this._input.setAttribute('type', this.attr('type'));
          break;

        case 'ipv4':
          this.removeValidator(ipv6Validator);
          this.validate(ipv4Validator);
          break;

        case 'ipv6':
          this.removeValidator(ipv4Validator);
          this.validate(ipv6Validator);
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
      if (type === 'hidden') {
				this.hide();
				return;
			}

			if ((type === 'date' || type === 'time') && !this.value) {
				this.selectInternalElement('ui-text').classList.remove('text-moved');
			}
      return this;
    }

    get value () {
      switch ((this.attr('type') || 'text').toLowerCase()) {
        case 'date':
          return input2Date(super.value);
          break;

        case 'time':
          let value = super.value;
          return value ? parseTimeString(value) : null;

        default: return super.value;

      }
    }

    set value (val) {
      let value = '';
      switch ((this.attr('type') || 'text').toLowerCase()) {
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
            console.warn(`The specified value "${val}" does not conform to the required format.  The format is "HH:mm", "HH:mm:ss" or "HH:mm:ss.SSS" where HH is 00-23, mm is 00-59, ss is 00-59, and SSS is 000-999.`);
          }

          break;

        default: value = val;
      }

      if (value === true || value == null) value = '';
      if (!value && this.defaultValue) value = this.defaultValue;

      const empty = (() => {
        switch (extractType(value)) {
          case 'Array':
          case 'String':
            return value.length === 0;

          default: return false;
        }
      })();

      if (empty) {
        this.classList.add('empty');
        if (!this.placeholder) this.selectInternalElement('ui-text').classList.add('text-moved');
      } else {
        this.classList.remove('empty');
        this.selectInternalElement('ui-text').classList.remove('text-moved');
      }

      return (super.value = value);
    }

    init () {
      super.init();
      this._input = this.selectInternalElement('#input');
      const placeholder = this.attr('placeholder') || this.attr('default-value') || null;
      const type = this.attr('type');

      if (this.attr('name')) {
        if (!this.attr('label')) this.attr('label', this.attr('name'));
        this.selectInternalElement('label').setAttribute('for', this.attr('name'));
      }

      if (placeholder) this.placeholder = placeholder;

      if (
        this.attr('label') &&
        !placeholder &&
        type !== 'date' &&
        type !== 'time'
      ) {
        this.selectInternalElement('ui-text').classList.add('text-moved');
      }
      
      this.on('focus', e => {
        this.selectInternalElement('ui-text').classList.remove('text-moved');
      });

      this.on('blur', e => {
        global.setTimeout(() => {
          if (this.label && !this.placeholder && !this.value) {
            this.selectInternalElement('ui-text').classList.add('text-moved');
          }
        }, 1);
      });

      if (!this.attr('type')) this.type = 'text';
      if (!((this.value && this.value.length) || this.attr('value'))) this.classList.add('empty');

      this._typeSetup(this.attr('type').toLowerCase()); 

      this._input.addEventListener('focus', e => {
        this.classList.add('focused');
      });

      this._input.addEventListener('blur', e => {
        this.classList.remove('focused');
      });

      inputNormalizer(this._input);

      this.on('focus', _ => {
        this._input.focus();
      });

      this._input.addEventListener('change', e => {
        if (this.value !== this._input.value) {
          this.value = this._input.value;
        }
      });

      this.on('attribute-change', ({ changed: { now, name, was } } ) => {
        let txt;
        switch (name) {
          case 'name':
            this._input.name = now;
            this.name = now;
            this.selectInternalElement('label').setAttribute('for', this.name);
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

          case 'label':
            txt = this.selectInternalElement('ui-text');
            if (now && !this.value && !this.placeholder) {
              txt.classList.add('text-moved');
            }
            break;

          case 'placeholder':
            txt = this.selectInternalElement('ui-text')
            if (now && txt.classList.contains('text-moved')) {
              txt.classList.remove('text-moved');
            }

            if (now == null) {
              this._input.removeAttribute(name);
            } else {
              this._input.setAttribute(name, (now || true));
            }
            break;

          case 'type':
            this._typeSetup(now);
            break;

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
