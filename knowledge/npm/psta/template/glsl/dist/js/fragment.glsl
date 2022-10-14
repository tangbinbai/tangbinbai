precision mediump float;
// 定义常量
#define M_PI 3.1415926535897932384626433832795
// uniform float time;
varying vec2 iResolution;
varying float iTime;
uniform sampler2D u_Sampler;
varying vec2 v_TexCoord;
//main入口
void main() {
  //渲染色彩
  vec2 p = gl_FragCoord.xy / iResolution;
  gl_FragColor = vec4(p.x, p.y, abs(cos(iTime/1000.0)), 1.0);
  // 渲染纹理
  // gl_FragColor = texture2D(u_Sampler, v_TexCoord);
}
























