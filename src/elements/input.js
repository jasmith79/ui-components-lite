/*
 * NOTE: it is not currently possible to extend specific HTMLElements, leading
 * to this element being rather convoluted. Once it's possible to extend input
 * directly this should be refactored.
 */

import { FormBehavior } from './form.js';
import UIBase from '../utils/ui-component-base.js';
import Styler from '../utils/styler.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const reflectedAttrs = [
  'type',
  'placeholder',
];

const editableReflectedAttrs = ['value'];

const editableStyles = {
  'display': 'block',
  'border-bottom': 'solid 1px',
  'border-bottom-color': Styler.darkTextColor,
  'border-bottom-width': '80%',
  'min-height': '20px',
};

const inputDiv = document.createElement('div');
inputDiv.contentEditable = "true";

const slot = document.createElement('slot');

const _Editable = (class _Editable extends mix(HTMLElement).with(UIBase) {
  constructor () {
    super();
    this._before = this.textContent;
  }

  init () {
    super.init();
    this.applyStyles(editableStyles);
    this.contentEditable = "true";
    this.on('focus', e => {
      this._before = this.textContent;
    });

    this.on('blur keyup paste input', e => {
      if (this.textContent !== this._before) {
        this._before = this.textContent;
        this.value = this.textContent;
      }
    });

    // Capture programmatic changes to the value.
    this.watchAttribute(this, 'value', now => {
      this.textContent = now;
    });
  }
}).reflectToAttribute(editableReflectedAttrs);

customElements.define('ui-editable', _Editable);

const Input = (class Input extends mix(HTMLElement).with(UIBase, FormBehavior) {
  constructor () {
    super();
    this._input = null;
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes () {
    return [...super.observedAttributes, ...reflectedAttrs];
  }

  init () {
    super.init();
    this._input = document.createElement('ui-editable');
    this.appendChild(this._input);
    this.shadowRoot.appendChild(slot.cloneNode(true));
    this.watchAttribute(this._input, 'value', now => {
      this.value = now;
      this.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }
}).reflectToAttribute(reflectedAttrs);

export default Input;
customElements.define('ui-input', Input);
