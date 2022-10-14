//o12 quadraticCurveTo曲线
var demo12=function(){
  var ctx=initCanvas(demo12_canvas);
  var x=demo12_canvas.clientWidth*devicePixelRatio/2;
  var y=demo12_canvas.clientHeight*devicePixelRatio/2;
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.quadraticCurveTo(x+100,y+100,x+200,y);
  ctx.lineWidth=10; 
  ctx.strokeStyle="rgba(255,255,0,1)";
  ctx.stroke();
}()
//quadraticCurveTo 需要操控点和目标点   moveTo已经有了起始点；