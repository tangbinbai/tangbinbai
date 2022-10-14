# webpack

## 介绍
  webpack是一个资源整合打包工具
## 全局安装webpack
## 默认只支持打包js
    webpack index.js -o bundle.js --mode development
    //-o 一定要，表示输出
    //--mode development 表示开发模式，不会压缩代码，否则压缩代码

    webpack --mode production src/main.js --output-filename app.bundle.js --output-path dist
    4.0以后需要写 --output-filename和--output-path
    试过了，就是第一个答案，需要这样写
    webpack --mode development src/index.js --output-filename app.js --output-path dist