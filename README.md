## UI-COMPONENTS-LITE

A set of fairly lightweight UI WebComponents.

### Goals

* Use the platform. Everything must be standards-based with broad pledged support from all major browser vendors (meaning no HTML imports or extending built-in elements).
* Corollary: must work in at least one browser as-is: no build steps needed.
* Corollary2: avoidance of wonky, framework-ey 'helpers' that are required.
* Total size of all core components minified < 100k

Unfortunately I will be unable to complete one of the core goals of this project which is to avoid the *necessity* of helpers or special processes. The main reason is a limitation of the Shady CSS ShadowDOM polyfill: styles are scoped to the element *tag name* making inheritance somewhat worthless. I hacked a work-around but it involves defining components with `defineUIComponent`.

#### Usage

Add the loader to the document head, it will feature-detect any necessary polyfills and load them along with all the core components. It does load the full core-js polyfill suite if it detects missing ES 6 features it needs. To use a core component just include it on the page:

```html
<ui-card>
  <span>Look, a drop down</span>
  <ui-drop-down>
    <ui-item>Foo</ui-item>
    <ui-item>Bar</ui-item>
  </ui-drop-down>
</ui-card>
```

It is unnecessary to define components with the provided helper unless you are extending a ui-component or just want the same API surface. If you want to define a component:

```javascript
import UIBase from '../utils/ui-component-base.js';
import { defineUIComponent, document } from '../utils/dom.js';

export default defineUIComponent({
  name: 'my-awesome-component',
  definition: class MyAwesomeComponent extends UIBase {
    constructor () {
      super();
      /* your code here */
    }
  }
});
```
Then in your markup

```html
<my-awesome-component></my-awesome-component>
```

Note that `defineUIComponent` will register your custom element for you.
