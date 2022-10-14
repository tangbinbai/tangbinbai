if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();
}
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = (
    window.cancelRequestAnimationFrame ||
    window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
    window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
    window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
    window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
    window.clearTimeout);
}


function initwebgl(canvas){
  //webgl object
  var gl;
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
  return gl;
}

function initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE) {
  //console.log(gl)
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
  //封装
  //顶点着色器和片元着色器
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, VSHADER_SOURCE);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FSHADER_SOURCE);
  //使用程序
  var program = createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);
  gl.vertexShader = vertexShader;
  gl.fragmentShader = fragmentShader;
  gl.program = program;
}