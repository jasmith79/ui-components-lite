import Button from './button.js';
import UIBase from '../utils/ui-component-base.js';
import Styler from '../utils/styler.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';
import { extractType } from '../../node_modules/extracttype/extracttype.js';

const tabStyles = {
  'border-radius': '0%',
  'text-transform': 'capitalize',
  'display': 'inline-block',
  'background-color': 'inherit',
};

const tabsStyles = {
  'display': 'block',
  'height': '55px',
  'background-color': Styler.secondaryDarkColor,
  'width': '100%',
};

const selectedStyles = {
  'height': '55px',
};

const tabReflectedAttrs = [
  'is-selected',
  'value',
];

const tabsReflectedAttrs = [
  'for', // css selector, gets notified of changes
];

const Tab = (class Tab extends Button {
  static get observedAttributes () {
    return [...super.observedAttributes, ...tabReflectedAttrs];
  }

  init () {
    super.init();
    this.classList.add('ui-tab');
    this.applyStyles(tabStyles);
    this.on('click', e => {
      this.isSelected = true;
    });

    this.on('attribute-change', ({ changed: { now, name } }) => {
      switch (name) {
        case 'is-selected':
          if (now) {
            this.dispatchEvent(new CustomEvent('tab-selected'));
          } else {
            this.dispatchEvent(new CustomEvent('tab-deselected'));
          }
          break;
      }
    });
  }
}).reflectToAttribute(tabReflectedAttrs);

const Tabs = (class Tabs extends mix(HTMLElement).with(UIBase) {
  constructor () {
    super();
    this._selected = null;
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
        const tabs = Array.from(this.querySelectorAll('.ui-tab'));
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
          router.route(elem.value);
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
    this.classList.add('ui-tabs');
    this.applyStyles(tabsStyles);
    Array.from(this.querySelectorAll('.ui-tab')).forEach((tab, i, arr) => {
      if (tab.attr('is-selected')) this.selected = tab;
      tab.on('tab-selected', e => {
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
}).reflectToAttribute(tabsReflectedAttrs);

customElements.define('ui-tab', Tab);
customElements.define('ui-tabs', Tabs);

export {
  Tab,
  Tabs,
};
