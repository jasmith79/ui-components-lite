import event2Promise from '../../utils/promise-from-event.js';

const global = new Function('return this;')();
const document = global.document;
const template = document.createElement('template');
template.innerHTML = '<div id="test-div"></div>';

// const Test = class Test extends HTMLElement {
//   constructor () {
//     super();
//     console.log(`in Test constructor for ${this.id}`);
//     this._beforeReadyHandlers = [];
//     this._value = null;
//     this.attachShadow({ mode: 'open' });
//     this._isReady = event2Promise({
//       element: this,
//       eventName: 'ui-component-ready',
//       callback: () => this
//     });
//
//     this._isReady.then(_ => {
//       console.log(`${this.id} is totally ready`);
//     });
//
//     setTimeout(() => {
//       console.log(`in Test constructor timeout for ${this.id}`);
//       this.setAttribute('data-foo', 'bar');
//       this.shadowRoot.appendChild(document.importNode(template.content, true));
//     }, 0);
//   }
//
//   get value () {
//     return this._value;
//   }
//
//   set value (val) {
//     this._value = val;
//   }
//
//   _beforeReady(...fs) {
//     this._beforeReadyHandlers.push.apply(this._beforeReadyHandlers, fs);
//     return this;
//   }
//
//   init () {
//     console.log(`in Test init for ${this.id}`);
//
//     Promise.all(this._beforeReadyHandlers.map(f => f(this))).then(_ => {
//       console.log(`before ready finished for ${this.id}`);
//       this.dispatchEvent(new CustomEvent('ui-component-ready'));
//     });
//   }
//
//   connectedCallback () {
//     console.log(`in connected for ${this.id}`);
//     setTimeout(() => this.init(), 0);
//   }
// };
//
// const SubTest = class SubTest extends Test {
//   constructor () {
//     super();
//   }
//
//   foo () {
//
//   }
//
//   set value (val) {
//     if (Object.prototype.toString.call(val) === '[object Number]') {
//       super.value = val;
//     }
//   }
//
//   get value () {
//     return super.value * 2;
//   }
// }
//
// global.customElements.define('ui-test', Test);
// global.customElements.whenDefined('ui-test').then(_ => {
//   setTimeout(() => {
//     console.log('creating test2');
//     let t = document.createElement('ui-test');
//     t.id = 'test2';
//     console.log('appending test2');
//     document.body.appendChild(t);
//   }, 500);
// });
//
// global.customElements.define('ui-test-2', SubTest);
// global.customElements.whenDefined('ui-test-2').then(_ => {
//   setTimeout(() => {
//     document.querySelector('ui-test-2').value = 2;
//     console.log(`Value is ${document.querySelector('ui-test-2').value}.`);
//   }, 1000);
// });

const lifeTemplate = document.createElement('template');
lifeTemplate.innerHTML = `<div id="div-1">Foo</div>`;

class LifeTest extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(document.importNode(lifeTemplate.content, true));
    console.log(this.shadowRoot.querySelector('#div-1'));
  }
}

global.customElements.define('ui-lifecycle', LifeTest);
