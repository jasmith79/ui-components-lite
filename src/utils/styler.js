import extractType from '../../node_modules/extracttype/extracttype.js';
import { random } from '../../node_modules/jsstring/src/jsstring.js';

const primaryColor = Symbol('primaryColor');
const primaryDarkColor = Symbol('primaryDarkColor');
const primaryLightColor = Symbol('primaryLightColor');
const darkTextColor = Symbol('darkTextColor');
const secondaryColor = Symbol('secondaryColor');
const secondaryDarkColor = Symbol('secondaryDarkColor');
const secondaryLightColor = Symbol('secondaryLightColor');
const lightTextColor = Symbol('lightTextColor');
const warningColor = Symbol('warningColor');

const generatedStyles = {};
const injectedStyles = new WeakMap;
const themedElements = new WeakMap;
const appliedThemes = [];

const defaultTheme = {
  [primaryColor]: '#00bcd4',
  [primaryDarkColor]: '#008ba3',
  [primaryLightColor]: '#62efff',
  [darkTextColor]: '#000',
  [secondaryColor]: '#ab47bc',
  [secondaryDarkColor]: '#79e08b',
  [secondaryLightColor]: '#df78ef',
  [lightTextColor]: '#fff',
  [warningColor]: '#ec407a',
};

const generateCSSClassName = () => random.alpha(1) + random.alphanumeric(5);

const memoizeWriteStyles = f => {
  const cache = new Map();
  return (styles, elem, class_) => {
    const hashed = cache.get(elem) || {};
    const str = JSON.stringify(styles);
    if (!(str in hashed)) {
      hashed[str] = f(styles, elem, class_);
      cache.set(elem, hashed);
    }
    return hashed[str];
  };
};

const partitionBy = (pred, arr) => {
  return arr.reduce((acc, x) => {
    return (acc[pred(x) ? 0 : 1].push(x), acc);
  }, [[],[]]);
};

const managedStyleSheets = new Map;
const themedRules = new Map;

const getStyleElem = (root=document.head) => {
  const existing = managedStyleSheets.get(root);
  if (existing) return existing;
  const styleElem = document.createElement('style');
  managedStyleSheets.set(root, styleElem);
  root.appendChild(styleElem);
  return styleElem;
};

window.getStyleElem = getStyleElem;

const writeStyles = memoizeWriteStyles((styles, styleElem, class_=generateCSSClassName()) => {
  const currentTheme = appliedThemes[appliedThemes.length - 1] || defaultTheme;
  const entries = Object.entries(styles);
  const [regular, irregular] = partitionBy(([k, v]) => extractType(v) === 'String', entries);
  const [themed, nested] = partitionBy(([k, v]) => extractType(v) === 'Symbol', irregular);
  const basicProps = regular.map(([k, v]) => `${k}:${v};`).join('');
  styleElem.innerHTML += `.${class_}{${basicProps}}`;
  // styleElem.innerHTML += `.${class_}{${themed.map(([k, v]) => `${k}:${currentTheme[v]};`).join('')}}`
  if (themed.length) {
    const brandnew = document.createElement('style');
    document.head.appendChild(brandnew);
    themed.forEach(([k, v]) => {
      const index = brandnew.sheet.insertRule(`.${class_}{${k}:${currentTheme[v]};}`);
      const arr = themedRules.get(styleElem) || [];
      arr.push(index);
      themedRules.set(styleElem, arr);
    });
  }
  nested.forEach(([k, v]) => writeStyles(v, styleElem, `${class_}${k}`));
  return class_;
});

const Styled = superclass => class Styled extends superclass {
  applyStyles (...styles) {
    const styleElem = getStyleElem(this.shadowParent);
    const classList = styles.map(style => writeStyles(style, styleElem));
    if (this._isReady) {
      this.classList.add(...classList);
    } else {
      this.on('ui-component-ready', e => {
        this.classList.add(...classList);
      });
    }
    return this;
  }

  removeStyles (...styles) {
    styles.forEach(style => {
      const styleElem = getStyleElem(this.shadowParent);
      const class_ = writeStyles(style, styleElem);
      if (class_) {
        this.classList.remove(class_);
      } else {
        console.warn(`Tried to remove properties ${str} from ${this.tagName.toLowerCase()}.`);
      }
    });

    return this;
  }
};

Object.defineProperties(Styled, {
  primaryColor: {
    value: primaryColor,
  },

  primaryDarkColor: {
    value: primaryDarkColor,
  },

  primaryLightColor: {
    value: primaryLightColor,
  },

  darkTextColor: {
    value: darkTextColor,
  },

  secondaryColor: {
    value: secondaryColor,
  },

  secondaryDarkColor: {
    value: secondaryDarkColor,
  },

  secondaryLightColor: {
    value: secondaryLightColor,
  },

  lightTextColor: {
    value: lightTextColor,
  },

  warningColor: {
    value: warningColor,
  },

  addStyles: {
    value: (styles, root) => {
      const styleElem = getStyleElem(root);
      return writeStyles(styles, styleElem);
    }
  }
});

export default Styled;
