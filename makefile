SHELL := /bin/bash
PATH  := node_modules/.bin:$(PATH)
ES    := $(wildcard src/*.js)
# JS    := $(ES:src/%.es=build/%.js)

clean:
	rm -rf ./build

# build/%.js: src/%.js
# 	@mkdir -p $(@D)
# 	babel $^ --presets env --plugins transform-es2015-modules-umd -o $@

build/index.js:
	@mkdir -p $(@D)
	echo "\
	import '../src/elements/login.js';\
	import '../src/elements/fab.js';\
	import '../src/elements/drop-down.js';\
	import '../src/elements/drawer.js';\
	import '../src/elements/hamburger.js';\
	import '../src/elements/input.js';\
	import '../src/elements/router.js';\
	import '../src/elements/tabs.js';\
	import '../src/elements/toolbar.js';" > $@

build/bundle.js: build/index.js
	@mkdir -p $(@D)
	webpack

build/nomodule.js: src/utils/loader.js build/bundle.js
	@mkdir -p $(@D)
	babel $^ --presets env -o $@
	rm build/bundle.js

all: $(ES) build/nomodule.js



