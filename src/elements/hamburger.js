import Button from './button.js';
import { defineUIComponent, document } from '../utils/dom.js';

const reflectedAttrs = ['ui-role', 'line-color'];
const template = document.createElement('template');
template.innerHTML = `
  <style>
    .line {
      height: 5px;
      width: 100%;
      background-color: var(--ui-theme-dark-text-color, #000);
      position: relative;
      padding: 0;
    }

    .top-line {
      top: 0px;
    }

    .middle-line {
      top: 7px;
    }

    .bottom-line {
      top: 15px;
    }

    #content-wrapper {
      height: 30px;
      width: 80px;
      left: 10%;
    }

    :host {
      background: transparent;
      width: 48px;
      height: 48px;
    }
  </style>
`;

const hamburgerShadowStyles = document.createElement('style');

hamburgerShadowStyles.innerHTML = `
  .line {
    height: 5px;
    width: 100%;
    background-color: black;
    position: relative;
    padding: 0;
  }

  .top-line {
    top: 0px;
  }

  .bottom-line {
    top: 15px;
  }

  .middle-line {
    top: 7px;
  }

  #ui-component-wrapper {
    height: 30px;
    width: 80%;
    left: 10%;
  }
`;


const lineDiv = document.createElement('div');
lineDiv.innerHTML = `
  <div class="line top-line"></div>
  <div class="line middle-line"></div>
  <div class="line bottom-line"></div>
`;

const styles = {
  'background': 'transparent',
  'width': '48px',
  'height': '48px',
};

const Hamburger = defineElement('ui-hamburger', reflectedAttrs, class Hamburger extends mix(Button).with(Easer) {
  init () {
    super.init();
    this.shadowRoot.appendChild(hamburgerShadowStyles.cloneNode(true));
    this.shadowRoot.querySelector('#ui-component-wrapper').appendChild(lineDiv.cloneNode(true));
    this.applyStyles(styles);
    this.watchAttribute(this, 'line-color', now => {
      [...this.shadowRoot.querySelectorAll('.line')].forEach(el => {
        el.style.backgroundColor = now;
      });
    });
  }

  centerContent() {
    return super.centerContent({unslotted: true});
  }
});

export default Hamburger;
