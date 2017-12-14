import Button from './button.js';
import Easer from '../animations/easer.js';
import toCSSString from '../utils/to_css_string.js';
import { centeredStyles, preserve3dStyles } from '../utils/centerer.js';
import { mix } from '../../node_modules/mixwith/src/mixwith.js';

const reflectedAttrs = ['ui-role'];
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
  'border': '1px solid black',
  'width': '48px',
  'height': '48px',
};

const Hamburger = (class Hamburger extends mix(Button).with(Easer) {
  init () {
    super.init();
    this.shadowRoot.appendChild(hamburgerShadowStyles);
    this.shadowRoot.querySelector('#ui-component-wrapper').appendChild(lineDiv.cloneNode(true));
    this.applyStyles(styles);
  }

  centerContent() {
    return super.centerContent({unslotted: true});
  }
}).reflectToAttribute(reflectedAttrs);

export default Hamburger;
customElements.define('ui-hamburger', Hamburger);
