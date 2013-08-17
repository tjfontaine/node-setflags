# setflags

Set v8 command line flags at runtime, which would theoretically let you enable
harmony features at runtime.

## setFlags(args)

Either a string or an array of strings as if you had passed them on the command
line to node.

## harmonyRequire(module[, args])

Allows you to require a module as if harmony features were enabled, this
implies the target module will be loaded in a new context.

  * `'--harmony_collections'`
  * `'--harmony_modules'`
  * `'--harmony_proxies'`
  * `'--harmony_scoping'`
  * `'--harmony_typeof'`

## Example

### test.js

```javascript
var sf = require('setflags');
sf.harmonyRequire('./test-harmony');
```

### test-harmony.js

```javascript
'use strict';
let x = '100';
console.log('x', x);
exports.wm = new WeakMap();
```

## License

MIT
