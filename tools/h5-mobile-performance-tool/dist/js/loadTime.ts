class InfoBar {
  // backgroundColor: string = '#002809';
  backgroundColor: string = '#222454';
  fontColor: string = 'rgba(255,255,255,.75)';
  container: HTMLElement = document.createElement('div');
  name: string = '';
  value: number | string = 0;
  unit: string = "ms"
  constructor(params: {
    name: string,
    value: number | string,
    fontColor?: string
    backgroundColor?: string
  }) {
    this.name = params.name;
    this.value = params.value;
    this.backgroundColor = params.backgroundColor || this.backgroundColor;
    if (this.name === 'loadEventEnd') { 
      if (this.value > 6000) {
        this.backgroundColor = "#e31e1e";
      } else if (this.value > 4000) {
        this.backgroundColor = "#ee7000";
      } else if (this.value > 2000) {
        this.backgroundColor = "#3b3e91";
      } else { 
        this.backgroundColor = "#222454";
      }
    }
    this.fontColor = params.fontColor || this.fontColor;
    if (isNaN(this.value as number)) {
      this.setContent(`${this.name}: ${this.value}`)
    } else {
      const valueNum = Math.round(this.value as number);
      this.setContent(`${this.name}: ${valueNum} ${this.unit}`)
    }
    this.setStyle();
  }
  setContent(content: string) {
    this.container.innerHTML = content;
  }
  setStyle() {
    this.container.style.cssText = `
      float:left;
      clear:both;
      height: 22px;
      line-height: 22px;
      padding-left:4px;
      padding-right:8px;
      font-size:10px;
      white-space: nowrap;
      text-shadow: 0 0 3px soild black;
      background-color:${this.backgroundColor};
      color:${this.fontColor};
      border-top-right-radius:20px;
      border-bottom-right-radius:20px;
      margin-bottom:-2px;
      font-size:10px;
      transform:scale(.9);
      transform-origin:left top;
      max-width:100%;
      overflow:hidden
    `;
  }
  setAlertStyle() {
    this.container.style.backgroundColor = "#e31e1e"
  }
}
export default class LoadTime {
  container: HTMLElement = document.createElement('div'); 
  infoBarList: InfoBar[] = [];
  timing: any;
  includeField: object = {
    name: true,
    // connectStart: true,
    connectEnd: true,
    // decodedBodySize: true,
    domInteractive: true,
    domComplete: true,
    // domContentLoadedEventEnd: true,
    // domContentLoadedEventStart: true,
    // domainLookupEnd: true,
    // domainLookupStart: true,
    // encodedBodySize: true,
    // fetchStart: true,
    // loadEventStart: true,
    loadEventEnd: true,
    // duration: true,
    // redirectCount: true,
    // redirectEnd: true,
    // redirectStart: true,
    // requestStart: true,
    // responseEnd: true,
    // responseStart: true,
  }
  getTimingData() {
    return new Promise((resolve: Function) => {
      let count = 0;
      const timer = setInterval(() => { 
        const [timing] = performance.getEntriesByType("navigation");
        if (timing.duration) {
          resolve(timing);
          clearInterval(timer);
        }
        if (count++ > 200) { 
          clearInterval(timer);
        }
      },200)
    })
  }
  constructor() {
    this.listFiled();
  }
  listFiled() {
    this.getTimingData().then(timing => {
      this.timing = timing;
      this.infoBarList.push(new InfoBar({
          name: 'userAgent',
          value: navigator.userAgent
        }))
      Object.keys(this.includeField).forEach(keyName => {
        if ((this.timing as any)[keyName]) {
          this.infoBarList.push(new InfoBar({
            name: keyName as string,
            value: this.timing[keyName] as number
          }))
        }
      })
      this.container.innerHTML = "";
      this.container.style.cssText = `
      height: 0;
    `;
      this.infoBarList.forEach(infoBar => {
        this.container.appendChild(infoBar.container);
      })
    })
  }

  reset() {
    this.infoBarList = [];
    this.listFiled();
  }
}
