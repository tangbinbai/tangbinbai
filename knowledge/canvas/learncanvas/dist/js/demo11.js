//o11线条
var demo11=function(){
  var ctx=initCanvas(demo11_canvas);
  var x=demo11_canvas.clientWidth*devicePixelRatio/2;
  var y=demo11_canvas.clientHeight*devicePixelRatio/2;
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(x+100,y+100);
  ctx.lineTo(x+200,y);
  //ctx.closePath();
  ctx.lineWidth=10; 
  ctx.strokeStyle="rgba(255,255,0,1)";
  ctx.stroke();
}()
//closePath()可以闭合路径 。moveTo到什么位置，之后在lineTo下去