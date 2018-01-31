/*
 * NOTE: it is not currently possible to extend specific HTMLElements, leading
 * to this element being rather convoluted. Once it's possible to extend input
 * directly this should be refactored.
 *
 */

import { FormBehavior } from './form.js';

import Ripples from '../animations/rippler.js';

import Focusable from '../utils/focusable.js';
import { UIBase, defineUIComponent, document } from '../utils/ui-component-base.js';

import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
      height: 25px;
      width: 25px;
      background-color: #DDD;
      position: relative;
      border-radius: 5%;
    }

    :host(:hover) {
      box-shadow: inset 0 0 0 99999px rgba(150,150,150,0.2);
    }

    :host:before {
      content:"";
      position: absolute;
      display: none;
      left: 9px;
      top: 5px;
      width: 5px;
      height: 10px;
      border: solid #fff;
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
    }

    :host(.checked) {
      background-color: var(--ui-theme-primary-dark-color, blue);
    }

    :host(.checked):before {
      display: block;
    }
  </style>
`;

const reflectedAttrs = ['checked'];

const Checkbox = defineUIComponent({
  name: 'ui-checkbox',
  template,
  reflectedAttrs,
  definition: class Checkbox extends mix(UIBase).with(Ripples, Focusable, FormBehavior) {
    constructor () {
      super();
      this._formElement = document.createElement('input');
      this._formElement.style.opacity = 0;
      this._formElement.type = 'checkbox';
    }

    init () {
      super.init();
      this.attr('role', 'checkbox');
      this.watchAttribute(this, 'checked', now => {
        now ? this.classList.add('checked') : this.classList.remove('checked');
      });

      this.on('click', e => {
        this.checked = !this.checked;
        this.attr('aria-checked', this.checked);
      });
    }
  }
});

export default Checkbox;
