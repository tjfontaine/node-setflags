var sf = require('./index');

sf.setFlags('--expose-gc');
sf.setFlags('--allow-natives-syntax');
sf.harmonyRequire('./test-harmony');
sf.setFlags('--trace-gc');
