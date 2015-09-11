"use strict";

var transforms = require('./transforms'),
    workflow = require('./workflow');

var options = {
    relative: null,
    transforms: transforms,
    glob: {
        dot: false
    }
};

module.exports = function (path, callback) {
    workflow(path, options, callback);
};

