//o2绘制一个带边框线的矩形
var demo2=function(){
  var ctx=initCanvas(demo2_canvas);
  ctx.fillStyle="rgba(255,255,0,1)";
  var w=200;
  var h=100;
  var x=demo2_canvas.clientWidth*devicePixelRatio/2-w/2;
  var y=demo2_canvas.clientHeight*devicePixelRatio/2-h/2;
  ctx.fillRect(x,y,w,h);
  ctx.strokeStyle="rgba(255,0,0,1)";
  ctx.lineWidth=30;
  ctx.strokeRect(x,y,w,h);
}()
//备注：line属性是中间描边