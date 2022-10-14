# nodejs 笔记
## 文件拷贝
    > fs.copyFileSync("./hello.js","./test/bowentang/hello.js")
###文件简要
  require('fs')引入文件模块。 支持异步、同步
  同步采用try catch处理异常；异步采用回调，判断一个参数的值
## 删除文件
    const fs = require('fs');
    fs.unlink('/hello.js', (err) => {
      if (err) throw err;
      console.log('成功删除hello.js');
    });
## 新建文件
## 写文件
## 读取test文件夹
    > fs.readdirSync("./test")
    [ '.DS_Store', 'bowentang', 'chriss' ]
## 创建test文件夹
    > fs.mkdirSync("./newfinder")
## watch
    //recursive可监听的子目录
    fs.watch('./test', { recursive:true,encoding: 'utf8' }, (eventType, filename) => {
      if (filename) {
        console.log(filename);
        // 输出: <Buffer ...>
      }
    });
    //output:bowentang/hello.js
## path
### 获取basename，平台通用basename
    > path.posix.basename('/tmp/myfile.html')
    'myfile.html' 
### 完整目录下，返回一个目录名dirname
    > path.dirname('/foo/bar/baz/asdf/quux.html');
    '/foo/bar/baz/asdf'
### 拓展名获取extname
    > path.extname('index.html');
    '.html'
### 拼凑一个完整路径format
    > path.format({
    ...   root: '/ignored',
    ...   dir: '/home/user/dir',
    ...   base: 'file.txt'
    ... });
    '/home/user/dir/file.txt'
### 获取系统内环境变量路径
    > process.env.PATH.split(path.delimiter);
    [ '/opt/local/bin',
      '/opt/local/sbin',
      '/usr/local/heroku/bin',
      '/Library/Java/JavaVirtualMachines/jdk1.8.0.jdk/Contents/Home/bin',
      '/usr/local/bin',
      '/usr/bin',
      '/bin',
      '/usr/sbin',
      '/sbin',
      '/Users/apple/.local/bin' ]
## 断言，调试
### assert(boolean)
    assert(bolean,[打印字段一,打印字段二])
### assert.deepEqual(a,b)
    深度相等
    var a={x:1}
    var b={x:1}
    assert.deepEqual(a, b)

## buffer
### toString
    //如果filename为buffer
    filename.toString("utf8")
    //ceshi.js

## demo
### 文件夹拷贝
    var fs=require("fs");
    var path=require("path");
    /**
     * 拷贝文件夹
     * @method copyFolder
     * @param  {[type]}   copyFolderPath   [拷贝的文件夹路径]
     * @param  {[type]}   pasteFolderPath  [粘贴的文件夹路径]
     */
    //拷贝一层目录
    function copyFolder(copyFolder,pasteFolder){
      //拷贝文件和文件夹
      var con=fs.readdirSync(copyFolder);
      for(var i=0;i<con.length;i++){
        var fileOrFolder=path.parse(con[i]);
        if(fileOrFolder.ext!=""){
          try{
            fs.copyFileSync(
              path.format({root:copyFolder,base:fileOrFolder.base}),
              path.format({root:pasteFolder,base:fileOrFolder.base})
            )
          }catch(e){}
        }else if(fileOrFolder.name && fileOrFolder.name.slice(0,1)!="."){
          try{ 
            var targetPath=pasteFolder+fileOrFolder.name;
            if (!fs.existsSync(targetPath)){
              fs.mkdirSync(targetPath);
            }
            //递归拷贝
            arguments.callee(
              copyFolder+"/"+fileOrFolder.name+"/",
              pasteFolder+"/"+fileOrFolder.name+"/"
            );
          }catch(e){}
        }
      }
    };
    module.exports = copyFolder;
    };
    copyFolder("./test/bowentang/","./test/chriss/")