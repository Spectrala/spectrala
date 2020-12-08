SHELL := bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

app: pyinst
	rm -r -f dist
	mkdir -p dist
	cp -R localserver/dist/spectrala dist
.PHONY: app

pyinst: webapp_prod
	cp -R spectrala/build/. localserver/static
	cd localserver && ./pyinstaller.sh
.PHONY: pyinst

webapp_prod:
	cd spectrala && yarn build
.PHONY: webapp_prod

clean:
	rm -r -f dist
	rm -r -f spectrala/build
	rm -r -f localserver/dist
	rm -r -f localserver/build
	rm -r -f localserver/static
	rm -r -f localserver/*.spec
.PHONY: clean
