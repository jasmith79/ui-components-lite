import UIBase from '../utils/ui-component-base.js';
import Floats from '../utils/float.js';
import Easer from '../animations/easer.js';
import { defineUIComponent, document } from '../utils/dom.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

import './backdrop.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      position: absolute;
      top: 0;
      height: 100vh;
      z-index: 9001;
      max-width: 90vw;
      width: 320px;
      padding: 10px;
      background-color: var(--ui-theme-primary-light-color, #fff);
    }

    :host([left-oriented]) {
      left: -350px;
      border-right: solid 1px var(--ui-theme-dark-text-color, #000);
    }

    :host([right-oriented]) {
      left: 100vw;
      border-left: solid 1px var(--ui-theme-dark-text-color, #000);
    }
  </style>
`;

const reflectedAttrs = ['is-modal', 'is-open'];

const Drawer = defineUIComponent({
  name: 'ui-drawer',
  template,
  reflectedAttrs,
  definition: class Drawer extends mix(UIBase).with(Floats, Easer) {
    constructor () {
      super();
      this._backdrop = document.createElement('ui-backdrop');
      this._backdrop.style.zIndex = '9000';
      this._toggleElem = null;
      this._isOpen = false;
      this._rightAnimator = null;
      this._leftAnimator = null;
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

    toggleState () {
      this.isOpen = !this.isOpen;
      return this;
    }

    init () {
      super.init();
      if (!this.rightOriented) this.leftOriented = true;
      this.floatingX = true;

      // Check for the drawer toggle in the DOM. If not, you'll need to use the toggledBy method
      // or wire up the handlers yourself
      this.toggledBy(document.querySelector('[drawer-toggle]'));

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
        }
      });
    }
  }
});
