import UIBase from '../utils/ui-component-base.js';
import Floats from '../utils/float.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const styles = {
  'display': 'block',
  'width': '200px',
  'height': '300px',
  'padding': '2%',
};

export default class Card extends mix(HTMLElement).with(UIBase, Floats) {
  init () {
    super.init();
    this.classList.add('ui-card');
    this.applyStyles(styles);
    this.floatingY = true;
  }
}

customElements.define('ui-card', Card);
