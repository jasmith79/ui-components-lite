import UIBase from '../utils/ui-component-base.js';
import Floats from '../utils/float.js';
import { defineUIComponent, document } from '../utils/dom.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      width: 200px;
      height: 300px;
      padding: 2%;
    }
  </style>
  <slot></slot>
`;

const Card = defineUIComponent({
  name: 'ui-card',
  template,
  definition: class Card extends mix(UIBase).with(Floats) {
    init () {
      super.init();
      this.floatingY = true;
    }
  }
});

export default Card;
