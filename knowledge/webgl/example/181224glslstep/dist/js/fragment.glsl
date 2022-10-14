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
  //平滑过渡
  
  //案例一
  // float v=step(mix(t.b,mix(t.r,t.g,.5),.5),.5);
  // t=vec4(vec3(v),1.0);
  

  //案例二
  vec2 st = gl_FragCoord.xy / resolution.xy;
  float a=mix(t.r,t.g,.5);
  a=step(a,.5); //让红和绿只能为1或者0，调整a可看到蓝色区块的面积变化
  t.r=a;
  t.g=a;
  t.b=1.0;//蓝色一直为一
  //结果导致只有白色和蓝色

  // 渲染纹理
  gl_FragColor = t;
}



