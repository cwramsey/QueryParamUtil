/// <reference path="./typings/node/node.d.ts" />

'use strict';

export class QueryParamUtil {
    /**
     * Finds a specific key and returns it's value
     * If not set, will return a default value
     *
     * @param {string} name
     * @param {any} [default_val=null]
     * @param query_string?
     * @returns string[]|string
     */
    public static find(name:string, default_val:any = null, query_string:string = window.location.search):string[]|string {
        return this.all(query_string)[name] || default_val;
    }

    /**
     * Fills an object with all key/val pairs from a query string
     * defaults to window.location.search if not specified
     *
     * @param {string} query_string
     * @returns Object
     */
    public static all(query_string:string = window.location.search):Object {
        if (!query_string.length) {
            return null;
        }

        return query_string.replace(/^\?/, '')
                           .split('&')
                           .map(x => x.split('='))
                           .reduce(QueryParamUtil._toObject, {});
    }

    /**
     * Takes an object of key/vals and returns an encoded url param string
     *
     * @param {Object} values
     * @returns {string}
     */
    public static set(values:Object):string {
        const keys = Object.keys(values);

        return keys.reduce(QueryParamUtil._encode(values), '');
    }

    protected static _encode(values:Object) {
        return function (encoded:string, key_name:string):string {
            if (Array.isArray(values[key_name])) {
                values = QueryParamUtil._clone(values[key_name]);
                values[key_name + '[]'] = values[key_name];
                encoded = encoded + '&' + values[key_name].reduce(QueryParamUtil._encode(values));
            } else {
                encoded = `${encoded}&${key_name}=${values[key_name]}`;
            }

            return encoded.substring(0, 1) === '&' ? encoded.substring(1, encoded.length) : encoded;
        }
    }

    protected static _clone(obj:Object):Object {
        return JSON.parse(JSON.stringify(obj));
    }

    protected static _toObject(previous:string[], current:string[]):Object {

        const key_name = current[0].indexOf('[]') > -1 ? current[0].replace('[]', '') : current[0];

        if (!previous[key_name]) {
            previous[key_name] = current[1];
        } else if (previous[key_name] && !Array.isArray(previous[key_name])) {
            previous[key_name] = [].concat([previous[key_name]], [current[1]])
        } else if (previous[key_name] && Array.isArray(previous[key_name])) {
            previous[key_name] = previous[key_name].concat([current[1]]);
        }

        return previous;
    }
}