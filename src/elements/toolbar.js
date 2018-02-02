/*
 * toolbar.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * toolbar component for ui-components-lite.
 */

import Floats from '../utils/float.js';
import processHTMLAttr from '../utils/attribute-analyzer.js';
import { UIBase, defineUIComponent, document } from '../utils/ui-component-base.js';
import { centeredStyles } from '../utils/centerer.js';

import { mix } from '../../../mixwith/src/mixwith.js';

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

    header {
      height: 100%;
      width: 100%;
    }

    #title-holder {
      position: relative;
      margin-left: auto;
      margin-right: auto;
      max-width: 80%;
      text-align: center;
      text-transform: capitalize;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 22px;
    }

    :host([is-tall]) #title-holder {
      font-size: 40px;
    }

    header ::slotted([slot="left-button-slot"]) {
      position: relative;
      top: -18px;
      left: 10px;
      float: left;
    }

    :host([is-tall]) header ::slotted([slot="left-button-slot"]) {
      top: -35px;
    }

    header ::slotted([slot="right-button-slot"]) {
      position: relative;
      top: -18px;
      right: 30px;
      float: right;
    }


    :host([is-tall]) header ::slotted([slot="right-button-slot"]) {
      top: -35px;
    }

    header ::slotted([slot="secondary-toolbar-slot"]) {
      position: relative;
      width: 100vw;
      top: 44px;
    }

    :host([is-tall]) header ::slotted([slot="secondary-toolbar-slot"]) {
      top: 92px;
    }

    :host(:not([is-tall])) header ::slotted([slot="secondary-toolbar-slot"]) {
      text-align: center;
    }
  </style>
  <header>
    <div id="title-holder" class="content-wrapper">
      <slot></slot>
    </div>
    <slot name="left-button-slot"></slot>
    <slot name="right-button-slot"></slot>
    <slot name="secondary-toolbar-slot"></slot>
  </header>
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
      this.attr('role', 'toolbar');
      const secondarySlot = this.selectInternalElement('[name="secondary-toolbar-slot"]');
      const slotted = secondarySlot.assignedNodes();
      if (slotted.length) {
        this._secondaryToolbar = slotted[0];
        this.classList.add('has-secondary');
        this._secondaryToolbar.attr('role', 'menubar');
        this._secondaryToolbar.selectAll('.ui-item').forEach(item => {
          item.attr('role', 'menuitem');
        });
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
