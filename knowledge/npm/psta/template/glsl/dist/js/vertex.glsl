//定义的的变量不能再改变
attribute vec4 position;
attribute float itime;
attribute vec2 iresolution;
varying float iTime;
varying vec2 iResolution;
attribute vec2 a_TexCoord;
varying vec2 v_TexCoord;
//main入口
void main() {
  v_TexCoord = a_TexCoord;
  iTime=itime;
  iResolution=iresolution; 
  gl_Position=position;
}
























