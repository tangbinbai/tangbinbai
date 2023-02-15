# javascript

## code bad smell

    // bad
    setTimeout(restart, 36000000);
    // good
    const MILLISECONDS_PER_HOUR = 60 * 60 * 1000; 


    // bad
    type User = {
        userName: string;
        userLastName: string;
        userAge: number;
    }
    // good
    type User = {
        name: string;
        lastName: string;
        age: number;
    }

    // bad
    type UserStatus = 'online' | 'offline';
    function createUser(
        name: string, 
        lastName: string, 
        age: number, 
        status: UserStatus
    ){}
    // good
    type UserStatus = 'online' | 'offline';
    type User = { 
        name: string, 
        lastName: string, 
        age: number, 
        status: UserStatus 
    };
    function createUser(user: User) {}

    // bad (it’s hard to debug)
    myVariable && myFunction();
    // good
    if (myVariable) {
        myFunction()
    }

    // bad (condition branch wrote into the js statement)
    <span>{user.name && user.lastName && renderUserInfo()}</span>
    const renderUserInfo = () => {
        return <span>{`${user.name} ${user.lastName}`}</span>;
    };
    // good 
    const renderUserInfo = () => {
    if (user.name && user.lastName) {
        return <span>{`${user.name} ${user.lastName}`}</span>;
    }
        return null;
    };

    // bad
    type User = {
        name: string | undefined,
        lastName: string | undefined,
        age: number | undefined,
    };
    function createUser(user: User) {
        user.name = user.name || 'User';
        user.lastName = user.lastName || '';
        user.age = user.age || 18;
        // ...
    }

    // good
    function createUser(user: User) {
        const userWithDefaultValues = {
            name: 'User',
            lastName: '',
            age: 18,
            ...user, // look here
        };
       // ...
    }

## debounce
    const debounce = (func, delay) => {
        let debounceTimer
        return function() {
            clearTimeout(debounceTimer)
            debounceTimer= setTimeout(() => func(), delay)
        }
    } 

    const clickToSubmit=debounce(()=>{
    console.log("你点击再快，300ms我只会执行一次")
    },300)

    let count=1, timer = setInterval(()=>{
    console.log(`点击了${count}次`)
    clickToSubmit();
    if(count++===10){
        clearInterval(timer);
    }
    },200)
## 颜色进制转换
    const rgba2decimal=(RGBAColor)=>{
        const rgba=RGBAColor.match(/\.?\d+/g);
        const red= +rgba[0];
        const green= +rgba[1];
        const blue= +rgba[2];
        const alpha= +rgba[3] || 1;
        const hex_alpha = (Math.round(alpha*255)).toString(16);
        const hex_red = red.toString(16);
        const hex_green = green.toString(16);
        const hex_blue = blue.toString(16);
        const hex=`${hex_alpha}${hex_red}${hex_green}${hex_blue}`;
        const decimal=parseInt(hex,16);
        console.log(RGBAColor,hex,decimal);
    }
    const hex2decimal=(HexColor,alpha)=>{
        const hex_alpha = (Math.round(alpha*255)).toString(16);
        const hex=`${hex_alpha}${HexColor}`;
        const decimal=parseInt(hex,16);
        console.log(HexColor,alpha,hex,decimal);
    }
    
    rgba2decimal('rgba(233,33,20,.25)');
    rgba2decimal('rgba(233,33,20,.21)');

    hex2decimal("ABACAD",1);
    hex2decimal("5A92FF",1);
## 获取定量2D点
    const get2DPoints=(number)=>{
        var points=[];
        while(number--){
            points.push({
                x:Math.random(),
                y:Math.random()
            })
        }
        return points;
    }
## 获取定量3D点
    const get3DPoints=(number)=>{
        var points=[];
        while(number--){
            points.push({
                x:Math.random(),
                y:Math.random(),
                z:Math.random()
            })
        }
        return points;
    }
