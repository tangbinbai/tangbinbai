precision mediump float;
// 定义常量
#define M_PI 3.1415926535897932384626433832795
// uniform float time;
varying vec2 resolution;
varying float time;
uniform sampler2D u_Sampler;
varying vec2 v_TexCoord;


void main() {
  //制作一个网格
  vec2 st = gl_FragCoord.xy/resolution;
  float x=sin(M_PI*st.x*30.0);
  x=smoothstep(.994,1.0,x);
  float y=sin(M_PI*st.y*30.0);
  y=smoothstep(.994,1.0,y);
  gl_FragColor = vec4(x,y,0.5,1.0);
}
