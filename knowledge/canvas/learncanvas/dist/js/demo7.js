//o7缩放图像
var demo7=function(){
  var ctx=initCanvas(demo7_canvas);
  var x=demo7_canvas.clientWidth*devicePixelRatio/2;
  var y=demo7_canvas.clientHeight*devicePixelRatio/2;
  var w=100;
  var h=100;
  ctx.fillStyle="rgba(255,255,0,1)";
  ctx.save();
  ctx.scale(2,2);
  ctx.fillRect(0,0,w,h);
  ctx.restore();
  ctx.fillRect(x-w/2,y-h/2,w,h);
}()
//ctx.scale 缩放所有绘制状态
//setimeout 就不能用