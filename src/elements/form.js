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

const formElementReflectedAttrs = ['name', 'value', 'required'];

const Form = class Form extends mix(HTMLElement).with(UIBase) {
  get componentName () {
    return ELEMENT_NAME;
  }

  init () {
    super.init();
    this.classList.add(ELEMENT_NAME);
    this.applyStyles(styles);
  }

  data () {
    const formData = new FormData(this._form);
    this.selectAll('.is-ui-component[value][name]').forEach(el => {
      formData.append(el.attr('name'), el.attr('value'));
    });
    return formData;
  }

  serialize () {
    return Array.from(this.data().entries()).reduce((acc, [k, v]) => (acc[k] = v, acc), {});
  }
};

const FormBehavior = superclass => (class FormItem extends superclass {
  constructor () {
    super();
    this._isValid = null;
  }

  static get observedAttributes () {
    return [...super.observedAttributes, ...formElementReflectedAttrs];
  }

  validate (validator) {
    return this.watchAttribute(this, 'value', validator);
  }
}).reflectToAttribute(formElementReflectedAttrs);

export {
  Form,
  FormBehavior,
};

customElements.define('ui-form', Form);
