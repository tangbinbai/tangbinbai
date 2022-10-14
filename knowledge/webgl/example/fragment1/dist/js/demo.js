//编辑着色器
//requestAnimationFrame 刷新
var gl=initwebgl(document.getElementById("webgl"));



//-------private-------
//顶点着色器
var VSHADER_SOURCE = [
    'attribute vec4 position;',
    'void main() {',
    '  gl_Position = position;', //Set the vertex coordinates of the point
    '  gl_PointSize = 4.0;',                    //Set the point size
    '}'
].join("\n");
//片元着色器
//* 此处一定记得声明精度类型 precision mediump float;
var FSHADER_SOURCE =[
  'precision mediump float;',
  //'uniform vec4 fragColor;',
  'uniform float time;',
  'void main() {',
    // 'time = .5',
  //'  gl_FragColor = fragColor;', //Set the point color
  '  gl_FragColor = vec4(abs(cos(time/180.0*3.1415)),abs(sin(time/180.0*3.1415)),abs(tan(time/180.0*3.1415)),1.0);', //Set the point color
  '}'
].join("\n");
//初始化着色器 gl,顶点代码，片元代码
initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
//获取顶点变量
var position=gl.getAttribLocation(gl.program,"position");
//制作顶点数据
var vertices = new Float32Array([
  -1.0,  1.0,
   1.0,  1.0,
  -1.0, -1.0, 
   1.0, -1.0
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
//时间
var time=gl.getUniformLocation(gl.program,"time");






var timeNum=1;
function ticker(){
  gl.uniform1f(time,++timeNum);//rgba
  //统一绘制
  gl.drawArrays(gl.TRIANGLE_STRIP , 0, vertices.length/2);
  requestAnimationFrame(arguments.callee);
}
ticker();








