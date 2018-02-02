/*
 * easer.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * easer animation component for ui-components-lite.
 */

import { defineUIComponent, document, global } from '../utils/dom.js';
import { generateCSSClassName } from '../utils/styler.js';

const orientations = {
  'left': ['X', '-'],
  'right': ['X', ''],
  'up': ['Y', '-'],
  'down': ['Y', ''],
};

export default superclass => defineUIComponent({
  name: 'ui-easer',
  registerElement: false,
  definition: class Easer extends superclass {
    constructor () {
      super();
      this._animations = [];
    }

    defineSlideAnimation ({direction, timing=500, fn='ease', distance='100%'}) {
      if (!this._animations.sliding) this._animations.sliding = {};
      const [xy, min] = orientations[direction];
      const minus = min && distance.match('-') ? '' : min;
      const inClass = generateCSSClassName();
      const outClass = generateCSSClassName();
      const animationStyles = document.createElement('template');
      animationStyles.innerHTML = `
        <style>
          :host {
            transition-property: transform;
            transition-duration: ${timing}ms;
            transition-timing-function: ${fn};
            transform: translate3d(0, 0, 0);
          }

          :host(.${inClass}) {
            transform: translate${xy}(${minus}${distance});
          }

          :host(.${outClass}) {
            transform: translate${xy}(0);
          }
        </style>
      `;

      if (global._usingShady) global.ShadyCSS.prepareTemplate(animationStyles, this.tagName.toLowerCase());

      this.shadowRoot.appendChild(document.importNode(animationStyles.content, true));

      const self = this;
      const obj = {
        _isIn: false,

        easeIn () {
          this._isIn = true;
          self.classList.add(inClass);
          if (global._usingShady) {
            ShadyCSS.styleSubtree(self);
          }
          return new Promise(res => {
            global.setTimeout(() => {
              self.classList.remove(outClass);
              if (global._usingShady) {
                ShadyCSS.styleSubtree(self);
              }
              res(true);
            }, timing);
          });
        },

        easeOut () {
          this._isIn = false;
          self.classList.add(outClass);
          if (global._usingShady) {
            ShadyCSS.styleSubtree(self);
          }
          return new Promise(res => {
            global.setTimeout(() => {
              self.classList.remove(inClass);
              if (global._usingShady) {
                ShadyCSS.styleSubtree(self);
              }
              res(true);
            }, timing);
          });
        },

        toggle () {
          return this._isIn ? this.easeOut() : this.easeIn();
        },

        get styles () {
          return styles;
        },
      };

      this._animations.sliding[direction.toLowerCase()] = obj;
      return obj;
    }
  }
});
