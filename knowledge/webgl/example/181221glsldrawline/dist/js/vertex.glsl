//定义的的变量不能再改变
attribute vec4 position;
attribute float itime;
attribute vec2 iresolution;
varying float time;
varying vec2 resolution;
attribute vec2 a_TexCoord;
varying vec2 v_TexCoord;
//main入口
void main() {
  v_TexCoord = a_TexCoord;
  time=itime;
  resolution=iresolution; 
  gl_Position=position;
}


