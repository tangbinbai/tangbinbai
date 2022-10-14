//o5保存图像状态
var demo5=function(){
  var ctx=initCanvas(demo5_canvas);
  var x=demo5_canvas.clientWidth*devicePixelRatio/2;
  var y=demo5_canvas.clientHeight*devicePixelRatio/2;
  var w=60;
  var h=60;
  ctx.save();
  ctx.fillStyle="rgba(255,0,0,1)";
  ctx.save();
  ctx.fillStyle="rgba(0,255,0,1)";
  ctx.save();
  ctx.fillStyle="rgba(0,0,255,1)";
  ctx.fillRect(x-w*3,y-h/2,w,h);
  ctx.restore();
  ctx.fillRect(x,y-h/2,w,h);
  ctx.restore();
  ctx.fillRect(x+w*3,y-h/2,w,h);
}()
//clearRect(0,0,w,h)
//restore 一次只能回退一次 怎么和ps一样  擦擦擦