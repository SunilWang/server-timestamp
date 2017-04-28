/*!
 * server-timestamp
 * Copyright(c) 2017-2017 Sunil Wang
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

module.exports = serverTimestamp;

/**
 * Format timestamp, returns defaults to timestamp
 *
 * ex：
 *
 * function format(timestamp) {
 *    let now = new Date(timestamp);
 *    let year = now.getFullYear();
 *    let month = now.getMonth() + 1;
 *    let date = now.getDate();
 *    let hour = now.getHours();
 *    let minute = now.getMinutes();
 *    let second = now.getSeconds();
 *
 *    //2017-4-27 18:36:56
 *    return year + '-' + month + '-' + date + ' '+ hour + ':' + minute + ':' + second;
 * }
 *
 * @param {Number} timestamp
 * @returns {Number|String|*} defaults to timestamp
 * @private
 */
function defaultFormat(timestamp) {
    return timestamp;
}

/**
 * Create a middleware to add a server timestamp header in milliseconds.
 * Use for Express
 *
 * Options:
 *
 *   - `header` The name of the header to set, defaults to X-Server-Timestamp.
 *   - `format` Format timestamp, see below for private function defaultFormat.
 *
 * @param {Object} [options]
 * @returns {Function}
 * @api public
 */
function serverTimestamp(options) {
    var opts = options || {};
    var header = opts.header || 'X-Server-Timestamp';
    var format = opts.format || defaultFormat;

    if (typeof header !== 'string') {
        throw new Error('header must be a string');
    }

    if (header.length < 1) {
        throw new Error('header the length must be greater than 0');
    }

    if (typeof format !== 'function') {
        throw new Error('format must be a function');
    }

    return function serverTimestamp(req, res, next){
        if (res.getHeader(header)) {
            return next();
        }

        res.setHeader(header, format(Date.now()));
        next();
    };
}