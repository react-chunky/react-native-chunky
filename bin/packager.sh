#!/usr/bin/env bash

THIS_DIR=$(dirname "$0")
node "$THIS_DIR/../node_modules/react-native/local-cli/cli.js" start "$@"
