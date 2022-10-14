//o20帧动画
var demo20=function(){
  var ctx=initCanvas(demo20_canvas);
  var img=new Image();
  img.src="../img/bombframes.png";
  img.onload=function(){
    window.fxo20=new FrameX({
      "img":img,
      "ctx":ctx,
      "framesNum":5,
    })
    fxo20.play();
  }
  demo20_canvas.addEventListener("click",function(){
    fxo20 && fxo20.play();
  })

}()

//x轴帧动画
function FrameX(param){
  param=param || {};
  this.img=param.img;//加载完毕的对象
  this.framesNum=param.framesNum;
  this.ctx=param.ctx;
  this.ctxW=param.ctx.canvas.clientWidth*devicePixelRatio;
  this.ctxH=param.ctx.canvas.clientHeight*devicePixelRatio;
  this.x=param.x || 0;
  this.y=param.y || 0;
  this.time=param.time ||70,
  this.imgPixelRatio=param.imgPixelRatio || 2;
  this.frameWidth=null;
  this.frameHeight=null;
  this.status=null;
  this.timmer=null;
  this.init=(function(){
    this.frameWidth=(this.img.width/this.framesNum)
    this.frameHeight=this.img.height;//帧高
  }).call(this)
}
FrameX.prototype={
  play:function(){
    var self=this;
    self.status="play";
    var currentStep=0;
    this.timmer && clearInterval(self.timmer);
    this.timmer=setInterval(function(){
      if(currentStep>self.framesNum){
        self.status=null;
        clearInterval(self.timmer);
        return false;
      }
      //绘制
      self.ctx.clearRect(0,0,self.ctxW,self.ctxH);
      self.ctx.drawImage(
        self.img,
        self.frameWidth*currentStep++,
        0,
        self.frameWidth,
        self.frameHeight,
        self.x,
        self.y,
        self.frameWidth,
        self.frameHeight
      );
      //结束绘制
    },self.time)
  }
}



