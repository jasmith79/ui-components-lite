TODO:

refactor styler

add append, insertBefore, etc. overrides for elements that need them

add toast

see if FormData polyfill can be removed with the form refactor

auto tests, especially dynamically added elements/children

add flow types

DOCUMENT EVERYTHING

Tooling and css vendor prefixes

Responsive styles and MQs and breakpoints

Fix default theme colors

**PRIORITY**
fix how tooltip works, kinda hacky right now







lifecycle description:

constructor called, super all the way up.
init called, super-chain starts
attributes reflected
inits run
childrenUpgraded
change event for initial attribute fires
beforeReady handlers invoked
ui-ready fires
onReady handlers invoked

connectedCallback not included in above, because depending on when the CE is attached to an element in the DOM it might happen any time between right after the constructor and the end of time.

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
