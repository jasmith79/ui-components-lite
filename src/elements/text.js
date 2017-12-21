import UIBase from '../utils/ui-component-base.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const ELEMENT_NAME = 'ui-text';

const reflectedAttrs = ['view-text'];
const styles = {
  display: 'inline',
};

const Text = (class Text extends mix(HTMLElement).with(UIBase) {
  static get observedAttributes () {
    return [...super.observedAttributes, ...reflectedAttrs];
  }

  get componentName () {
    return ELEMENT_NAME;
  }

  init () {
    super.init();
    this.applyStyles(styles);
    this.classList.add(ELEMENT_NAME);
    if (this.viewText && !this.textContent) this.textContent = this.viewText;
    if (this.textContent && !this.viewText) this.viewText = this.textContent;
    this.watchAttribute(this, 'view-text', val => {
      this.textContent = val;
    });
  }
}).reflectToAttribute(reflectedAttrs);

export default Text;
customElements.define('ui-text', Text);
