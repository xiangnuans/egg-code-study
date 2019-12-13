'use strict';
const path = require('path');

module.exports = {
  loadRouter() {
    // 加载egg.js应用工程目录
    this.loadFile(path.join(this.options.baseDir, 'app/router.js'))
  }
}