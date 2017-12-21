import Button from './button.js';

const styles = {
  'display': 'block',
  'width': '74px',
  'height': '74px',
  'borderRadius': '50%',
};

export class Fab extends Button {

  get componentName () {
    return 'ui-fab';
  }

  init () {
    super.init();
    this.classList.add('ui-fab');
    this.applyStyles(styles);
    this.floatingY = true;
  }
}

customElements.define('ui-fab-button', Fab);
