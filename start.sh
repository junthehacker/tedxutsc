#!/bin/bash
JEKYLL_ENV=$1 BUILD=`git rev-parse --short HEAD` bundle exec jekyll serve
