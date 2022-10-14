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
  vec2 p = (gl_FragCoord.xy / resolution ); 
  // gl_FragColor = vec4(p.x, p.y, abs(cos(time/1000.0)), 1.0);

  //mix
  //mix 改变比例，能看到首谁（x,y）的影响多
  //gl_FragColor = vec4(1.0,0.0,mix(p.x,p.y,.9),1.0);
  

  vec4 t=texture2D(u_Sampler, v_TexCoord);

  t.r=mix(t.g,t.b,.5);//绿色
  t.b=mix(t.r,mix(t.r,t.g,.2),.5);//绿色
  // t.r=t.g;
  // t.b=t.g;
  // t.b=mix(t.r,t.g,.5);
  // t.r=pow(t.r,8.0*abs(cos(time / 500.0)));
  // t.g=pow(t.g,8.0*abs(cos(time / 500.0)));
  // t.b=pow(t.b,8.0*abs(cos(time / 500.0)));
  // 渲染纹理
  gl_FragColor = t;
}



