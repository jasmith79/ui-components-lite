const styles = {
  leftX : { 'box-shadow': '3px 0px 10px -3px #000' },
  rightX: { 'box-shadow': '-3px 0px 10px -3px #000' },
  floatY: { 'box-shadow': '0px 3px 10px -3px #000' },
};

const reflectedAttrs = [
  'floating-x',
  'floating-y',
  'right-oriented',
  'left-oriented',
];

export default superclass => class Floating extends superclass {

  static get observedAttributes () {
    return [...super.observedAttributes, ...reflectedAttrs];
  }

  get isFloating () {
    return this.floatingX || this.floatingY;
  }

  _setFloatY () {
    return this.applyStyles(styles.floatY);
  }

  _setFloatX () {
    return this.applyStyles(styles[`${this.attr('right-oriented') ? 'right' : 'left'}X`]);
  }

  init () {
    super.init();
    if (this.attr('floating-x')) this._setFloatX();
    if (this.attr('floating-y')) this._setFloatY();

    this.on('attribute-change', ({ changed: { now, name } }) => {
      switch (name) {
        case 'floating-y':
          return now ? this._setFloatY() : this.removeStyles(styles.floatY);

        case 'floating-x':
          return now ? this._setFloatX() : this.removeStyles(styles.rightX, styles.leftX);

        default: return; // no-op
      }
    });
  }
}.reflectToAttribute(reflectedAttrs);
