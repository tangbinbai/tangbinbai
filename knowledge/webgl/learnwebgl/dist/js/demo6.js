//o6改变点的颜色（片源着色器）
var demo6=function(){
  var gl=initwebgl(demo6_canvas);
  //-------private-------
  //顶点着色器
  var VSHADER_SOURCE = [
      'attribute vec4 position;',
      'void main() {',
      '  gl_Position = position;', //Set the vertex coordinates of the point
      '  gl_PointSize = 40.0;',                    //Set the point size
      '}'
    ].join("\n");
  //片元着色器
  //* 此处一定记得声明精度类型 precision mediump float;
  var FSHADER_SOURCE =[
    'precision mediump float;',
    'uniform vec4 fragColor;',
    'void main() {',
    '  gl_FragColor = fragColor;', //Set the point color
    //'  gl_FragColor = vec4(0.0,0.0,0.0,1.0);', //Set the point color
    '}'
  ].join("\n");
  //初始化着色器 gl,顶点代码，片元代码
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  var position=gl.getAttribLocation(gl.program,"position");
  var fragColor=gl.getUniformLocation(gl.program,"fragColor");
  //x轴变化
  var start=-.9;
  for(var i=0;i<19; i++){
    gl.vertexAttrib3f(position,start+.1*i,0,0,0.0);
    gl.uniform4f(fragColor,i/19,i/19,0.0,1.0);//rgba
    gl.drawArrays(gl.POINTS, 0, 1); 
  }
}()