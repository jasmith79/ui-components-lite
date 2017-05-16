SHELL     := /bin/bash
PATH      := ./node_modules/.bin:$(PATH)
NULL      :=
SPACE     := $(NULL) $(NULL)
COMMA     := ,
CORE_LIST := $(subst $(COMMA), $(SPACE), $(CORE))
CORE_DEPS := $(foreach comp, $(CORE_LIST), core/$(comp)/$(comp).js)
CORE_CSS  := animation/_ripple.sass $(foreach comp, $(CORE_LIST), core/$(comp)/_$(comp).sass)
COMP_LIST := $(subst $(COMMA), $(SPACE), $(COMPONENTS))
COMP_DEPS := $(foreach comp, $(COMP_LIST), components/$(comp)/$(comp).js)
COMP_CSS  := $(foreach comp, $(COMP_LIST), components/$(comp)/_$(comp).sass)

all: build/ui.js build/ui.css

serve:
	python3 -m http.server 8080

clean:
	rm -rf build

build/ui.js: node_modules/es6-promise/dist/es6-promise.auto.js core/polyfill.js core/core.js $(CORE_DEPS) $(COMP_DEPS)
	@mkdir -p $(@D)
	babel $^ -o $@

build/main.sass: utils/_mixins.sass utils/_utility_classes.sass core/_core.sass $(CORE_CSS) $(COMP_CSS)
	@mkdir -p $(@D)
	@echo $(foreach f, $^, "@import:'$(f)'") | tr " " "\n" | tr ":" " " > $@

build/ui.css: build/main.sass
	@mkdir -p $(@D)
	node-sass $^ $@
	rm build/main.sass

.PHONY: all clean serve