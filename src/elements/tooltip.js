
/*
 * tooltip.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * tooltip component for ui-components-lite.
 */

import Floats from '../utils/float.js';
import { UIBase, defineUIComponent, document, global } from '../utils/ui-component-base.js';

import { mix } from '../../../mixwith/src/mixwith.js';

const reflectedAttributes = ['for', 'position'];
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      position: absolute;
      z-index: 2000;
      background-color: #555;
      color: #fff;
      opacity: 0;
      transition: opacity;
      transition-duration: 300ms; 
      max-width: 200px;
      max-height: 100px;
    }

    #tooltip {
      font-size: 10px;
      background-color: inherit;
      color: inherit;
      padding: 5px;
      border-radius: 2%;
      width: inherit;
      height: inherit;
    }

    :host(.faded-in) {
      opacity: 0.9;
    }
  </style>
  <div id="tooltip">
    <slot></slot>
  </div>
`;

export default defineUIComponent({
  name: 'ui-tooltip',
  template,
  reflectedAttributes,
  definition: class Tooltip extends mix(UIBase).with(Floats) {
    constructor () {
      super();
      this._forHandlers = [];
      this._forElement = null;
    }

    init () {
      super.init();
      this.floatingY = true;
    }

    _updatePosition () {
      let { top, left } = this._forElement.getBoundingClientRect();
      top += (global.scrollY || global.pageYOffset);
      left += (global.scrollX || global.pageXOffset);
      
      let { width, height } = this.getBoundingClientRect();
      switch (this.position) {
        case 'above':
          this.style.top = `${top - (height + 5)}px`;
          this.style.left = `${left}px`;
          break;

        case 'below':
          this.style.top = `${top + height + 5}px`;
          this.style.left = `${left}px`;
          break;

        case 'left':
          this.style.top = `${top}px`;
          this.style.left = `${left - (width + 5)}px`;
          break;

        default: // defaults to being to the right of the element
          this.style.top = `${top}px`;
          this.style.left = `${left + width + 5}px`;
          break;
      }

      return this;
    }

    connectedCallback () {
      super.connectedCallback();
      if (!this._forHandlers.length) {
        this._forHandlers.push(
          e => {
            this.classList.remove('faded-in');
          },
          e => {
            this._updatePosition();
            this.classList.add('faded-in');
          },
        );
      }

      let shadowParent = (node => {
        while (node = node.parentNode) {
          if (node.host) return node.host;
          if (node === document) return node;
        }
      })(this); 
      
      if (this.for) this._forElement = shadowParent.querySelector(`#${this.for}`);
      if (!this._forElement) {
        this._forElement = this.parentNode.host || this.parentNode;
      } 
      if (!this._forElement) throw new Error('ui-tooltip must have a "for" attribute/property or a parent');
      const [outHandler, inHandler] = this._forHandlers;
      this._forElement.addEventListener('mouseenter', inHandler);
      this._forElement.addEventListener('mouseleave', outHandler);
    }

    disconnectedCallback () {
      super.disconnectedCallback();
      const [outHandler, inHandler] = this._forHandlers;
      this._forElement.removeEventListener('mouseenter', inHandler);
      this._forElement.removeEventListener('mouseleave', outHandler);
    }
  }
});