## JavaScript数组、字典转换
    function parseMapToArray(obj){
        var arr = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                arr.push(key);
            }
        }
        return arr;
    }
    function parseArrayToMap(list){
        var map = {};
        list.forEach(function(item){
            map[item] = true;
        });
        return map;
    }
    console.log(parseMapToArray({1:true,2:true}));
    console.log(parseArrayToMap([ '1', '2' ]));
## QQ号码正则验证
    function isUinLegal(uin) {
        var legal = false;
        if (typeof uin === 'string' || typeof uin === 'number') {
            var num = uin * 1, str = uin + '';
            legal = (/^\d{5,10}$/.test(str) && num >= 10001 && num <= 4294967295);
        }
        return legal;
    }
## 通过window.onerror报错定位
使用window.onerror来捕获错误，然后根据参数来定位错误的位置和错误的信息，还要注意的是，js里的onerror只能捕获当前域的js中的错误，如果跨域的话，是不能准确定位的

    /**
     * @param {String}  errorMessage   错误信息
     * @param {String}  scriptURI      出错的文件
     * @param {Long}    lineNumber     出错代码的行号
     * @param {Long}    columnNumber   出错代码的列号
     * @param {Object}  errorObj       错误的详细信息，Anything
     */
    window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
        console.log("错误信息：" , errorMessage);
        console.log("出错文件：" , scriptURI);
        console.log("出错行号：" , lineNumber);
        console.log("出错列号：" , columnNumber);
        console.log("错误详情：" , errorObj);
    }

## 前端存储轻量级javascript库

    底层用localStorage 和sessionStorage 实现，非常轻量，支持设置数据过期时间，对外api
    clear()
    set(key,value)
    get(key)
    has(key)
    remove(key)
    forEach(callback)
    destroy()
    使用：
    const testStore = new EasyStore(‘testStore’,60*1000);
        class BaseStore {
            constructor(scope){
                this.scope = scope;
            }
            getData(id){
                let storageData = null;
                const storageStr = window[`${this.scope}Storage`].getItem(id);
                try {
                    storageData = JSON.parse(storageStr);
                } catch (e) {
                    storageData = {};
                }
                return storageData;
            }
            save(id,value){
                window[`${this.scope}Storage`].setItem(id,value);
            }
            destroy(id){
                window[`${this.scope}Storage`].removeItem(id);
            }
        }
        const PREFIX = 'e';
        const VERSION = '1.0';
        /***
         * 存储类，
         */
        class EasyStore {
            _data = {};
            _store = null;
            /***
             *
             * @param id storeId
             * @param expiresTime 默认缓存时间(单位:毫秒)，不传默认为null,永久保存
             * @param scope 缓存类型 session,local(默认session)
             */
            constructor(id,expiresTime,scope){
                if(!id){
                    throw Error('miss store id');
                }
                this.id = `${PREFIX}_${VERSION}_${id}`;
                this.scope = scope || 'session';
                this._store = new BaseStore(this.scope);
                this._loadData();
                this.expires = arguments[1] ? (Date.now() + arguments[1]): null;
            }
            /***
             * 加载/初始化数据
             * @private
             */
            _loadData(){
                let storageData = Object.assign({data:{},expires:null},this._store.getData(this.id));
                //过期时间为空，并且不超过当前时间
                if(!storageData.expires || new Date(storageData.expires).getTime() >= Date.now()){
                    this._data = storageData.data;
                    this.expires = storageData.expires;
                }
            }
            /***
             * 是否过期
             * @private
             */
            _isExpires(){
                return this.expires && new Date(this.expires).getTime() < Date.now();
            }
            /**
             * 保存数据
             * @private
             */
            _save(){
                const saveStr = JSON.stringify({
                    data:this._data,
                    expires:this.expires
                });
                this._store.save(this.id,saveStr);
            }
            /**
             * 清空数据
             */
            clear(){
                this._data = {};
                this._save();
            }
            /***
             * 设置缓存值
             * @param key
             * @param value
             */
            set(key,value){
                this._data[key] = value;
                this._save();
            }
            /***
             * 根据key获取数据
             * @param key
             * @returns {null}
             */
            get(key){
                return this._isExpires()?null:this._data[key];
            }
            /**
             * 判断是否存在key
             * @param key
             */
            has(key){
                return this._data.hasOwnProperty(key);
            }
            /**
             * 删除指定的key
             * @param key
             */
            remove(key){
                delete this._data[key];
                this.has(key) && this._save();
            }
            /***
             * 迭代器
             * @param callback key,value
             */
            forEach(callback){
                if(this._isExpires())return;
                const _data = this._data;
                for(let key in _data){
                    _data.hasOwnProperty(key) && typeof callback === 'function' && callback.call(this,key,_data[key]);
                }
            }
            /***
             * 销毁
             */
            destroy(){
                this._store.destroy(this.id);
                this._store = null;
                this._data = null;
            }
        }
        export default EasyStore;

