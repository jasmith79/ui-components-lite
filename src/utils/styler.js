import Styletron from '../../node_modules/styletron-client/src/index.js';
import { injectStyle } from '../../node_modules/styletron-utils/src/index.js';
const styler = new Styletron();
styler.getClassList = function(cssDeclarations) {
  return injectStyle(this, cssDeclarations).split(' ');
};
export default styler;
