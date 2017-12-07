import UIBase from '../utils/ui-component-base.js';
import styler from '../utils/styler.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const styles = styler.getClassList({
  'display': 'block',
  'height': '100vh',
  'width': '100vw',
  'backgroundColor': 'rgba(0,0,0,0.7)',
  'position': 'absolute',
  'top': '0px',
  'left': '0px',
  'z-index': '10000',
});

export class Backdrop extends mix(HTMLElement).with(UIBase) {
  init () {
    super.init();
    this.hide();
    this.classList.add(...styles);
  }
}

customElements.define('ui-backdrop', Backdrop);
