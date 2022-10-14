#!/usr/bin/env node
var copyFolder=require("./module/copyFolder.js");
//当前工具路径
var pasteFolderPath=process.cwd();
var inputs=process.argv;
//指令
var directive=inputs[2];
//参数1
var arg1=inputs[3];
//参数2
var arg2=inputs[4];


//命令>psta init h5 h5name
if((directive=="init") && arg1 && arg2){
  copyFolder(__dirname+"/template/"+arg1+"/",pasteFolderPath+"/",arg2)
}else if(directive=="init" && arg1){
  copyFolder(__dirname+"/template/"+arg1+"/",pasteFolderPath+"/")
}else if(directive=="help"){
  help();
}else{
  console.error("!!!参数不合法");
  help();
}


function help(argument) {
  console.log("/----------------help-------------------/")
  console.log(">psta init h5 yourProjectName (新建h5项目)");
  console.log(">psta init canvas yourProjectName (新建canvas项目)");
  console.log(">psta init webgl yourProjectName (新建webgl项目)");
  console.log("/----------------help-------------------/")
}