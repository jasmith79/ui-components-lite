import UIBase from '../utils/ui-component-base.js';
import { defineUIComponent, document, global } from '../utils/dom.js';

import './form.js';
import './input.js';
import './card.js';
import './fab.js';

const reflectedAttrs = ['is-logged-in'];
const template = document.createElement('template');
template.innerHTML = `
  <style>
    ui-card {
      width: 300px;
      height: 315px;
    }

    ui-form {
      width: 100%;
      height: 100%;
    }

    ui-input {
      margin-bottom: 30px;
    }

    ui-fab {
      float: right;
      position: relative;
      top: -90px;
      background-color: #79e08b;
    }

    h2 {
      color: #AAA;
      font-style: italic;
    }

    #heading {
      width: 70%;
      margin-left: 10%;
      border-bottom: var(--ui-theme-dark-text-color, #999);
    }

    .arrow {
      border: solid #fff;
      border-width: 0 4px 5px 0;
      display: inline-block;
      padding: 3px;
      position: relative;
      transform: rotate(45deg);
      height: 25px;
      width: 12px;
      top: -2px;
      left: 2px;
    }

    :host {
      position: relative;
      left: 50px;
    }
  </style>
  <h2 id="heading">Login</h2>
  <ui-card>
    <ui-form>
      <ui-input name="user" placeholder="User"></ui-input>
      <ui-input name="pass" placeholder="Password"></ui-input>
    </ui-form>
    <ui-fab><div class="arrow"></div></ui-fab>
  </ui-card>
`;

export default defineUIComponent({
  name: 'ui-login',
  reflectedAttrs,
  template,
  definition: class Login extends UIBase {

  }
});
