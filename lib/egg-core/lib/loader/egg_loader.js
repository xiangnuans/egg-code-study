'use strict';
const fs = require('fs');
const path = require('path')
const is = require('is-type-of');

// EggLoader start
class EggLoader {
  constructor(options) {
    this.options = options;
    this.app = this.options.app;
  }
  loadFile(filePath, ...inject) {
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const extname = path.extname(filePath);
    if (!['.js', '.node', '.json', ''].includes(extname)) {
      return fs.readFileSync(filePath)
    }

    const ret = require(filePath);
    if (inject.length === 0) inject = [this.app];
    console.log('ret(...inject) == ', ret(...inject))
    return is.asyncFunction(ret) ? ret(...inject) : ret;
    
  }
}



const loaders = [
  // LoaderMixinRouter,
  require('./mixin/router')
]

for (const loader of loaders ) {
  Object.assign(EggLoader.prototype, loader)
}

module.exports = EggLoader;