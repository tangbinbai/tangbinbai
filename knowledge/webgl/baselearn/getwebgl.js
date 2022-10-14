///<reference path="webgl.d.ts" />
var cs=document.createElement("canvas");
document.body.appendChild(cs)
var gl=cs.getContext("webgl");


const colors = [
  1.0,  1.0,  1.0,  1.0,    // white
  1.0,  0.0,  0.0,  1.0,    // red
  0.0,  1.0,  0.0,  1.0,    // green
  0.0,  0.0,  1.0,  1.0,    // blue
];
const colorBuffer=gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(colors),gl.STATIC_DRAW)




