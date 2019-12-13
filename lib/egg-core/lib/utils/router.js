'use strict';
const KoaRouter = require('koa-router')

class Router extends KoaRouter {
  constructor (opts, app) {
    super(opts);
    this.app = app;
  }
}

module.exports = Router;
