import styler from '../utils/styler.js';
import transferChildren from '../utils/transferchildren.js';
import Floats from '../utils/float.js';
import Button from './button.js';
import Card from './card.js';
import './backdrop.js';

const largeStyles = styler.getClassList({
  width: '80%',
  height: '80%',
  top: '8%',
  left: '9%',
});

const smallStyles = styler.getClassList({
  width: '250px',
  height: '185px',
  top: 'calc(50vh - 130px)',
  left: 'calc(50vw - 125px)',
});

const medStyles = styler.getClassList({
  width: '50%',
  height: '50%',
  top: '20%',
  left: '25%',
});

const scrollableStyles = styler.getClassList({
  overflow: 'scroll',
});

const styles = styler.getClassList({
  'display': 'block',
  'position': 'absolute',
  'padding': '20px',
  'z-index': '10001',
  'background-color': '#fff',
});

const reflectedAttrs = [
  'modal',
  'small-dialog',
  'medium-dialog',
  'large-dialog',
  'scrollable-dialog',
];

export default class Dialog extends Card {
  constructor () {
    super();
  }

  static get observedAttributes () {
    return [...super.observedAttributes, ...reflectedAttrs];
  }

  init () {
    super.init();
    this._backdrop = document.createElement('ui-backdrop');
    this.classList.add(...styles);
    document.body.appendChild(this._backdrop);
    this.hide();
    this._backdrop.hide();
    this._backdrop.on('click', this.close.bind(this));

    // 500ms setTimeout is to let the ripple animation finish
    const dismisser = e => {
      setTimeout(() => {
        this.close();
        this.dispatchEvent(new CustomEvent('dialog-dismiss'));
      }, 500);
    };

    const confirmer = e => {
      setTimeout(() => {
        this.close();
        this.dispatchEvent(new CustomEvent('dialog-confirm'));
      }, 500);
    };

    Array.from(this.children).forEach(child => {
      if (child instanceof Button) {
        if (child.getAttribute('dialog-dismiss') != null) {
          child.on('click', dismisser);
        }

        if (child.getAttribute('dialog-confirm') != null) {
          child.on('click', closer);
        }

        child.on('attribute-change', e => {
          const { name, was, now } = e.changed;
          const yes = now !== 'false' && now !== null;
          if (name === 'dialog-confirm') {
            yes ? child.on('click', confirmer) : child.remove('click', confirmer);
          }

          if (name === 'dialog-dismiss') {
            yes ? child.on('click', dismisser) : child.remove('click', dismisser);
          }
        });
      }
    });
  }

  get modal () {
    return this._isModal;
  }

  set modal (bool) {
    switch (bool) {
      case 'false':
      case false:
        this._isModal = false;
        break;
      default:
        this._isModal = true;
        break;
    }
    return this;
  }

  set smallDialog (bool) {
    switch (bool) {
      case 'false':
      case false:
        this.classList.remove(...smallStyles);
        break;
      default:
        this.removeAttribute('large-dialog', 'medium-dialog');
        this.classList.add(...smallStyles);
        break;
    }
    return this;
  }

  set mediumDialog (bool) {
    switch (bool) {
      case 'false':
      case false:
        this.classList.remove(...medStyles);
        break;
      default:
        this.removeAttribute('small-dialog', 'large-dialog');
        this.classList.add(...medStyles);
        break;
    }
    return this;
  }

  set largeDialog (bool) {
    switch (bool) {
      case 'false':
      case false:
        this.classList.remove(...largeStyles);
        break;
      default:
        this.removeAttribute('small-dialog', 'medium-dialog');
        this.classList.add(...largeStyles);
        break;
    }
    return this;
  }

  set scrollableDialog (bool) {
    switch (bool) {
      case 'false':
      case false:
        this.classList.remove(...scrollableStyles);
        break;
      default:
        this.classList.add(...scrollableStyles);
        break;
    }
    return this;
  }

  open () {
    if (this.modal) this._backdrop.show();
    this.show();
    this.dispatchEvent(new CustomEvent('dialog-opened'));
    return this;
  }

  close () {
    this._backdrop.hide();
    this.hide();
    this.dispatchEvent(new CustomEvent('dialog-closed'));
    return this;
  }
}

customElements.define('ui-dialog', Dialog);