## 去重
    //flter去重
    //arr.filter((v, i) => arr.indexOf(v) == i)
    //set去重
    var x=[...new Set([1, 2, 3, 3, 2, 3, 1, 3, 5, 6, 8])]
## 获取url的参数
    function getParamter(name) {
        var url = location.search;
        var reg = new RegExp('(\\?|&)' + name + '=([^&]*)(&|$)');
        var result = reg.exec(url);
        return result ? decodeURIComponent(result[2]) : '';
    }

## 字符串加*，隐藏中间字符串
隐藏中间字符串，保留两头各两位，默认保留18位*

    function hideCode (str, num) {
        if (!str) {
            return '';
        }
        return str.replace(/(.{2}).*(.{2})/, '$1' + new Array(num || 18).join('*') + '$2');
    }
    hideCode('ablkjlkjljljljljljljjljjkjdc')


## 添加文字水印
HTML5为网页添加文字水印

    /**
     - 为网页添加文字水印
     - @param {String} str 要添加的字符串
     */
     function addWaterMarker(str){
            var can = document.createElement('canvas');
            var body = document.body;

            body.appendChild(can);

            can.width=400;
            can.height=200;
            can.style.display='none';

            
            var cans = can.getContext('2d');
            cans.rotate(-20*Math.PI/180);
            cans.font = "16px Microsoft JhengHei";            
            cans.fillStyle = "rgba(17, 17, 17, 0.50)";
            cans.textAlign = 'left';  
            cans.textBaseline = 'Middle';
            cans.fillText(str,can.width/3,can.height/2);
            
            body.style.backgroundImage="url("+can.toDataURL("image/png")+")";
        }

## 计算两个时间之间的天数差
    function diff(date1,date2) {
        try{
             var timeSpan = Math.abs(date1 - date2);
             var ms = 1000 * 60 * 60 * 24;   //一天的毫秒数
             var days = Math.ceil(timeSpan / ms);
             return days + "天";
        } catch (e) {
          throw e;
        }
    }
    var start = new Date(2013, 10, 08);
    var finish = new Date(2016, 09, 10);
    var date = new diff(start, finish);
    console.log(date);



## 使用H5定位
    window.addEventListener('message', function(event) { 
        loc = event.data; // 接收位置信息
        console.log('location', loc);
        if(loc  && loc.module == 'geolocation') { //定位成功,防止其他应用也会向该页面post信息，需判断module是否为'geolocation'
            var markUrl = 'https://apis.map.qq.com/tools/poimarker' +
            '?marker=coord:' + loc.lat + ',' + loc.lng + 
            ';title:我的位置;addr:' + (loc.addr || loc.city) + 
            '&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp';
            //给位置展示组件赋值
            document.getElementById('markPage').src = markUrl;
        } else { //定位组件在定位失败后，也会触发message, event.data为null
            alert('定位失败'); 
        }
        /* 另一个使用方式 
        if (!isMapInit && !loc) { //首次定位成功，创建地图
            isMapInit = true;
            createMap(event.data);
        } else if (event.data) { //地图已经创建，再收到新的位置信息后更新地图中心点
            updateMapCenter(event.data);
        }
        */
    }, false);
    //为防止定位组件在message事件监听前已经触发定位成功事件，在此处显示请求一次位置信息
    document.getElementById("geoPage").contentWindow.postMessage('getLocation', '*');
