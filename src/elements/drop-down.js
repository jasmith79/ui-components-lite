import { FormBehavior } from './form.js';
import UIBase from '../utils/ui-component-base.js';
import Styler from '../utils/styler.js';
import Centerer from '../utils/centerer.js';
import Rippler from '../animations/rippler.js';
import Easer from '../animations/easer.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';
import { extractType } from '../../node_modules/extracttype/extracttype.js';

const dropDownReflectedAttrs = ['selected-index', 'is-open', 'multiple', 'placeholder-text'];
const itemReflectedAttrs = ['is-selected', 'value'];

const holderHolderStyles = document.createElement('style');
holderHolderStyles.innerHTML = `
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
`;

const sharedStyles = {
  'margin-top': '10px',
  'margin-bottom': '10px',
  'display': 'block',
};

const itemHolderStyles = {
  'display': 'block',
  'top': '-300px',
  'position': 'relative',
  'overflow-y': 'scroll',
  'width': '107.5%',
  'max-height': '190px',
  'background-color': 'white',
  'z-index': '4000',
};

const itemStyles = {
  'min-height': '20px',
  'background-color': 'inherit',
  'color': 'inherit',
  'border-bottom': '1px solid #CCC',
  'border-radius': '0',
  'text-transform': 'capitalize',
  'width': '90%',
  'margin-left': '5%',
  'padding-top': '4px',
  ':hover': {
    'color': Styler.primaryDarkColor,
  },
};

const dropDownStyles = {
  'height': '40px',
  'color': Styler.darkTextColor,
  'font-size': '16px',
  'max-width': '200px',
  'border-bottom': '1px solid #999',
  'position': 'relative',
  'background-color': 'white',
  'z-index': '4000',
};

const openStyles = {
  'overflow': 'visible',
};

