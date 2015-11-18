#!/usr/bin/env node

var file2Json = require('./index'),
    arguments = require('minimist')(process.argv.slice(2));

var srcPath = arguments._[0] || null,
    relativePath = arguments.relative || arguments.r || null;

file2Json(srcPath, relativePath, function (error, json) {
    process.stdout.write(JSON.stringify(json, null, 4) + '\n');
});