## 求min到max的中间值
    middle=Math.max(Math.min(middle,max),min);
## promise
    var p1 = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('执行完成');
            //resolve('随便什么数据');
            reject('出错的数据');
        }, 3000);
    });
    p1.then(function(data){
        console.log(data)
    }).catch(function(error){
        console.log(error)
    });
## await
    var p1 = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('执行完成');
            //resolve('随便什么数据');
            reject('出错的数据');
        }, 3000);
    });
    await p1.then(function(data){
        console.log(data)
    }).catch(function(error){
        console.log(error)
    });
    console.log("end");

## 文件上传前端交互
    /**
      多文件上传需要加上属性， multiple="multiple"
    */
    class UploadFile{
        constructor(conf){
            this.conf=conf || {};
            this.dragContainer=this.conf.dragContainer;//拖拽上传的容器
            this.uploadBtn=this.conf.dragContainer;//上传按钮
            this.uploadFileNums=this.conf.uploadFileNums; //默认不限定
            this.init();
        }
        init(){
            this.dragContainer && this.dragEvent();
            this.uploadBtn && this.uploadBtnEvent();
        }
        handleFile(files) {
            let i=0,that=this;
            let reader = new FileReader();
            let filesLength=files.length;
            function readerFiles(i){
                filesLength=that.uploadFileNums ? Math.min(filesLength,that.uploadFileNums) : filesLength;
                if(i==filesLength){
                    return;
                }
                let file = files[i];
                console.log(file.name)
                reader.onload = (function(reader) {
                    let imgData = reader.srcElement.result;
                    console.dir(imgData)
                    //递归
                    readerFiles(++i);
                })
                reader.readAsDataURL(file);
            }
            readerFiles(i);
        }
        uploadBtnEvent(){
            this.uploadBtn.addEventListener("change", event=> {
                let files = event.target.files;
                this.handleFile(files);
            })
        }
        dragEvent(){
            this.dragContainer.addEventListener("dragenter", event=> {
                event.stopPropagation();
                event.preventDefault();
            }, false);
            this.dragContainer.addEventListener("dragover", event=> {
                event.stopPropagation();
                event.preventDefault();
            }, false);
            this.dragContainer.addEventListener("drop", event=> {
                event.stopPropagation();
                event.preventDefault();
                let files=event.dataTransfer.files;
                this.handleFile(files);
                //获取图片
            }, false);
        }
    }
    var up=new UploadFile({
        dragContainer:$("body")[0],
        uploadBtn:$("#myFile")[0],
        uploadFileNums:2
    });

## multer 接收文件（express）
    //前
    var formData = new FormData();
    formData.append('uploadfile',file);
    $.ajax({
        url: "/uploadFile",
        type: "post",
        data:formData,
        contentType: false,
        processData: false,
        success: function(res){
           console.dir(res);
           renderData(res.ret_code)
        },
        error:function(err){
           console.dir(err);
        }
    });
    //后
    let multer = require('multer')
    let uploadPath = 'public/upload/';
    let storage = multer.diskStorage({
        // 如果你提供的 destination 是一个函数，你需要负责创建文件夹
        destination: uploadPath,
        //给上传文件重命名，获取添加后缀名
        filename: function (req, file, cb) {
            cb(null,  file.originalname);
         }
    }); 
    let upload = multer({
        storage: storage
    });
    //router 使用upload
    router.post('/uploadFile',upload.single('uploadfile'),function(req,res,next){
        let filePath=process.cwd()+"/"+uploadPath+req.file.filename;
        //skCommon(filePath,function(data){
        //    res.send({ret_code: data});
        //})
    });
    module.exports = router;

