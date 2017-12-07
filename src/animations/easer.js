import extracttype from '../../node_modules/extracttype/extracttype.js';
import randomString, { lower as randomLower } from '../utils/randomstring.js';
import toCSSString from '../utils/to_css_string.js';

//const propValRegex = /(translate|scale|rotate)([xyXY])?\((\-)?|opacity/;

const orientations = {
  'left': ['X', '-'],
  'right': ['X', ''],
  'up': ['Y', '-'],
  'down': ['Y', ''],
};

export default superclass => class Easer extends superclass {
  constructor () {
    super();
    this._animations = this._animations || {};
  }

  defineSlideAnimation ({direction, timing=300, fn='ease-in', distance='100%'}) {
    if (!this._animations.sliding) this._animations.sliding = {};
    const [xy, min] = orientations[direction];
    const minus = min && distance.match('-') ? '' : min;
    const styleObj = {
      in: {
        'transform': `translate${xy}(${minus}${distance})`,
        'transition-property': 'transform',
        'transition-duration': `${timing}ms`,
        'transition-timing-function': fn,
      },
      out: {
        'transform': `translate${xy}(0)`,
        'transition-property': 'transform',
        'transition-duration': `${timing}ms`,
        'transition-timing-function': fn === 'ease-in' ? 'ease-out' : fn,
      }
    };

    let inClassList = [], outClassList = [];

    // 13 character random prefix string. The call for 1 leading character assures
    // it starts with an alpha character.
    // Reason for this is Styletron (current CSSinJS lib) barfs on the transition-duration
    // property.
    const prefix = randomLower(1) + randomString(12);
    const styleElem = document.createElement('style');
    styleElem.innerHTML = `
      .${prefix}-slide-in {
        ${toCSSString(styleObj.in)}
      }

      .${prefix}-slide-out {
        ${toCSSString(styleObj.out)}
      }
    `;

    inClassList.push(`${prefix}-slide-in`);
    outClassList.push(`${prefix}-slide-out`);
    const styleParent = this.shadowParent || document.head;
    styleParent.appendChild(styleElem.cloneNode(true));

    const self = this;
    const obj = {
      _isIn: false,

      easeIn () {
        this._isIn = true;
        self.classList.add(...inClassList);
        return new Promise(res => {
          setTimeout(() => {
            self.classList.remove(...outClassList);
            res(true);
          }, timing);
        });
      },

      easeOut () {
        this._isIn = false;
        self.classList.add(...outClassList);
        return new Promise(res => {
          setTimeout(() => {
            self.classList.remove(...inClassList);
            res(true);
          }, timing);
        });
      },

      toggle () {
        return this._isIn ? this.easeOut() : this.easeIn();
      },

      attachStyles () {
        if (self.isShadowElement) {
          self.shadowParent.append(styleElem.cloneNode(true))
        }
        return this;
      },

      get styles () {
        return styleObj;
      },

      get animationClasses () {
        return [`${prefix}-slide-in`, `${prefix}-slide-out`];
      }
    };

    this._animations.sliding[direction.toLowerCase()] = obj;
    return obj;
  }
}
