//o4擦除canvas
var demo4=function(){
  var ctx=initCanvas(demo4_canvas);
  var x=demo4_canvas.clientWidth*devicePixelRatio/2;
  var y=demo4_canvas.clientHeight*devicePixelRatio/2;
  ctx.fillStyle="rgba(255,255,0,1)";
  ctx.arc(x,y,80,0,2*Math.PI);
  ctx.fill();
  setInterval(function(){  
    ctx.fill();
    setTimeout(function(){
      ctx.clearRect(0,0,x*2,y*2)
    },1000)
  },2000)
}()
//clearRect(0,0,w,h)