import UIBase from '../utils/ui-component-base.js';
import Centerer from '../utils/centerer.js';
import Ripples from '../animations/rippler.js';
import Easer from '../animations/easer.js';
import { FormBehavior } from './form.js';
import { defineUIComponent, document } from '../utils/dom.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';
import { extractType } from '../../node_modules/extracttype/extracttype.js';

import './text.js';
import './list.js';

const reflectedAttrs = ['selected-index', 'is-open', 'multiple', 'placeholder-text'];
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
      transform: scale(1) translateY(0px);
    }

    :host([is-open="false"]) ui-list {
      transform: scale(0) translateY(-200px);
    }

    :host([is-open="true"]) #list-holder {
      border-color: var(--ui-theme-primary-dark-color, blue);
    }

    :host([is-open="false"]) slot::slotted(.ui-item) {
      display: none;
    }

  </style>
  <ui-item id="dummy-item" class="default">
    <span id="dummy-item-content">...</span>
    <div class="arrow down"></div>
  </ui-item>
  <div id="list-holder" class="not-overflowing">
    <ui-list multiple="{{multiple}}" class="initial-list">
      <slot></slot>
    </ui-list>
  </div>
`;

export default defineUIComponent({
  name: 'ui-drop-down',
  reflectedAttrs,
  template,
  definition: class DropDown extends mix(UIBase).with(FormBehavior) {
    constructor () {
      super();
      this._list = null;
      this._listHolder = null;
      this._dummyItem = null;
      this._selected = null;
      this._items = null;
    }

    get items () {
      return this._items;
    }

    get selected () {
      return this._selected;
    }

    set selected (val) {
      this._selected = val;
      if (this.selected && !this.multiple) {
        this.textContent = this.selected.value;
        this._dummyItem.classList.remove('default');
      } else {
        this.textContent = '...';
        this._dummyItem.classList.add('default');
      }
    }

    get textContent () {
      return (this._dummyItem && this._dummyItem.textContent) || '';
    }

    set textContent (val) {
      this._dummyItem.querySelector('#dummy-item-content').textContent = val;
      return this;
    }

    appendChild (node) {
      if (node.matches && node.matches('.ui-item')) {
        super.appendChild(node);
        this._items.push(node);
        node.on('click', e => {
          this.selected = node;
          node.isSelected = true;
          setTimeout(() => {
            this.close();
          }, 300);
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
      super.init();
      if (!this.multiple) this.multiple = false;
      if (!this.isOpen) this.isOpen = false;

      this._items = this.selectAll('.ui-item');
      this._list = this.shadowRoot.querySelector('ui-list');
      this._listHolder = this.shadowRoot.querySelector('#list-holder');
      this._dummyItem = this.shadowRoot.querySelector('#dummy-item');

      this._dummyItem._checkbox.style.display = 'none';
      this._list.classList.remove('initial-list');
      this._list.on('change', ({ selection }) => {
        this.selected = selection
      });

      this._items.forEach(item => {
        item.on('click', e => {
          this.selected = item;
          item.isSelected = true;
          if (!this.multiple) {
            setTimeout(() => {
              this.close();
            }, 300);
          }
        });
      });

      this._listHolder.classList.remove('not-overflowing');

      let mouseon = false;

      this._dummyItem.on('click', e => {
        this.toggle();
        mouseon = this.isOpen;
      });

      this.on('mouseenter', e => mouseon = true);
      this.on('mouseleave', e => {
        mouseon = false;
        setTimeout(() => { if (!mouseon) this.isOpen = false; }, 1000);
      });
    }
  }
});
