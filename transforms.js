"use strict";

var csvParse = require('csv-parse');

var csvOptions = {
    trim: true
};

var transforms = [
    {
        mimeTypes: ['application/json'],
        operation: function (buffer, callback) {
            callback(null, JSON.parse(buffer.toString()));
        }
    },
    {
        mimeTypes: ['text/csv'],
        operation: function (buffer, callback) {
            csvParse(buffer.toString(), csvOptions, callback);
        }
    }
];

module.exports = transforms;
