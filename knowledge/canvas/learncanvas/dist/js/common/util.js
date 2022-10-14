function initCanvas(canvas){
  //ctx object
  var ctx;
  //定宽高（适配retina）
  canvas.width=canvas.clientWidth*window.devicePixelRatio;
  canvas.height=canvas.clientHeight*window.devicePixelRatio;
  //获取gl
  ctx=canvas.getContext("2d"); 
  return ctx;
}