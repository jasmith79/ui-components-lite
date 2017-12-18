import '../../src/elements/fab.js';
import '../../src/elements/hamburger.js';
import '../../src/elements/alert.js';
import '../../src/elements/drawer.js';
import '../../src/elements/toolbar.js';

// import Styled from '../../src/utils/styler.js';
// const theme = {
//   [Styled.primaryDarkColor]: 'purple'
// };
// setTimeout(() => { console.log(Styled.applyTheme(theme)); }, 1500);
// setTimeout(() => { console.log(Styled.revertTheme()); }, 3000);

import '../../src/elements/router.js';

customElements.whenDefined('ui-button').then(_ => {
  document.querySelector('.alert-bttn').on('click', e => {
    document.querySelector('ui-alert').alert('Alerted!');
  });
});

customElements.whenDefined('ui-router').then(_ => {
  const router = document.querySelector('ui-router');
  window.router = router;
});
