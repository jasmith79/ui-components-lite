/*
 * list.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * list component for ui-components-lite.
 *
 * NOTE: it is not currently (and may never) be possible to extend built-in elements like <ul>.
 * If it does become possible this can be refactored to support extending <ul> or <ol>.
 */

import Checkbox from './checkbox.js';
import { FormControlBehavior } from './form.js';
import { TooltipMixin } from './tooltip.js';

import Ripples from '../animations/rippler.js';

import Focusable from '../utils/focusable.js';
import { UIBase, defineUIComponent, document } from '../utils/ui-component-base.js';

import extractType from '../../../extracttype/extracttype.js';
import { mix } from '../../../mixwith/src/mixwith.js';

const handlerCache = new WeakMap();
export const ListBehavior = superclass => defineUIComponent({
  name: 'ui-list-behavior',
  reflectedAttributes: ['multiple', 'selected-index'],
  registerElement: false,
  definition: class extends mix(superclass).with(FormControlBehavior) {
    constructor () {
      super();
      this._items = [];
      this._selected = null;
    }

    // Using a closure here because getting the item back out of the Event object is unreliable.
    _itemHandlerFactory (item) {
      let h = handlerCache.get(item);
      if (h) return h;
      let f = e => {
        if (this.multiple === true) {
          if (!item.isSelected && !this.selected.includes(item)) {
            item.isSelected = true;
            this.selected = item; // pushes in setter
          } else if (item.isSelected) {
            item.isSelected = false;
            this._deSelect(item);
          }
        } else {
          if (!item.isSelected && item !== this.selected) {
            item.isSelected = true;
            this.selected = item;
          }
        }

        return;
      };

      handlerCache.set(item, f);
      return f;
    }

    get items () {
      return this.selectAll('.ui-item');
    }

    get value () {
      return this.selected && this.selected.map ?
        this.selected.map(x => x ? x.value : '').join(',') :
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
        selection.attr('aria-selected', true);
        selection.isSelected = true;
        if (this.multiple === true) {
          this._selected.push(selection);
          this.dispatchEvent(new Event('change'));
        } else {
          this._selected = selection;
          this.selectedIndex = this._items.indexOf(selection);
          this._items.forEach(item => {
            if (item !== selection) item.isSelected = false;
            item.attr('aria-selected', false);
          });
        }
      }

      return selection;
    }

    _deSelect (item) {
      if (this.multiple === true) {
        this._selected = this._selected.filter(x => x !== item);
        this.dispatchEvent(new Event('change'));
      }
      return this;
    }

    appendChild (node) {
      let p = node.onReady(el => {
        if (el.matches && el.matches('.ui-item')) {
          el.on('click', this._itemHandlerFactory(el));
          super.appendChild(el);
          this._items.push(el);
          if (el.isSelected) this.selected = el;
        }
      });
      if (this._pendingDOM) this._pendingDOM.push(p);
      return node;
    }

    init () {
      super.init();
      this.on('keydown', e => {
        let el = (() => {
          switch (e.keyCode) {
            case 40:
              return this._items[(this._items.indexOf(this.shadowRoot.activeElement) + 1) % this._items.length];

            case 38:
              return this._items[+(this._items.indexOf(this.shadowRoot.activeElement) - 1)];

            default: return null;
          }
        })();

        if (el) el.focus();
      });

      this.on('attribute-change', ({ changed: { now, name } }) => {
        switch (name) {
          case 'multiple':
            if (now === true) {
              this.selectedIndex = -1;
              this._selected = this._selected ? [this._selected] : [];
              this.attr('aria-multiselectable', true);
            } else {
              this.attr('aria-multiselectable', false);
              this.selected = this.selected == null ? null : this.selected[0];
            }
            break;

          case 'selected-index':
            if (now === -1 || this.multiple) return;
            if (!this._items[now]) {
              console.warn(`Attempted to set invalid index ${now} for element.`);
              this.attr('selected-index', was);
              return;
            }

            if (this._items[now] !== this.selected) this.selected = now;
            break;
        }
      });

      this._beforeReady(_ => {
        this.selectAll('.ui-item').map(item => {
          this._items.push(item);
          if (item.attr('is-selected')) this.selected = item;
          item.on('click enter-key', this._itemHandlerFactory(item));
        });
      });
    }
  }
});

export const Item = (() => {
  const template = document.createElement('template');
  const reflectedAttributes = ['is-selected', 'value', 'tooltip'];
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

      .ui-checkbox {
        display: none;
        height: 18px;
        width: 18px;
        float: left;
      }

      .ui-checkbox::before {
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
    reflectedAttributes,
    definition: class Item extends mix(UIBase).with(Ripples, Focusable, TooltipMixin) {
      constructor () {
        super();
        this._checkbox = null;
        this._content = null;
      }

      init () {
        super.init();
        this.attr('role', 'listoption');
        this._beforeReady(_ => {
          this._checkbox = this.selectInternalElement('ui-checkbox');
          this._content = this.selectInternalElement('#content');
          if (!this.value || this.value.toString() === 'true') this.value = this.textContent;
          if (!this.isSelected) this.isSelected = false;
        });

        this.on('attribute-change', ({ changed: { now, name } }) => {
          switch (name) {
            case 'is-selected':
              this.onReady(_ => {
                if (now) {
                  this.classList.add('selected');
                  this._checkbox.checked = true;
                  this.dispatchEvent(new CustomEvent('component-selected'));
                } else {
                  this.classList.remove('selected');
                  this._checkbox.checked = false;
                  this.dispatchEvent(new CustomEvent('component-deselected'));
                }
              });
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
    definition: class List extends mix(UIBase).with(ListBehavior) {
      init () {
        super.init();
        this.attr('role', 'list');
      }
    }
  });
})();
