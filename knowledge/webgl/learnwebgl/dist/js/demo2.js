//o2清空画布(延迟3s)
var demo2=function(){
  var gl=initwebgl(demo2_canvas);
  //-------private-------
  setTimeout(function(){
    //记得四个浮点数为0, 如果任何一个不为0都会与后面的色彩进行叠加计算
    gl.clearColor(0.0,0.0,0.0,0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  },3000)
  setTimeout(function(){
    //记得四个浮点数为0, 如果任何一个不为0都会与后面的色彩进行叠加计算
    gl.clearColor(23/255, 48/250, 41/255, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  },3200)
}()
