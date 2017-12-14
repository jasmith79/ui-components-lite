import toCSSString from '../utils/to_css_string.js';
import Floats from '../utils/float.js';
import UIBase from '../utils/ui-component-base.js';

import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const styles = {

});

const titleStyles = document.createElement('style');
const titleStyleObj = {

};
titleStyles.innerHTML = toCSSString(titleStyleObj);

const titleSlot = document.createElement('slot');
titleSlot.name = 'title';

const leftButtonSlot = document.createElement('slot');
const rightButtonSlot = document.createElement('slot');
const tabSlot = document.createElement('slot');
tabSlot.name = 'tab-slot';

const reflectedAttrs = [
  'tall',
];

export default class Toolbar extends mix(HTMLElement).with(UIBase, Floats) {
  constructor () {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(titleStyles.cloneNode(true));
    shadowRoot.appendChild(titleSlot.cloneNode(true));
  }
};
