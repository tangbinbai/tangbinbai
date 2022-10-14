precision mediump float;
// 定义常量
#define M_PI 3.1415926535897932384626433832795;
varying vec2 resolution;
varying float time;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}
void main() {
    vec2 CENTER=vec2(.5,.5);
    vec2 st = gl_FragCoord.xy/resolution;
    // float y = pow(st.x,5.0);
    // vec3 color = vec3(y);
    // float pct = plot(st,y);
    // color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);
    // gl_FragColor = vec4(color,1.0);

    if(sqrt(pow(distance(st.x,CENTER.x),2.0)+pow(distance(st.y,CENTER.y),2.0))<.2){
      gl_FragColor=vec4(1.0,0.0,0.0,1.0);
    }

    // float y=smoothstep(0.2,0.8,.9);
    // if(y==1.0){
    //   gl_FragColor=vec4(1.0,0.0,0.0,1.0);
    // }
}





















