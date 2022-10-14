// var lis=document.getElementsByClassName("result-list1")[0].getElementsByTagName("li");
// var result="";
// for(var i=0;i<lis.length;i++){
//     result+="["+lis[i].innerText+"]("+lis[i].getElementsByTagName("a")[0].getAttribute("href").replace(/.+\//,"")+")"
// }


// result=result.match(/(\[.+?\))/g);
// 
// 
// 


// var lis=document.getElementsByClassName("result-list1")[0].getElementsByTagName("li");
// var result=""; 
// for(var i=0;i<lis.length;i++){
//     result+="["+lis[i].innerText+"]("+lis[i].getElementsByTagName("a")[0].getAttribute("href").replace(/.+\//,"")+")"
// }


// result=result.match(/(\[.+?\))/g);
// 
// 



var textareaValue=document.getElementsByClassName("textarea")[0].value;
var words=textareaValue.match(/(\[.+?\))/g);
var wordsLabrary={}

words.map((item,index)=>{
    var key=item.charAt(1).toLowerCase();
    var info=item.match(/\[(.+)\]\((.+)\)/);
    if(wordsLabrary[key]){
        wordsLabrary[key].push({
            "text":info[1],
            "href":info[2]
        })
    }else{
        wordsLabrary[key]=[];
        wordsLabrary[key].push({
            "text":info[1],
            "href":info[2]
        })
    }
})




//render
// var dl=document.createElement("dl");
// var dt=document.createElement("dt");
// var dd=document.createElement("dd");
// var a=document.createElement("a");

var dl=document.createElement("dl");  
dl.setAttribute("class","list")
for(var i in wordsLabrary){
  var dt=document.createElement("dt");
  var dd=document.createElement("dd");
  dt.innerHTML=i.toUpperCase();
  for(var j=0;j<wordsLabrary[i].length;j++){
    var a=document.createElement("a");
    a.setAttribute("href","https://www.oxfordlearnersdictionaries.com/definition/english/"+wordsLabrary[i][j]["href"]);
    a.innerHTML=wordsLabrary[i][j]["text"];
    dd.appendChild(a);
  }
  dl.appendChild(dt)
  dl.appendChild(dd)
}

document.body.appendChild(dl);



// $.ajax({
//     type: "get",
//     timeout:'100000',
//     url: "https://fanyi.baidu.com/#en/zh/number",
//     success: function(data, textStatus){
//         console.log(data);
//     },
// });
// 
// 

$.ajax({
    type: "get",
    timeout:'100000',
    url: "https://www.qq.com",
    success: function(data, textStatus){
        console.log(data);
    },
});