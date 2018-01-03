/*
 * NOTE: it is not currently possible to extend specific HTMLElements, leading
 * to this element being rather convoluted. Once it's possible to extend input
 * directly this should be refactored.
 *
 */

import UIBase from '../utils/ui-component-base.js';
import Ripples from '../animations/rippler.js';
import { defineUIComponent, document } from '../utils/dom.js';
import { FormBehavior } from './form.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
      min-height: 25px;
      min-width: 25px;
      background-color: #DDD;
      position: relative;
    }

    :host(:hover) {
      box-shadow: inset 0 0 0 99999px rgba(150,150,150,0.2);
    }

    :host:after {
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

    :host(.checked):after {
      display: block;
    }
  </style>
`;

const reflectedAttrs = ['checked'];

const Checkbox = defineUIComponent({
  name: 'ui-checkbox',
  template,
  reflectedAttrs,
  definition: class Checkbox extends mix(UIBase).with(Ripples, FormBehavior) {
    constructor () {
      super();
      this._formElement = document.createElement('input');
      this._formElement.style.opacity = 0;
      this._formElement.type = 'checkbox';
    }

    init () {
      this.watchAttribute('checked', now => {
        now ? this.classList.add('checked') : this.classList.remove('checked');
      });

      this.on('click', e => {
        this.checked = !this.checked;
      });
    }
  }
});

export default Checkbox;
