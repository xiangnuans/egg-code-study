'use strict';
/**
 * HTTP Server HTTP服务器，处理最基本请求(Request)和响应(Response)
 * Route Parser 路由解析器，处理不同请求URL的跳转页面或者返回数据
 */
const { EggLoader, EggCore } = require('../egg-core')


class AppWorkerLoader extends EggLoader {
  loadAll() {
    this.loadRouter();
  }
}


class EggApplication extends EggCore {
  constructor(options) {
    super(options);
    this.on('error', err => {
      console.error(err)
    });
    this.loader.loadAll();
  }

  get [Symbol.for('egg#eggPath')]() {
    return __dirname;
  }

  get [Symbol.for('egg#loader')]() {
    return AppWorkerLoader;
  }
}

module.exports = EggApplication;