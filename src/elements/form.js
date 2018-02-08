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

import { inputNormalizer } from '../utils/normalizer.js';
import { toQueryString, parseURL } from '../utils/url.js';
import { UIBase, defineUIComponent, document, global } from '../utils/ui-component-base.js';

import extractType from '../../../extracttype/extracttype.js';
import { mix } from '../../../mixwith/src/mixwith.js';

// TODO external ui-input not getting cached data? input elements lose data sometimes
// on multiple reloads?

export const Form = (() => {
  const reflectedAttributes = ['action', 'method', 'autocomplete', 'response-type', 'updates-history'];
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      :host {
        display: block;
      }
    </style>
    <slot></slot>
  `;

  return defineUIComponent({
    name: 'ui-form',
    template,
    reflectedAttributes,
    definition: class Form extends UIBase {
      constructor () {
        super();
        this._form = null;
        this._formUIComponents = null;
      }

      _formControlType (el) {
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
              ...this.selectAll('input[name], select[name], .ui-form-behavior[name]'),
              ...document.querySelectorAll(`[form="${this.id}"]`)
            ])
          ] :
          this.selectAll('input[name], select[name], .ui-form-behavior');
      }

      get isValid () {
        return !this.querySelector(':invalid') && !this.querySelector('.invalid');
      }

      get data () {
        return this.elements.reduce((formdata, el) => {
          let name = el.getAttribute('name');
          if (name) formdata.append(name, el.value == null ? '' : el.value);
          return formdata
        }, new FormData);
      }

      set data (data) {
        Object.entries(data).forEach(([name, val]) => {
          const els = this.elements.filter(el => el.matches(`[name="${name}"]`));
          els.forEach((el, i, arr) => {
            const type = this._formControlType(el);
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

      serialize () {
        return this.elements.reduce((acc, el) => {
          let val, name = el.getAttribute('name');
          try {
            val = JSON.parse(el.value);
          } catch (e) {
            val = el.value;
          }
          if (name in acc) {
            if (!Array.isArray(acc[name])) acc[name] = [acc[name]];
            acc[name].push(val);
          } else {
            acc[name] = val;
          }
          return acc;
        }, {});
      }

      submit ({ url: argURL, method: meth, headers, responseType}={}) {
        if (this.isValid) {
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
          switch ((responseType || this.responseType || 'text').toLowerCase()) {
            case 'text':
            case 'html':
              return result.then(resp => resp.text());

            case 'json': return result.then(resp => resp.json());
            default: return result;
          }
        } else {
          return Promise.reject(new Error('Attempted to submit invalid form.'));
        }
      }

      init () {
        super.init();
        this.attr('is-data-element', true);
        this.attr('role', 'form');

        const historyListener = e => {
          const data = this.serialize();
          const parsed = parseURL(global.location.href);
          const { path, route, hashBang } = parsed;
          let url = path;
          if (hashBang) url += '#!';
          if (route) url += route;
          url += toQueryString(data);
          global.history.replaceState(data, '', url);
        };

        this._beforeReady(_ => {
          this.elements.forEach(el => {
            if (el.tagName === 'INPUT') inputNormalizer(el);
            if (this.updatesHistory) el[el.on ? 'on' : 'addEventListener']('change', historyListener);
            el[el.on ? 'on' : 'addEventListener']('change', e => {
              if (this.id) global.localStorage.setItem(this.id, JSON.stringify(this.serialize()));
            });
          });
        });
      }
    }
  });
})();

export const FormControlBehavior = (() => {
  const reflectedAttributes = ['name', 'value', 'required', 'is-valid', 'placeholder'];
  return superclass => defineUIComponent({
    name: 'ui-form-behavior',
    registerElement: false,
    reflectedAttributes,
    definition: class extends superclass {
      constructor () {
        super();
        this._validators = [];
      }

      _validate () {
        let isValid = this._validators.length ?
          this._validators.every(f => f(this.value)) :
          true;

        this.isValid = isValid;
        this.classList.remove(isValid ? 'invalid' : 'valid');
        this.classList.add(isValid ? 'valid' : 'invalid');
        return isValid;
      }

      validate (validator) {
        if (!this._validators.includes(validator)) {
          this._validators.push(validator);
          this._validate();
        }
        return this;
      }

      removeValidator (validator) {
        this._validators = this._validators.filter(f => f !== validator);
        this._validate();
        return this;
      }

      init () {
        super.init();
        let val = this.value;
        this.on('attribute-change', ({ changed: { now, name } }) => {
          switch (name) {
            case 'value':
            case 'selected-index':
              if (now !== val) {
                // Need to wait a couple of ticks to allow the selected/value properties to update.
                // although we can get current value from the attribute-change event, something
                // might attempt to read list.selected or the value property/attribute on change
                // and will expect it to be updated.
                global.setTimeout(() => {
                  val = now;
                  this._validate();

                  const evt = new Event('change');
                  evt.value = this.value;
                  evt.isValid = this.isValid;
                  this.dispatchEvent(evt);
                }, 0);
              }

              break;

            case 'required':
              const reqHandler = value => value != null && value !== '';
              if (now) {
                this.validate(reqHandler);
              } else {
                this.removeValidator(reqHandler);
              }

              break;
          }
        });
      }
    }
  });
})();
