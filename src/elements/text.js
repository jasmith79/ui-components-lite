import UIBase from '../utils/ui-component-base.js';
import { defineUIComponent, document } from '../utils/dom.js';

const reflectedAttrs = ['view-text'];
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline;
    }

    #text-holder {
      color: var(--ui-theme-dark-text-color, #000);
    }
  </style>
  <span id="text-holder"></span>
`;

const Text = defineUIComponent({
  name: 'ui-text',
  reflectedAttrs,
  template,
  definition: class Text extends UIBase {
    constructor () {
      super();
      this._textHolder = null;
    }

    // Override the default textContent property
    get textContent () {
      return this._textHolder.textContent;
    }

    set textContent (text) {
      this.viewText = text;
      return text;
    }

    init () {
      super.init();
      this._textHolder = this.shadowRoot.querySelector('#text-holder');
      this.watchAttribute(this, 'view-text', val => {
        this._textHolder.textContent = val;
      });

      if (this.innerHTML && !this.viewText) this.viewText = this.innerHTML;
    }
  }
});

export default Text;
