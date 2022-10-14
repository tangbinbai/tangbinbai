precision mediump float;
// 定义常量
#define M_PI 3.1415926535897932384626433832795
// uniform float time;
varying vec2 resolution;
varying float time;
uniform sampler2D u_Sampler;
varying vec2 v_TexCoord;
//main入口
float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}
vec2 truchetPattern(in vec2 _st, in float _index){
    _index = fract(((_index-0.5)*2.0));
    if (_index > 0.75) {
        _st = vec2(1.0) - _st;
    } else if (_index > 0.5) {
        _st = vec2(1.0-_st.x,_st.y);
    } else if (_index > 0.25) {
        _st = 1.0-vec2(1.0-_st.x,_st.y);
    }
    return _st;
}
void main() {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    st *= 10.0;
    st = (st-vec2(5.0))*(abs(sin(time/1000.0*0.2))*5.);
    st.x += time/1000.0*10.0;

    vec2 ipos = floor(st);  // integer
    vec2 fpos = fract(st);  // fraction
    vec2 tile = truchetPattern(fpos, random( ipos ));
    float color = 0.0;
    // Maze
    color = smoothstep(tile.x-0.1,tile.x,tile.y)-
            smoothstep(tile.x,tile.x+0.1,tile.y);
    gl_FragColor = vec4(.0,vec3(color).xy,1.0);
}

