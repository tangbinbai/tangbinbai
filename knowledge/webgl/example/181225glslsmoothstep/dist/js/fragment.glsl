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
  
  vec4 t=texture2D(u_Sampler, v_TexCoord);
  vec2 p=gl_FragCoord.xy / resolution;
  // float v=p.x-p.y;
  float a=smoothstep(.45,.55,p.x);
  t.r=a;


  // float b=smoothstep(.45,0.55,p.y);
  // t.g=b;
  gl_FragColor = t;
}



