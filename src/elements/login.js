import UIBase from '../utils/ui-component-base.js';
import { defineUIComponent, document, global } from '../utils/dom.js';

import './form.js';
import './input.js';
import './card.js';
import './fab.js';
import './alert.js';

const INVALID = `Invalid login credentials. Please double-check your username and password.`;
const FAILURE = `Could not connect to the server to verify your identity. Please check the console for details.`;

const reflectedAttrs = ['is-logged-in', 'data-url', 'session-timeout'];
const template = document.createElement('template');
template.innerHTML = `
  <style>
    ui-card {
      width: 300px;
      height: 315px;
    }

    ui-input {
      margin-bottom: 30px;
    }

    ui-fab {
      float: right;
      position: relative;
      top: 30px;
      left: 15px;
    }

    h2 {
      color: #AAA;
      font-style: italic;
      margin-bottom: 40px;
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
      top: 50px;
    }
  </style>
  <ui-card>
    <h2 id="heading">Login</h2>
    <ui-form>
      <ui-input name="user" placeholder="User"></ui-input>
      <ui-input name="pass" placeholder="Password" type="password"></ui-input>
    </ui-form>
    <ui-fab><div class="arrow"></div></ui-fab>
  </ui-card>
`;

export default defineUIComponent({
  name: 'ui-login',
  reflectedAttrs,
  template,
  definition: class Login extends UIBase {
    constructor () {
      super();
      this._alert = null;
    }

    get credentials () {
      return this.selectInternalElement('ui-form').serialize();
    }

    logout () {
      this.isLoggedIn = null;
      this.selectInternalElement('[name="user"]').value = '';
      this.selectInternalElement('[name="pass"]').value = '';
      this.dispatchEvent(new CustomEvent('logout', { bubbles: true }));
      return this;
    }

    countDown (h) {
      global.clearTimeout(h);
      return global.setTimeout(() => {
        this.logout();
        this._alert.alert(`Session timed out. Please login again.`);
      }, (this.sessionTimeout || 30 * 60 * 1000));
    }

    init () {
      super.init();
      this._childrenUpgraded.then(_ => {
        this._alert = document.querySelector('ui-alert');
        if (!this._alert) {
          this._alert = document.createElement('ui-alert');
          document.body.appendChild(this._alert);
        }

        let handle;
        ['click', 'keydown'].forEach(evt => {
          document.addEventListener(evt, e => {
            if (this.isLoggedIn) handle = this.countDown(handle);
          });
        });

        this.selectInternalElement('ui-fab').on('click', e => {
          if (!this.dataUrl) {
            throw new Error('No url for login, whatcha want me to do?');
          }

          const credentials = this.credentials;
          if (!credentials.user || !credentials.pass) {
            this._alert.alert('Please supply a Username and Password.');
            return;
          }

          this.selectInternalElement('ui-form')
            .submit({ url: this.dataUrl, method: 'POST', responseType: 'json' })
            .then(valid => {
              console.log('in then.');
              if (valid) {
                this.isLoggedIn = true;
                const evt = new CustomEvent('login', { bubbles: true });
                evt.credentials = this.credentials;
                evt.response = valid;
                this.dispatchEvent(evt);
                handle = this.countDown();

              } else {
                this._alert.alert(INVALID);
              }
            })
            .catch(err => {
              console.error(err);
              this._alert.alert(FAILURE);
            });
        });
      });
    }
  }
});