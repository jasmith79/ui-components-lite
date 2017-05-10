## UI-COMPONENTS-LITE

### A set of very lightweight UI components in JavaScript and CSS.

#### Usage

Pass the desired component names to the makefile like so:

`make all CORE=list,of,core,elements COMPONENTS=list,of,components`

As of right now, load order needs to be manually managed. I'm working on a bundler script to
automatically handle dependency resolution.