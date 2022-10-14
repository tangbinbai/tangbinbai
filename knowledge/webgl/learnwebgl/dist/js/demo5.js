//o5绘制多个点优化版本(共享着色器，通过改变变量的值)
var demo5=function(){
  var gl=initwebgl(demo5_canvas);
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
  var FSHADER_SOURCE =[
    'void main() {',
    '  gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);', //Set the point color
    '}'
  ].join("\n");
  //初始化着色器 gl,顶点代码，片元代码
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  //vec4(0,0, 0,0, 0.0, 1.0)
  var position=gl.getAttribLocation(gl.program,"position");
  //x轴变化
  var start=-.9;
  for(var i=0;i<19;i++){
    gl.vertexAttrib3f(position,start+.1*i,0,0,0.0);
    gl.drawArrays(gl.POINTS, 0, 1); 
  }
}()
//总结
//使用attribute在main之前定义全局变量，可以动态改变顶点着色器的顶点值