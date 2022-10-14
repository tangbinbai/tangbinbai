//o20绘制3d开通星空
var demo20=function(){
  var gl=initwebgl(demo20_canvas);
  var scale=gl.canvas.clientWidth/gl.canvas.clientHeight;
  var VSHADER_SOURCE =[
    'attribute vec4 a_Position;',
    'attribute vec2 a_TexCoord;',
    'varying vec2 v_TexCoord;',
    'void main() {',
    '  gl_Position = a_Position;',
    '  v_TexCoord = a_TexCoord;',
    '}'].join("\n");

  // Fragment shader program
  var FSHADER_SOURCE =[
    'precision mediump float;',
    'uniform sampler2D u_Sampler;',
    'varying vec2 v_TexCoord;',
    'void main() {',
    '  gl_FragColor = texture2D(u_Sampler, v_TexCoord);',
    '}'].join("\n");

  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  // Set vertex
  var n = initVertexBuffers(gl);
  // Set texture
  initTextures(gl, n)

  function initVertexBuffers(gl) {
    var verticesTexCoords = new Float32Array([
      -0.5/scale,  0.5,   0.0, 1.0,
      -0.5/scale, -0.5,   0.0, 0.0,
       0.5/scale,  0.5,   1.0, 1.0,
       0.5/scale, -0.5,   1.0, 0.0,
    ]);
    var n = 4; 
    var vertexTexCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);
    var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
    //console.dir(verticesTexCoords)
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
    gl.enableVertexAttribArray(a_Position);  

    var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
    gl.enableVertexAttribArray(a_TexCoord);  
    return n;
  }

  function initTextures(gl, n) {
    var image = new Image();
    image.onload = function(){ 
      var texture = gl.createTexture();
      var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
      loadTexture(gl, n, texture, u_Sampler, image); 
    };
    image.src = '../img/star/sky.png';
  }

  function loadTexture(gl, n, texture, u_Sampler, image) {
    //解决png的问题
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    //gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_Sampler, 0);
    //gl.clearColor(255/255, 255/250, 255/255, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT); 
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle
  }
}()
//总结