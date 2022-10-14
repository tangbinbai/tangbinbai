# es6
## let
  块级作用域

    {
        var a=5;
        let b=10;
    }
    console.log(a);
    console.log(b); //undefined b外部不能访问

  经典题，巧妙藏值   

    var a=[];
    for(var i=0;i<10;i++){
        a[i]=function(){
            console.log(i);
        };
    }
    a[6](); //此处等于10 

    var a=[];
    for(let i=0;i<10;i++){
        a[i]=function(){
            console.log(i);
        };
    }
    a[6]();//此处等于6    
## const
  const声明常量，不可改变，必须初始化。    
  块级作用域，顶层声明。
## 箭头函数
  输入and输出，箭头函数Inputs=>outputs    
  单一参数：

    var people = name => 'hello' + name; 
    //等于
    var people = function( name )  {  
        return 'hello' + name;
    }

  多个参数

    var people = (fname, lname) => {
        let fullName = 'hello' + fname+lname
        return fullName
    } 
## 初始化一个值
    function action(num = 200) {
        console.log(num)
    }

## 模板字符串
    通过${}获取一个变量的值,注意符号“`”
    const name = 'lux';
    console.log(`hello ${name}`) //hello lux
    console.log(
    `
        hello
        hello
        hello
    `
    ) //能保持原格式输出

## includes 包含
    
    "234".includes(2);//true
    [2,3,4].includes(2);//true
    ["2",3,4].includes(2);//false

## repeat 重复
    
    "1".repeat(5);//11111


## startsWith || endsWith 字符串方法，判断
    
    "123".startsWith("1");//true
    "123".endsWith("3");//true


## map
    [1,2,3].map(item => item + 1)//[2,3,4]

## 重名键，值对缩写
    var c=function(a){
        return {a} //等于return {a:a}  
    }

## 对象字面量方法赋值

    const people = {
        name: 'lux',
        getName () {
            console.log(this.name)
        }
        //省略了":function"
    }


## assign 拷贝对象,
  只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性。

    const objA = { name: 'cc', age: 18 }
    const objB = { address: 'beijing' }
    Object.assign({}, objA, objB)

## 解构
    const people = {
        name: 'lux',
        age: 20
    }
    const { name, age } = people //把name,age提出来，且能全局访问

## import 和 export

    export const sqrt = Math.sqrt;  
    export function square(x) {  
        return x * x;  
    }  
    export function add (x, y) {  
        return x + y;  
    }  

    import { square, add } from 'lib';  


## reduce

## 类
    class UploadFile{
        constructor(conf){
            this.conf=conf || {};
            this.dragContainer=this.conf.dragContainer;
            this.uploadBtn=this.conf.dragContainer;
            this.uploadFileNums=this.conf.dragContainer; //默认不限定
        }
        init(){
        }
    }

















