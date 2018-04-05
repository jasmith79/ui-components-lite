/*
 * drop-down.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * drop-down component for ui-components-lite.
 *
 * NOTE: it is not currently (and may never) be possible to extend built-in elements like select.
 * If it does become possible this can be refactored to support extending HTMLSelectElement.
 */

import Text from './text.js';
import { ListBehavior } from './list.js';

import Focusable from '../utils/focusable.js';
import { UIBase, defineUIComponent, document, global } from '../utils/ui-component-base.js';

import { mix } from '../../../mixwith/src/mixwith.js';
import { extractType } from '../../../extracttype/extracttype.js';

const reflectedAttributes = ['selected-index', 'is-open', 'multiple', 'label'];
const template = document.createElement('template');
template.innerHTML = `
  <style>
    ui-list {
      transition: transform 500ms cubic-bezier(0.165, 0.84, 0.44, 1);
      background: #fff;
      position: relative;
      left: -5px;
      z-index: 1000;
      width: 100%;
      max-height: 225px;
      overflow-y: scroll;
    }

    .arrow {
      border: solid #999;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 3px;
      float: right;
      position: relative;
      top: 6px;
      right: 2px;
      transform: rotate(45deg);
    }

    .not-overflowing {
      overflow: hidden !important;
    }

    #dummy-item {
      text-align: center;
      padding-bottom: 3px;
    }

    #dummy-item.default {
      letter-spacing: 3px;
    }

    #list-holder {
      height: 1px;
      overflow: visible;
      position: relative;
      top: -10px;
      border-top: 1px solid #999;
    }

    ui-list ::slotted(.ui-item) {
      border: none;
    }

    :host {
      display: block;
      max-width: 200px;
    }

    :host([multiple="true"]) #dummy-item #dummy-item-content {
      position: relative;
      left: 10px;
    }

    :host([is-open="true"]) .arrow {
      transform: rotate(-135deg);
    }

    :host([is-open="true"]) ui-list {
      box-shadow: 3px 5px 10px -4px #999;
      padding-bottom: 1px;
    }
    
    ui-list.overflowing-window {
      transform: scale(1) translateY(-265px); 
    }

    ui-list.not-overflowing-window {
      transform: scale(1) translateY(0px);
    }

    :host([is-open="false"]) ui-list {
      transform: scale(0) translateY(-200px);
    }

    :host([is-open="true"]) #list-holder {
      border-color: var(--ui-theme-primary-dark-color, blue);
    }

    :host([is-open="false"]) ui-list ::slotted(.ui-item) {
      display: none;
    }

    ui-text {
      /* janky, I know. TODO: find a way to make this work with transform: translate */
      transition-property: top, left, font-size;
      transition-timing-function: ease;
      transition-duration: 1s;
      position: relative;
      top: 5px;
      left: 0px;
      font-size: 14px;
    }

    .text-moved {
      top: 25px;
      left: 10px;
      font-size: 16px;
    }

  </style>
  <label><ui-text view-text="{{label}}"></ui-text></label>
  <ui-item id="dummy-item" class="default">
    <span id="dummy-item-content"></span>
    <div class="arrow down"></div>
  </ui-item>
  <div id="list-holder" class="not-overflowing">
    <ui-list multiple="{{multiple}}">
      <slot></slot>
    </ui-list>
  </div>
`;

export default defineUIComponent({
  name: 'ui-drop-down',
  reflectedAttributes,
  template,
  definition: class DropDown extends mix(UIBase).with(ListBehavior, Focusable) {
    constructor () {
      super();
      this._list = null;
      this._listHolder = null;
      this._dummyItem = null;
      this._textContent = '';
    }

    get textContent () {
      return (this._dummyItem && this._dummyItem.textContent) || this._textContent;
    }

    set textContent (val) {
      const txt = val || '';

      this._textContent = txt;
      if (!this._dummyItem) this._dummyItem = this.selectInternalElement('#dummy-item');
      this._dummyItem.querySelector('#dummy-item-content').textContent = txt;
      if (txt === '...' || !txt) {
        this.selectInternalElement('ui-text').classList.add('text-moved');
        this._dummyItem.classList.add('default');
      } else {
        this.selectInternalElement('ui-text').classList.remove('text-moved');
        this._dummyItem.classList.remove('default');
      }

      return this;
    }

    appendChild (node) {
      if (node) {
        super.appendChild(node);
        node.on('click', e => {
          if (!this.multiple) {
            // wait for the animations to finish
            global.setTimeout(() => {
              this.close();
            }, 300);
          }
        });
      }

      return node;
    }

    toggle () {
      this.isOpen = !this.isOpen;
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

    init () {
      let mouseon = false;
      super.init();
      const index = this.attr('tabindex');
      if (index === null || index < 0) this.attr('tabindex', '0');

      this.on('enter-key', e => {
        this.open();
      });

      if (this.attr('name')) {
        if (!this.attr('label')) this.attr('label', this.attr('name'));
        this.selectInternalElement('label').setAttribute('for', this.attr('name'));
      }

      if (this.attr('label')) this.selectInternalElement('ui-text').classList.add('text-moved');
      this.on('focus', e => this.selectInternalElement('ui-text').classList.remove('text-moved'));
      this.on('blur', e => {
        global.setTimeout(() => {
          if (this.label && !this.value) {
            this.selectInternalElement('ui-text').classList.add('text-moved');
          }
        }, 600); // ripple animation is 500 on the ui-item
      });

      this._beforeReady(_ => {
        this._list = this.selectInternalElement('ui-list');
        this._listHolder = this.selectInternalElement('#list-holder');
        this._dummyItem = this.selectInternalElement('#dummy-item');
        this._dummyItem.selectInternalElement('ui-checkbox').style.display = 'none';

        this._items.forEach(item => {
          if (item.isSelected) this.selected = item;
          item.on('click', e => {
            if (!this.multiple) {
              global.setTimeout(() => {
                this.close();
              }, 300);
            }
          });
        });

        if (this.name && !this.selected) this.textContent = null;
        this._listHolder.classList.remove('not-overflowing');

        this._dummyItem.on('click', e => {if (this.attr('tabindex') === null) this.attr('tabindex', '0');
          this.toggle();
          mouseon = this.isOpen;
        });
      });

      if (!this.multiple) this.multiple = false;
      if (!this.isOpen) this.isOpen = false;

      this.on('mouseenter', e => mouseon = true);
      this.on('mouseleave', e => {
        mouseon = false;
        global.setTimeout(() => { if (!mouseon) this.isOpen = false; }, 1000);
      });

      this.on('attribute-change', ({ changed: { now, name } }) => {
        switch (name) {
          case 'selected-index':
            if (this.selected && !this.multiple) {
              this.textContent = this.selected.textContent;
            } else {
              this.textContent = ''; // default
            }
            break;

          case 'is-open':
            let list = this.selectInternalElement('ui-list');
            if (now) {
              let h = global.getComputedStyle(list).height;
              let { top } = this.getBoundingClientRect();
              let windowHeight = document.documentElement.clientHeight;
              let match = h.match(/\d+/);
              if (match) h = +match[0];
              let overflow = h > (windowHeight - top);
              if (overflow) {
                list.classList.add('overflowing-window');
              } else {
                list.classList.add('not-overflowing-window');
              }
              this.classList.add('is-opened');
            } else {
              this.classList.remove('is-opened');
              list.classList.remove('overflowing-window');
              list.classList.remove('not-overflowing-window');
            }
            break;
        }
      });
    }
  }
});
