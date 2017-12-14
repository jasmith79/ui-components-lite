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
import toCSSString from './to_css_string.js';
import { partitionBy } from './functional.js';

const generatedStyles = {};
const injectedStyles = new WeakMap;

const generateStyles = (styles, selector='') => {
  const [class_, str] = toCSSString(styles);
  if (!(class_ in generatedStyles)) {
    const elem = document.createElement('style');
    elem.innerHTML = selector + str;
    generatedStyles[class_] = elem;
  }
  const elem = generatedStyles[class_];
  return [class_, elem.cloneNode(true)];
};

const injectStyleTag = (styleElem, root=document.head) => {
  const existing = injectedStyles.get(root) || [];
  if (existing.some(node => node.isEqualNode(styleElem))) return;
  existing.push(styleElem);
  root.appendChild(styleElem);
  injectedStyles.set(root, existing);
  return;
};

const Styled = superclass => class Styled extends superclass {
  applyStyles (...stls) {
    const [[selector], styles] = partitionBy(x => extractType(x) === 'String', stls);
    styles.forEach(style => {
      const [class_, elem] = generateStyles(style, selector);
      injectStyleTag(elem, this.shadowParent);
      if (this._isReady) {
        this.classList.add(class_);
      } else {
        this.on('ui-component-ready', e => {
          this.classList.add(class_);
        });
      }
    });

    return this;
  }

  removeStyles (...styles) {
    styles.forEach(style => {
      const [class_] = generateStyles(style);
      if (class_) {
        this.classList.remove(class_);
      } else {
        console.warn(`Tried to remove properties ${str} from ${this.tagName.toLowerCase()}.`);
      }
    });

    return this;
  }
};

// For non-ui-component use, e.g. content divs
Styled.generateStyles = generateStyles;
export default Styled;
