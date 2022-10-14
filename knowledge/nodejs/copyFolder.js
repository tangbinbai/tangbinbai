var fs=require("fs");
var path=require("path");
/**
 * 拷贝文件夹
 * @method copyFolderPath
 * @param  {[type]}   copyFolderPath   [拷贝的文件夹路径]
 * @param  {[type]}   pasteFolderPath  [粘贴的文件夹路径]
 * @return {[type]}   [description]
 */
function copyFolder(copyFolderPath,pasteFolderPath) {
  //拷贝一层目录
  function copyOneLayer(copyFolder,pasteFolder){
    var con=fs.readdirSync(copyFolder);
    for(var i=0;i<con.length;i++){
      var fileOrFolder=path.parse(con[i]);
      if(fileOrFolder.ext!=""){
        try{
          fs.copyFileSync(
            path.format({root:copyFolder,base:fileOrFolder.base}),
            path.format({root:pasteFolder,base:fileOrFolder.base}), 
          )
        }catch(e){}
      }else if(fileOrFolder.name && fileOrFolder.name.slice(0,1)!="."){
        try{ 
          fs.mkdirSync(pasteFolder+fileOrFolder.name);
          //递归拷贝
          arguments.callee(
            copyFolder+"/"+fileOrFolder.name+"/",
            pasteFolder+"/"+fileOrFolder.name+"/"
          );
        }catch(e){}
      }
    }
  };
  copyOneLayer(copyFolderPath,pasteFolderPath);
};
copyFolder("./test/bowentang/","./test/chriss/")