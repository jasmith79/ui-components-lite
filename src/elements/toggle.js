
/*
 * toggle.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * toggle slider component for ui-components-lite.
 */

import Checkbox from './checkbox.js';
import { FormControlBehavior } from './form.js';

import Floats from '../utils/float.js';
import { inputNormalizer } from '../utils/normalizer.js';
import { UIBase, defineUIComponent, document } from '../utils/ui-component-base.js';

import { mix } from '../../../mixwith/src/mixwith.js';

const reflectedAttributes = ['is-on', 'is-square'];
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
      width: 60px;
      height: 34px;
      position: relative;
    }

    :host(:hover) .slider {
      box-shadow: inset 0 0 0 99999px rgba(80,80,80,0.2);
    }

    input {
      display: none;
    }

    #container {
      display: inherit;
      width: inherit;
      height: inherit;
      position: inherit;
    }

    .slider {
      width: inherit;
      height: 10px;
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #CCC;
      transition: transform;
      transition-duration: 400ms;
      border-radius: 34px;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: -9px;
      background-color: var(--ui-theme-light-text-color);
      transition: transform;
      transition-duration: 400ms;
      border-radius: 50%;
      border: 1px solid #CCC;
    }

    input:checked + .slider {
      background-color: var(--ui-theme-primary-dark-color);
    }

    input:checked + .slider:before {
      transform: translateX(26px);
    }

    :host([is-square]) .slider {
      border-radius: 0;
    }

    :host([is-square]) .slider:before {
      border-radius: 0;
    }
  </style>
  <label id="container">
    <input type="checkbox" />
    <div class="slider"></div>
  </label>
`;

export default defineUIComponent({
  name: 'ui-toggle',
  reflectedAttributes,
  template,
  definition: class Toggle extends mix(UIBase).with(FormControlBehavior, Floats) {
    constructor () {
      super();
      const ip = this.selectInternalElement('input');
      inputNormalizer(ip);
      this.on('click enter-key', e => {
        ip.checked = !ip.checked;
        this.value = ip.checked;
      });

      this.on('change', ({ value }) => {
        ip.checked = Boolean(this.value);
      });
    }
  }
});
