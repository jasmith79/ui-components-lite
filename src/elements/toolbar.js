import UIBase from '../utils/ui-component-base.js';
import Floats from '../utils/float.js';
import { centeredStyles } from '../utils/centerer.js';
import { defineUIComponent, document } from '../utils/dom.js';
import processHTMLAttr from '../utils/attribute-analyzer.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const updateChildComponent = () => {

};

const reflectedAttrs = [
  'is-tall',
];

const template = document.createElement('template');
template.innerHTML = `
  <style>
    ${centeredStyles}

    :host {
      width: 100%;
      background-color: var(--ui-theme-primary-dark-color, blue);
      color: var(--ui-theme-light-text-color, #fff);
      height: 70px;
      display: block;
    }

    :host([is-tall]) {
      height: 192px;
    }

    :host(:not([is-tall]).has-secondary) {
      margin-bottom: 56px;
    }

    #title-holder {
      position: relative;
      margin-left: auto;
      margin-right: auto;
      max-width: 300px;
      text-align: center;
      text-transform: capitalize;
      overflow: hidden;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 22px;
    }

    :host([is-tall]) #title-holder {
      font-size: 40px;
    }

    ::slotted([slot="left-button-slot"]) {
      position: relative;
      top: -18px;
      left: 10px;
      float: left;
    }

    :host([is-tall]) ::slotted([slot="left-button-slot"]) {
      top: -35px;
    }

    ::slotted([slot="right-button-slot"]) {
      position: relative;
      top: -18px;
      right: 30px;
      float: right;
    }


    :host([is-tall]) ::slotted([slot="right-button-slot"]) {
      top: -35px;
    }

    ::slotted([slot="secondary-toolbar-slot"]) {
      position: relative;
      width: 100vw;
      top: 44px;
    }

    :host([is-tall]) ::slotted([slot="secondary-toolbar-slot"]) {
      top: 92px;
    }

    :host(:not([is-tall])) ::slotted([slot="secondary-toolbar-slot"]) {
      text-align: center;
    }
  </style>
  <div id="title-holder" class="content-wrapper">
    <slot></slot>
  </div>
  <slot name="left-button-slot"></slot>
  <slot name="right-button-slot"></slot>
  <slot name="secondary-toolbar-slot"></slot>
`;

export default defineUIComponent({
  name: 'ui-toolbar',
  template,
  reflectedAttrs,
  definition: class Toolbar extends mix(UIBase).with(Floats) {
    constructor () {
      super();
      this._secondaryToolbar = null;
    }

    init () {
      super.init();
      const secondarySlot = this.shadowRoot.querySelector('[name="secondary-toolbar-slot"]');
      const slotted = secondarySlot.assignedNodes();
      if (slotted.length) {
        this._secondaryToolbar = slotted[0];
        this.classList.add('has-secondary');
      }

      secondarySlot.addEventListener('slotchange', e => {
          this._secondaryToolbar = this.querySelector('[slot="secondary-toolbar-slot"]');
          if (this._secondaryToolbar) this.classList.add('has-secondary');
        });

      this.on('attribute-change', ({ changed: { name, now } }) => {
        if (name === 'is-tall') {
          if (now == null) {
            if (this._secondaryToolbar) {
              this._secondaryToolbar.classList.add('tabs-centered');
            }
          } else if (!now || now === "false") {
            this.isTall = null;
          } else {
            if (this._secondaryToolbar) {
              this._secondaryToolbar.classList.remove('tabs-centered');
            }
          }
        }
      });
    }
  }
});
