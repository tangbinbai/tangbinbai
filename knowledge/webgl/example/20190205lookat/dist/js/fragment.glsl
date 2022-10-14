precision mediump float;
// 定义常量
#define M_PI 3.1415926535897932384626433832795
// uniform float time;
varying vec2 resolution;
varying float time;
uniform sampler2D u_Sampler;
varying vec2 v_TexCoord;


float DistLine(vec3 ro, vec3 rd, vec3 p) {
  return length(cross(p-ro, rd))/length(rd);
}

float DrawPoint(vec3 ro, vec3 rd, vec3 p) {
  float d = DistLine(ro, rd, p);
    d = smoothstep(.051, .05, d);
    return d;
}
//main入口
void main() {
  //渲染色彩
  float t = time/1000.0;
  
  vec2 uv = gl_FragCoord.xy / resolution.xy; // 0 <> 1
  uv -= .5;
  uv.x *= resolution.x/resolution.y;
  
  vec3 ro = vec3(3.*sin(t), 2., -15.*cos(t));
  
  vec3 lookat = vec3(.5,.5,.5);
  
  float zoom = 1.;
  
  vec3 f = normalize(lookat-ro);
  vec3 r = cross(vec3(0., 1., 0.), f);
  vec3 u = cross(f, r);
  
  vec3 c = ro + f*zoom;
  vec3 i = c + uv.x*r + uv.y*u;
  vec3 rd = i-ro;
  

  float d = 0.;
  d += DrawPoint(ro, rd, vec3(0., 0., 0.));
  d += DrawPoint(ro, rd, vec3(0., 0., 1.));
  d += DrawPoint(ro, rd, vec3(0., 1., 0.));
  d += DrawPoint(ro, rd, vec3(0., 1., 1.));
  d += DrawPoint(ro, rd, vec3(1., 0., 0.));
  d += DrawPoint(ro, rd, vec3(1., 0., 1.));
  d += DrawPoint(ro, rd, vec3(1., 1., 0.));
  d += DrawPoint(ro, rd, vec3(1., 1., 1.));
  gl_FragColor = vec4(d,0.0,0.0,d);
}




