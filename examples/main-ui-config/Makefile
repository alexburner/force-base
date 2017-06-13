include ../../build/options.mk

WEBPACK = ./node_modules/.bin/webpack --hide-modules
KARMA = ./node_modules/karma/bin/karma

PKG = htmlgui
LIB = build/media/gui/lib

ASSETS := $(shell find assets)
HTML   := $(shell find src test test_util -name '*.html')
CSS    := $(shell find src test test_util -name '*.scss')
JS     := $(shell find src test test_util -name '*.js')
TS     := $(shell find src test test_util \( -name \*.ts -o -name \*.tsx \) )

.SUFFIXES:

.PHONY: all
all: build/production-build-finished.tmp

.PHONY: test
test: build/test-build-finished.tmp

.PHONY: install
install: install-clean install-firmware

.PHONY: install-clean
install-clean:
	rm -rf install/

.PHONY: clean
clean:
	rm -rf .happypack .tscache .cache-loader .awcache ./node_modules/.cache
	rm -rf build _SpecRunner.html

.PHONY: distclean
distclean: clean
	rm -rf .install install/*
	$(EXPKGREMOVE) $(PKG)

.PHONY: stage-clean
stage-clean:
	rm -rf $(STAGEDIR)/extrahop/media/gui/*
	rm -rf $(STAGEDIR)/extrahop/media/admin/*

.PHONY: unittest-clean
unittest-clean:
	rm -f build/test_results/*
	rm -f _SpecRunner.html

# Create build subdirectory with media and popout.html
$(LIB):
	mkdir -p $@

FONT_DST=$(patsubst src/shared/font/%, $(LIB)/%, \
	$(wildcard src/shared/font/*))
$(LIB)/%: src/shared/font/% | $(LIB)
	cp $< $@

# Thanks http://stackoverflow.com/a/12959764/973470
rwildcard=$(wildcard $1$2) \
	$(foreach d,$(wildcard $1*),$(call rwildcard,$d/,$2))

BUILD_IMG_SRC=$(strip $(call rwildcard,src/,*.jpg))
BUILD_IMG_DST= $(patsubst %, $(LIB)/%, \
	$(notdir $(BUILD_IMG_SRC)))
$(LIB)/%: $(BUILD_IMG_SRC) | $(LIB)
	cp $(filter %$(@F), $(BUILD_IMG_SRC)) $(LIB)

build/popout.html: src/views/landing/popout.html
	cp $? $@

build/proxyui.js: src/views/landing/proxyui.js
	cp $? $@

JQUERY_ICONS=ui-icons_222222_256x240.png
$(LIB)/$(JQUERY_ICONS): src/vendor/jquery-ui/$(JQUERY_ICONS) | $(LIB)
	cp $< $@

CSSLIB = build/media/gui/css/src
SVG_SPRITES_SRC=$(filter-out src/shared/font/%, \
	$(strip \
	$(call rwildcard,src,*.svg)))
SVG_SPRITES_DST=$(patsubst src/%.svg, \
	$(CSSLIB)/%.css, \
	$(SVG_SPRITES_SRC))
SVG_SPRITES_DIRS=$(sort $(dir $(SVG_SPRITES_DST)))
$(SVG_SPRITES_DIRS):
	mkdir -p $@
$(CSSLIB)/%.css: src/%.svg | $(SVG_SPRITES_DIRS)
	../media/bin/svg2css $< $@

LOGODIR=build/media/gui/css/views/landing/img
$(LOGODIR):
	mkdir -p $@
$(LOGODIR)/logo-flat.css: ../media/css/logo-flat.css | $(LOGODIR)
	cp $< $@
$(LOGODIR)/logo-flat.svg: ../media/img/logo-flat.svg | $(LOGODIR)
	cp $< $@

BUILD_FILES=$(FONT_DST) \
	$(BUILD_IMG_DST) \
	$(SVG_SPRITES_DST) \
	build/popout.html \
	build/proxyui.js \
	$(LIB)/$(JQUERY_ICONS) \
	$(LOGODIR)/logo-flat.css \
	$(LOGODIR)/logo-flat.svg \
	$(ASSETS) \
	$(HTML) \
	$(CSS) \
	$(JS) \
	$(TS)

../media/css/logo-flat.css:
	make -C ../media/ $?

define FUNNY_STORY
ATTENTION:

By default, when the type definitions for underscore.string
(node_modules/@types/underscore.string) are installed, npm will also install
the dependencies (underscore) in a node_modules sub-directory.  This is
problematic because this type definition is picked up and overwrites the
definition as amended by underscore.string.

So when you install @types/underscore.string, you must also remove the
node_modules sub-directory.

A similar situation exists for:
angular-sanitize / angular
angular-route / angular
angular-cookies / angular

Do that now:

$$ rm -rf \
    node_modules/@types/underscore.string/node_modules \
    node_modules/@types/angular-sanitize/node_modules \
    node_modules/@types/angular-route/node_modules \
	node_modules/@types/angular-cookies/node_modules

endef
export FUNNY_STORY

build/development-build-finished.tmp: $(BUILD_FILES)
	NODE_ENV=development make run-webpack
	touch $@

build/test-build-finished.tmp: $(BUILD_FILES)
	NODE_ENV=test $(KARMA) \
		start \
			--auto-watch false \
			--single-run true \
			--reporters spec
	touch $@

build/production-build-finished.tmp: $(BUILD_FILES)
	NODE_ENV=production make -j build/test-build-finished.tmp run-webpack
	touch $@

.PHONY: run-webpack
run-webpack:
	if \
	    [ -e node_modules/@types/underscore.string/node_modules ] || \
	    [ -e node_modules/@types/angular-sanitize/node_modules ]  || \
	    [ -e node_modules/@types/angular-route/node_modules ]     || \
	    [ -e node_modules/@types/angular-cookies/node_modules ] \
	; then \
		echo "$$FUNNY_STORY" && exit 1; \
	fi;
	mkdir -p build/webpack-chunks
	rm -rf build/webpack-chunks/*
	mkdir -p .happypack/${NODE_ENV}
	$(WEBPACK)
	cp build/webpack-chunks/* build/media/gui/

.PHONY: watch-test
watch-test:
	NODE_ENV=test WATCH_MODE=true $(KARMA) \
		start \
		--reporters spec,kjhtml

WATCH_NODE_ENV?=development
watch_prod:
	make WATCH_NODE_ENV=production watch

.PHONY: watch
watch:
	if [ "$$(ls -di /)" = "2 /" ]; then \
		echo "ERROR: Must be run from stage"; \
	else \
		cd /depot/extrahop/htmlgui && \
		if [ ! -e "build/webpack-html/landing.html" ] || [ ! -e "build/webpack-html/admin.html" ]; then \
			su extrahop -c "$(MAKE) build/development-build-finished.tmp"; \
		fi; \
		NODE_ENV=${WATCH_NODE_ENV} WATCH_MODE=true \
			node_modules/.bin/webpack-dev-server \
				--watch \
				--progress \
				--inline false \
				--host 0.0.0.0 \
				--port 8080 \
				--compress; \
	fi

# We only need to list leaf nodes; parents are created automatically.
INSTALLDIRS=install/media/gui \
	install/media/admin/img \
	install/media/img/geomap \
	install/media/img/shared \
	install/media/gui/landing \
	install/media/js/geomap \
	install/media/js/settings \
	install/media/js/shared/lib \
	install/media/css/geomap \
	install/media/css/settings \
	install/media/css/shared/lib \
	install/media/font/shared/lib \
	install/lib/python/portal/templates

install/%:
	$(INSTALL) -d $(INSTALLDIRS)

# angular.edited.js is also used by the admin UI
VENDORLIBS=install/media/js/shared/lib/angular.edited.js \
	install/media/js/shared/lib/hotkeys.js \
	install/media/js/shared/lib/swfobject.js

install/media/js/shared/lib/%: src/vendor/%
	$(INSTALL) -m 755 $? $@

TEMPLATES=install/lib/python/portal/templates/teasers_contact.html \
	install/lib/python/portal/templates/triggers_configuration.html \
	install/lib/python/portal/templates/geomap.html

install/lib/python/portal/templates/teasers_contact.html: \
	src/views/teasers_contact.html
install/lib/python/portal/templates/triggers_configuration.html: \
	src/views/settings/triggers_configuration.html
install/lib/python/portal/templates/geomap.html: \
	src/views/geomap/geomap.html
install/lib/python/portal/templates/%:
	$(INSTALL) -m 755 $? $@

# The below _DST rules are complex, but they keep us from invoking rsync
# for every folder on every build, as we did before.

GEOJS_DST=$(patsubst  src/views/%, install/media/js/%, \
	$(wildcard src/views/geomap/*.js))
install/media/js/geomap/%: src/views/geomap/%
	rsync -Crlpt src/views/geomap/*.js $(@D)

ASSETJS_DST=$(patsubst assets/js/%, install/media/js/shared/%, \
	$(wildcard assets/js/*) $(wildcard assets/js/lib/*))
install/media/js/shared/%: assets/js/%
	rsync -Crlpt assets/js/ install/media/js/shared

SETTINGSJS_DST=$(patsubst src/views/settings/%, install/media/js/settings/%, \
	$(wildcard src/views/settings/*.js))
install/media/js/settings/%: src/views/settings/%
	rsync -Crlpt src/views/settings/*.js $(@D)

GEOMAPIMG_DST=$(patsubst src/views/geomap/img/%, install/media/img/geomap/%, \
	$(wildcard src/views/geomap/img/*))
install/media/img/geomap/%: src/views/geomap/img/%
	rsync -Crlpt src/views/geomap/img/* $(@D)

IMG_DST=$(patsubst assets/img/%, install/media/img/shared/%, \
	$(wildcard assets/img/*))
install/media/img/shared/%: assets/img/%
	rsync -Crlpt assets/img/* $(@D)

ADMIN_IMG_DST=$(patsubst ../portal/images/%, install/media/admin/img/%, \
	$(wildcard ../portal/images/*))
install/media/admin/img/%: ../portal/images/%
	rsync -Crlpt ../portal/images/* $(@D)

GEOMAPCSS_DST=$(patsubst src/views/geomap/%, install/media/css/geomap/%, \
	$(wildcard src/views/geomap/*.css))
install/media/css/geomap/%: src/views/geomap/%
	rsync -Crlpt src/views/geomap/* $(@D)

SETTINGSCSS_DST=$(patsubst src/views/settings/%, \
	install/media/css/settings/%, \
	$(wildcard src/views/settings/*.css))
install/media/css/settings/%: src/views/settings/%
	rsync -Crlpt src/views/settings/*.css $(@D)

ASSETCSS_DST=$(patsubst assets/css/%, install/media/css/shared/%, \
	$(wildcard assets/css/*) $(wildcard assets/css/lib/*))
install/media/css/shared/%: assets/css/%
	rsync -Crlpt assets/css/ install/media/css/shared

ASSETFONT_DST=$(patsubst assets/font/lib/%, install/media/font/shared/lib/%, \
	$(wildcard assets/font/lib/*))
install/media/font/shared/lib/%: assets/font/lib/%
	rsync -Crlpt assets/font/lib/ $(@D)

.PHONY: package
package: $(INSTALLDIRS) $(VENDORLIBS) $(TEMPLATES) $(GEOJS_DST) \
	$(ASSETJS_DST) $(SETTINGSJS_DST) $(GEOMAPIMG_DST) $(IMG_DST) \
	$(ADMIN_IMG_DST) $(GEOMAPCSS_DST) $(SETTINGSCSS_DST) $(ASSETCSS_DST) \
	$(ASSETFONT_DST)
	gzip -f9k build/media/gui/htmlgui.*.{css,js}
	rsync -Crlpt build/media/gui                        install/media/
	rsync -Crlpt build/webpack-html/landing.html        install/media/gui/landing/landing.html
	rsync -Crlpt build/webpack-html/admin.html          install/media/admin/index.html
	rsync -Crlpt build/popout.html                      install/media/gui/landing/popout.html
	rsync -Crlpt build/proxyui.js                       install/media/gui/landing/proxyui.js

.PHONY: install-stage
install-stage: build/production-build-finished.tmp
	$(MAKE) package
	rsync -Crlpt install/* $(STAGEDIR)/extrahop/

.PHONY: install-firmware
install-firmware: package
	$(EXPKGADD) install $(PKG)
