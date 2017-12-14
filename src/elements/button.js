import UIBase from '../utils/ui-component-base.js';
import Ripples from '../animations/rippler.js';
import Floats from '../utils/float.js';
import Centerable from '../utils/centerer.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const styles = {
  'display': 'block',
  'height': '50px',
  'width': '120px',
  'text-align': 'center',
  'white-space': 'nowrap',
  'text-overflow': 'ellipsis',
  'text-transform': 'uppercase',
  'border-radius': '5%',
  ':hover': {
    'box-shadow': 'inset 0 0 0 99999px rgba(150,150,150,0.2)',
  }
};

const reflectedAttrs = [
  'dialog-dismiss',
  'dialog-confirm',
  'submit',
];

const Button = (class Button extends mix(HTMLElement).with(UIBase, Ripples, Floats, Centerable) {
  constructor () {
    super();
  }

  static get observedAttributes () {
    return [...super.observedAttributes, ...reflectedAttrs];
  }

  init () {
    super.init();
    this.applyStyles(styles);
    this.centerContent();
  }
}).reflectToAttribute(reflectedAttrs);

export default Button;
customElements.define('ui-button', Button);
