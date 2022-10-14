//o11平移三角形
var demo11=function(){
  var gl=initwebgl(demo11_canvas);
  //-------private-------
  //顶点着色器
  var VSHADER_SOURCE = [
      'attribute vec4 position;',
      'uniform vec4 translate;',
      'void main() {',
      '  gl_Position=position+translate;',
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
  var translate=gl.getUniformLocation(gl.program,"translate");
  //制作顶点数据
  var vertices = new Float32Array([
    -.8, -.8, 
    -0.8, 0.8, 
    -0.74, -0
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
  gl.clear(gl.COLOR_BUFFER_BIT);
  //改变位置
  gl.drawArrays(gl.TRIANGLES , 0, vertices.length/2);
  gl.uniform4f(translate,1.3,0.0,0.0,0.0);
  gl.drawArrays(gl.TRIANGLES , 0, vertices.length/2);
}()