## rem 适配脚本
    
    (function(win){var doc=win.document,html=doc.documentElement,option=html.getAttribute("data-use-rem");if(option===null){return}var baseWidth=parseInt(option).toString()=="NaN"?750:parseInt(option);var grids=baseWidth/100;var clientWidth=html.clientWidth||320;html.style.fontSize=clientWidth/grids+"px";var testDom=document.createElement("div");var testDomWidth=0;var adjustRatio=0;testDom.style.cssText="height:0;width:1rem;";doc.body.appendChild(testDom);var calcTestDom=function(){testDomWidth=testDom.offsetWidth;if(testDomWidth!==Math.round(clientWidth/grids)){adjustRatio=clientWidth/grids/testDomWidth;var reCalcRem=clientWidth*adjustRatio/grids;html.style.fontSize=reCalcRem+"px"}else{doc.body.removeChild(testDom)}};setTimeout(calcTestDom,20);var reCalc=function(){var newCW=html.clientWidth;if(newCW===clientWidth){return}clientWidth=newCW;html.style.fontSize=newCW*(adjustRatio?adjustRatio:1)/grids+"px"};reCalc();if(!doc.addEventListener){return}var resizeEvt="orientationchange" in win?"orientationchange":"resize";win.addEventListener(resizeEvt,reCalc,false);doc.addEventListener("DOMContentLoaded",reCalc,false)})(window);

## line-height hack脚本

    (function (c) {
        var a, d, b;
        a = c.document.createElement("div");
        d = c.document.createElement("span");
        a.style = "font-size:0px;line-height0;visibility:hidden;width:100px;display:inline-block;position:absolute;left:10000px;";
        d.style = "font-size:14px;line-height:7px;height:0px;";
        d.innerHTML = "\u56fd";
        a.appendChild(d);
        c.document.body.appendChild(a);
        b = a.clientHeight;
        b == 7 && c.document.body.classList.add("line-height-hack");
        c.document.body.removeChild(a)
    })(window);

## 数字增长动画

    
      /**
       * 整数求和动画，数字指定时间内递增完
       * @param  {int} initialValue  初始值
       * @param  {int} addValue      增加值
       * @param  {int} animationTime 动画时间
       * @return {null}               
       */
      function sumAnimation(initialValue,addValue,animationTime){
        initialValue=initialValue || 0;
        addValue=0 || addValue;
        animationTime=animationTime || 500; 
        var curValue=0; //当前的值
        var _startTime=0;
        var _currentTime=0;
        var _spendTime=0; 
        //***保留多个数字节点占位，并进行复用**
        var _nums=document.getElementsByClassName("mynumber")[0].getElementsByTagName("span");
        for(var j=0;j<_nums.length;j++){
          _nums[j].setAttribute("class","");
        }
        //render
        function render(num){
          var snum=String(num)
          for(var i=0;i<snum.length;i++){
            _nums[i].setAttribute("class","num"+snum[i])
          }
        }
        //求和
        function sum(num){
          curValue=initialValue+num;
        }
        //动画
        function animate(time){
          _startTime=_startTime ? _startTime : time;
          _currentTime=time;
          _spendTime=_currentTime-_startTime;
          if(_spendTime>animationTime){
            //显示最后一个数字
            sum(addValue);
            render(curValue);
            return;
          }else{
            sum(Math.round(_spendTime/animationTime*addValue));
            render(curValue);
          }
          requestAnimationFrame(animate)
        }
        //兼容requestAnimationFrame
        if(typeof(requestAnimationFrame) == "undefined"){
          sum(addValue);
          render(curValue);
        }else{
          requestAnimationFrame(animate)
        }
      }
      sumAnimation(7,1000);
