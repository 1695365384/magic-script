const cwd = process.cwd()
const path = require('path')
module.exports = function (url) {
    return path.resolve(cwd, url)
}
