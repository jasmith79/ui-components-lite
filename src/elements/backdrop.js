import UIBase from '../utils/ui-component-base.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const styles = {
  'display': 'block',
  'height': '100vh',
  'width': '100vw',
  'background-color': 'rgba(0,0,0,0.7)',
  'position': 'absolute',
  'top': '0px',
  'left': '0px',
  'z-index': '10000',
};

export class Backdrop extends mix(HTMLElement).with(UIBase) {
  init () {
    super.init();
    this.hide();
    this.classList.add('ui-backdrop');
    this.applyStyles(styles);
  }
}

customElements.define('ui-backdrop', Backdrop);
