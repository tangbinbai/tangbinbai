//ajax请求文件
function AjaxGetFile(path,callback){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200 && callback) {
      callback(xmlhttp.responseText);
    }
  };
  xmlhttp.open("GET", path, true);
  xmlhttp.send();
}
//顶点着色器
var vertexPromise=new Promise(function(resolve,reject){
  AjaxGetFile("../js/vertex.js",function(filedata){
    resolve(filedata);
  });
});

//片元着色器
var fragmentPromise=new Promise(function(resolve,reject){
  AjaxGetFile("../js/fragment.js",function(filedata){
    resolve(filedata);
  });
});
//着色齐准备就绪
Promise.all([
  fragmentPromise,
  vertexPromise
]).then(function(data){
  console.dir(data);
  //这里开始编写webgl的代码
});