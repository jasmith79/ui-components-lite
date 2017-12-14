import extracttype from '../../node_modules/extracttype/extracttype.js';

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
    const styles = {
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

    const self = this;
    const obj = {
      _isIn: false,

      easeIn () {
        this._isIn = true;
        // self.classList.add(...inClassList);
        self.applyStyles(styles.in);
        return new Promise(res => {
          setTimeout(() => {
            // self.classList.remove(...outClassList);
            self.removeStyles(styles.out);
            res(true);
          }, timing);
        });
      },

      easeOut () {
        this._isIn = false;
        // self.classList.add(...outClassList);
        self.applyStyles(styles.out);
        return new Promise(res => {
          setTimeout(() => {
            // self.classList.remove(...inClassList);
            self.removeStyles(styles.in);
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
