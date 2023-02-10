export default class Panel {
  name: string;
  unit: string = 'MS';
  titleBgColor: string;
  contentBgColor: string;
  frontColor: string;
  historicalMin : number = Infinity;
  historicalMax: number = 0;
  devicePixelRatio: number = Math.round(devicePixelRatio || 1);
  logicalWidth: number = document.body.clientWidth;
  logicalHeight: number = 60;
  logicalTitleHeight: number = 14;
  width: number = this.logicalWidth * this.devicePixelRatio;
  height: number = this.logicalHeight * this.devicePixelRatio;
  textPosX:number =  3 * this.devicePixelRatio;
  textPosY:number =  2 * this.devicePixelRatio;
  graphPosX:number =  0;
  graphPosY: number = this.logicalTitleHeight * this.devicePixelRatio;
  graphWidth:number =  this.logicalWidth * this.devicePixelRatio - this.graphPosX;
  graphHeight: number = (this.logicalHeight - this.logicalTitleHeight) * this.devicePixelRatio;
  currentGraphHeight: number = 0;
  canvas: HTMLCanvasElement = document.createElement('canvas');
  context: CanvasRenderingContext2D = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  fourLevel: Array<number> = new Array(4).fill(0);
  tempTips = " 内存统计请等下个版本支持";
  constructor(params: { name: string, frontColor: string, titleBgColor: string, contentBgColor: string, unit:string }) {
    this.name = params.name;
    this.unit = params.unit;
    this.frontColor = params.frontColor;
    this.titleBgColor = params.titleBgColor;
    this.contentBgColor = params.contentBgColor;  
    this.initCanvas()
  }
  initCanvas() { 
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.cssText = `
      width:${this.logicalWidth}px;
      height:${this.logicalHeight}px;
      display:block;
    `;
    this.context.font = (10 * this.devicePixelRatio) + 'px Helvetica,Arial,sans-serif';
    this.context.textBaseline = 'top';
    this.context.fillStyle = this.titleBgColor;
    this.context.fillRect(0, 0, this.width, this.graphPosY);
    this.context.fillStyle = this.frontColor;
    this.context.fillText(this.name, this.textPosX, this.textPosY);
    this.context.fillStyle = this.contentBgColor;
    this.context.fillRect(this.graphPosX, this.graphPosY, this.graphWidth, this.graphHeight);
  }
  beforeRender(value: number) { 
    // todo 要剥离出去
    if (this.name === "FPS") {
      if (value > 50) {
        this.fourLevel[0]++;
        this.frontColor = "#fce6f7";
      }else if (value > 40) {
        this.fourLevel[1]++;
        this.frontColor = "#ff9fe9";
      }else if (value > 30) {
        this.fourLevel[2]++;
        this.frontColor = "#ee7000";
      }else {
        this.fourLevel[3]++;
        this.frontColor = "#e31e1e";
      }
    }
    if (this.name === "MEM") {
      if (value < 100) {
        this.fourLevel[0]++;
        this.frontColor = "#b6fed4";
      }else if (value < 200) {
        this.fourLevel[1]++;
        this.frontColor = "#35ca5c";
      }else if (value < 300) {
        this.fourLevel[2]++;
        this.frontColor = "#ee7000";
      }else {
        this.fourLevel[3]++;
        this.frontColor = "#e31e1e";
      }
    }
  }
  getHeader(value: number) {
    return `
${this.name}:${Math.round(value)}${this.unit || ''} 
Min:${Math.round(this.historicalMin)} 
Max:${Math.round(this.historicalMax)} 
FourLevels: ${this.fourLevel.join(',')} 
${this.name === 'MEM' ? this.tempTips : ''}`
  }
  reset() { 
    this.historicalMin = Infinity;
    this.historicalMax = 0;
    this.initCanvas();
  }
  update(value: number, maxValue: number) {
    this.historicalMin = Math.min(this.historicalMin, value);
    this.historicalMax = Math.max(this.historicalMax, value);
    // 刷新标题
    this.context.globalAlpha = 1;
    this.context.fillStyle = this.titleBgColor;
    this.context.fillRect(0, 0, this.width, this.graphPosY);
    this.context.fillStyle = this.frontColor;
    this.context.fillText(
      this.getHeader(value),
      this.textPosX,
      this.textPosY
    );
    this.beforeRender(value);
    this.context.drawImage(
      this.canvas,
      this.graphPosX + this.devicePixelRatio,
      this.graphPosY,
      this.graphWidth - this.devicePixelRatio,
      this.graphHeight,
      this.graphPosX,
      this.graphPosY,
      this.graphWidth - this.devicePixelRatio,
      this.graphHeight
    );
    this.context.fillStyle = this.contentBgColor;
    this.context.fillRect(
      this.graphPosX + this.graphWidth - this.devicePixelRatio,
      this.graphPosY,
      this.devicePixelRatio,
      this.graphHeight);
    this.context.fillStyle = this.frontColor;
    this.currentGraphHeight = Math.round(value / maxValue * this.graphHeight)
    this.context.fillRect(
      this.graphPosX + this.graphWidth - this.devicePixelRatio,
      this.height - this.currentGraphHeight,
      this.devicePixelRatio,
      Math.round(value / maxValue * this.graphHeight),
    );
  }
}
