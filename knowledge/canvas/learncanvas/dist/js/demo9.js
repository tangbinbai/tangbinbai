//o9变换矩阵
var demo9=function(){
  var ctx=initCanvas(demo9_canvas);
  var x=demo9_canvas.clientWidth*devicePixelRatio/2;
  var y=demo9_canvas.clientHeight*devicePixelRatio/2;
  var w=100;
  var h=100;
  ctx.fillStyle="rgba(255,255,0,1)";
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(Math.PI/4);
  ctx.fillRect(-w/2,-h/2,w,h);
  ctx.restore();
  ctx.fillRect(0,0,100,100)
}()
//记得保存状态，不然绘制坐标和参数都不对