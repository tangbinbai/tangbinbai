precision mediump float;
// uniform float time;
varying vec2 resolution;
varying float time;
void main() {
  // if(gl_FragCoord.x<100){
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  // }
  gl_FragColor = vec4(1.0,0.0,0.0, 1.0);
  if(gl_FragCoord.x>300.0){
    gl_FragColor = vec4(1.0, gl_FragCoord.x/1000.0, 0.0, 1.0);
  }
}




