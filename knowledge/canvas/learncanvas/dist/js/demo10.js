//o10渐变
var demo10=function(){
  var ctx=initCanvas(demo10_canvas);
  var x=demo10_canvas.clientWidth*devicePixelRatio/2;
  var y=demo10_canvas.clientHeight*devicePixelRatio/2;
  var w=200;
  var h=200;
  var gradient=ctx.createLinearGradient(x-w/2,y-h/2,x+w/2,y+h/2);
  gradient.addColorStop(0,"rgba(0,255,0,1)");
  gradient.addColorStop(1,"rgba(255,0,0,1)");
  ctx.fillStyle=gradient;
  ctx.fillRect(x-w/2,y-h/2,w,h);
}()
//createLinearGradient居然是在全局canvas上，不在rect中   好傻