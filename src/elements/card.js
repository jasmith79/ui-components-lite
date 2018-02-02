/*
 * card.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * card component for ui-components-lite.
 */

import Floats from '../utils/float.js';
import { UIBase, defineUIComponent, document } from '../utils/ui-component-base.js';

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
