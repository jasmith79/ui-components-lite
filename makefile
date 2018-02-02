SHELL := /bin/bash
PATH  := node_modules/.bin:$(PATH)
ES    := $(wildcard src/*.js)
# JS    := $(ES:src/%.es=build/%.js)

CONCAT_PREFIX := "var __run=function(){"
CONCAT_SUFFIX := "};if(window.customElements){__run();}else{var __listener=function(){window.removeEventListener('WebComponentsReady',__listener);__run();};window.addEventListener('WebComponentsReady',__listener);}"

all: $(ES) build/loader.min.js build/es5.min.js build/concat.min.js

serve:
	node src/utils/server.js

clean:
	rm -rf ./build

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
	import '../src/elements/text.js';\
	import '../src/elements/toolbar.js';" > $@

build/concat.js: build/index.js
	@mkdir -p $(@D)
	webpack
	echo $(CONCAT_PREFIX) > build/temp1.js
	echo $(CONCAT_SUFFIX) > build/temp2.js
	cat build/temp1.js build/temp.js build/temp2.js > $@
	rm -f build/temp.js
	rm -f build/temp1.js
	rm -f build/temp2.js

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

.PHONY: all clean serve
