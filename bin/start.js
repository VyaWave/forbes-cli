#!/usr/bin/env node

require('../')
const pkg = require('../package.json')
console.log('cli-version: ', pkg.version)
