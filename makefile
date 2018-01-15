SHELL := /bin/bash
PATH  := node_modules/.bin:$(PATH)
ES    := $(wildcard src/*.js)
# JS    := $(ES:src/%.es=build/%.js)

all: $(ES) build/loader.min.js build/es5.min.js build/concat.min.js

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

# build/concat.js: build/index.js
# 	@mkdir -p $(@D)
# 	webpack
#
# build/backup.js: build/concat.js
# 	@mkdir -p $(@D)
# 	babel $< --presets env -o $@
# 	rm build/concat.js
#
# build/nomodule.js: src/utils/loader.js build/backup.js
# 	@mkdir -p $(@D)
# 	babel src/utils/loader.js --presets env -o $@
#
# all: $(ES) build/nomodule.js

build/concat.js: build/index.js
	@mkdir -p $(@D)
	webpack

build/concat.min.js: build/concat.js
	@mkdir -p $(@D)
	minify $< > $@

build/es5.js: build/concat.js
	@mkdir -p $(@D)
	babel $< --presets env -o $@

build/es5.min.js: build/es5.js
	@mkdir -p $(@D)
	minify $< > $@

build/loader.min.js: src/utils/loader.js
	@mkdir -p $(@D)
	minify $< > $@

.PHONY: all clean

