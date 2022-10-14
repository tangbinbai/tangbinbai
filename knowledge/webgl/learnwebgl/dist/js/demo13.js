//o13旋转三角形（矩阵旋转45度）
var demo13=function(){
  //demo13_canvas.style.height=demo13_canvas.clientWidth+"px";
  var gl=initwebgl(demo13_canvas);
  var scale=gl.canvas.clientWidth/gl.canvas.clientHeight;
  //-------private-------
  //顶点着色器
  var VSHADER_SOURCE = [
      'attribute vec4 position;',
      'uniform mat4 matrix;' +
      'void main() {',
      '  gl_Position = matrix *position;' +
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
    -.8/scale, -.8, 
    -0.8/scale, 0.8, 
    -0.1/scale, -0
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

  function rotate(ANGLE){
    // The rotation angle
    // Create a rotation matrix
    var radian = Math.PI * ANGLE / 180.0; // Convert to radians
    var cosB = Math.cos(radian), sinB = Math.sin(radian);
    // Note: WebGL is column major order
    var xformMatrix = new Float32Array([
       cosB/scale, sinB, 0.0, 0.0,
      -sinB/scale, cosB, 0.0, 0.0,
        0.0,  0.0, 1.0, 0.0,
        0.0,  0.0, 0.0, 1.0
    ]);
    var matrix = gl.getUniformLocation(gl.program, 'matrix');
    gl.uniformMatrix4fv(matrix, false, xformMatrix);
    gl.drawArrays(gl.TRIANGLES , 0, vertices.length/2);
  }
  rotate(0);
  rotate(45);
}()



