/*
 * styler.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * themeing utility for ui-components-lite.
 */

import { document } from './dom.js';

import extractType from '../../../extracttype/extracttype.js';
import { toSnakeCase, random } from '../../../jsstring/src/jsstring.js';

const toCSSVar = s => `--ui-theme-${toSnakeCase(s, '-')}`;

const defaultThemeObj = {
  primaryColor: '#00bcd4',
  primaryDarkColor: '#008ba3',
  primaryLightColor: '#62efff',
  darkTextColor: '#333',
  secondaryColor: '#ab47bc',
  secondaryDarkColor: '#79e08b',
  secondaryLightColor: '#df78ef',
  lightTextColor: '#fff',
  warningColor: '#ec407a',
  rippleColor: '#fff',
  accentColor: 'orange',
};

const themeRegistry = {};
const appliedThemes = [];
let currentTheme = null;

const applyTheme = (theme, name) => {
  const type = extractType(theme);
  if (type === 'String') {
    let t = themeRegistry[theme];
    if (t) {
      currentTheme = t;
      document.head.appendChild(t);
      appliedThemes.push(t);
      return t;
    } else {
      throw new Error(`Unrecognized theme ${theme}.`);
    }
  }

  const style = document.createElement('style');
  style.innerHTML = ':root { ' + Object.entries(theme).reduce((s, [k, v]) => {
    return (k in defaultThemeObj) ?
      `${s} ${toCSSVar(k)}:${v};` : s;
  }, '') + ' }';

  if (name) themeRegistry[name] = style;
  document.head.appendChild(style);
  appliedThemes.push(style);
  currentTheme = style;
  return style;
};

const defaultTheme = applyTheme(defaultThemeObj, 'default');
const revertTheme = () => {
  let current = appliedThemes.pop();
  if (current && current !== defaultTheme) document.head.removeChild(current);
  return appliedThemes[appliedThemes.length - 1] || defaultTheme;
};

const generateCSSClassName = () => random.alpha(1) + random.alphanumeric(5);

export { applyTheme, revertTheme, generateCSSClassName };
