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
      <ui-input name="user" placeholder="User" tabindex="1" required></ui-input>
      <ui-input name="pass" placeholder="Password" type="password" tabindex="1" required></ui-input>
      <ui-fab tabindex="1"><div class="arrow"></div></ui-fab>
    </ui-form>
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
      this._form = null;
      this._sessionTimeoutHandle = null;
    }

    get credentials () {
      return this.selectInternalElement('ui-form').serialize();
    }

    login (resp) {
      this.isLoggedIn = true;
      const evt = new CustomEvent('login', { bubbles: true });
      evt.credentials = this.credentials;
      evt.response = resp;
      this.dispatchEvent(evt);
      this._sessionTimeoutHandle = this.countDown();
    }

    logout () {
      this.isLoggedIn = null;
      this.selectInternalElement('[name="user"]').value = '';
      this.selectInternalElement('[name="pass"]').value = '';
      global.sessionStorage.setItem('ui-credentials', '');
      this.dispatchEvent(new CustomEvent('logout', { bubbles: true }));
      return this;
    }

    userLogout () {
      let { name } = this.credentials;
      this.logout();
      this._alert.alert(`User ${name} is now logged out. Please close this tab.`);
    }

    countDown (h) {
      global.clearTimeout(h);
      return global.setTimeout(() => {
        this.logout();
        this._alert.alert(`Session timed out. Please login again or close the tab.`);
      }, (this.sessionTimeout || 30 * 60 * 1000));
    }

    init () {
      super.init();
      this._beforeReady(_ => {
        this._form = this.selectInternalElement('ui-form');
        this._alert = document.querySelector('ui-alert');
        if (!this._alert) {
          this._alert = document.createElement('ui-alert');
          document.body.appendChild(this._alert);
        }

        // Reset the session timeout on interaction.
        ['click', 'keydown'].forEach(evt => {
          document.addEventListener(evt, e => {
            if (this.isLoggedIn) this._sessionTimeoutHandle = this.countDown(this._sessionTimeoutHandle);
          });
        });

        const handler = _ => {
          if (!this.isLoggedIn) {
            if (!this.dataUrl) {
              throw new Error('No url for login, whatcha want me to do?');
            }

            if (!this._form.isValid) {
              this._alert.alert('Please supply a Username and Password.');
              return;
            }

            const { user, pass } = this.credentials;
            const headers = {
              'Authorization': `Basic ${btoa(user + ':' + pass)}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            };

            fetch(this.dataUrl, { method: 'POST', headers })
              .then(resp => resp.json())
              .then(valid => {
                if (valid) {
                  sessionStorage.setItem('ui-credentials', JSON.stringify(this.credentials));
                  this.login(valid);
                } else {
                  this._alert.alert(INVALID);
                }
              })
              .catch(err => {
                console.error(err);
                this._alert.alert(FAILURE);
              });
          }
        };

        this.selectInternalElement('ui-fab').on('click enter-key', handler);
        this.selectInternalElement('[name="pass"]').on('enter-key', handler);
      });

      this.onReady(_ => {
        const bttn = document.querySelector('[logout-button]');
        // If added later event handling needs to be done manually.
        if (bttn) {
          bttn.on('click keydown', e => {
            if (!e.keyCode || e.keyCode === 13) {
              this.userLogout();
            }
          });
        }

        // Wait a bit to allow handlers to be set if anything wants to listen for the login
        // event.
        global.setTimeout(() => {
          let cached = global.sessionStorage.getItem('ui-credentials');
          if (cached) {
            try {
              let credentials = JSON.parse(cached);
              if (credentials.user && credentials.pass) {
                console.log('Logging in with session data...');
                this.login();
                this._form.data = credentials;
              }
            } catch (e) {
              // no-op
            }
          }
        }, 500);
      });
    }
  }
});
