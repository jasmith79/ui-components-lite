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

    defineSlideAnimation ({direction, timing=300, fn='ease-in', distance='100%'}) {
      if (!this._animations.sliding) this._animations.sliding = {};
      const [xy, min] = orientations[direction];
      const minus = min && distance.match('-') ? '' : min;
      const inClass = generateCSSClassName();
      const outClass = generateCSSClassName();
      const animationStyles = document.createElement('style');
      animationStyles.innerHTML = `
        :host(.${inClass}) {
          transform: translate${xy}(${minus}${distance});
          transition-property: transform;
          transition-duration: ${timing}ms;
          transition-timing-function: ${fn};
        }

        :host(.${outClass}) {
          transform: translate${xy}(0);
          transition-property: transform;
          transition-duration: ${timing}ms;
          transition-timing-function: ${fn === 'ease-in' ? 'ease-out' : fn};
        }
      `;

      this.shadowRoot.appendChild(animationStyles);
      const self = this;
      const obj = {
        _isIn: false,

        easeIn () {
          this._isIn = true;
          self.classList.add(inClass);
          if (global._usingShady) {
            ShadyCSS.styleSubtree(this);
          }
          return new Promise(res => {
            setTimeout(() => {
              self.classList.remove(outClass);
              if (global._usingShady) {
                ShadyCSS.styleSubtree(this);
              }
              res(true);
            }, timing);
          });
        },

        easeOut () {
          this._isIn = false;
          self.classList.add(outClass);
          if (global._usingShady) {
            ShadyCSS.styleSubtree(this);
          }
          return new Promise(res => {
            setTimeout(() => {
              self.classList.remove(inClass);
              if (global._usingShady) {
                ShadyCSS.styleSubtree(this);
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
