/*
 * hamburger.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * menu-button component for ui-components-lite.
 */

import Button from './button.js';

import { defineUIComponent, document } from '../utils/dom.js';

const reflectedAttrs = ['line-color'];
const template = document.createElement('template');
template.innerHTML = `
  <style>
    .line {
      height: 5px;
      width: 100%;
      background-color: var(--ui-theme-dark-text-color, #000);
      position: relative;
      padding: 0;
    }

    .top-line {
      top: 0px;
    }

    .middle-line {
      top: 7px;
    }

    .bottom-line {
      top: 15px;
    }

    .content-wrapper {
      height: 30px;
      left: 10%;
    }

    :host {
      background: transparent;
      width: 48px;
      height: 48px;
    }
  </style>
`;

const lineDivTemplate = document.createElement('template');
lineDivTemplate.innerHTML = `
  <div>
    <div class="line top-line"></div>
    <div class="line middle-line"></div>
    <div class="line bottom-line"></div>
  </div>
`;

export default defineUIComponent({
  name: 'ui-hamburger',
  template,
  reflectedAttrs,
  definition: class Hamburger extends Button {
    init () {
      super.init();
      this
        .selectInternalElement('.content-wrapper')
        .appendChild(document.importNode(lineDivTemplate.content, true));

      this.watchAttribute(this, 'line-color', now => {
        [...this.selectInternalAll('.line')].forEach(el => {
          el.style.backgroundColor = now;
        });
      });
    }
  }
});
