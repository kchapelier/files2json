#!/usr/bin/env node

var file2Json = require('./index'),
    srcPath = process.argv[2];

file2Json(srcPath, function (error, json) {
    process.stdout.write(JSON.stringify(json, null, 4) + '\n');
});
