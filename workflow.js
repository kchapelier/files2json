var async = require('async'),
    fs = require('fs'),
    path = require('path'),
    glob = require('glob'),
    mime = require('mime');

var isFile = function isFile (path) {
    return fs.statSync(path).isFile();
};

var getMimeType = function (path) {
    return mime.lookup(path);
};

var getFile = function (path, callback) {
    var file = {
        path: path,
        mimeType: getMimeType(path),
        content: null
    };

    fs.readFile(path, { encoding: 'utf8' }, function (error, data) {
        file.content = data;

        callback(error, file);
    });
};

var getFiles = function (paths, callback) {
    async.map(paths, getFile, callback);
};

var applyTransform = function (file, callback) {
    var mimeType = file.mimeType,
        transform = null;

    for (var i = 0; i < this.transforms.length; i++) {
        if (this.transforms[i].mimeTypes.indexOf(mimeType) >= 0) {
            transform = this.transforms[i];
            break;
        }
    }

    if (transform) {
        transform.operation(file.content, function (error, data) {
            file.content = data;
            callback(error, file);
        });
    } else {
        callback(null, file);
    }
};

var applyTransforms = function (files, options, callback) {
    async.map(files, applyTransform.bind({ transforms: options.transforms }), callback);
};

var createResult = function (files, options) {
    var result = {};

    files.forEach(function (file) {
        var filePath = path.normalize(file.path),
            content = file.content;

        if (options.relative) {
            filePath = path.relative(options.relative, filePath);
        }

        result[filePath] = file.content;
    });

    return result;
};

module.exports = function (path, options, callback) {
    glob(path, options.glob, function (error, paths) {
        paths = paths.filter(isFile);

        getFiles(paths, function (error, files) {
            applyTransforms(files, options, function(error, files) {
                callback(error, createResult(files, options));
            });
        });
    });
};
