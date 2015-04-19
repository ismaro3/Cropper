#!/bin/bash

java -jar cropper-helper.jar > .tmp/java.log 2> .tmp/java.err.log &
npm install
bower install
grunt serve
