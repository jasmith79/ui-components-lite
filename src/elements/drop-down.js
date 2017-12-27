import { FormBehavior } from './form.js';
import UIBase from '../utils/ui-component-base.js';
import Styler from '../utils/styler.js';
import Centerer from '../utils/centerer.js';
import Rippler from '../animations/rippler.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';
import { extractType } from '../../node_modules/extracttype/extracttype.js';

const dropDownReflectedAttrs = ['selected-index', 'is-open', 'multiple'];
const itemReflectedAttrs = ['is-selected', 'value'];

const sharedStyles = {
  'margin-top': '10px',
  'margin-bottom': '10px',
  'display': 'block',
};

const itemStyles = {
  'min-height': '20px',
  'background-color': 'inherit',
  'color': 'inherit',
  // 'border': 'none',
  'border': '1px solid purple',
  'border-radius': '0',
  'text-transform': 'capitalize',
  'width': '90%',
  'margin-left': '5%',
  'padding-top': '4px',
  ':focus': {
    'background-color': Styler.secondaryDarkColor,
    'color': Styler.lightTextColor,
  }
};

const dropDownStyles = {
  'height': '40px',
  // 'background-color': Styler.primaryLightColor,
  'color': Styler.darkTextColor,
  'font-size': '16px',
  'max-width': '200px',
};

const openStyles = {
  // 'overflow': 'visible',
  'z-index': 6000,
  '> .dummy-item': {
    'display': 'none !important',
  },
};

const closedStyles = {
  'border-bottom': '1px solid #999',
  // 'overflow': 'hidden',
  ' > .dummy-item': {
    'display': 'block',
  }
};

const itemSlot = document.createElement('slot');
itemSlot.name = 'item-slot';

const Item = (class Item extends mix(HTMLElement).with(UIBase, Rippler) {
  init () {
    super.init();
    this.classList.add('ui-item');
    this.applyStyles(itemStyles, sharedStyles);
  }
}).reflectToAttribute(itemReflectedAttrs);
customElements.define('ui-item', Item);

const DropDown = (class DropDown extends mix(HTMLElement).with(UIBase, FormBehavior) {
  constructor () {
    super();
    this._dummyItem = document.createElement('ui-item');
    this._dummyItem.classList.add('dummy-item');
    this._dummyItem.textContent = '...';
    this._dummyItem.attr('slot', 'item-slot');
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
    this._mouseon = false;
    setTimeout(() => { this.close(); }, 500);
    let selection;
    let type = extractType(value);
    switch (type) {
      case 'Number':
        selection = this.items[value];
        break;

      case 'String':
        selection = this.querySelector(`[value=${value}]`);
        break;
    }

    if (type.match(/HTML[\w]*Element/)) {
      selection = this.items.includes(value) ? value : null;
    }

    this.selectAll('[slot]').forEach(el => {
      el.removeAttribute('slot');
    });

    if (this.multiple) {
      this.selectedIndex = -1;
      if (!Array.isArray(this._selected)) this._selected = [this._selected];
      if (selection && !this._selected.includes(selection)) this._selected.push(selection);

      if (this._selected.length === 1) {
        this._selected[0].attr('slot', 'item-slot');
      } else {
        this._dummyItem.attr('slot', 'item-slot');
      }

      this.items.forEach(item => {
        if (this._selected.includes(item)) {
          item.attr('is-selected', true);
        } else {
          item.att('is-selected', null);
        }
      });
    } else {
      if (!selection) selection = this.items[0];
      this._selected = selection;
      this._selected.attr('slot', 'item-slot');
      this.selectedIndex = this._items.indexOf(selection);
      this.items.forEach(item => {
        if (this._selected === item) {
          item.attr('is-selected', true);
        } else {
          item.attr('is-selected', null);
        }
      });
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

  init () {
    super.init();
    this.applyStyles(dropDownStyles, sharedStyles, closedStyles);
    this._items = this.selectAll('.ui-item');
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(itemSlot.cloneNode(true));
    let val = (this.multiple ?
      this.selectAll('[is-selected]') :
      this.querySelector('[is-selected]')) ||
      this.items[0];

    if (val) {
      this.selected = val;
    } else {
      this.appendChild(this._dummyItem);
      this._dummyItem.attr('slot', 'item-slot');
    }

    this.on('attribute-change', ({ changed: { now, name, was } }) => {
      switch (name) {
        case 'selected-index':
          if (now >= 0) {
            if (now < this.items.length) {
              this.selected = this.items[now];
            } else {
              this.selectedIndex = was;
            }
          }
          break;

        case 'is-open':
          now ?
            this.removeStyles(closedStyles).applyStyles(openStyles) :
            this.removeStyles(openStyles).applyStyles(closedStyles);
          break;

        case 'multiple':
          if (now) {
            this.appendChild(this._dummyItem);
          } else {
            this.removeChild(this._dummyItem);
          }
          break;
      }
    });

    this._mouseon = false;

    this.on('click', e => {
      this._mouseon = true;
      this.open();
    });

    this.on('mouseenter', e => {
      this._mouseon = true;
    })

    this.on('mouseleave', e => {
      this._mouseon = false;
      setTimeout(() => {
        if (!this._mouseon) this.close();
      }, 500);
    });
  }
}).reflectToAttribute(dropDownReflectedAttrs);
customElements.define('ui-drop-down', DropDown);

export {
  Item,
  DropDown,
}