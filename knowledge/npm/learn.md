# npm学习  
## 升级npm
    sudo npm install npm -g
## 登陆
    npm adduser
    //自行输入用户du
## npm的配置清单
    npm config list
## npm的配置清单例子
    ; cli configs
    metrics-registry = "https://registry.npmjs.org/"
    scope = ""
    user-agent = "npm/5.5.1 node/v8.9.0 darwin x64"

    ; node bin location = /usr/local/bin/node
    ; cwd = /Users/apple
    ; HOME = /Users/apple
    ; "npm config ls -l" to show all defaults.
## 查看本地包
    npm list
## 查看全局包 记得加--depth=0
     npm list -g --depth=0
## 查看一个包的历史信息
    npm info bootstrap
## 什么是package.json
  package.json是npm包的配置文件，里面可以包含项目的名字，版本号，项目的描述，git仓库，关键字，作者，依赖的包等等，但是至少要包含项目的名字，版本号，是可以手工创建的，但是也可以用NPM自动创建。
## npm包创建
    npm init
## npm安装本地包
    npm i
## npm包例子
    {
      "name": "simplejan-web",
      "version": "1.0.0",
      "description": "none",
      "repository": "none",
      "readme": "README.md",
      "main": "index.html",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "UNLICENSED",
      "dependencies": {
        "bootstrap": "^3.3.6",
        "bootstrap-material-design": "^0.5.9",
        "snackbarjs": "^1.1.0",
        "nouislider": "^6.2.0",
        "jquery": "*"
      },
      "devDependencies":{
      },
    }
## npm包发布
    npm publish
## npm删除发布的包-一定要加 --force强制删除
    npm unpublish --force
## 编写可执行命令
  >package.json添加bin字段 "tb-cli"自由命名

    "bin":{
      "tb-cli":"./index.js"
    },
  >接受参数，process.argv输入的内容数组，默认有2项

    console.log("第一项为node.exe的绝对路径");
    console.log("执行该js的绝对路径");
    console.dir(process.argv);






