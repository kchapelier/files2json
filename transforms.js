"use strict";

var csvParse = require('csv-parse');

var csvOptions = {
    trim: true
};

var transforms = [
    {
        mimeTypes: ['application/json'],
        operation: function (content, callback) {
            callback(null, JSON.parse(content));
        }
    },
    {
        mimeTypes: ['text/csv'],
        operation: function (content, callback) {
            csvParse(content, csvOptions, callback);
        }
    }
];

module.exports = transforms;
