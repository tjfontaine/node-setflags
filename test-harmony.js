'use strict';
let x = '100';
console.log('x', x);
exports.wm = new WeakMap();
gc();
setTimeout(gc, 1 * 1000);
var foo = %NumberToJSUint32(-1);
console.log('foo', foo);
console.log(require('./index'));
