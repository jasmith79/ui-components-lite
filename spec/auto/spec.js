/*
 * spec.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * automated tests for ui-components-lite.
 */

import Fab from '../../src/elements/fab.js';
import Hamburger from '../../src/elements/hamburger.js';
import Alert from '../../src/elements/alert.js';
import Drawer from '../../src/elements/drawer.js';
import Toolbar from '../../src/elements/toolbar.js';
import {
  Tabs,
  Tab
} from '../../src/elements/tabs.js';
import Text from '../../src/elements/text.js';
import {
  Input,
  DATE_TYPE_SUPPORTED,
  TIME_TYPE_SUPPORTED
} from '../../src/elements/input.js';
import Dropdown from '../../src/elements/drop-down.js';
import Login from '../../src/elements/login.js';
import {
  Router
} from '../../src/elements/router.js';

import UIBaseTests from './ui-base-tests.js';
import CardTests from './card-tests.js';
import TextTests from './text-tests.js';
import dialogTests from './dialog-tests.js';
import alertTests from './alert-tests.js';
import drawerTests from './drawer-tests.js';
import toolbarTests from './toolbar-tests.js';
import inputTests from './input-tests.js';
import dropDownTests from './drop-tests.js';
import formTests from './form-tests.js';

import { tabTests, tabsTests } from './tabs-tests.js';
import { routerTests, routeTests } from './router-tests.js';

Promise.all([
  customElements.whenDefined('ui-fab'),
  customElements.whenDefined('ui-hamburger'),
  customElements.whenDefined('ui-alert'),
  customElements.whenDefined('ui-drawer'),
  customElements.whenDefined('ui-toolbar'),
  customElements.whenDefined('ui-tab'),
  customElements.whenDefined('ui-text'),
  customElements.whenDefined('ui-input'),
  customElements.whenDefined('ui-drop-down'),
  customElements.whenDefined('ui-login'),
  customElements.whenDefined('ui-router'),
  customElements.whenDefined('foo-x'),
]).then(() => {
  UIBaseTests();
  CardTests();
  TextTests();
  dialogTests();
  alertTests();
  toolbarTests();
  tabsTests();
  tabTests();
  dropDownTests();
  formTests();
  inputTests();
  // routerTests();
  // routeTests();
});
