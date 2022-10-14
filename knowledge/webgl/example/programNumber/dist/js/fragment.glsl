




precision mediump float;
// 定义常量
#define M_PI 3.1415926535897932384626433832795
// uniform float time;
varying vec2 resolution;
varying float time;

//颜色变化--------------------------------------------
// void main() {
//   vec2 p = (gl_FragCoord.xy / (resolution.xy/2.0) ); 
//   gl_FragColor = vec4(p.x, p.y, abs(cos(time/1000.0)), 1.0);
// }

//波纹--------------------------------------------
// void main() {
//   vec2 uv = (gl_FragCoord.xy - (resolution.xy / 2.)) / 10.;
//   float len = length(uv);
//   vec2 xy = vec2(cos(len - time * 5.) * len, sin(len - time * 5.) * len);
//   float a = length(xy - uv);
//   if(a < 2.0) {
//       a = 1.5- a;
//   }
//   else {                     
//       a = 0.0;
//   }  
//   gl_FragColor = vec4(sqrt(len / 100.0), a, 1, 1.0);
// }


//华丽火圈--------------------------------------------
float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898,12.1414))) * 83758.5453);
}
float noise(vec2 n) {
    const vec2 d = vec2(0.0, 1.0);
    vec2 b = floor(n);
    vec2 f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
    return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}
vec3 ramp(float t) {
  return t <= .5 ? vec3( 1. - t * 1.4, .2, 1.05 ) / t : vec3( .3 * (1. - t) * 2., .2, 1.05 ) / t;
}
vec2 polarMap(vec2 uv, float shift, float inner) {
    uv = vec2(0.5) - uv;
    float px = 1.0 - fract(atan(uv.y, uv.x) / 6.28 + 0.25) + shift;
    float py = (sqrt(uv.x * uv.x + uv.y * uv.y) * (1.0 + inner * 2.0) - inner) * 2.0;
    return vec2(px, py);
}
float fire(vec2 n) {
    return noise(n) + noise(n * 2.1) * .6 + noise(n * 5.4) * .42;
}
float shade(vec2 uv, float t) {
    uv.x += uv.y < .5 ? 23.0 + t * .035 : -11.0 + t * .03;    
    uv.y = abs(uv.y - .5);
    uv.x *= 35.0;
    
    float q = fire(uv - t * .013) / 2.0;
    vec2 r = vec2(fire(uv + q / 2.0 + t - uv.x - uv.y), fire(uv + q - t));
    
    return pow((r.y + r.y) * max(.0, uv.y) + .1, 4.0);
}
vec3 color(float grad) {
    float m2 = 0.15 ;
    grad =sqrt( grad);
    vec3 color = vec3(1.0 / (pow(vec3(0.5, 0.0, .1) + 2.61, vec3(2.0))));
    vec3 color2 = color;
    color = ramp(grad);
    color /= (m2 + max(vec3(0), color));
    return color;
}
void main() {
  float t = time/1000.0;
  vec2 uv = gl_FragCoord.xy / resolution.xx;
  float ff = 1.0 - uv.y;
  vec2 uv2 = uv;
  uv2.y = 1.0 - uv2.y;
  uv = polarMap(uv, 1.3, 1.6);
  uv2 = polarMap(uv2, 1.9, 1.6);
  vec3 c1 = color(shade(uv, t)) * ff;
  vec3 c2 = color(shade(uv2, t)) * (1.0 - ff);
  gl_FragColor = vec4(c1 + c2, 1.0);
}




