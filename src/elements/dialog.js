import Floats from '../utils/float.js';
import Button from './button.js';
import Card from './card.js';
import './backdrop.js';

const largeStyles = {
  width: '80%',
  height: '80%',
  top: '8%',
  left: '9%',
};

const smallStyles = {
  width: '250px',
  height: '185px',
  top: 'calc(50vh - 130px)',
  left: 'calc(50vw - 125px)',
};

const medStyles = {
  width: '50%',
  height: '50%',
  top: '20%',
  left: '25%',
};

const scrollableStyles = {
  overflow: 'scroll',
};

const styles = {
  'display': 'block',
  'position': 'absolute',
  'padding': '20px',
  'z-index': '10001',
  'background-color': '#fff',
};

const reflectedAttrs = [
  'is-open',
  'is-modal',
  'small-dialog',
  'medium-dialog',
  'large-dialog',
  'scrollable-dialog',
];

const Dialog = (class Dialog extends Card {
  constructor () {
    super();
  }

  static get observedAttributes () {
    return [...super.observedAttributes, ...reflectedAttrs];
  }

  init () {
    super.init();
    this._backdrop = document.createElement('ui-backdrop');
    this.applyStyles(styles);
    document.body.appendChild(this._backdrop);
    this.hide();
    this._backdrop.hide();
    const closer = this.close.bind(this);

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

        child.on('attribute-change', ({ changed: { name, now } }) => {
          if (name === 'dialog-confirm') {
            now ? child.on('click', confirmer) : child.remove('click', confirmer);
          }

          if (name === 'dialog-dismiss') {
            now ? child.on('click', dismisser) : child.remove('click', dismisser);
          }
        });
      }
    });

    this.on('attribute-change', ({ changed: { now, name } }) => {
      switch (name) {
        case 'small-dialog':
          return now ?
            (this.applyStyles(smallStyles), this.removeStyles(medStyles, largeStyles)) :
            this.removeStyles(smallStyles);

        case 'medium-dialog':
          return now ?
            (this.applyStyles(medStyles), this.removeStyles(smallStyles, largeStyles)) :
            this.removeStyles(medStyles);

        case 'large-dialog':
          return now ?
            (this.applyStyles(largeStyles), this.removeStyles(smallStyles, medStyles)) :
            this.removeStyles(largeStyles);

        case 'scrollable-dialog':
          return now ?
            this.applyStyles(scrollableStyles) :
            this.removeStyles(scrollableStyles);

        case 'is-modal':
          return now ? this._backdrop.on('click', closer) : this._backdrop.remove(closer);

        case 'is-open':
          if (now) {
            if (this.isModal) this._backdrop.show();
            this.show();
            this.dispatchEvent(new CustomEvent('dialog-opened'));
          } else {
            this._backdrop.hide();
            this.hide();
            this.dispatchEvent(new CustomEvent('dialog-closed'));
          }

        default: break; // no-op
      }
    });
  }

  open () {
    this.isOpen = true;
    return this;
  }

  close () {
    this.isOpen = false;
    return this;
  }
}).reflectToAttribute(reflectedAttrs);

export default Dialog;
customElements.define('ui-dialog', Dialog);
