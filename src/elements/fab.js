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
