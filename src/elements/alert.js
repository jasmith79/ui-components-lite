import Dialog from './dialog.js';
import Button from './button.js';
import styler from '../utils/styler.js';

const styles = styler.getClassList({
  'padding': '20px',
  'top': '30%',
});

const btnStyles = styler.getClassList({
  'background-color': '#e83673',
  'color': '#fff',
  'position': 'relative',
  'width': '105px',
  'height': '50px',
  'top': 'calc(100% - 55px)',
  'left': 'calc(100% - 105px)',
});

const contentStyles = styler.getClassList({
  'width': '90%',
  'margin-left': 'auto',
  'margin-right': 'auto',
  'height': '65%',
  'position': 'relative',
  'top': '-50px',
});

export default class Alert extends Dialog {

  init () {
    // TODO: change this to shadowDOM?
    this._contentArea = document.createElement('div');
    this._contentArea.classList.add(...contentStyles);
    this.setAttribute('modal', true);
    this.setAttribute('scrollable-dialog', false);
    this.setAttribute('small-dialog', true);
    this._closer = document.createElement('ui-button');
    this._closer.textContent = 'Close';
    this._closer.classList.add(...btnStyles);
    this._closer.setAttribute('dialog-dismiss', true);
    this._closer.setAttribute('floating-y', true);
    this.appendChild(this._closer);
    this.appendChild(this._contentArea);
    super.init();
    this.classList.add(...styles);
    return;
  }

  alert (txt) {
    this._contentArea.textContent = txt;
    return this.open();
  }
}

customElements.define('ui-alert', Alert);
