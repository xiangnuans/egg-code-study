# 目录讲解

├── app # Egg.js 应用目录
│   └── router.js
├── index.js # Egg.js 应用启动文件
├── lib # Egg.js 相关模块目录
│   ├── egg # 模拟npm模块egg的最小系统 
│   │   └── index.js 
│   └── egg-core # 模拟npm模块egg-core的最小系统
│       ├── index.js
│       └── lib
│           ├── egg.js # egg-core核心类，继承koa
│           ├── loader
│           │   ├── egg_loader.js # egg-core加载器
│           │   └── mixin # egg-core 各加载器内容
│           │       └── router.js
│           └── utils # egg-core工具目录 
│               └── router.js # egg-core内置Router，继承koa-router
└── package.json