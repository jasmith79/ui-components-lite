import { UIBase, defineUIComponent, document } from '../utils/ui-component-base.js';

const reflectedAttrs = ['view-text'];
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline;
    }

    #text-holder {
      color: inherit;
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
      this._textHolder = this.selectInternalElement('#text-holder');
      this.watchAttribute(this, 'view-text', val => {
        this._textHolder.textContent = val || this.innerHTML; // render innerHTML as a fallback
      });

      if (this.innerHTML && !this.viewText) this.viewText = this.innerHTML;
    }
  }
});

export default Text;
