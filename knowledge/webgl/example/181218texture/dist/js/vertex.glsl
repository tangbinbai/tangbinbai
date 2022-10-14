//定义的的变量不能再改变
attribute vec4 position;
// attribute float itime;
// attribute vec2 iresolution;
attribute vec2 a_TexCoord;
varying vec2 v_TexCoord;
// varying float time;
// varying vec2 resolution;
void main() {
  // time=itime;
  // resolution=iresolution; 
  gl_Position=position;
  v_TexCoord = a_TexCoord;
}
