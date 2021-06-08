const path = require('path');
const fs = require('fs');
const routerUrl = fs.readFileSync(path.resolve(process.cwd(), '.tmp/path.json'), 'utf-8');
