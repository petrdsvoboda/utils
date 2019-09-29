"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var date_1 = require("./date");
var number_1 = require("./number");
var record_1 = require("./record");
var string_1 = require("./string");
var compareFn = function (a, b, options) {
    if (a === undefined || b === undefined)
        return 0;
    var result = 0;
    if (options && options.isDate) {
        result = date_1.compare(new Date(a), new Date(b));
    }
    else if (typeof a === 'string' && typeof b === 'string') {
        result = string_1.compare(a, b);
    }
    else {
        result = number_1.compare(a, b);
    }
    if (options &&
        options.ascending !== undefined &&
        options.ascending === false) {
        result = (result * -1);
    }
    return result;
};
function sort(array, options, key1, key2, key3, key4, key5) {
    return array.slice().sort(function (a, b) {
        var aVal;
        var bVal;
        if (key2 === undefined) {
            aVal = record_1.get(a, key1);
            bVal = record_1.get(b, key1);
        }
        else if (key3 === undefined) {
            aVal = record_1.get(a, key1, key2);
            bVal = record_1.get(b, key1, key2);
        }
        else if (key4 === undefined) {
            aVal = record_1.get(a, key1, key2, key3);
            bVal = record_1.get(b, key1, key2, key3);
        }
        else if (key5 === undefined) {
            aVal = record_1.get(a, key1, key2, key3, key4);
            bVal = record_1.get(b, key1, key2, key3, key4);
        }
        else {
            aVal = record_1.get(a, key1, key2, key3, key4, key5);
            bVal = record_1.get(b, key1, key2, key3, key4, key5);
        }
        return compareFn(aVal, bVal, options);
    });
}
exports.sort = sort;
function merge(left, right, options) {
    if (options && options.unique) {
        var arr = left.reduce(function (acc, curr) { return (acc.includes(curr) ? acc : __spreadArrays(acc, [curr])); }, []);
        return right.reduce(function (acc, curr) { return (acc.includes(curr) ? acc : __spreadArrays(acc, [curr])); }, arr);
    }
    else {
        return __spreadArrays(left, right);
    }
}
exports.merge = merge;
//# sourceMappingURL=array.js.map