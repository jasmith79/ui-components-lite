import UIBase from '../utils/ui-component-base.js';
import Centerer from '../utils/centerer.js';
import Ripples from '../animations/rippler.js';
import Easer from '../animations/easer.js';
import { FormBehavior } from './form.js';
import { defineUIComponent, document } from '../utils/dom.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';
import { extractType } from '../../node_modules/extracttype/extracttype.js';

import './text.js';

export const Item = (() => {
  const template = document.createElement('template');
  const reflectedAttrs = ['is-selected', 'value'];
  template.innerHTML = `
    <style>
      :host {
        --ui-theme-ripple-color: var(--ui-theme-primary-dark-color, rgb(0, 139, 163));
        display: block;
        margin-top: 10px;
        margin-bottom: 10px;
        min-height: 20px;
        background-color: inherit;
        color: inherit;
        border-bottom: 1px solid #CCC;
        border-radius: 0;
        text-transform: capitalize;
        width: 90%;
        margin-left: 5%;
        padding-top: 4px;
      }

      :host(:hover) {
        color: var(--ui-theme-primary-dark-color, #999);
      }
    </style>
  `;

  return defineUIComponent({
    name: 'ui-item',
    template,
    reflectedAttrs,
    definition: class Item extends mix(UIBase).with(Ripples) {}
  });
})();

const ItemHolder = (() => {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      :host {
        display: block;
        top: -300px;
        position: relative;
        overflow-y: scroll;
        width: 107.5%;
        max-height: 190px;
        background-color: white;
        z-index: 4000;
      }
    </style>
  `;

  return defineUIComponent({
    name: 'ui-item-holder',
    template,
    definition: class ItemHolder extends mix(UIBase).with(Easer) {
      constructor () {
        super();
        this._animator = null;
      }

      in () {
        return this._animator.easeIn();
      }

      out () {
        return this._animator.easeOut();
      }

      init () {
        super.init();
        this._animator = this.defineSlideAnimation({
          direction: 'down',
          distance: '305px',
          timing: 600,
          fn: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        });
      }
    }
  });
})();

export const DropDown = (() => {
  const template = document.createElement('template');
  const reflectedAttrs = ['selected-index', 'is-open', 'multiple', 'placeholder-text'];
  template.innerHTML = `
    <style>
      .holder-holder {
        overflow: hidden;
        position: relative;
        top: 5px;
      }

      .holder-shadow {
        box-shadow: 5px 6px 10px -5px #999;
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
      }

      .up {
        transform: rotate(-135deg);
      }

      .down {
        transform: rotate(45deg);
      }

      .dummy-item.dummy-item {
        z-index: 5000;
        box-shadow: none;
        border: none;
      }

      :host {
        display: block;
        margin-top: 10px;
        margin-bottom: 10px;
        height: 40px;
        font-size: 16px;
        max-width: 200px;
        border-bottom: 1px solid #999;
        position: relative;
        background-color: white;
        z-index: 4000;
      }

      :host(:hover) {
        border-color: var(--ui-theme-primary-dark-color, #555);
      }

      :host([is-open="false"]){
        overflow: hidden;
        z-index: 3000;
      }

      :host([is-open="true"]) {
        overflow: visible;
      }
    </style>
    <ui-item id="dummy-item">
      <ui-text view-text="{{placeholder-text}}">...</ui-text>
      <div class="arrow down"></div>
    </ui-item>
    <div class="holder-holder">
      <ui-item-holder>
        <slot name="item-slot"></slot>
      </ui-item-holder>
    </div>
  `;

  return defineUIComponent({
    name: 'ui-drop-down',
    template,
    reflectedAttrs,
    definition: class DropDown extends mix(UIBase).with(FormBehavior) {
      constructor () {
        super();
        this._dummyItem = null;
        this._selected = null;
        this._items = [];
      }

      get items () {
        return this._items;
      }

      get selected () {
        return this._selected;
      }

      set selected (value) {
        const type = extractType(value);
        let selection;
        switch (type) {
          case 'Number':
            selection = this._items[value];
            break;

          case 'String':
            selection = this.querySelector(`[value="${value}"]`);
            break;
        }

        if (type.match(/HTML\w*Element/) && this._items.includes(value)) selection = value;
        if (selection) {
          this.selectedIndex = this._items.indexOf(selection);
          this._selected = selection;
          this._dummyText = selection.textContent
          this._dummyItem.querySelector('span').textContent = this._dummyText;
          setTimeout(() => { this.isOpen = false; }, 300);
        }

        return selection;
      }

      open () {
        this.isOpen = true;
        return this;
      }

      close () {
        this.isOpen = false;
        return this;
      }

      appendChild (node) {
        if (node && node.matches && node.matches('.ui-item')) {
          node.on('click', e => this.selected = node);
          super.appendChild(node);
        } // else no-op
        return node;
      }

      init () {
        super.init();
        this._dummyItem = this.querySelector('#dummy-item');
        this._dummyItem.watchAttribute('value', now => this._dummyItem.textContent = now);

        this._arrow = this._dummyItem.querySelector('.arrow');

        this._items = this.selectAll('.ui-item');
        this._items.forEach(el => el.on('click', this.selected = el));
        if (!this.placeholderText) this.placeholderText = '...';

        this.on('attribute-change', ({ changed: { name, now, was } }) => {
          switch (name) {
            case 'selected-index':
              if (!this._items[now]) {
                console.warn(`Attempted to set invalid index ${now} for ui-drop-down.`);
                this.attr('selected-index', was);
                return;
              }

              if (this._items[now] !== this.selected) this.selected = now;
              break;

            case 'is-open':
            if (now) {
              this._arrow.classList.remove('down');
              this._arrow.classList.add('up');
              this.items.forEach(el => el.attr('slot', 'item-slot'));
              this._dummyItem.style.top = '10px';
              this._itemHolder.in().then(_ => {
                this._holderHolder.classList.add('holder-shadow');
              });
            } else {
              this._holderHolder.classList.remove('holder-shadow');
              this._itemHolder.out().then(_ => {
                this.items.forEach(el => el.attr('slot', null));
                this._dummyItem.style.top = '';
                this._arrow.classList.remove('up');
                this._arrow.classList.add('down');
              });
            }
            break;
          }
        });

        let mouseon = false;

        this._dummyItem.on('click', e => {
          this.isOpen = !this.isOpen;
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
})();
