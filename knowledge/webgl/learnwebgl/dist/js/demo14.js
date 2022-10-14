//o14绘制一个圆
var demo14=function(){
  var gl=initwebgl(demo14_canvas);
  var scale=gl.canvas.clientWidth/gl.canvas.clientHeight;
  //顶点着色器代码
  var vertex_shader=[
    'attribute vec4 positon;',
    'void main(){',
      'gl_Position=positon;',  
    '}'
  ].join("\n");
  //片元着色器代码
  var fragment_shader=[
    'precision mediump float;',
    'uniform vec4 fragColor;',
    'void main(){',
      'gl_FragColor=fragColor;',
    '}'
  ].join('\n');
  //初始化片元和程序
  initShaders(gl,vertex_shader,fragment_shader);
  //建立一个圆形顶点模型
  var vertices=[];
  for(var i=0;i<=360;i+=20){
    var radian=(Math.PI/180)*i;
    vertices.push(
      Math.cos(radian)*.5/scale,
      Math.sin(radian)*.5,
      0.0,
      0.0
    );
  }
  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);
  var position=gl.getAttribLocation(gl.program,"positon");
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(position);
  //片元颜色
  var fragColor=gl.getUniformLocation(gl.program,"fragColor");
  gl.uniform4f(fragColor,1.0,1.0,.8,1.0);//rgba
  gl.drawArrays(gl.TRIANGLE_STRIP , 0, vertices.length/2);
  gl.uniform4f(fragColor,1.0,.3,.5,1.0);//rgba
  gl.drawArrays(gl.LINE_STRIP , 0, vertices.length/2);
}()