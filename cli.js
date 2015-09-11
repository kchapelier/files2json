#!/usr/bin/env node

var file2Json = require('./index'),
    srcPath = process.argv[2];

file2Json(srcPath, function (error, json) {
    console.log(JSON.stringify(json, null, 4));
});
