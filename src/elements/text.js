/*
 * text.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * text-holder component for ui-components-lite.
 *
 * NOTE: it is not currently (and may never) be possible to extend built-in elements like Span.
 * If it does become possible this can be refactored to support extending HTMLSpanElement.
 */

import { UIBase, defineUIComponent, document } from '../utils/ui-component-base.js';

const reflectedAttributes = ['view-text'];
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
  reflectedAttributes,
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
