
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

import Text from './text.js';

import Floats from '../utils/float.js';
import { UIBase, defineUIComponent, document, global } from '../utils/ui-component-base.js';

import { mix } from '../../../mixwith/src/mixwith.js';

const parentElements = new WeakMap();
const reflectedAttributes = ['for', 'position', 'view-text'];
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      position: absolute;
      z-index: 0;
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
      z-index: 2000;
    }
  </style>
  <div id="tooltip">
    <ui-text view-text="{{view-text}}"></ui-text>
  </div>
`;

export const Tooltip = defineUIComponent({
  name: 'ui-tooltip',
  template,
  reflectedAttributes,
  definition: class Tooltip extends mix(UIBase).with(Floats) {
    constructor () {
      super();
      this._forHandlers = [];
    }

    init () {
      super.init();
      this.floatingY = true;
    }

    _updatePosition () {
      let { top, left, height: elHeight, width: elWidth } = this.isFor.getBoundingClientRect();
      top += (global.scrollY || global.pageYOffset);
      left += (global.scrollX || global.pageXOffset);

      let { width: ttWidth, height: ttHeight } = this.getBoundingClientRect();
      switch (this.position) {
        case 'above':
          this.style.top = `${top - ttHeight - 5}px`;
          this.style.left = `${left}px`;
          break;

        case 'below':
          this.style.top = `${top + elHeight + 5}px`;
          this.style.left = `${left}px`;
          break;

        case 'left':
          this.style.top = `${top}px`;
          this.style.left = `${left - ttWidth - 5}px`;
          break;

        default: // defaults to being to the right of the element
          this.style.top = `${top}px`;
          this.style.left = `${left + elWidth + 5}px`;
          break;
      }

      return this;
    }

    _attachForElementHandlers () {
      const [outHandler, inHandler] = this._forHandlers;
      this.isFor.addEventListener('mouseenter', inHandler);
      this.isFor.addEventListener('mouseleave', outHandler);
      return this;
    }

    _removeForElementHandlers () {
      const [outHandler, inHandler] = this._forHandlers;
      this.isFor.removeEventListener('mouseenter', inHandler);
      this.isFor.removeEventListener('mouseleave', outHandler);
      return this;
    }

    show () {
      if (this.viewText) {
        this._updatePosition();
        this.classList.add('faded-in');
      }
      
      return this;
    }

    hide () {
      this.classList.remove('faded-in');
      return this;
    }

    get isFor () {
      return parentElements.get(this);
    }

    set isFor (el) {
      parentElements.set(this, el);
      return this._attachForElementHandlers();
    }

    connectedCallback () {
      super.connectedCallback();
      if (!this._forHandlers.length) {
        this._forHandlers.push(
          e => (this.hide()),
          e => (this.show()),
        );
      }

      let shadowParent = (node => {
        while (node = node.parentNode) {
          if (node.host) return node.host;
          if (node === document) return node;
        }
      })(this);

      if (this.for) this.isFor = shadowParent.querySelector(`#${this.for}`);
      if (!this.isFor) {
        this.isFor = this.parentNode.host || this.parentNode;
      }

      if (!this.isFor) throw new Error('ui-tooltip must have a "for" attribute/property or a parent');
      this._attachForElementHandlers();

      if (this.textContent && !this.attr('view-text')) this.attr('view-text', this.textContent);
    }

    disconnectedCallback () {
      super.disconnectedCallback();
      this._removeForElementHandlers();
    }
  }
});

export const TooltipMixin = superclass => defineUIComponent({
  name: 'ui-has-tooltip',
  registerElement: false,
  reflectedAttributes: ['tooltip'],
  definition: class extends superclass {
    constructor () {
      super();
      this._tooltipElement = document.createElement('ui-tooltip');
      this._tooltipElement.isFor = this;
    }

    init () {
      super.init();
      if (this.tooltip) {
        this._tooltipElement.viewText = this.tooltip;
        document.body.insertBefore(this._tooltipElement, document.body.firstElementChild);
      }

      this.watchAttribute(this, 'tooltip', now => {
        let inDOM = document.body.contains(this._tooltipElement);
        if (now && !inDOM) document.body.appendChild(this._tooltipElement);
        if (!now && inDOM) document.body.removeChild(this._tooltipElement);
        this._tooltipElement.viewText = now;
      });
    }

    disconnectedCallback () {
      super.disconnectedCallback();
      document.body.removeChild(this._tooltipElement);
    }

    connectedCallback () {
      super.connectedCallback();
      if (this._tooltipElement) document.body.insertBefore(this._tooltipElement, document.body.firstElementChild);
    }
  },
});
