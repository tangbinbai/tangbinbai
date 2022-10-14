//o4绘制多个点(建立多个着色器)
var demo4=function(){
  var gl=initwebgl(demo4_canvas);
  //-------private-------
  var points=[
    0.0-0.2,0.0, 
    0.0-0.1,0.0, 
    0.0,0.0, 
    0.0+0.1,0.0, 
    0.0+0.2,0.0
  ];
  for(var i=0;i<points.length;i++){
    //顶点着色器
    var VSHADER_SOURCE = [
        'void main() {',
        '  gl_Position = vec4('+points[i]+', '+points[++i]+', 0, 1);', //Set the vertex coordinates of the point
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
    //绘制point
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}()
