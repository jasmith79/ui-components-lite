// import Styletron from '../../node_modules/styletron-client/src/index.js';
// import { injectStyle } from '../../node_modules/styletron-utils/src/index.js';


// const styler = new Styletron();
const defaultTheme = {
  primaryColor: '#00bcd4',
  primaryDarkColor: '#008ba3',
  primaryLightColor: '#62efff',
  primaryTextColor: '#000',
  secondaryColor: '#ab47bc',
  secondaryDarkColor: '#79e08b',
  secondaryLightColor: '#df78ef',
  secondaryTextColor: '#fff',
  warningColor: '#ec407a',
};

// styler.getClassList = function(cssDeclarations) {
//   return injectStyle(this, cssDeclarations).split(' ');
// };
//export default styler;





// const namedThemes = {};
// const appliedThemes = [];
// let currentTheme = defaultTheme;
//
// class Styler {
//   static applyTheme (...args) {
//     let [first, second] = args;
//     let firstType = extractType(first);
//     if (firstType === 'String') {
//       if (second) {
//         namedThemes[first] = Object.assign({}, defaultTheme, second);
//       }
//       return this._applyTheme(namedThemes[first]);
//     }
//
//     return this._applyTheme(first);
//   }
//
//   static _applyTheme (theme) {
//
//   }
//
//   static revertTheme () {
//     let theme = appliedThemes.pop() || defaultTheme;
//     return this._applyTheme(theme);
//   }
//
//   style (styles) {
//     this.classList.add(injectStyle(styletron, styles));
//     return this;
//   }
// };














import { extractType } from '../../node_modules/extracttype/extracttype.js';
import { random } from '../../node_modules/jsstring/src/jsstring.js';

import toCSSString from './to_css_string.js';

const generatedStyles = {};
const injectedStyles = new WeakMap;

const generateCSSClass = _ => random.alpha(1) + random.alphanumeric(6);
const generateStyles = styles => {
  const str = toCSSString(styles);
  if (!(str in generatedStyles)) {
    const elem = document.createElement('style');
    const class_ = generateCSSClass();
    elem.innerHTML = `.${class_}{${str}}`;
    generatedStyles[str] = [class_, elem];
  }
  const [name, el] = generatedStyles[str];
  return [name, el.cloneNode(true)];
};

const injectStyleTag = (styleElem, root=document.head) => {
  const existing = injectedStyles.get(root) || [];
  if (existing.includes(styleElem)) return;
  existing.push(styleElem);
  root.appendChild(styleElem);
  injectedStyles.set(root, existing);
  return;
};

export default superclass => class Styled extends superclass {
  applyStyles (...styles) {
    styles.forEach(style => {
      const [class_, elem] = generateStyles(styles);
      injectStyleTag(elem, this.shadowParent);
      this.classList.add(class_);
    }):

    return this;
  }

  removeStyles (...styles) {
    styles.forEach(style => {
      const str = toCSSString(styles);
      const [class_] = generatedStyles[str];
      if (class_) {
        this.classList.remove(class_);
      } else {
        console.warn(`Tried to remove properties ${str} from ${this.tagName.toLowerCase()}.`);
      }
    }):

    return this;
  }
};
