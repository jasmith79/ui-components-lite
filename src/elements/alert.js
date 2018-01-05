import './button.js';
import Dialog from './dialog.js';
import { document, defineUIComponent } from '../utils/dom.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      padding: 20px;
      top: 30%;
    }

    #content {
      width: 90%;
      margin-left: auto;
      margin-right: auto;
      height: 65%;
      position: relative;
      top: 50px;
    }

    #closer {
      background-color: var(--ui-theme-warning-color, #e83673);
      color: var(--ui-theme-light-text-color, #fff);
      position: relative;
      width: 105px;
      height: 50px;
      top: 12px;
      left: calc(100% - 105px);
    }
  </style>
  <div id="content">
    <slot></slot>
  </div>
  <ui-button id="closer">Close</ui-button>
`;

const Alert = defineUIComponent({
  name: 'ui-alert',
  template,
  definition: class Alert extends Dialog {
    init () {
      super.init();
      this.scrollableDialog = false;
      this.smallDialog = true;
      this.watchAttribute(this, 'is-open', open => {
        open ? this._backdrop.show() : this._backdrop.hide();
      });

      this.shadowRoot.querySelector('#closer').on('click', e => this.close());
    }

    get textContent () {
      return this.shadowRoot.querySelector('#content').textContent;
    }

    set textContent (txt) {
      this.shadowRoot.querySelector('#content').textContent = txt;
      return this;
    }

    alert (txt) {
      this.textContent = txt;
      return this.open();
    }
  }
});

export default Alert;
