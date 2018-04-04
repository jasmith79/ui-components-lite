/*
 * centerer.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * Vertical centering mixin for ui-components-lite.
 */

import { document, defineUIComponent } from './dom.js';

const centeredStyles = `
    :host {
      transform-style: preserve-3d;
    }

    .content-wrapper {
      position: relative;
      top: 49%;
      transform: translateY(-51%);
    }
`;

const template = document.createElement('template');
template.innerHTML = `
  <style>
    ${centeredStyles}
  </style>
  <div class="content-wrapper">
    <slot></slot>
  </div>
`;

export default superclass => defineUIComponent({
  name: 'ui-centered',
  template,
  registerElement: false,
  definition: class Centered extends superclass {}
});


export { centeredStyles };
