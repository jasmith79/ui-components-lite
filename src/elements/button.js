import Ripples from '../animations/rippler.js';

import Floats from '../utils/float.js';
import Centerable from '../utils/centerer.js';
import Focusable from '../utils/focusable.js';
import { defineUIComponent, document, UIBase } from '../utils/ui-component-base.js';

import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      height: 50px;
      width: 120px;
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-transform: uppercase;
      border-radius: 5%;
      background-color: var(--ui-theme-secondary-dark-color, blue);
      color: var(--ui-theme-light-text-color, #fff);
      margin: 5px;
    }

    :host(:hover) {
      box-shadow: inset 0 0 0 99999px rgba(150,150,150,0.2);
    }
  </style>
`;

const reflectedAttrs = [
  'dialog-dismiss',
  'dialog-confirm',
  'submit',
];

const Button = defineUIComponent({
  name: 'ui-button',
  template,
  reflectedAttrs,
  definition: class Button extends mix(UIBase).with(Centerable, Floats, Ripples, Focusable) {
    init () {
      super.init();
      this.attr('role', 'button');
      const index = this.attr('tabindex');
      if (index === null || index < 0) this.attr('tabindex', '0');
    }
  }
});

export default Button;
