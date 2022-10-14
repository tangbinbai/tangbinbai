
//初始化webgl
function initwebgl(canvas,VSHADER_SOURCE, FSHADER_SOURCE){
  //canvas 对象
  //VSHADER_SOURCE 顶点着色器代码
  //FSHADER_SOURCE 片元着色器代码
  var gl;//webgl object
  //定宽高（适配retina）
  canvas.width = canvas.clientWidth * window.devicePixelRatio;
  canvas.height = canvas.clientHeight * window.devicePixelRatio;
  //获取gl
  gl = canvas.getContext('webgl');
  //定视图区
  gl.viewport(0, 0, canvas.width, canvas.height);
  //定色彩模型
  gl.clearColor(23 / 255, 48 / 250, 41 / 255, 1.0);
  //清理画布
  gl.clear(gl.COLOR_BUFFER_BIT);
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, VSHADER_SOURCE);
  // var vertexShaderDebug = gl.getExtension('WEBGL_debug_shaders').getTranslatedShaderSource(vertexShader);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FSHADER_SOURCE);
  // var fragmentShaderDebug = gl.getExtension('WEBGL_debug_shaders').getTranslatedShaderSource(fragmentShader);
  //创建一个程序
  gl.program = createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(gl.program);
  gl.vertexShader = vertexShader;
  gl.fragmentShader = fragmentShader;
  return gl;
}
/**
 * Create 着色器对象
 * @param gl webgl
 * @param 不同类型着色器对象
 * @param 着色器源程序（字符串）
 */
function createShader(gl, type, source) {
  //创建着色器
  var shader = gl.createShader(type);
  //给着色器添加着色代码
  gl.shaderSource(shader, source);
  //编译着色器
  gl.compileShader(shader);
  //检查着色器的编译状态
  //gl.getShaderParameter(shader,gl.COMPILE_STATUS)
  return shader;
}
/**
 * 创建webgl使用的程序对象
 * @param vshader 顶点着色器
 * @param fshader 片源着色器
 */
function createProgram(gl, vshader, fshader) {
  //创建顶点着色器和片元着色器;
  //创建程序对象，程序对象涵盖了着色器，可以和着色器进行数据交互
  var program = gl.createProgram();
  //为程序对象分配顶点着色器和片元着色器
  gl.attachShader(program, vshader);
  gl.attachShader(program, fshader);
  //连接着色器
  gl.linkProgram(program);
  // 检查连接结果
  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    var error = gl.getProgramInfoLog(program);
    console.log('程序连接失败: ' + error);
    gl.deleteProgram(program);
    gl.deleteShader(vshader);
    gl.deleteShader(fshader);
    return null;
  }
  return program;
}
//初始化着色器
function initProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE) {
}



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

//加载着色齐资源
Promise.all([
  //顶点着色器
  new Promise(function(resolve,reject){
    AjaxGetFile("../js/vertex.glsl",function(filedata){
      resolve(filedata);
    });
  }),
  //片元着色器
  new Promise(function(resolve,reject){
    AjaxGetFile("../js/fragment.glsl",function(filedata){
      resolve(filedata);
    });
  })
]).then(function(data){
  //获取gl
  var gl=initwebgl(
    document.getElementById("webgl_demo"),
    data[0], 
    data[1]
  );
  //拿到默认的顶点位置变量
  var position=gl.getAttribLocation(gl.program,"position");
  //制作顶点数据
  // var vertices = new Float32Array([
  //   -0.5, -0.5, -0.5, 0.5,
  //   -0.4, -0.4, -0.4, 0.4,
  //   -0.3, -0.3, -0.3, 0.3,
  //   -0.2, -0.2, -0.2, 0.2,
  //   -0.1, -0.1, -0.1, 0.1,
  //   0.1, 0.1, 0.1 ,-0.1,
  //   0.2, 0.2, 0.2 ,-0.2,
  //   0.3, 0.3, 0.3 ,-0.3,
  //   0.4, 0.4, 0.4 ,-0.4,
  //   0.5, 0.5, 0.5 ,-0.5
  // ]);
  //全屏
  vertices=new Float32Array([
    // 1.0,1.0,-1.0,1.0,1.0,-1.0,1.0,-1.0,-1.0,-1.0,-1.0,1.0,
      -0.820,  0.510,
 -0.840,  0.040,
 -0.670,  0.510,
 -0.590,  0.050,
 -0.500,  0.460,
 -0.450,  0.040,
 -0.370,  0.420,
 -0.360,  0.000,
 -0.200,  0.390,
 -0.220,  0.060,
 -0.070,  0.460,
  0.020, -0.010,
  0.180,  0.380,
  0.240,  0.040,
  0.390,  0.330,
  0.480, -0.130,
  0.610,  0.410,
  0.730, -0.140,
  0.840,  0.380,
  0.840, -0.100,
  0.540,  0.210,
  0.450,  0.160,
  0.670,  0.040,
  0.730,  0.060,
  0.740,  0.200,
  0.690,  0.220,
  0.280,  0.240,
  0.080,  0.250,
 -0.080,  0.200,
  0.000,  0.100,
 -0.250,  0.230,
 -0.420,  0.240,
 -0.600,  0.200,
 -0.680,  0.220,
 -0.710,  0.360,
 -0.570,  0.380,
 -0.480,  0.280,



  ]);
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
  gl.drawArrays(gl.TRIANGLES , 0, vertices.length/2);
  //时间
  // var time=gl.getUniformLocation(gl.program,"time");
  var itime =gl.getAttribLocation(gl.program, 'itime');
  var iresolution =gl.getAttribLocation(gl.program, 'iresolution');
  //动画
  gl.vertexAttrib2f(iresolution,gl.drawingBufferWidth,gl.drawingBufferHeight)
  //动态渲染
  function ticker(currentTime){
    gl.vertexAttrib1f(itime,currentTime);
    //统一绘制
    gl.clearColor(0 / 255, 0 / 250, 0 / 255, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES , 0, vertices.length/2);
    requestAnimationFrame(arguments.callee);
  }
  ticker();
});












