#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const pageList = []
let pagePath = 'src/app/pages'
let appDir = fs.realpathSync(process.cwd())
let fileFix = ['index.ts', 'index.tsx', 'index.js', 'index.vue']

const walkSync = (dir) => {
    const files = fs.readdirSync(path.resolve(appDir, dir)).sort();
    let pathList = []
    files.forEach(file => {
        let childPath = dir + '/' + file
        if (fs.statSync(childPath).isDirectory()) {
            pathList = walkSync(childPath, pathList)
        } else {
            if (fileFix.includes(file)) {
                childPath = childPath.split(path.sep).join('/')
                let childPagePath = childPath.substring(childPath.indexOf(pagePath)).replace(`${pagePath}/`, '').replace(/\/index\.(tsx|jsx)/, '')
                pageList.push(childPagePath.toLocaleLowerCase())
            }
        }
    })
    return pathList
}

walkSync(pagePath)

fs.writeFileSync('.tmp/path.json', JSON.stringify(pageList, null, '\t'))