const closedStyles = {
  'overflow': 'hidden',
  'z-index': '3000',
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

const ItemHolder = class ItemHolder extends mix(HTMLElement).with(UIBase, Easer) {
  init () {
    super.init();
    this._animator = this.defineSlideAnimation({
      direction: 'down',
      distance: '305px',
      timing: 600,
      fn: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
    });
    this.applyStyles(itemHolderStyles);
  }

  in () {
    return this._animator.easeIn();
  }

  out () {
    return this._animator.easeOut();
  }
};

customElements.define('ui-item-holder', ItemHolder);

const DropDown = (class DropDown extends mix(HTMLElement).with(UIBase, FormBehavior) {
  constructor () {
    super();
    this._dummyItem = document.createElement('ui-item');
    this._dummyItem.classList.add('dummy-item');
    this._dummyItem.appendChild(document.createElement('span'));
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

  init () {
    super.init();
    // this._dummyItem.applyStyles(dummyItemStyles);
    this.applyStyles(dropDownStyles, sharedStyles, closedStyles);
    this._items = this.selectAll('.ui-item');
    this._items.forEach(el => {
      el.rippleColor = 'rgb(0, 139, 163)';
      el.on('click', e => this.selected = el);
    });
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(holderHolderStyles.cloneNode(true));
    this.shadowRoot.appendChild(this._dummyItem);
    this._dummyText = this.placeholderText || '...';

    this._arrow = document.createElement('div');
    this._arrow.classList.add('arrow', 'down');
    // this._arrow.textContent = '↓';
    this._dummyItem.querySelector('span').textContent = this._dummyText;
    this._dummyItem.appendChild(this._arrow);

    this._holderHolder = document.createElement('div');
    this._holderHolder.classList.add('holder-holder');
    this._itemHolder = document.createElement('ui-item-holder');
    this._itemHolder.appendChild(itemSlot.cloneNode(true));
    this._holderHolder.appendChild(this._itemHolder);
    this.shadowRoot.appendChild(this._holderHolder);

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

        case 'placeholder-text':
          this._dummyText = now || '...';
          break;

        case 'is-open':
          if (now) {
            this._arrow.classList.remove('down');
            this._arrow.classList.add('up');
            this.items.forEach(el => el.attr('slot', 'item-slot'));

            this.removeStyles(closedStyles).applyStyles(openStyles);
            this._dummyItem.style.top = '10px';
            this._itemHolder.in().then(_ => {
              this._holderHolder.classList.add('holder-shadow');
            });
          } else {
            this._holderHolder.classList.remove('holder-shadow');
            this._itemHolder.out().then(_ => {
              this.items.forEach(el => el.attr('slot', null));
              this.removeStyles(openStyles).applyStyles(closedStyles);
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
}).reflectToAttribute(dropDownReflectedAttrs);
customElements.define('ui-drop-down', DropDown);
// const DropDown = (class DropDown extends mix(HTMLElement).with(UIBase, FormBehavior) {
//   constructor () {
//     super();
//     this._dummyItem = document.createElement('ui-item');
//     this._dummyItem.classList.add('dummy-item');
//     this._dummyItem.textContent = '...';
//     this._dummyItem.attr('slot', 'item-slot');
//     this._selected = null;
//     this._items = [];
//   }
//
//   static get observedAttributes () {
//     return [...super.observedAttributes, ...dropDownReflectedAttrs];
//   }
//
//   get items () {
//     return this._items;
//   }
//
//   get selected () {
//     return this._selected;
//   }
//
//   set selected (value) {
//     this._mouseon = false;
//     setTimeout(() => { this.close(); }, 500);
//     let selection;
//     let type = extractType(value);
//     switch (type) {
//       case 'Number':
//         selection = this.items[value];
//         break;
//
//       case 'String':
//         selection = this.querySelector(`[value=${value}]`);
//         break;
//     }
//
//     if (type.match(/HTML[\w]*Element/)) {
//       selection = this.items.includes(value) ? value : null;
//     }
//
//     this.selectAll('[slot]').forEach(el => {
//       el.removeAttribute('slot');
//     });
//
//     if (this.multiple) {
//       this.selectedIndex = -1;
//       if (!Array.isArray(this._selected)) this._selected = [this._selected];
//       if (selection && !this._selected.includes(selection)) this._selected.push(selection);
//
//       if (this._selected.length === 1) {
//         this._selected[0].attr('slot', 'item-slot');
//       } else {
//         this._dummyItem.attr('slot', 'item-slot');
//       }
//
//       this.items.forEach(item => {
//         if (this._selected.includes(item)) {
//           item.attr('is-selected', true);
//         } else {
//           item.att('is-selected', null);
//         }
//       });
//     } else {
//       if (!selection) selection = this.items[0];
//       this._selected = selection;
//       this._selected.attr('slot', 'item-slot');
//       this.selectedIndex = this._items.indexOf(selection);
//       this.items.forEach(item => {
//         if (this._selected === item) {
//           item.attr('is-selected', true);
//         } else {
//           item.attr('is-selected', null);
//         }
//       });
//     }
//
//     return selection;
//   }
//
//   open () {
//     this.isOpen = true;
//     return this;
//   }
//
//   close () {
//     this.isOpen = false;
//     return this;
//   }
//
//   init () {
//     super.init();
//     this.applyStyles(dropDownStyles, sharedStyles, closedStyles);
//     this._items = this.selectAll('.ui-item');
//     this.attachShadow({ mode: 'open' });
//     this.shadowRoot.appendChild(itemSlot.cloneNode(true));
//     let val = (this.multiple ?
//       this.selectAll('[is-selected]') :
//       this.querySelector('[is-selected]')) ||
//       this.items[0];
//
//     if (val) {
//       this.selected = val;
//     } else {
//       this.appendChild(this._dummyItem);
//       this._dummyItem.attr('slot', 'item-slot');
//     }
//
//     this.on('attribute-change', ({ changed: { now, name, was } }) => {
//       switch (name) {
//         case 'selected-index':
//           if (now >= 0) {
//             if (now < this.items.length) {
//               this.selected = this.items[now];
//             } else {
//               this.selectedIndex = was;
//             }
//           }
//           break;
//
//         case 'is-open':
//           if (now) {
//             this.removeStyles(closedStyles).applyStyles(openStyles);
//             this.items.forEach(el => el.attr('slot', 'item-slot'));
//           } else {
//             this.removeStyles(openStyles).applyStyles(closedStyles);
//             this.items.forEach(el => {
//               if (!el.isSelected) el.attr('slot', null);
//             });
//           }
//           break;
//
//         case 'multiple':
//           if (now) {
//             this.appendChild(this._dummyItem);
//           } else {
//             this.removeChild(this._dummyItem);
//           }
//           break;
//       }
//     });
//
//     this._mouseon = false;
//
//     this.on('click', e => {
//       this._mouseon = true;
//       this.open();
//     });
//
//     this.on('mouseenter', e => {
//       this._mouseon = true;
//     })
//
//     this.on('mouseleave', e => {
//       this._mouseon = false;
//       setTimeout(() => {
//         if (!this._mouseon) this.close();
//       }, 500);
//     });
//   }
// }).reflectToAttribute(dropDownReflectedAttrs);
// customElements.define('ui-drop-down', DropDown);

export {
  Item,
  DropDown,
}
