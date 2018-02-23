/*
 * alert.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * alert component for ui-components-lite.
 */
import Button from './button.js';
import Dialog from './dialog.js';

import { document, defineUIComponent } from '../utils/dom.js';

const reflectedAttributes = ['confirmable'];
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      top: 30%;
    }

    #content {
      width: 90%;
      margin-left: auto;
      margin-right: auto;
      height: 65%;
    }

    #bttn-holder ui-button {
      position: relative;
      top: 12px;
      width: 105px;
      height: 50px;
      display: inline-block;
      float: right;
      color: var(--ui-theme-light-text-color, #fff);
    }

    #closer {
      background-color: var(--ui-theme-warning-color, #e83673);
    }

    [dialog-confirm] {
      background-color: var(--ui-theme-primary-color);
    }
  </style>
  <div id="content"></div>
  <div id="bttn-holder">
    <ui-button id="closer" dialog-dismiss>Close</ui-button>
  </div>
`;

const Alert = defineUIComponent({
  name: 'ui-alert',
  template,
  reflectedAttributes,
  definition: class Alert extends Dialog {
    constructor () {
      super();
      this._confirmer = document.createElement('ui-button');
      this._confirmer.id = 'confirmer';
      this._confirmer.textContent = 'Confirm';
      this._confirmer.attr('dialog-confirm', true);
      this.on('attribute-change', ({ changed: { now, name, was } }) => {
        switch (name) {
          case 'is-open': return now ? this._backdrop.show() : this._backdrop.hide();
          case 'confirmable':
            if (now && !this.selectInternalElement('[dialog-confirm]')) {
              this.selectInternalElement('#bttn-holder').appendChild(this._confirmer);
            }

            if (!now && this.selectInternalElement('[dialog-confirm]')) {
              this.selectInternalElemen('#bttn-holder').this.removeChild(this._confirmer);
            }

            break;
        }
      });
    }

    init () {
      super.init();
      this.attr('role', 'alert');
      this.scrollableDialog = false;
      this.smallDialog = true;
      this.attr('is-modal', true);

      const closer = this.selectInternalElement('#closer');
      this.on('dialog-opened', e => {
        closer.focus();
      });
    }

    get textContent () {
      return this.selectInternalElement('#content').textContent;
    }

    set textContent (txt) {
      this.selectInternalElement('#content').textContent = txt;
      return this;
    }

    get innerHTML () {
      return this.selectInternalElement('#content').innerHTML;
    }

    set innerHTML (html) {
      this.selectInternalElement('#content').innerHTML = html;
    }

    alert (txt) {
      this.innerHTML = txt;
      return this.open();
    }
  }
});

export default Alert;
