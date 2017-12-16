import '../../src/elements/fab.js';
import '../../src/elements/hamburger.js';
import '../../src/elements/alert.js';
import '../../src/elements/drawer.js';
import '../../src/elements/toolbar.js';
import Styled from '../../src/utils/styler.js';
const theme = {
  [Styled.primaryDarkColor]: 'purple'
};
setTimeout(() => { console.log(Styled.applyTheme(theme)); }, 1500);
setTimeout(() => { console.log(Styled.revertTheme()); }, 3000);
