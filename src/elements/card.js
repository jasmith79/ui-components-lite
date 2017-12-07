import UIBase from '../utils/ui-component-base.js';
import styler from '../utils/styler.js';
import Floats from '../utils/float.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const styles = styler.getClassList({
  'display': 'block',
  'width': '200px',
  'height': '300px',
  'padding': '2%',
});

export default class Card extends mix(HTMLElement).with(UIBase, Floats) {
  constructor () {
    super();
  }

  init () {
    super.init();
    this.classList.add(...styles);
    this.floatingY = true;
  }
}

customElements.define('ui-card', Card);
