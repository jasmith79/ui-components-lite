## UI-COMPONENTS-LITE

### A set of fairly lightweight UI WebComponents.

#### Usage

The polyfills must be loaded synchronously like so:

  {{ Example goes here }}

These elements are meant to be generic: custom business logic should be done via subclassing or
use of composition and shadow DOM to hide the implementation. That being said, many of them
are usable as-is with maybe a touch of CSS styling. Speaking of styling, all styling is done
via a JavaScript API.

#### Theming

Theming is accomplished via the color Symbols on the Styler mixin:

```javascript
import Styler from '../utils/styler.js';
const myUglyTheme = {
  [Styler.primaryDarkColor]: 'purple',
  [Styler.secondaryDarkColor]: 'orange',
  [Styler.primaryLightColor]: 'pink',
  [Styler.secondaryLightColor]: 'ivory',
};

Styler.applyTheme(myUglyTheme);

// Oh, wait, that's hideous!
Styler.revertTheme();
```

All UI elements that have a style set to one of those colors will automatically update on
applying or reverting a theme.

#### NOTES:

Elements that manage their related children (e.g. Tab/Tabs, Router/Routes) should have children
added via the custom methods (e.g. `addTab` and `addRoute`). This avoids the need for expensive
`MutationObserver`s. If you prefer automatical updates, subclass the element and use a
`MutationObserver` to notify of changes to the child list.
