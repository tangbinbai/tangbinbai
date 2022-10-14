//o12旋转三角形（三角函数旋转5度）
var demo12=function(){
  var gl=initwebgl(demo12_canvas);
  var scale=gl.canvas.clientWidth/gl.canvas.clientHeight;
  //-------private-------
  //顶点着色器
  var VSHADER_SOURCE = [
      'attribute vec4 position;',
      'uniform vec2 cosBsinB;', 
      'void main() {',
      '  gl_Position.x = position.x * cosBsinB.x - position.y * cosBsinB.y;' +
      '  gl_Position.y = position.x * cosBsinB.y + position.y * cosBsinB.x;' +
      '  gl_Position.z = position.z;' +
      '  gl_Position.w = 1.0;' +
      '  gl_PointSize = 4.0;', //Set the point size
      '}'
    ].join("\n");
  //片元着色器
  //* 此处一定记得声明精度类型 precision mediump float;
  var FSHADER_SOURCE =[
    //'precision mediump float;',
    //'uniform vec4 fragColor;',
    'void main() {',
    //'  gl_FragColor = fragColor;', //Set the point color
    '  gl_FragColor = vec4(.9,0.15,0.45,1.0);', //Set the point color
    '}'
  ].join("\n");  
  //初始化着色器 gl,顶点代码，片元代码
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  //获取顶点变量
  var position=gl.getAttribLocation(gl.program,"position");
  var cosBsinB=gl.getUniformLocation(gl.program,"cosBsinB");
  //制作顶点数据
  var vertices = new Float32Array([
    -.5/scale , -0.5, 
    -0.5/scale,  0.5, 
    0.5/scale ,  0.0
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

  gl.uniform2f(cosBsinB,Math.cos(0*Math.PI/180),Math.sin(0*Math.PI/180));
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES , 0, vertices.length/2);
  //绘制顶点完毕
  //开始旋转-->改变顶点的位置
  gl.uniform2f(cosBsinB,Math.cos(Math.PI/180*90),Math.sin(Math.PI/180*90));
  //gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES , 0, vertices.length/2);
}()

