import Floats from '../utils/float.js';
import UIBase from '../utils/ui-component-base.js';
import Styler from '../utils/styler.js';
import processHTMLAttr from '../utils/attribute-analyzer.js';
import { centeredStyles, preserve3dStyles } from '../utils/centerer.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const styles = {
  'position': 'absolute',
  'top': '0',
  'left': '0',
  'width': '100vw',
  'height': '70px',
  'background-color': '#079af1',
  'color': 'white',
};

const tallStyles = {

};

const [titleStyles, titleStyleElem] = Styler.generateStyles(Object.assign({
  'position': 'relative',
  'margin-left': 'auto',
  'margin-right': 'auto',
  'max-width': '300px',
  'text-align': 'center',
  'text-transform': 'capitalize',
  'overflow': 'hidden',
}, centeredStyles));
document.head.appendChild(titleStyleElem);

const titleSelector = ` > .${titleStyles}`;
const shortStyles = {
  [titleSelector]: {
    'text-overflow': 'ellipsis',
    'overflow': 'hidden',
    'white-space': 'nowrap',
  }
};

const titleSlot = document.createElement('slot');
titleSlot.name = 'title';

const leftButtonSlot = document.createElement('slot');
const rightButtonSlot = document.createElement('slot');
const tabSlot = document.createElement('slot');
tabSlot.name = 'tab-slot';

const reflectedAttrs = [
  'is-tall',
];

const Toolbar = (class Toolbar extends mix(HTMLElement).with(UIBase, Floats) {
  static get observedAttributes () {
    return [...super.observedAttributes, ...reflectedAttrs];
  }
  
  init () {
    super.init();
    this.applyStyles(styles, preserve3dStyles);
    Array.from(this.children).forEach(child => {
      if (processHTMLAttr(child.getAttribute('ui-role'))) {
        this._titleElem = child;
      }
    });

    if (!this._titleElem) {
      this._titleElem = document.createElement('span');
      this._titleElem.setAttribute('ui-role', 'title');
    }

    this._titleElem.classList.add(titleStyles);

    if (!this.isTall) this.applyStyles(shortStyles);
    this.on('attribute-change', ({ changed: { now, name } }) => {
      if (name === 'is-tall') {
        now ?
          this.removeStyles(shortStyles).applyStyles(tallStyles) :
          this.removeStyles(tallStyles).applyStyles(shortStyles);
      }
    });
  }

  applyTitle (text) {
    this._titleElem.textContent = text;
  }
}).reflectToAttribute(reflectedAttrs);

export default Toolbar;
customElements.define('ui-toolbar', Toolbar);
