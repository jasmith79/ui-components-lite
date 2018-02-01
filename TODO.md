TODO:

auto tests, especially dynamically added elements/children

dynamic dialog construction fails.

DOCUMENT EVERYTHING

Form inputs losing data? Test caching.

Tooling and css vendor prefixes

Responsive styles and MQs and breakpoints

Fix default theme colors

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
