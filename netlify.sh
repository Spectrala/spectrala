#!/usr/bin/env bash

set -euxo pipefail

cd spectrala
yarn install
yarn build
cd ..
cp -R spectrala/build ./netlify-public
