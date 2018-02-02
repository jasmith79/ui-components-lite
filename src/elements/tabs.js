/*
 * tabs.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * ltabscomponent for ui-components-lite.
 */

import { Item, ListBehavior } from './list.js';

import { UIBase, defineUIComponent, document } from '../utils/ui-component-base.js';

import extractType from '../../node_modules/extracttype/extracttype.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

export const Tab = (() => {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      #content {
        position: relative;
        top: 16px;
      }

      :host {
        display: inline-block;
        background-color: inherit;
        height: 49px;
        width: 120px;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-transform: capitalize;
        border-radius: 5%;
        margin: 5px;
        padding: 0;
        text-align: center;
      }

      :host(:hover) {
        color: var(--ui-theme-light-text-color, #fff);
      }

      :host([is-selected="true"]) {
        box-shadow: 0px 0px 10px -1px var(--ui-theme-light-text-color, #fff);
      }

      :host-context(.tabs-centered) {
        left: -30px;
      }
    </style>
  `;

  return defineUIComponent({
    name: 'ui-tab',
    template,
    definition: class Tab extends Item {
      init () {
        super.init();
        this.attr('role', 'tab');
        const index = this.attr('tabindex');
        if (index === null || index < 0) this.attr('tabindex', '0');
      }
    }
  });
})();

export const Tabs = (() => {
  const reflectedAttrs = [
    'for', // css selector, gets notified of changes
  ];

  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      :host {
        display: block;
        height: 55px;
        background-color: var(--ui-theme-primary-dark-color, blue);
        width: 100%;
      }

      :host ::slotted(.ui-tab:hover) {
        text-shadow: 1px 1px 6px #fff;
      }
    </style>
    <slot></slot>
  `;

  return defineUIComponent({
    name: 'ui-tabs',
    template,
    reflectedAttrs,
    definition: class Tabs extends mix(UIBase).with(ListBehavior) {
      constructor () {
        super();
        this._for = null;
      }

      appendChild (node) {
        if (node.matches && node.matches('.ui-tab')) {
          super.appendChild(node);
        }
      }

      init () {
        super.init();
        this.attr('role', 'tabpanel');
        this.on('attribute-change', ({ changed: { now, name } }) => {
          switch (name) {
            case 'for':
              if (now) {
                this._for = now;
                const elem = document.querySelector(this._for);
                if (elem) {
                  const method = elem.on ? 'on' : 'addEventListener';
                  elem[method]('change', ({ value }) => {
                    const matched = this._items.reduce((acc, item) => {
                      if (acc) return acc;
                      if (item.value === value) return item;
                      return acc;
                    }, null);

                    if (matched && matched !== this.selected) {
                      this.selected = value;
                    } else {
                      this.selected = null;
                    }
                  });
                }
              } else {
                this._for = null;
              }
              break;

            case 'selected-index':
              if (now > -1 && this._for) {
                document.querySelector(this._for).route(this.selected.value);
              }
              break;
          }
        });
      }
    }
  });
})();
