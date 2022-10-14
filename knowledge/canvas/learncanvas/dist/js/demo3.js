//o3绘制文本
var demo3=function(){
  var ctx=initCanvas(demo3_canvas);
  var cname="张三";
  var ename="zhangsan";
  ctx.font="50px serif";
  var x=demo3_canvas.clientWidth*devicePixelRatio/2;
  var y=demo3_canvas.clientHeight*devicePixelRatio/2;
  ctx.fillStyle="rgba(255,255,0,1)";
  ctx.strokeStyle="rgba(0,255,255,1)";
  ctx.lineWidth=1;
  ctx.fillText(cname,x,y-100);
  ctx.fillText(ename,x,y-50);
  ctx.strokeText(cname,x,y+50);
  ctx.strokeText(ename,x,y+100);
}()
//fillText strokeText
