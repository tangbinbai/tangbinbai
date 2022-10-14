//o6平移图像
var demo6=function(){
  var ctx=initCanvas(demo6_canvas);
  // var x=demo6_canvas.clientWidth*devicePixelRatio/2;
  // var y=demo6_canvas.clientHeight*devicePixelRatio/2;
  var w=60;
  var h=60;
  ctx.fillStyle="rgba(255,255,0,1)";
  ctx.fillRect(0,0,w,h);
  ctx.translate(200,200);
  setTimeout(function(){
    ctx.fillRect(0,0,w,h);
  },1000)
}()
//ctx.translate 可以平移画布
//ctx.translate settimeout中存有bug