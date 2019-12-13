# koa-router原有功能

- koa-router原生功能
  - get
  - post
  - put
  - del
  - ..
因为Egg.js的EggCore.router模块继承了koa-router模块的路由，所以koa-router原有的路由能力，Egg.js都有

Egg.js将EggCore.Router从原始版本就将原生方式代理到this.app中，所以从一开始就可以世界使用app.get(....)、app.post(...)等方式去注册路由，随着Egg.js能力的增加挂在到this.app上的方法越来越多。为了更加方便使用和API的梳理，官方建议路由的使用方式使用app.router.get(...)、app.router.post(...)等该类似的格式使用。

> **因为Egg.js的基础路由功能是继承自koa-router，这一章主要讲Egg.js对路由增强的能力，原生路由的能力可以去koa-router alexmingoia/koa-router 模块仓库查看底层实现原理。**

# 路由初始化过程

- 继承koa-router
- 兼容koa-router路由的中间件使用
- 封装所有controller
  - 封装兼容Generator Function
  - 通过controller句柄读取this.app.controller中对应的controller

## egg-core增强功能

- 路由大小写敏感
- RESTFul实现
- Generator Function 兼容
- Controller

### 大小写敏感

因为koa-router源码关闭了路由大小敏感，egg-core在一开始router初始化的时候，就开启了大小写敏感的功能new Router({ sensitive: true }, this)。

```js
class EggCore extends Koa {

  constructor(options) {
    // ...
  }

  // ...

  get router() {
    if (this[ROUTER]) {
      return this[ROUTER];
    }

    // 开启路由大小写敏感
    const router = this[ROUTER] = new Router({ sensitive: true }, this);
    // register router middleware
    this.beforeStart(() => {
      this.use(router.middleware());
    });
    return router;
  }

  // ...
}
```

### RESTFul实现

koa-router本身不自带RESTFul能力，Egg.js是面向企业而设计的，RESTFul能力是服务API开发的基本能力。因此，Egg.js的路由提供了`router.resources('routerName', 'pathMatch', controller)`的方法去约定和处理RESTFul的实现

**RESTFul约定**

- routerName： RESTFul路由名称，例如 posts
- pathMatch: RESTFul基础路由路径，例如 /posts
- controller：路由执行控制器集合
  - controller.index: 对应GET请求的/posts路径
  - controller.new: 对应GET请求的/posts/new路径
  - controller.show: 对应GET请求的 /posts/:id路径
  - controller.edit 对应 GET 请求的 /posts/:id/edit 路径
  - controller.create 对应 POST 请求的 /posts 路径
  - controller.update 对应 PATCH 请求的 /posts/:id 路径
  - controller.destroy 对应 DELETE 请求的 /posts/:id 路径

RESTFul实现源码

- 约定路由路径和对应的控制器
- 统一处理看封装router的参数
- 根据请求类型和路径注册对应的控制器
  - 统一封装controller
    - Async Function
    - Generator Function
    - controller句柄读取this.app.controller

```js
const REST_MAP = {
  index: {
    suffix: '',
    method: 'GET',
  },
  new: {
    namePrefix: 'new_',
    member: true,
    suffix: 'new',
    method: 'GET',
  },
  create: {
    suffix: '',
    method: 'POST',
  },
  show: {
    member: true,
    suffix: ':id',
    method: 'GET',
  },
  edit: {
    member: true,
    namePrefix: 'edit_',
    suffix: ':id/edit',
    method: 'GET',
  },
  update: {
    member: true,
    namePrefix: '',
    suffix: ':id',
    method: [ 'PATCH', 'PUT' ],
  },
  destroy: {
    member: true,
    namePrefix: 'destroy_',
    suffix: ':id',
    method: 'DELETE',
  },
};

class Router extends KoaRouter {
  // ...


}
```



