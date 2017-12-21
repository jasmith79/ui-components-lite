import UIBase from '../utils/ui-component-base.js';
import Floats from '../utils/float.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const styles = {
  'display': 'block',
  'width': '200px',
  'height': '300px',
  'padding': '2%',
};

const ELEMENT_NAME = 'ui-card';

export default class Card extends mix(HTMLElement).with(UIBase, Floats) {
  init () {
    super.init();
    this.classList.add(ELEMENT_NAME);
    this.applyStyles(styles);
    this.floatingY = true;
  }

  get componentName () {
    return ELEMENT_NAME;
  }
}

customElements.define('ui-card', Card);
