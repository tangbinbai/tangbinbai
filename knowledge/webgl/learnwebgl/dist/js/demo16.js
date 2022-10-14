//o16矩型
var demo16=function(){
  var canvas=demo16_canvas;
  var gl=initwebgl(canvas);
  // DepthBuffer.js (c) 2012 matsuda
  // Vertex shader program
  var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Color;\n' +
    'uniform mat4 u_mvpMatrix;\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    '  gl_Position = u_mvpMatrix * a_Position;\n' +
    '  v_Color = a_Color;\n' +
    '}\n';
  // Fragment shader program
  var FSHADER_SOURCE =
    '#ifdef GL_ES\n' +
    'precision mediump float;\n' +
    '#endif\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    '  gl_FragColor = v_Color;\n' +
    '}\n';
  //Initialize shaders
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  // Set the vertex coordinates and color (the blue triangle is in the front)
  var n = initVertexBuffers(gl);
  // Enable depth test
  gl.enable(gl.DEPTH_TEST);
  // Get the storage location of u_mvpMatrix
  var u_mvpMatrix = gl.getUniformLocation(gl.program, 'u_mvpMatrix');
  var modelMatrix = new Matrix4(); // Model matrix
  var viewMatrix = new Matrix4();  // View matrix
  var projMatrix = new Matrix4();  // Projection matrix
  var mvpMatrix = new Matrix4();   // Model view projection matrix
  // Calculate the view matrix and the projection matrix
  modelMatrix.setTranslate(2, 0, 0);
  viewMatrix.setLookAt(0, 0, 5, 0, 0, -100, 0, 10, 0);
  projMatrix.setPerspective(30, canvas.width/canvas.height, 1, 100);
  // Calculate the model view projection matrix
  mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix);
  // Pass the model view projection matrix
  gl.uniformMatrix4fv(u_mvpMatrix, false, mvpMatrix.elements);
  gl.drawArrays(gl.TRIANGLES, 0, n);   // Draw the triangles
  
  function initVertexBuffers(gl) {
    var verticesColors = new Float32Array([
      // Vertex coordinates and color
       0.0,  1.0,   0.0,  0.0,  1.0,  0.0,  // The front blue one 
      -0.5, -1.0,   0.0,  1.0,  1.0,  1.0,
       0.5, -1.0,   0.0,  1.0,  0.2,  1.0, 

       0.0,  1.0,  -2.0,  0.0,  1.0,  0.0, // The middle yellow one
      -0.5, -1.0,  -2.0,  1.0,  1.0,  1.0,
       0.5, -1.0,  -2.0,  1.0,  0.2,  1.0,

       0.0,  1.0,  -4.0,  0.0,  1.0,  0.0, // The back green one
      -0.5, -1.0,  -4.0,  1.0,  1.0,  1.0,
       0.5, -1.0,  -4.0,  1.0,  0.2,  1.0, 
    ]);
    var n = 9;
    var vertexColorbuffer = gl.createBuffer();  
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
    var FSIZE = verticesColors.BYTES_PER_ELEMENT;
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
    gl.enableVertexAttribArray(a_Position);
    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
    gl.enableVertexAttribArray(a_Color);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return n;
  }
}();


