var list=document.getElementsByClassName("list")[0];

list.addEventListener("touchstart",function(event){
   window.location.href="https://fanyi.baidu.com/#en/zh/"+event.srcElement.innerHTML;
})