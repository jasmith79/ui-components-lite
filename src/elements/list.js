import UIBase from '../utils/ui-component-base.js';
import Ripples from '../animations/rippler.js';
import Checkbox from './checkbox.js';
import { FormBehavior } from './form.js';
import { defineUIComponent, document } from '../utils/dom.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';
import extractType from '../../node_modules/extracttype/extracttype.js';

export const ListBehavior = superclass => defineUIComponent({
  name: 'ui-list-behavior',
  reflectedAttrs: ['multiple', 'selected-index'],
  registerElement: false,
  definition: class extends mix(superclass).with(FormBehavior) {
    constructor () {
      super();
      this._items = null;
      this._selected = null;
    }

    get value () {
      return this.selected && this.selected.map ?
        this.selected.map(x => x.value).join(',') :
        (this.selected && this.selected.value) || null;
    }

    set value (value) {
      this.selected = value;
    }

    get selected () {
      return this._selected;
    }

    set selected (value) {
      if (value === null) {
        this._selected = null;
        return;
      }

      const type = extractType(value);
      let selection;
      switch (type) {
        case 'Number':
          selection = this._items[value];
          break;

        case 'String':
          selection = this.querySelector(`[value="${value}"]`);
          if (!selection) selection = this._items.filter(x => x.textContent === value)[0];
          break;
      }

      if (type.match(/HTML\w*Element/) && this._items.includes(value)) selection = value;
      if (selection) {
        selection.isSelected = true;
        if (this.multiple) {
          this.selectedIndex = -1;
          this._selected.push(selection);
        } else {
          this.selectedIndex = this._items.indexOf(selection);
          this._selected = selection;
          this._items.forEach(item => {
            if (item !== selection) item.isSelected = false;
          });
        }
        const evt = new Event('change', { bubbles: true });
        evt.selection = this._selected;
        evt.value = this.value;
        this.dispatchEvent(evt);
      }

      return selection;
    }

    appendChild (node) {
      if (node && node.matches && node.matches('.ui-item')) {
        node.on('click', e => {
          this.selected = node;
          node.isSelected = true;
        });
        super.appendChild(node);
        this._items.push(node);
      } // else no-op
      return node;
    }

    init () {
      super.init();
      this._items = [
        ...this.selectAll('.ui-item'),
        ...this.shadowRoot.querySelectorAll('.ui-item')
      ];

      this._items.forEach(item => {
        if (item.isSelected) this.selected = item;
        item.on('click', e => {
          if (this.multiple) {
            item.isSelected = !item.isSelected;
            if (item.isSelected) {
              this.selected = item;
            } else {
              this._selected = this._selected.filter(x => x !== item);
            }
          } else {
            if (item !== this.selected) this.selected = item;
          }
        });
      });

      this.on('attribute-change', ({ changed: { now, name } }) => {
        switch (name) {
          case 'multiple':
            if (now) {
              this.selectedIndex = -1;
              this._selected = [this.selected];
            } else {
              this.selected = this.selected == null ? null : this.selected[0];
            }
            break;

          case 'selected-index':
            if (now === -1 || this.multiple) return;
            if (!this._items[now]) {
              console.warn(`Attempted to set invalid index ${now} for ui-list.`);
              this.attr('selected-index', was);
              return;
            }

            if (this._items[now] !== this.selected) this.selected = now;
            break;
        }
      });
    }
  }
});

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
        border-radius: 0;
        text-transform: capitalize;
        width: 90%;
        margin-left: 5%;
        padding-top: 4px;
      }

      :host(:hover) {
        color: var(--ui-theme-primary-dark-color, #999);
      }

      :host(.selected) {
        border-bottom: 1px solid var(--ui-theme-primary-dark-color, rgb(0, 139, 163));
      }

      ui-checkbox {
        display: none;
        height: 18px;
        width: 18px;
        float: left;
      }

      ui-checkbox::before {
        top: 2px;
        height: 9px;
        left: 5px;
      }

      :host-context([multiple="true"]) {
        border-bottom: none;
      }

      :host-context([multiple="true"]) ui-checkbox {
        display: inline-block;
      }

      :host-context([multiple="true"]) #content {
        position: relative;
        left: -10px; /* offsets checkbox */
      }
    </style>
    <ui-checkbox></ui-checkbox>
    <span id="content"><slot></slot></span>
  `;

  return defineUIComponent({
    name: 'ui-item',
    template,
    reflectedAttrs,
    definition: class Item extends mix(UIBase).with(Ripples) {
      constructor () {
        super();
        this._checkbox = null;
        this._content = null;
      }

      init () {
        super.init();
        this._checkbox = this.shadowRoot.querySelector('ui-checkbox');
        this._content = this.shadowRoot.querySelector('#content');
        if (!this.value || this.value.toString() === 'true') this.value = this.textContent;

        this.on('attribute-change', ({ changed: { now, name } }) => {
          switch (name) {
            case 'is-selected':
              if (now) {
                this.classList.add('selected');
                this._checkbox.checked = true;
                this.dispatchEvent(new CustomEvent('component-selected'));
              } else {
                this.classList.remove('selected');
                this._checkbox.checked = false;
                this.dispatchEvent(new CustomEvent('component-deselected'));
              }
              break;
          }
        });
      }
    }
  });
})();

export const List = (() => {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      :host {
        display: block;
        text-align: center;
        margin: 5px;
      }
    </style>
    <slot></slot>
  `;

  return defineUIComponent({
    name: 'ui-list',
    template,
    definition: class List extends mix(UIBase).with(ListBehavior) {}
  });
})();
