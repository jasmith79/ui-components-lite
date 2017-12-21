import Dialog from './dialog.js';
import Button from './button.js';
import Styled from '../utils/styler.js';

const ELEMENT_NAME = 'ui-alert';

const styles = {
  'padding': '20px',
  'top': '30%',
};

const btnStyles = {
  'background-color': '#e83673',
  'color': '#fff',
  'position': 'relative',
  'width': '105px',
  'height': '50px',
  'top': 'calc(100% - 55px)',
  'left': 'calc(100% - 105px)',
};

const contentClassName = Styled.addStyles({
  'width': '90%',
  'margin-left': 'auto',
  'margin-right': 'auto',
  'height': '65%',
  'position': 'relative',
  'top': '-50px',
});

// TODO: change this to shadowDOM?
// document.head.appendChild(contentStyles);
const contentDiv = document.createElement('div');
contentDiv.classList.add(contentClassName);

export default class Alert extends Dialog {

  get componentName () {
    return ELEMENT_NAME;
  }

  init () {
    this.classList.add(ELEMENT_NAME);

    // TODO: change this to shadowDOM?
    this._contentArea = contentDiv.cloneNode(true);
    this.scrollableDialog = false;
    this.smallDialog = true;
    this._closer = document.createElement('ui-button');
    this._closer.textContent = 'Close';
    this._closer.applyStyles(btnStyles);
    this._closer.dialogDismiss = true;
    this._closer.floatingY = true;
    this.appendChild(this._closer);
    this.appendChild(this._contentArea);
    super.init();
    this.applyStyles(styles);
    this.watchAttribute(this, 'is-open', open => {
      open ? this._backdrop.show() : this._backdrop.hide();
    });
    return;
  }

  alert (txt) {
    this._contentArea.textContent = txt;
    return this.open();
  }
}

customElements.define('ui-alert', Alert);
