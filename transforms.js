var csvParse = require('csv-parse');

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
            csvParse(content, { trim: true }, callback);
        }
    }
];

module.exports = transforms;
