import Floats from '../utils/float.js';
import UIBase from '../utils/ui-component-base.js';
import Styler from '../utils/styler.js';
import processHTMLAttr from '../utils/attribute-analyzer.js';
import { centeredStyles, preserve3dStyles } from '../utils/centerer.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const ELEMENT_NAME = 'ui-toolbar';

const titleStyles = Object.assign({
  'position': 'relative',
  'margin-left': 'auto',
  'margin-right': 'auto',
  'max-width': '300px',
  'text-align': 'center',
  'text-transform': 'capitalize',
  'overflow': 'hidden',
}, centeredStyles);

const titleSelector = ' > [slot="title"]';
const leftButtonSlotSelector = ' > [slot="left-button-slot"]';
const rightButtonSlotSelector = ' > [slot="right-button-slot"]';
const tabSelector = ' > [slot="tab-slot"]';

const styles = {
  'position': 'absolute',
  'top': '0',
  'left': '0',
  'width': '100vw',
  'background-color': Styler.primaryDarkColor,
  'color': Styler.lightTextColor,

  [titleSelector]: titleStyles,

  [leftButtonSlotSelector]: {
    position: 'relative',
    top: '10px',
    left: '10px',
    float: 'left',
  },

  [rightButtonSlotSelector]: {
    position: 'relative',
    top: '10px',
    right: '10px',
    float: 'right',
  },

  [tabSelector]: {
    position: 'relative',
    width: '100vw',
  }
};

const placeHolderStyles = {
  'width': '100vw',
  'background': 'transparent',
  'position': 'relative',
  'top': '-8px',
  'left': '-8px',
  'display': 'block',
};

const tallHeight = {
  height: '192px',
};

const shortHeight = {
  'height': '70px',
};

const shortWithTabs = {
  'height': '125px',
};

const shortStyles = {
  [titleSelector]: {
    'text-overflow': 'ellipsis',
    'overflow': 'hidden',
    'white-space': 'nowrap',
    'font-size': '22px',
  },
  [leftButtonSlotSelector]: {
    top: '-16px',
  },
  [rightButtonSlotSelector]: {
    top: '-16px',
    right: '30px',
  },
  [tabSelector]: {
    top: '44px',
    'text-align': 'center',
    ' > .ui-tab': {
      'left': '-25px',
    },
  },
};

const tallStyles = {
  [titleSelector]: {
    'font-size': '40px',
  },
  [leftButtonSlotSelector]: {
    top: '-35px',
    left: '10px',
  },
  [rightButtonSlotSelector]: {
    top: '-35px',
    right: '30px',
  },
  [tabSelector]: {
    top: '94px',
    'background-color': 'inherit',
  },
};

const titleSlot = document.createElement('slot');
titleSlot.name = 'title';

const leftButtonSlot = document.createElement('slot');
leftButtonSlot.name = 'left-button-slot';

const rightButtonSlot = document.createElement('slot');
rightButtonSlot.name = 'right-button-slot';

const tabSlot = document.createElement('slot');
tabSlot.name = 'tab-slot';

const fragment = document.createDocumentFragment();
fragment.appendChild(titleSlot);
fragment.appendChild(leftButtonSlot);
fragment.appendChild(rightButtonSlot);
fragment.appendChild(tabSlot);

const reflectedAttrs = [
  'is-tall',
];

const PlaceHolder = class ToolbarBacking extends mix(HTMLElement).with(UIBase) {
  init () {
    super.init();
    this.classList.add('ui-toolbar-placeholder');
    this.applyStyles(placeHolderStyles);
    this._tabs = null;
  }
};

const Toolbar = (class Toolbar extends mix(HTMLElement).with(UIBase, Floats) {
  static get observedAttributes () {
    return [...super.observedAttributes, ...reflectedAttrs];
  }

  get componentName () {
    return ELEMENT_NAME;
  }

  init () {
    super.init();
    this.classList.add(ELEMENT_NAME);
    this.applyStyles(styles, preserve3dStyles);
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(fragment.cloneNode(true));
    this.shadowRoot.querySelector('[name="tab-slot"]').addEventListener('slotchange', e => {
      this._tabs = this.querySelector('[slot="tab-slot"]');
    });

    this._backing = document.createElement('ui-toolbar-placeholder');
    document.body.insertBefore(this._backing, document.body.firstChild);

    if (!this.isTall) {
      this.applyStyles(shortStyles, shortHeight);
      this._backing.applyStyles(shortHeight);
    }

    this.watchAttribute(this, 'is-tall', now => {
      if (now) {
        this.removeStyles(shortStyles, shortHeight).applyStyles(tallStyles, tallHeight);
        this._backing.removeStyles(shortHeight, shortWithTabs).applyStyles(tallHeight);
      } else {
        this.removeStyles(tallStyles, tallHeight).applyStyles(shortStyles, shortHeight);
        this._backing.removeStyles(tallHeight).applyStyles(this._tabs ? shortWithTabs : shortHeight);
      }
    });
  }

  applyTitle (text) {
    this._titleElem.textContent = text;
  }
}).reflectToAttribute(reflectedAttrs);

export default Toolbar;
customElements.define('ui-toolbar-placeholder', PlaceHolder);
customElements.define('ui-toolbar', Toolbar);
