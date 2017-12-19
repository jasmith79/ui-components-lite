import Button from './button.js';

const styles = {
  'display': 'block',
  'width': '74px',
  'height': '74px',
  'borderRadius': '50%',
};

export class Fab extends Button {

  init () {
    super.init();
    this.classList.add('ui-fab');
    this.applyStyles(styles);
    this.floatingY = true;
  }
}

customElements.define('ui-fab-button', Fab);
