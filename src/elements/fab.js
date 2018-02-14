/*
 * fab.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * floating action button component for ui-components-lite.
 */

import Button from './button.js';

import { defineUIComponent, document } from '../utils/dom.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      width: 74px;
      height: 74px;
      border-radius: 50%;
      background-color: var(--ui-theme-accent-color, purple);
      outline: none;
    }
  </style>
`;

export default defineUIComponent({
  name: 'ui-fab',
  template,
  definition: class Fab extends Button {
    init () {
      super.init();
      this.floatingY = true;
    }
  }
});
