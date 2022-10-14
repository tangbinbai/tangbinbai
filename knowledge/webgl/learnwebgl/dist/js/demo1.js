//o1填充画布
var demo1=function(){
  //webgl object
  var gl,canvas=demo1_canvas;
  //定宽高（适配retina）
  canvas.width=canvas.clientWidth*window.devicePixelRatio;
  canvas.height=canvas.clientHeight*window.devicePixelRatio;
  //获取gl
  gl=canvas.getContext("webgl",true); 
  //定视图区
  gl.viewport(0, 0, canvas.width,canvas.height);
  //定色彩模型
  gl.clearColor(23/255, 48/250, 41/255, 1.0);
  //清理画布
  gl.clear(gl.COLOR_BUFFER_BIT);
}()
