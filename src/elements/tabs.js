import Button from './button.js';
import UIBase from '../utils/ui-component-base.js';
import { defineUIComponent, document } from '../utils/dom.js';
import extractType from '../../node_modules/extracttype/extracttype.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

export const Tab = (() => {
  const reflectedAttrs = [
    'is-selected',
    'data-value',
  ];

  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      :host {
        border-radius: 0%;
        text-transform: capitalize;
        display: inline-block;
        background-color: inherit;
      }

      :host([is-selected]) {
        height: 55px;
      }

      :host-context(.tabs-centered) {
        left: -30px;
      }
    </style>
  `;

  return defineUIComponent({
    name: 'ui-tab',
    template,
    reflectedAttrs,
    definition: class Tab extends Button {
      init () {
        super.init();
        this.on('click', e => {
          this.isSelected = true;
        });

        this.watchAttribute(this, 'is-selected', now => {
          if (now) {
            this.dispatchEvent(new CustomEvent('component-selected'));
          } else {
            this.dispatchEvent(new CustomEvent('component-deselected'));
          }
        });
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
    </style>
    <slot></slot>
  `;

  return defineUIComponent({
    name: 'ui-tabs',
    template,
    reflectedAttrs,
    definition: class Tabs extends UIBase {
      constructor () {
        super();
        this._selected = null;
      }

      appendChild (node) {
        if (node.matches && node.matches('.ui-tab')) {
          super.appendChild(node);
        }
      }

      get selected () {
        return this._selected;
      }

      set selected (val) {
        let index, elem;
        switch (extractType(val)) {
          case 'Number':
            index = val;
            // fallthrough

          default:
            const tabs = this.selectAll('.ui-tab');
            if (index) {
              elem = tabs[index];
              break;
            }
            if (tabs.includes(val)) elem = val;
        }

        if (elem) {
          this._selected = elem;
          const evt = new Event('change');
          evt.value = elem;
          this.dispatchEvent(evt);
          let notify = this.attr('for');
          if (notify) {
            let router = document.querySelector(notify);
            if (router && extractType(router.route) === 'Function') {
              router.route(elem.dataValue);
            }
          }
          return elem;
        } else {
          console.warn(`Could not match selector ${val} to ui-tabs contents.`);
          return null;
        }
      }

      init () {
        super.init();
        this.selectAll('.ui-tab').forEach((tab, i, arr) => {
          if (tab.attr('is-selected')) this.selected = tab;
          tab.on('component-selected', e => {
            arr.forEach((t, j) => {
              if (i !== j) {
                t.isSelected = false;
              } else {
                this.selected = t;
              }
            });
          });
        });
      }
    }
  });
})();
