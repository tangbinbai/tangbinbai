//o1绘制一个矩形
var demo1=function(){
  var ctx=initCanvas(demo1_canvas);
  ctx.fillStyle="rgba(255,255,0,1)";
  var w=200;
  var h=100;
  var x=demo1_canvas.clientWidth*devicePixelRatio/2-w/2;
  var y=demo1_canvas.clientHeight*devicePixelRatio/2-h/2;
  ctx.fillRect(x,y,w,h);
}()
