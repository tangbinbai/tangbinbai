//颜色和时间维度  完成
//颜色和坐标维度  完成
//颜色扭曲  
//坐标扭曲     




//顶点着色器
var vertexPromise=new Promise(function(resolve,reject){
  AjaxGetFile("../js/vertex.glsl",function(filedata){
    resolve(filedata);
  });
});

//片元着色器
var fragmentPromise=new Promise(function(resolve,reject){
  AjaxGetFile("../js/fragment.glsl",function(filedata){
    resolve(filedata);
  });
});

var gl=initwebgl(document.getElementById("webgl_demo"));

//着色齐准备就绪
Promise.all([
  vertexPromise,
  fragmentPromise
]).then(function(data){
  //这里开始编写webgl的代码
  initShaders(gl, data[0], data[1]);
  var position=gl.getAttribLocation(gl.program,"position");
  //制作顶点数据
  var vertices = new Float32Array([
    -1.0, -1.0,
    -1.0,1.0,
    1.0,-1.0,
    1.0, 1.0
  ]);
  //全屏
  // vertices=new Float32Array([
  //   1.0,1.0,-1.0,1.0,1.0,-1.0,1.0,-1.0,-1.0,-1.0,-1.0,1.0,
  // ]);
  // 创建一个缓存区存放顶点数据
  var vertexBuffer = gl.createBuffer();
　// 把缓存区绑定给webgl
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
　// 在webgl的缓存区写入顶点数据
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  // 把写入的数据传给变量position
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  // 启用变量
  gl.enableVertexAttribArray(position);
  //统一绘制
  gl.drawArrays(gl.TRIANGLE_STRIP , 0, vertices.length/2);
  //时间
  // var time=gl.getUniformLocation(gl.program,"time");
  var itime =gl.getAttribLocation(gl.program, 'itime');
  var iresolution =gl.getAttribLocation(gl.program, 'iresolution');
  //动画
  gl.vertexAttrib2f(iresolution,gl.drawingBufferWidth,gl.drawingBufferHeight)
  function ticker(currentTime){
    gl.vertexAttrib1f(itime,currentTime)
    //统一绘制
    gl.clearColor(0 / 255, 0 / 250, 0 / 255, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP , 0, vertices.length/2);
    requestAnimationFrame(arguments.callee);
  }
  ticker();
});












