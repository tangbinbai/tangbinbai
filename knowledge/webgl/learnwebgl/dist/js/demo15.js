//o15顶点色彩
var demo15=function(){
  var gl=initwebgl(demo15_canvas);
  var scale=gl.canvas.clientWidth/gl.canvas.clientHeight;
  //-------private-------
  //顶点着色器
  var VSHADER_SOURCE = [
      'attribute vec4 position;',
      'attribute vec4 a_color;',
      'varying vec4 v_color;',
      'void main() {',
      '  gl_Position=position;',
      '  v_color=a_color;',
      '  gl_PointSize = 4.0;', //Set the point size
      '}'
    ].join("\n");
  //片元着色器
  //* 此处一定记得声明精度类型 precision mediump float;
  var FSHADER_SOURCE =[
    'precision mediump float;',
    'varying vec4 v_color;',
    'void main() {',
    '  gl_FragColor = v_color;', //Set the point color
    '}'
  ].join("\n");  
  //初始化着色器 gl,顶点代码，片元代码
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  var position=gl.getAttribLocation(gl.program,"position");
  var a_color =gl.getAttribLocation(gl.program, 'a_color');
  //制作顶点数据
  var verticesandcolors = new Float32Array([
    -0.5/scale,-0.5,0.0,1.0,0.0, 
     0.0/scale, 0.5,1.0,1.0,1.0,
     0.5/scale,-0.5,1.0,0.2,1.0
  ]);
  // 创建一个缓存区存放顶点数据  
  var vertexBuffer = gl.createBuffer();
　// 把缓存区绑定给webgl
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
　// 在webgl的缓存区写入顶点数据
  gl.bufferData(gl.ARRAY_BUFFER, verticesandcolors, gl.STATIC_DRAW);
  var size=verticesandcolors.BYTES_PER_ELEMENT;
  //BYTES_PER_ELEMENT强类型数组元素的使用的字节数
  // 把写入的数据传给变量position
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, size*5, 0);
  // 启用变量
  gl.enableVertexAttribArray(position);
  //写入数据
  gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, size*5, size*2);
  // 启用变量
  gl.enableVertexAttribArray(a_color);
  //gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.drawArrays(gl.TRIANGLES , 0, 3);
}()



