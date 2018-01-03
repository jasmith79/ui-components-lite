import { defineUIComponent, document } from '../utils/dom.js';
import { generateCSSClassName } from '../utils/styler.js';

const orientations = {
  'left': ['X', '-'],
  'right': ['X', ''],
  'up': ['Y', '-'],
  'down': ['Y', ''],
};

export default superclass => defineUIComponent({
  name: 'ui-easer',
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
          return new Promise(res => {
            setTimeout(() => {
              self.classList.remove(outClass);
              res(true);
            }, timing);
          });
        },

        easeOut () {
          this._isIn = false;
          self.classList.add(outClass);
          return new Promise(res => {
            setTimeout(() => {
              self.classList.remove(inClass);
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
