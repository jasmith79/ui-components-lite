import UIBase from '../utils/ui-component-base.js';
import extractType from '../../node_modules/extracttype/extracttype.js';
import { defineUIComponent, document } from '../utils/dom.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

// TODO external ui-input not getting cached data? input elements lose data sometimes
// on multiple reloads?

// const inputReducer = (ips, init) => ips.reduce((acc, ip) => (acc.append(ip.name, ip.value), acc), init);
export const Form = (() => {
  const reflectedAttrs = ['action', 'method', 'autocomplete', 'response-type'];
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
    reflectedAttrs,
    definition: class Form extends UIBase {
      constructor () {
        super();
        this._inputs = null;
        this._selects = null;
        this._formElements = null;
      }

      _isFormEligible (el) {
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
              ...this.selectAll('input[name], select[name], .ui-form-behavior'),
              ...document.querySelectorAll(`[form="${this.id}"]`)
            ])
          ] :
          this.selectAll('input[name], select[name], .ui-form-behavior');
      }

      get data () {
        return this.elements.reduce((formdata, el) => {
          if (el.name) formdata.append(el.name, el.value || '');
          return formdata
        }, new FormData);
      }

      set data (data) {
        Object.entries(data).forEach(([name, val]) => {
          const els = this.elements.filter(el => el.matches(`[name="${name}"]`));
          els.forEach((el, i, arr) => {
            const type = this._isFormEligible(el);
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

      appendChild (node) {
        const isEligible = this._isFormEligible(node);
        if (isEligible) {
          super.appendChild(node);
          this[`_${isEligible}s`].push(node);
        }

        return node;
      }

      serialize () {
        return [...this.data.entries()].reduce((acc, [k, v]) => {
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

      submit ({ url: argURL, method: meth, headers, responseType}) {
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
        switch ((responseType || this.responseType || '').toLowerCase()) {
          case 'text':
          case 'html':
            return result.then(resp => resp.text());

          case 'json': return result.then(resp => resp.json());
          default: return result;
        }
      }

      init () {
        super.init();
        this.attr('is-data-element', true);

        this.on('ui-component-ready', _ => {
          this._inputs = [
            ...new Set([
              ...this.selectAll('input[name]'),
              ...(document.querySelectorAll(`input[form="${this.id}"]`) || []),
            ])
          ];

          this._selects = [...new Set([
              ...this.selectAll('select[name]'),
              ...(document.querySelectorAll(`select[form="${this.id}"]`) || []),
            ])
          ];

          this._formElements = [...new Set([
              ...this.selectAll('.ui-form-behavior'),
              ...(document.querySelectorAll(`.ui-form-behavior[form="${this.id}"]`) || []),
            ])
          ];
        });
      }
    }
  });
})();

export const FormBehavior = (() => {
  const reflectedAttrs = ['name', 'value', 'required', 'is-valid', 'placeholder'];
  return superclass => defineUIComponent({
    name: 'ui-form-behavior',
    registerElement: false,
    reflectedAttrs,
    definition: class extends superclass {

      validate (validator) {
        return this.watchAttribute(this, 'value', (...args) => {
          this.isValid = validator.apply(this, args);
          this.classList.remove(this.isValid ? 'invalid' : 'valid');
          this.classList.add(this.isValid ? 'valid' : 'invalid');
        });
      }
    }
  });
})();
