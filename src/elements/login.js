import UIBase from '../utils/ui-component-base.js';
import { defineUIComponent, document, global } from '../utils/dom.js';

import './form.js';
import './input.js';

const reflectedAttrs = ['is-logged-in'];
const template = document.createElement('template');
template.innerHTML = `
  <style>
    #heading {
      width: 70%;
      margin-left: 10%;
      border-bottom: var(--ui-theme-dark-text-color, #999);
    }
  </style>
  <h2 id="heading">Login</h2>
  <ui-form>
    <ui-input name="user" placeholder="User"></ui-input>
    <ui-input name="pass" placeholder="Password"></ui-input>
  </ui-form>
`;

export default defineUIComponent({
  name: 'ui-login',
  reflectedAttrs,
  template,
  definition: class Login extends UIBase {
    
  }
});