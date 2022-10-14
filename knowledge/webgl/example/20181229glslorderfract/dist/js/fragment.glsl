precision mediump float;
// 定义常量
#define M_PI 3.1415926535897932384626433832795
// uniform float time;
varying vec2 resolution;
varying float time;
uniform sampler2D u_Sampler;
varying vec2 v_TexCoord;
//main入口

 
float random (vec2 st) {
    return fract(sin(dot(st,st)*0.3));
}
void main() {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    st *= 10.0; // Scale the coordinate system by 10
    vec2 ipos = floor(st);  // get the integer coords
    vec2 fpos = fract(st);  // get the fractional coords
    vec3 color = vec3(random( ipos ));
    // vec3 color = vec3(random( fpos ));
    gl_FragColor = vec4(color,1.0);
}
