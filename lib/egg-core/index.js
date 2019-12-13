'use strict';

const Koa = require('koa');
const Router = require('./lib/utils/router');
const EggLoader = require('./lib/loader/egg_loader')

const EGG_LOADER = Symbol('egg#loader');
const ROUTER = Symbol('egg#router');
const methods = ['head', 'options', 'get', 'put', 'patch', 'post', 'delete', 'all'];

// EggLoader end

// EggLoader start
class EggCore extends Koa {
  constructor(options) {
    options.baseDir = options.baseDir || process.cwd();
    options.type = options.type || 'application'; // or agent
    super(options);

    const Loader = this[EGG_LOADER];
    // 预期 loader: {}? or loader: []
    console.log('Loader ....', Loader);
    this.loader = new Loader({
      baseDir: options.baseDir,
      app: this
    });

    console.log('this.loader ===> ', this.loader);
  }

  get router() {
    if (this[ROUTER]) {
      return this[ROUTER];
    }

    const router = this[ROUTER] = new Router({ sensitive: true }, this);  // 开启了路由大小写敏感的功能，koa默认是关闭该功能的
    this.beforeStart(() => {
      this.use(router.middleware())
    })
    return router;
  }

  beforeStart(fn) {
    process.nextTick(fn)
  }
}

methods.concat(['resource', 'register', 'redirect']).forEach(function(method) {
  EggCore.prototype[method] = function (...args) {
    this.router[method](...args);
    return this;
  }
});

module.exports = {
  EggCore,
  EggLoader,
};