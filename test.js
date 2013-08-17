var sf = require('./index');

sf.setFlags('--expose-gc');
sf.setFlags('--trace-gc');
sf.setFlags('--allow-natives-syntax');
sf.harmonyRequire('./test-harmony');
