"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Record = require("./record");
var input = { foo: { bar: 1 } };
Record.update(input, 'foo', 'bar')(function (v) { return v + 1; });
//# sourceMappingURL=index.js.map