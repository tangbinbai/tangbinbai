//o9指数和动画函数图像
var demo9=function(){
  demo9_canvas.style.height="500px";
  var gl=initwebgl(demo9_canvas);
  gl.viewport(0, 0, demo9_canvas.width,demo9_canvas.height);
  //-------private-------
  //顶点着色器
  var VSHADER_SOURCE = [
      'attribute vec4 position;',
      'void main() {',
      '  gl_Position = position;', //Set the vertex coordinates of the point
      '  gl_PointSize = 3.0;',                    //Set the point size
      '}'
    ].join("\n");
  //片元着色器
  //* 此处一定记得声明精度类型 precision mediump float;
  var FSHADER_SOURCE =[
    'precision mediump float;',
    'uniform vec4 fragColor;',
    'void main() {',
    '  gl_FragColor = fragColor;', //Set the point color
    //'  gl_FragColor = vec4(0.0,0.0,0.0,1.0);', //Set the point color
    '}'
  ].join("\n");
  //初始化着色器 gl,顶点代码，片元代码
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  //获取顶点变量
  var position=gl.getAttribLocation(gl.program,"position");
  var fragColor=gl.getUniformLocation(gl.program,"fragColor");
  
  function Animation(){
    this.from=null;
    this.startObj={};
    this.to=null;
    this.durationTime=null;
    this.type=null;
    //只支持obj动画
    this.startTime=null;
    this.useTime=null;
  }
  Animation.prototype={
    start:function(opt){
      this.from      =opt.from;
      this.to        =opt.to;
      this.durationTime =opt.durationTime || 300;
      this.type         =opt.type || "easeInQuad";
      this.startTime    =new Date().getTime();
      this.animationCallback=opt.animationCallback;
      this.animationEndCallback=opt.animationEndCallback;
      //拷贝初始值
      for(var i in this.from){
        this.startObj[i]=this.from[i];
      }
      //动画
      var that=this;
      requestAnimationFrame(function(){
        that.useTime=new Date().getTime()-that.startTime;
        if(that.useTime>that.durationTime){
          for(var i in that.from){
            that.from[i]=that.to[i];
          }
          //end
          that.animationEndCallback && that.animationEndCallback(that)
          return false;
        }
        for(var i in that.from){
          that.from[i]=that.animationType[that.type](
            that.useTime,
            that.startObj[i],
            that.to[i],
            that.durationTime
          );
        }
        //回调
        that.animationCallback && that.animationCallback(that);
        //loop
        requestAnimationFrame(arguments.callee)
      })
    },
    animationType:{
      easeInQuad: function(t, b, c, d) {
        return c*(t/=d)*t + b;
      },
      easeOutQuad: function(t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
      }
    }
  }
  var a1=new Animation();
  var position=gl.getAttribLocation(gl.program,"position");
  var fragColor=gl.getUniformLocation(gl.program,"fragColor");
  a1.start({
    from:{x:0,y:0},
    to:{x:1,y:.5},
    durationTime:300,
    animationCallback:function(obj){
      //console.dir(obj)
    }
  })


  for(var i=0;i<100; i=i+.1){
    gl.vertexAttrib3f(position,i/100-.9,Math.pow(.9,i)-.5,0.0,0.0,0.0);
    gl.uniform4f(fragColor,1.0,0.0,0.0,1.0);//rgba
    gl.drawArrays(gl.POINTS, 0, 1); 
  }
  for(var i=0;i<100; i=i+.1){
    gl.vertexAttrib3f(position,i/100-.9,Math.pow(.8,i)-.5,0.0,0.0,0.0);
    gl.uniform4f(fragColor,0.0,1.0,0.0,1.0);//rgba
    gl.drawArrays(gl.POINTS, 0, 1); 
  }
  for(var i=0;i<100; i=i+.1){
    gl.vertexAttrib3f(position,i/100-.9,Math.pow(.7,i)-.5,0.0,0.0,0.0);
    gl.uniform4f(fragColor,0.0,0.0,1.0,1.0);//rgba
    gl.drawArrays(gl.POINTS, 0, 1); 
  }
  for(var i=0;i<100; i=i+.1){
    gl.vertexAttrib3f(position,i/100-.9,Math.pow(.6,i)-.5,0.0,0.0,0.0);
    gl.uniform4f(fragColor,1.0,1.0,1.0,1.0);//rgba
    gl.drawArrays(gl.POINTS, 0, 1); 
  }
  for(var i=0;i<100; i=i+.1){
    gl.vertexAttrib3f(position,i/100-.9,Math.pow(.5,i)-.5,0.0,0.0,0.0);
    gl.uniform4f(fragColor,0.0,1.0,1.0,1.0);//rgba
    gl.drawArrays(gl.POINTS, 0, 1); 
  }
  for(var i=0;i<100; i=i+.1){
    gl.vertexAttrib3f(position,i/100-.9,Math.pow(.4,i)-.5,0.0,0.0,0.0);
    gl.uniform4f(fragColor,.5,1.0,.5,1.0);//rgba
    gl.drawArrays(gl.POINTS, 0, 1); 
  }
  for(var i=0;i<100; i=i+.1){
    gl.vertexAttrib3f(position,i/100-.9,Math.pow(.3,i)-.5,0.0,0.0,0.0);
    gl.uniform4f(fragColor,.8,0.0,0.8,1.0);//rgba
    gl.drawArrays(gl.POINTS, 0, 1); 
  }
  for(var i=0;i<100; i=i+.1){
    gl.vertexAttrib3f(position,i/100-.9,Math.pow(.2,i)-.5,0.0,0.0,0.0);
    gl.uniform4f(fragColor,0.0,.6,0.8,1.0);//rgba
    gl.drawArrays(gl.POINTS, 0, 1); 
  }
  for(var i=0;i<100; i=i+.1){
    gl.vertexAttrib3f(position,i/100-.9,Math.pow(.1,i)-.5,0.0,0.0,0.0);
    gl.uniform4f(fragColor,.7,0.4,0.0,1.0);//rgba
    gl.drawArrays(gl.POINTS, 0, 1); 
  }
}()
//总结
//LINES(default) LINE_STRIP LINE_LOOP TRIANGLES TRIANGLE_STRIP TRIANGLE_FAN
//基本元素都是矢量坐标点，传参不一样画图方式不一样（支持点，线，三角形）
//LINES 普通的坐标点
//LINE_STRIP 连线
//LINE_LOOP 回路
//TRIANGLES 三角形
//TRIANGLE_STRIP 共享一条边
//TRIANGLE_FAN 共享一个顶点






