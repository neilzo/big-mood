#!/usr/bin/env bash

set -e

npm install -g node-gyp
npm install -g node-pre-gyp

cd ./node_modules/realm/

node-pre-gyp install --fallback-to-build