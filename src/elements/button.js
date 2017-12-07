import UIBase from '../utils/ui-component-base.js';
import styler from '../utils/styler.js';
import rippleStyles from '../animations/rippler.js';
import Floats from '../utils/float.js';
import Centerable from '../utils/centerer.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const styles = styler.getClassList({
  'display': 'block',
  'height': '50px',
  'width': '120px',
  'text-align': 'center',
  'white-space': 'nowrap',
  'text-overflow': 'ellipsis',
  'border-radius': '5%',
  ':hover': {
    'box-shadow': 'inset 0 0 0 99999px rgba(150,150,150,0.2)',
  }
});

const reflectedAttrs = [
  'dialog-dismiss',
  'dialog-confirm',
  'submit',
];

export default class Button extends mix(HTMLElement).with(UIBase, Floats, Centerable) {
  constructor () {
    super();
  }

  static get observedAttributes () {
    return [...super.observedAttributes, ...reflectedAttrs];
  }

  init () {
    super.init();
    this.classList.add(...styles);
    this.classList.add(...rippleStyles);
    this.textContent = this.textContent.toUpperCase();
    this.centerContent();
  }
}

customElements.define('ui-button', Button);
