import UIBase from '../utils/ui-component-base.js';
import extractType from '../../node_modules/extracttype/extracttype.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const ELEMENT_NAME = 'ui-form';

/*
 * NOTE: it is not currently possible to extend specific HTMLElements, leading
 * to this element being rather convoluted. Once it's possible to extend e.g. form
 * and input directly this should be refactored.
 *
 * Any UI components wishing to play nice with this one should include the exported
 * mixin or otherwise implement relevant name and value attributes.
 */

const styles = {
  display: 'block',
};

const formBehaviorReflectedAttrs = ['name', 'value', 'required', 'is-valid'];
const reflectedAttrs = ['action', 'method', 'autocomplete', 'response-type'];

const inputReducer = (ips, init) => ips.reduce((acc, ip) => (acc.append(ip.name, ip.value), acc), init);

const Form = class Form extends mix(HTMLElement).with(UIBase) {
  get componentName () {
    return ELEMENT_NAME;
  }

  init () {
    super.init();
    this.classList.add(ELEMENT_NAME);
    this.applyStyles(styles);
  }

  get data () {
    const inputs = [
      ...new Set([
        ...this.selectAll('input[name]'),
        ...(document.querySelectorAll(`input[form="${this.id}"]`) || []),
      ]),
    ];

    const selects = [
      ...new Set([
        ...this.selectAll('select[name]'),
        ...(document.querySelectorAll(`select[form="${this.id}"]`) || []),
      ]),
    ];

    const components = [
      ...new Set([
        ...this.selectAll('.is-ui-component[name][value]'),
        ...(document.querySelectorAll(`.is-ui-component[name][value][form="${this.id}"]`) || []),
      ]),
    ];

    return selects.reduce((acc, sel) => {
      acc.append(sel.name, sel.options[sel.selectedIndex].value);
      return acc;
    }, inputReducer(inputs, inputReducer(components, new FormData)));
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
      case 'json': return result.then(resp => resp.json());
      case 'text':
      case 'html':
        return result.then(resp => resp.text());

      default: return result;
    }
  }
};

const FormBehavior = superclass => (class FormItem extends superclass {
  validate (validator) {
    return this.watchAttribute(this, 'value', (...args) => {
      this.isValid = validator.apply(this, args);
      this.classList.remove(this.isValid ? 'invalid' : 'valid');
      this.classList.add(this.isValid ? 'valid' : 'invalid');
    });
  }
}).reflectToAttribute(formBehaviorReflectedAttrs);

export {
  Form,
  FormBehavior,
};

customElements.define('ui-form', Form);
