"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var array_1 = require("./array");
var base_1 = require("./base");
function get(map, key1, key2, key3, key4, key5) {
    if (map === undefined)
        return undefined;
    var value = map[key1];
    if (key2 === undefined)
        return value;
    else if (key3 === undefined)
        return get(value, key2);
    else if (key4 === undefined)
        return get(value, key2, key3);
    else if (key5 === undefined)
        return get(value, key2, key3, key4);
    return get(value, key2, key3, key4, key5);
}
exports.get = get;
function set(map, key1, key2, key3, key4, key5) {
    return function (value) {
        var _a, _b, _c, _d, _e;
        if (map === undefined)
            return map;
        if (key2 === undefined) {
            return __assign(__assign({}, map), (_a = {}, _a[key1] = value, _a));
        }
        else if (key3 === undefined) {
            return __assign(__assign({}, map), (_b = {}, _b[key1] = set(map[key1], key2)(value), _b));
        }
        else if (key4 === undefined) {
            return __assign(__assign({}, map), (_c = {}, _c[key1] = set(map[key1], key2, key3)(value), _c));
        }
        else if (key5 === undefined) {
            return __assign(__assign({}, map), (_d = {}, _d[key1] = set(map[key1], key2, key3, key4)(value), _d));
        }
        else {
            return __assign(__assign({}, map), (_e = {}, _e[key1] = set(map[key1], key2, key3, key4, key5)(value), _e));
        }
    };
}
exports.set = set;
function update(map, key1, key2, key3, key4, key5) {
    return function (callback) {
        if (map === undefined)
            return map;
        if (key2 === undefined) {
            var value = get(map, key1);
            if (value === undefined)
                return map;
            return set(map, key1)(callback(value));
        }
        else if (key3 === undefined) {
            var value = get(map, key1, key2);
            if (value === undefined)
                return map;
            return set(map, key1, key2)(callback(value));
        }
        else if (key4 === undefined) {
            var value = get(map, key1, key2, key3);
            if (value === undefined)
                return map;
            return set(map, key1, key2, key3)(callback(value));
        }
        else if (key5 === undefined) {
            var value = get(map, key1, key2, key3, key4);
            if (value === undefined)
                return map;
            return set(map, key1, key2, key3, key4)(callback(value));
        }
        else {
            var value = get(map, key1, key2, key3, key4, key5);
            if (value === undefined)
                return map;
            return set(map, key1, key2, key3, key4, key5)(callback(value));
        }
    };
}
exports.update = update;
exports.toArray = function (map) {
    return Object.values(map).filter(base_1.notNil);
};
function merge(left, right) {
    if (left === undefined && right === undefined)
        return undefined;
    if (left === undefined)
        return right;
    if (right === undefined)
        return left;
    return Object.keys(right).reduce(function (acc, curr) {
        var _a;
        var leftVal = left[curr];
        var rightVal = right[curr];
        var currVal;
        if (Array.isArray(leftVal) && Array.isArray(rightVal)) {
            currVal = array_1.merge(leftVal, rightVal);
        }
        else if (Array.isArray(rightVal)) {
            currVal = __spreadArrays(rightVal);
        }
        else if (typeof leftVal === 'object' &&
            typeof rightVal === 'object') {
            currVal = merge(leftVal, rightVal);
        }
        else if (typeof rightVal === 'object') {
            currVal = __assign({}, rightVal);
        }
        else {
            currVal = rightVal;
        }
        return __assign(__assign({}, acc), (_a = {}, _a[curr] = currVal, _a));
    }, left);
}
exports.merge = merge;
function map(map, callback) {
    return Object.keys(map).reduce(function (acc, curr) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[curr] = callback(map[curr]), _a)));
    }, map);
}
exports.map = map;
function reduce(map, callback, initialValue) {
    return Object.keys(map).reduce(function (acc, curr, index) { return callback(acc, map[curr], index); }, initialValue);
}
exports.reduce = reduce;
//# sourceMappingURL=record.js.map