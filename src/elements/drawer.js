import UIBase from '../utils/ui-component-base.js';
import Floats from '../utils/float.js';
import Easer from '../animations/easer.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

import './hamburger.js';
import './backdrop.js';

const styles = {
  'position': 'absolute',
  'top': '0',
  'height': '100vh',
  'z-index': '9001',
  'max-width': '90vw',
  'width': '320px',
  'padding': '10px',
  'background-color': '#fff',
};

const leftStyles = {
  'left': '-350px',
  'border-right': 'solid 1px #000',
};

const rightStyles = {
  'left': '100vw',
  'border-left': 'solid 1px #000',
};

const reflectedAttrs = ['is-modal', 'is-open'];

const Drawer = (class Drawer extends mix(HTMLElement).with(UIBase, Floats, Easer) {
  constructor () {
    super();
    this._backdrop = document.createElement('ui-backdrop');
    this._backdrop.style.zIndex = '9000';
    document.body.appendChild(this._backdrop);
    this._toggleElem = null;
    this._isOpen = false;
    this._animator = null;
  }

  static get observedAttributes () {
    return [...super.observedAttributes, ...reflectedAttrs];
  }

  init () {
    super.init();
    this.applyStyles(styles);
    this._backdrop.on('click', this.close.bind(this));
    const float = this.rightOriented ? 'floatRight' : 'floatLeft';
    this[float]();

    // Check for the drawer toggle in the DOM. If not, you'll need to use the toggledBy method
    // or wire up the handlers yourself
    this.toggledBy(document.querySelector('[ui-role="drawer-toggle"]'));

    this._leftAnimator = this.defineSlideAnimation({ direction: 'right', distance: '350px'});
    this._rightAnimator = this.defineSlideAnimation({ direction: 'left', distance: '350px'});

    this.on('attribute-change', ({ changed: { now, name } }) => {
      const orient = this.rightOriented ? 'right' : 'left';
      const animator = this[`_${orient}Animator`];
      switch (name) {
        case 'is-open':
          if (now) {
            if (this.isModal) this._backdrop.show();
            animator.easeIn();
          } else {
            animator.easeOut().then(_ => this._backdrop.hide());
          }
          break;

        case 'right-oriented': return now && this.floatRight();
        case 'left-oriented': return now && this.floatLeft();

        default: break; // no-op
      }
    });
  }

  toggledBy (elem) {
    if (elem) {
      this._toggleElem = elem;
      if (this._toggleElem.on) {
        this._toggleElem.on('click', e => { this.toggleState() });
      } else {
        this._toggleElem.addEventListener('click', e => { this.toggleState() })
      }
    }
    return this;
  }

  open () {
    this.isOpen = true;
    return this;
  }

  close () {
    this.isOpen = false;
    return this;
  }

  floatRight () {
    this.floatingX = true;
    return this.removeStyles(leftStyles).applyStyles(rightStyles);
  }

  floatLeft () {
    this.floatingX = true;
    return this.removeStyles(rightStyles).applyStyles(leftStyles);
  }

  toggleState () {
    this.isOpen = !this.isOpen;
    return this;
  }

}).reflectToAttribute(reflectedAttrs);

export default Drawer;
customElements.define('ui-drawer', Drawer);
