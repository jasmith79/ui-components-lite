/*
 * backdrop.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * backdrop component for ui-components-lite. Meant primarily for use in modal components.
 */

import { defineUIComponent, document, UIBase } from '../utils/ui-component-base.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      height: 100vh;
      width: 100vw;
      background-color: rgba(0,0,0,0.7);
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 10000;
    }
  </style>
`;

const Backdrop = defineUIComponent({
  name: 'ui-backdrop',
  template,
  definition: class Backdrop extends UIBase {
    constructor () {
      super();

      // Elements that use this element should set this property to themselves as a
      // debugging aid.
      this.for = null;
    }

    init () {
      super.init();
      this.hide();
    }
  }
});

export default Backdrop;
