//o13 bezierCurveTo曲线
var demo13=function(){
  var ctx=initCanvas(demo13_canvas);
  var x=demo13_canvas.clientWidth*devicePixelRatio/2;
  var y=demo13_canvas.clientHeight*devicePixelRatio/2;
  x=y;
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.bezierCurveTo(x+100,y-100,x+200,y+100,x+300,y);
  ctx.bezierCurveTo(x+400,y-100,x+500,y+100,x+600,y);
  ctx.bezierCurveTo(x+700,y-100,x+800,y+100,x+900,y);
  ctx.bezierCurveTo(x+1000,y-100,x+1100,y+100,x+1200,y);
  ctx.bezierCurveTo(x+1300,y-100,x+1400,y+100,x+1500,y);
  ctx.lineWidth=10; 
  ctx.strokeStyle="rgba(255,255,0,1)";
  ctx.stroke();
}()
//bezierCurveTo()只接受三个顶点，多了请多次执行此方法