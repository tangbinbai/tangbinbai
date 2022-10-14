precision mediump float;
// 定义常量
#define M_PI 3.1415926535897932384626433832795
// uniform float time;
varying vec2 resolution;
varying float time;
uniform sampler2D u_Sampler;
varying vec2 v_TexCoord;
//一条线
void main() {
  vec2 st = gl_FragCoord.xy/resolution;
  float y = st.x;//关键
  float pct = smoothstep( y-0.01, y, st.y)-smoothstep( y, y+0.01, st.y);
  vec3 color = pct*vec3(1.0,0.0,0.0);;
  gl_FragColor = vec4(color,1.0);
}


