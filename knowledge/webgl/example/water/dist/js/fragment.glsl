// file=""precision mediump float;
// 定义常量
#define M_PI 3.1415926535897932384626433832795
// uniform float time;
varying vec2 resolution;
varying float time;
void main() {
  //动画
  vec2 sta = gl_FragCoord.xy*20.0/resolution;
  vec2 stas = gl_FragCoord.xy/resolution;
  float fa=abs(step(sin(sta.x+time/50.0)*.008+.4,stas.y)-1.0);
  vec4 colora=vec4(.9999,fa,.9999, fa);
  //动画b
  vec2 stb = gl_FragCoord.xy*20.0/resolution;
  vec2 stbs = gl_FragCoord.xy/resolution;
  float fb=abs(step(sin(stb.x+time/50.0)*.008+.395,stbs.y)-1.0);
  vec4 colorb=vec4(fb,.9999,.9999, fb);
  gl_FragColor = colora-colorb;
}




