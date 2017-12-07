import styler from './styler.js';
import transferChildren from './transferchildren.js';
import toCSSString from './to_css_string.js';

const centered = {
  'position': 'relative',
  'top': '49%',
  'transform': 'translateY(-51%)',
};

const wrapperSlot = document.createElement('slot');
const slottedWrapperDiv = document.createElement('div');
slottedWrapperDiv.id = 'ui-component-wrapper';
slottedWrapperDiv.appendChild(wrapperSlot);

const wrapperDiv = document.createElement('div');
wrapperDiv.id = 'ui-component-wrapper';

const wrapperStyles = document.createElement('style');
wrapperStyles.innerHTML = `
  #ui-component-wrapper {
    ${toCSSString(centered, ';\n\t')}
  }
`;

const preserve3d = {
  'transform-style': 'preserve-3d',
};

const preserve3dStyles = styler.getClassList(preserve3d);

export default superclass => class Centerable extends superclass {
  centerContent ({unslotted}={}) {
    if (!this.shadowRoot || !this.shadowRoot.querySelector('#ui-component-wrapper')) {
      const wrapper = unslotted ? wrapperDiv : slottedWrapperDiv;
      this.classList.add(...preserve3dStyles);
      const shadowRoot = this.shadowRoot || this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(wrapper.cloneNode(true));
      shadowRoot.appendChild(wrapperStyles.cloneNode(true));
      wrapper.addEventListener('slotchange', console.log);
    }
    return this;
  }
};

export {
  centered as centeredStyleObject,
  preserve3d as preserve3dObject
};
