precision mediump float;
// 定义常量
#define M_PI 3.14;
uniform sampler2D u_Sampler;
varying vec2 v_TexCoord;
// varying vec2 resolution;
// varying float time;

//颜色变化--------------------------------------------
// void main() {
//   vec2 p = (gl_FragCoord.xy / (resolution.xy/2.0) ); 
//   gl_FragColor = vec4(p.x, p.y, abs(cos(time/1000.0)), 1.0);
// }

void main() {
  gl_FragColor = texture2D(u_Sampler, v_TexCoord);
}

