const mkdirp = require('mkdirp');
const resolveApp = require('../utils/resolveApp');
mkdirp.sync(resolveApp('.tmp'));
