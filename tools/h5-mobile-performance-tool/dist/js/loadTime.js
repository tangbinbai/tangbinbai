class InfoBar {
    constructor(params) {
        // backgroundColor: string = '#002809';
        this.backgroundColor = '#222454';
        this.fontColor = 'rgba(255,255,255,.75)';
        this.container = document.createElement('div');
        this.name = '';
        this.value = 0;
        this.unit = "ms";
        this.name = params.name;
        this.value = params.value;
        this.backgroundColor = params.backgroundColor || this.backgroundColor;
        if (this.name === 'loadEventEnd') {
            if (this.value > 6000) {
                this.backgroundColor = "#e31e1e";
            }
            else if (this.value > 4000) {
                this.backgroundColor = "#ee7000";
            }
            else if (this.value > 2000) {
                this.backgroundColor = "#3b3e91";
            }
            else {
                this.backgroundColor = "#222454";
            }
        }
        this.fontColor = params.fontColor || this.fontColor;
        if (isNaN(this.value)) {
            this.setContent(`${this.name}: ${this.value}`);
        }
        else {
            const valueNum = Math.round(this.value);
            this.setContent(`${this.name}: ${valueNum} ${this.unit}`);
        }
        this.setStyle();
    }
    setContent(content) {
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
        this.container.style.backgroundColor = "#e31e1e";
    }
}
export default class LoadTime {
    constructor() {
        this.container = document.createElement('div');
        this.infoBarList = [];
        this.includeField = {
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
        };
        this.listFiled();
    }
    getTimingData() {
        return new Promise((resolve) => {
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
            }, 200);
        });
    }
    listFiled() {
        this.getTimingData().then(timing => {
            this.timing = timing;
            this.infoBarList.push(new InfoBar({
                name: 'userAgent',
                value: navigator.userAgent
            }));
            Object.keys(this.includeField).forEach(keyName => {
                if (this.timing[keyName]) {
                    this.infoBarList.push(new InfoBar({
                        name: keyName,
                        value: this.timing[keyName]
                    }));
                }
            });
            this.container.innerHTML = "";
            this.container.style.cssText = `
      height: 0;
    `;
            this.infoBarList.forEach(infoBar => {
                this.container.appendChild(infoBar.container);
            });
        });
    }
    reset() {
        this.infoBarList = [];
        this.listFiled();
    }
}
