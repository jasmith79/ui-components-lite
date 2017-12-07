import Button from './button.js';
import styler from '../utils/styler.js';

const styles = styler.getClassList({
  'display': 'block',
  'width': '74px',
  'height': '74px',
  'borderRadius': '50%',
});

export class Fab extends Button {
  constructor () {
    super();
  }

  init () {
    super.init();
    this.classList.add(...styles);
    this.floatingY = true;
  }
}

customElements.define('ui-fab-button', Fab);
