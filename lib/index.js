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
Object.defineProperty(exports, "__esModule", { value: true });
var record_1 = require("./record");
var array_1 = require("./array");
var a = {
    '1': { test: '111', another: 111 },
    '2': { test: '222', another: 222 },
    '3': { test: '333', another: 333 }
};
var c = {
    '1': { test: '11111', another: 222 },
    '4': { test: '333', another: 333 }
};
console.log(record_1.get(a, '1', 'test'));
console.log(a);
a = record_1.set(a, '1', 'test')('xxx');
console.log(a);
a = record_1.update(a, '2')(function (x) { return (__assign(__assign({}, x), { another: 333 })); });
a = record_1.update(a, '3', 'another')(function (x) { return x + 1; });
console.log(a);
var b = record_1.toArray(a);
console.log('');
console.log(b);
console.log('');
b = array_1.sort(b, {}, 'another');
console.log(b);
console.log('');
b = array_1.sort(b, { ascending: false }, 'another');
console.log(b);
console.log('');
b = array_1.sort(b, { ascending: true }, 'test');
console.log(b);
console.log(a);
console.log(c);
var d = record_1.merge(a, c);
console.log(d);
console.log(a);
var e = record_1.map(a, function (curr) { return (__assign(__assign({}, curr), { another: curr.another + 1 })); });
console.log(e);
console.log(a);
var f = record_1.reduce(a, function (acc, curr) { return acc + curr.another; }, 0);
console.log(f);
//# sourceMappingURL=index.js.map