SHELL := /bin/bash
PATH  := node_modules/.bin:$(PATH)

SRC_ELS = $(wildcard src/elements/*.js)
SRC_ANIMS := $(ES) $(wildcard src/animations/*.js)
SRC_UTILS := $(ES) $(wildcard src/utils/*.js)

BLD_ELS = $(SRC_ELS:src/elements/%.js=build/temp_elements/%.js)
BLD_ANIMS = $(SRC_ANIMS:src/animations/%.js=build/temp_animations/%.js)
BLD_UTILS = $(SRC_UTILS:src/utils/%.js=build/temp_utils/%.js)

PROD_ELS = $(SRC_ELS:src/elements/%.js=build/elements/%.min.js)
PROD_ANIMS = $(SRC_ANIMS:src/animations/%.js=build/animations/%.min.js)
PROD_UTILS = $(SRC_UTILS:src/utils/%.js=build/utils/%.min.js)

CONCAT_PREFIX := "var __run=function(){"
CONCAT_SUFFIX := "};if(window.customElements){__run();}else{var __listener=function(){window.removeEventListener('WebComponentsReady',__listener);__run();};window.addEventListener('WebComponentsReady',__listener);}"

all: build/loader.min.js $(PROD_UTILS) $(PROD_ANIMS) $(PROD_ELS) \
	$(BLD_UTILS) $(BLD_ANIMS) $(BLD_ELS) build/es5.min.js build/concat.min.js build/index.js

serve:
	node src/utils/server.js

clean:
	rm -rf ./build

build/tempindex.js: $(SRC_ELS) $(SRC_UTILS) $(SRC_ANIMS)
	@mkdir -p $(@D)
	echo $(foreach a, $(BLD_ELS), "import '../"$(a)"';") > $@

build/concat.js: build/tempindex.js $(BLD_ELS)
	@mkdir -p $(@D)
	webpack
	echo $(CONCAT_PREFIX) > build/temp1.js
	echo $(CONCAT_SUFFIX) > build/temp2.js
	cat build/temp1.js build/temp.js build/temp2.js > $@
	rm -f build/temp.js
	rm -f build/temp1.js
	rm -f build/temp2.js
	rm -f build/tempindex.js
	rm -rf build/temp_elements
	rm -rf build/temp_animations
	rm -rf build/temp_utils

build/concat.min.js: build/concat.js
	@mkdir -p $(@D)
	cat $< | minify > $@

build/es5.js: build/concat.js
	@mkdir -p $(@D)
	babel $< --presets env -o $@

build/es5.min.js: build/es5.js
	@mkdir -p $(@D)
	cat $< | minify > $@

build/loader.js: src/utils/loader.js
	@mkdir -p $(@D)
	cat $< | sed "s#node_modules/#../#" > $@

build/loader.min.js: build/loader.js
	@mkdir -p $(@D)
	cat $< | minify > $@

build/elements/%.min.js: src/elements/%.js
	@mkdir -p $(@D)
	cat $< | sed "s#\(utils/.*\)\.js#\1.min.js#" | sed "s#\(animations/.*\)\.js#\1.min.js#"\
	 | sed "s#\(elements/.*\)\.js#\1.min.js#" | sed "s#\(\./[a-z\-]*\)\.js#\1.min.js#" | minify > $@

build/utils/%.min.js: src/utils/%.js
	@mkdir -p $(@D)
	cat $< | sed "s#\(utils/.*\)\.js#\1.min.js#" | sed "s#\(animations/.*\)\.js#\1.min.js#"\
	 | sed "s#\(elements/.*\)\.js#\1.min.js#" | sed "s#\(\./[a-z\-]*\)\.js#\1.min.js#" | minify > $@

build/animations/%.min.js: src/animations/%.js
	@mkdir -p $(@D)
	cat $< | sed "s#\(utils/.*\)\.js#\1.min.js#" | sed "s#\(animations/.*\)\.js#\1.min.js#"\
	 | sed "s#\(elements/.*\)\.js#\1.min.js#" | sed "s#\(\./[a-z\-]*\)\.js#\1.min.js#" | minify > $@

build/temp_elements/%.js: src/elements/%.js
	@mkdir -p $(@D)
	cat $^ | sed "s#../../../#../../node_modules/#" | sed "s#\./elements#./temp_elements#" \
	| sed "s#\./utils#./temp_utils#" | sed "s#\./animations#./temp_animations#" > $@

build/temp_utils/%.js: src/utils/%.js
	@mkdir -p $(@D)
	cat $^ | sed "s#../../../#../../node_modules/#" | sed "s#\./elements#./temp_elements#" \
	| sed "s#\./utils#./temp_utils#" | sed "s#\./animations#./temp_animations#" > $@

build/temp_animations/%.js: src/animations/%.js
	@mkdir -p $(@D)
	cat $^ | sed "s#../../../#../../node_modules/#" | sed "s#\./elements#./temp_elements#" \
	| sed "s#\./utils#./temp_utils#" | sed "s#\./animations#./temp_animations#" > $@

build/index.js:
	@mkdir -p $(@D)
	echo $(foreach a, $(PROD_ELS), "import '../"$(a)"';") > $@

.PHONY: all clean serve
