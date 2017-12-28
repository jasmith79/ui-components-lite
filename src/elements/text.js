import UIBase from '../utils/ui-component-base.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const ELEMENT_NAME = 'ui-text';

const reflectedAttrs = ['view-text'];
const styles = {
  display: 'inline',
};

const textHolder = document.createElement('span');

const Text = (class Text extends mix(HTMLElement).with(UIBase) {
  constructor () {
    super();
    this._textHolder = textHolder.cloneNode(true);
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(this._textHolder);
  }
  
  get componentName () {
    return ELEMENT_NAME;
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
    this.applyStyles(styles);
    this.classList.add(ELEMENT_NAME);
    this.watchAttribute(this, 'view-text', val => {
      this._textHolder.textContent = val;
    });

    if (this.innerHTML && !this.viewText) this.viewText = this.innerHTML;
  }
}).reflectToAttribute(reflectedAttrs);

export default Text;
customElements.define('ui-text', Text);
