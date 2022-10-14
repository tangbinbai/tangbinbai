precision mediump float;
// 定义常量
#define M_PI 3.1415926535897932384626433832795
// uniform float time;
varying vec2 resolution;
varying float time;
uniform sampler2D u_Sampler;
varying vec2 v_TexCoord;
//main入口
void main() {
  //渲染色彩
  // vec2 p = (gl_FragCoord.xy / (resolution.xy/2.0) ); 
  // gl_FragColor = vec4(p.x, p.y, abs(cos(time/1000.0)), 1.0);
  // 渲染纹理
  gl_FragColor = texture2D(u_Sampler, v_TexCoord);
}



