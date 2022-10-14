//定义的的变量不能再改变
attribute vec4 position;
attribute float itime;
attribute vec2 iresolution;
varying float time;
varying vec2 resolution;
void main() {
  time=itime;
  resolution=iresolution; 
  gl_Position=vec4(
    position.x,
    position.y,
    position.z,
    position.w
  );
}