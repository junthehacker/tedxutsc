#!/bin/bash
BUILD_HASH=`git rev-parse --short HEAD`
BUILD_TIME=`date +_%Y%m%d_%H%M%S`
JEKYLL_ENV=$1 BUILD="$BUILD_HASH$BUILD_TIME" bundle exec jekyll serve
