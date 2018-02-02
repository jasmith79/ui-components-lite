TODO:

refactor attribute-analyzer: can use hasAttribute to eliminate the empty string === true bit?
refactor styler

add append, insertBefore, etc. overrides for elements that need them

add toast, tooltip, toggle

see if data-binding can happen earlier in the lifecycle?

auto tests, especially dynamically added elements/children

add flow types

DOCUMENT EVERYTHING

Form inputs losing data? Test caching.

Tooling and css vendor prefixes

Responsive styles and MQs and breakpoints

Fix default theme colors

ensure works on npm install

lifecycle description:

constructor called, super all the way up.
attached to DOM
init called, all the way up
  --childrenUpgraded
  --reflectedAttrs reflected
  --data-bound
  --beforeReadyHandlers called
  --ui-ready-fires
  --onReady handlers invoked

So... refactoring to remove the dependence on defineUIComponent is definitely possible in the long run, unfortunately right now the ShadyCSS polyfill has the limitation of only supporting one call to ShadyCSS.prepareTemplate per tag name. Once that restriction is removed

https://github.com/webcomponents/shadycss/issues/153

then we should be able to do something like this:

```javascript
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      background-color: purple;
    }
  </style>
`;

class SomeElement extends HTMLElement {
  constructor () {
    super();

    let tmpl = template.cloneNode(true);
    this.attachShadow({ mode: 'open' });
    if (usingShadyCSS) {
      ShadyCSS.prepareTemplate(tmpl, this.tagName.toLowerCase());
      ShadyCSS.styleElement(this);
    }

    this.shadowRoot.appendChild(tmpl);
  }
}

const fooTemplate = document.createElement('template');
fooTemplate.innerHTML = `
  <style>
    :host {
      width: 200px;
    }
  </style>
`;

class Foo extends SomeElement {
  constructor () {
    super();

    let tmpl = fooTemplate.cloneNode(true);
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    if (usingShadyCSS) {
      ShadyCSS.prepareTemplate(tmpl, this.tagName.toLowerCase());
      ShadyCSS.styleElement(this);
    }

    this.shadowRoot.appendChild(tmpl);
  }
}

customElements.define('some-element', SomeElement);
customElements.define('foo-element', Foo);

document.createElement('foo-element'); // has display:block, background-color:purple, width:200px
```
