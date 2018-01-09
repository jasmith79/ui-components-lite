import Floats from '../utils/float.js';
import Card from './card.js';
import './backdrop.js';
import './button.js';

import { defineUIComponent, document } from '../utils/dom.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      position: absolute;
      padding: 20px;
      z-index: 10001;
      background-color: #fff;
      overflow: hidden;
    }

    :host(.large-dialog) {
      width: 80%;
      height: 80%;
      top: 8%;
      left: 9%;
    }

    :host(.small-dialog) {
      width: 250px;
      height: 185px;
      top: calc(50vh - 130px);
      left: calc(50vw - 155px);
    }

    :host(.medium-dialog) {
      width: 50%;
      height: 50%;
      top: 20%;
      left: 25%;
    }

    :host(.scrollable-dialog) {
      overflow: scroll;
    }
  </style>
`;

const reflectedAttrs = [
  'is-open',
  'is-modal',
  'small-dialog',
  'medium-dialog',
  'large-dialog',
  'scrollable-dialog',
];

const manipulators = new WeakMap();
const incorporateButtonChild = (el, child) => {
  let manip = manipulators.get(el);
  if (!manip) {
    manip = [
      e => { el.close(); el.dispatchEvent(new CustomEvent('dialog-dismiss')) },
      e => { el.close(); el.dispatchEvent(new CustomEvent('dialog-confirm')) },
    ];
    manipulators.set(el, manip);
  }

  const [dismisser, closer] = manip;
  if (child.attr('dialog-dismiss')) child.on('click', dismisser);
  if (child.attr('dialog-confirm')) child.on('click', confirmer);
  child.watchAttribute(child, 'dialog-dismiss', now => {
    now ? child.on('click', dismisser) : child.remove('click', dismisser);
  });

  child.watchAttribute(child, 'dialog-confirm', now => {
    now ? child.on('click', confirmer) : child.remove('click', confirmer);
  });

  return el;
};

const Dialog = defineUIComponent({
  name: 'ui-dialog',
  template,
  reflectedAttrs,
  definition: class Dialog extends Card {
    constructor () {
      super();
      this.hide();
      this._backdrop = null;
    }

    // Intercepts calls to appendChild so buttons can be appropriately used.
    appendChild (node) {
      if (node && node.matches && node.matches('.ui-button')) {
        incorporateButtonChild(this, node);
        this.shadowRoot.appendChild(node);
      } else {
        super.appendChild(node);
      }
    }

    open (txt) {
      this.isOpen = true;
      return this;
    }

    close () {
      this.isOpen = false;
      return this;
    }

    init () {
      super.init();
      this._backdrop = document.createElement('ui-backdrop');
      this._backdrop.for = this;
      document.body.appendChild(this._backdrop);
      this.selectAll('.ui-button').forEach(el => incorporateButtonChild(this, el));

      const closer = e => this.close();

      this.on('attribute-change', ({ changed: { now, name } }) => {
        switch (name) {
          case 'small-dialog':
            return now ?
              (this.classList.add('small-dialog'), this.classList.remove('medium-dialog', 'large-dialog')) :
              this.classList.remove('small-dialog');

          case 'medium-dialog':
            return now ?
              (this.classList.add('medium-dialog'), this.classList.remove('small-dialog', 'large-dialog')) :
              this.classList.remove('medium-dialog');

          case 'large-dialog':
            return now ?
              (this.classList.add('large-dialog'), this.classList.remove('small-dialog', 'medium-dialog')) :
              this.classList.remove('large-dialog');

          case 'scrollable-dialog':
            return now ?
              this.classList.add('scrollable-dialog') :
              this.classList.remove('scrollable-dialog');

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
        }
      });
    }
  }
});

export default Dialog;
