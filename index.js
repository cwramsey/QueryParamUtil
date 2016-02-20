/// <reference path="./typings/node/node.d.ts" />
'use strict';
var QueryParamUtil = (function () {
    function QueryParamUtil() {
    }
    /**
     * Finds a specific key and returns it's value
     * If not set, will return a default value
     *
     * @param {string} name
     * @param {any} [default_val=null]
     * @param query_string?
     * @returns string[]|string
     */
    QueryParamUtil.find = function (name, default_val, query_string) {
        if (default_val === void 0) { default_val = null; }
        if (query_string === void 0) { query_string = window.location.search; }
        return this.all(query_string)[name] || default_val;
    };
    /**
     * Fills an object with all key/val pairs from a query string
     * defaults to window.location.search if not specified
     *
     * @param {string} query_string
     * @returns Object
     */
    QueryParamUtil.all = function (query_string) {
        if (query_string === void 0) { query_string = window.location.search; }
        if (!query_string.length) {
            return null;
        }
        return query_string.replace(/^\?/, '')
            .split('&')
            .map(function (x) { return x.split('='); })
            .reduce(QueryParamUtil._toObject, {});
    };
    /**
     * Takes an object of key/vals and returns an encoded url param string
     *
     * @param {Object} values
     * @returns {string}
     */
    QueryParamUtil.set = function (values) {
        var keys = Object.keys(values);
        return keys.reduce(QueryParamUtil._encode(values), '');
    };
    QueryParamUtil._encode = function (values) {
        return function (encoded, key_name) {
            if (Array.isArray(values[key_name])) {
                values = QueryParamUtil._clone(values[key_name]);
                values[key_name + '[]'] = values[key_name];
                encoded = encoded + '&' + values[key_name].reduce(QueryParamUtil._encode(values));
            }
            else {
                encoded = encoded + "&" + key_name + "=" + values[key_name];
            }
            return encoded.substring(0, 1) === '&' ? encoded.substring(1, encoded.length) : encoded;
        };
    };
    QueryParamUtil._clone = function (obj) {
        return JSON.parse(JSON.stringify(obj));
    };
    QueryParamUtil._toObject = function (previous, current) {
        var key_name = current[0].indexOf('[]') > -1 ? current[0].replace('[]', '') : current[0];
        if (!previous[key_name]) {
            previous[key_name] = current[1];
        }
        else if (previous[key_name] && !Array.isArray(previous[key_name])) {
            previous[key_name] = [].concat([previous[key_name]], [current[1]]);
        }
        else if (previous[key_name] && Array.isArray(previous[key_name])) {
            previous[key_name] = previous[key_name].concat([current[1]]);
        }
        return previous;
    };
    return QueryParamUtil;
})();
exports.QueryParamUtil = QueryParamUtil;
//# sourceMappingURL=index.js.map