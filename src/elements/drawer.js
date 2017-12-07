import styler from '../utils/styler.js';
import UIBase from '../utils/ui-component-base.js';
import Floats from '../utils/float.js';
import { FALSE, processHTMLAttr } from '../utils/attribute-analyzer.js';

import Easer from '../animations/easer.js';

import { mix } from '../../node_modules/mixwith/src/mixwith.js';

import './hamburger.js';
import './backdrop.js';

const styles = styler.getClassList({
  'position': 'absolute',
  'top': '0',
  'height': '100vh',
  'z-index': '9001',
  'max-width': '90vw',
  'width': '320px',
  'padding': '10px',
  'background-color': '#fff',
});

const leftStyles = styler.getClassList({
  'left': '-350px',
  'border-right': 'solid 1px #000',
});

const rightStyles = styler.getClassList({
  'left': '100vw',
  'border-left': 'solid 1px #000',
});

const reflectedAttrs = ['modal'];

export default class Drawer extends mix(HTMLElement).with(UIBase, Floats, Easer) {
  constructor () {
    super();
    this._backdrop = document.createElement('ui-backdrop');
    this._backdrop.style.zIndex = '9000';
    document.body.appendChild(this._backdrop);
    this._toggleElem = null;
    this._isOpen = false;
    this._isModal = false;
    this._animator = null;
  }

  static get observedAttributes () {
    return [...super.observedAttributes, ...reflectedAttrs];
  }

  init () {
    super.init();
    this.classList.add(...styles);
    this._backdrop.on('click', this.close.bind(this));
    if (this.getAttribute('is-open')) this._isOpen = true;
    if (!this._isOpen) {
      if (processHTMLAttr(this.getAttribute('right-oriented')) === FALSE) {
        this.floatLeft();
      }
    }

    // Check for the drawer toggle in the DOM. If not, you'll need to use the toggledBy method
    // or wire up the handlers yourself
    this.toggledBy(document.querySelector('[ui-role="drawer-toggle"]'));

    this._leftAnimator = this.defineSlideAnimation({ direction: 'right', distance: '350px'});
    this._rightAnimator = this.defineSlideAnimation({ direction: 'left', distance: '350px'});
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

  get isOpen () {
    return this._isOpen;
  }

  set modal (val) {
    if (processHTMLAttr(val) === FALSE) {
      this._isModal = false;
      return false;
    } else {
      this._isModal = true;
      return true;
    }
  }

  get modal () {
    return this._isModal;
  }

  open () {
    this._isOpen = true;
    const right = this.getAttribute('right-oriented');
    const orient = right != null && right !== false ? 'right' : 'left';
    if (this.modal) this._backdrop.show();
    const animator = this[`_${orient}Animator`];
    animator.easeIn();
    return this;
  }

  close () {
    this._isOpen = false;
    const right = this.getAttribute('right-oriented');
    const orient = right != null && right !== false ? 'right' : 'left';
    const animator = this[`_${orient}Animator`];
    animator.easeOut().then(_ => this._backdrop.hide());
    return this;
  }

  floatRight () {
    this.classList.add(...rightStyles);
    this.classList.remove(...leftStyles);
    this.setAttribute('floating-x', true);
    return this;
  }

  floatLeft () {
    this.classList.add(...leftStyles);
    this.classList.remove(...rightStyles);
    this.setAttribute('floating-x', true);
    return this;
  }

  set rightOriented (val) {
    return processHTMLAttr(val) === FALSE ? this.floatLeft() : this.floatRight();
  }

  set leftOriented (val) {
    return processHTMLAttr(val) === FALSE ? this.floatRight() : this.floatLeft();
  }

  toggleState () {
    return this._isOpen ? this.close() : this.open();
  }
}

customElements.define('ui-drawer', Drawer);
