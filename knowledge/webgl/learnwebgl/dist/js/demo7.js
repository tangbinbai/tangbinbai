//o7跟随鼠标绘制点
var demo7=function(){
  var gl=initwebgl(demo7_canvas);
  //-------private-------
  //顶点着色器
  var VSHADER_SOURCE = [
      'attribute vec4 position;',
      'void main() {',
      '  gl_Position = position;', //Set the vertex coordinates of the point
      '  gl_PointSize = 8.0;',                    //Set the point size
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
  //添加鼠标事件
  var mouse_points=[];
  demo7_canvas.addEventListener("mousemove",function(event){
    var x=(event.layerX-demo7_canvas.clientWidth/2)/(demo7_canvas.clientWidth/2);
    var y=(demo7_canvas.clientHeight/2-event.layerY)/(demo7_canvas.clientHeight/2);
    mouse_points.push(x);
    mouse_points.push(y);
    gl.clear(gl.COLOR_BUFFER_BIT);
    //x轴变化
    for(var i=0;i<mouse_points.length;i=i+2){
      gl.vertexAttrib3f(position,mouse_points[i],mouse_points[i+1],0.0);
      gl.drawArrays(gl.POINTS, 0, 1); 
    }
  })
}()
//总结