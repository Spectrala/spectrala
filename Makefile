SHELL := bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

app: pyinst
	mkdir -p dist
	cp -R localserver/dist/spectrala dist/
.PHONY: app

pyinst: webapp_prod
	cp --recursive spectrala/build/. localserver/static
	cd localserver
	pyinstaller spectrala.spec
.PHONY: pyinst

webapp_prod:
	cd spectrala
	yarn build
.PHONY: webapp_prod

clean:
	rm --recursive --force dist
	rm --recursive --force spectrala/build
	rm --recursive --force localserver/dist
	rm --recursive --force localserver/build
	rm --recursive --force localserver/static
.PHONY: clean
