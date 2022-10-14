<!--
 * @Author: your name
 * @Date: 2021-08-27 23:22:37
 * @LastEditTime: 2021-09-20 04:44:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /knowledge/shell/learn.md
-->
# shell编程
   
## echo 

    echo 我的名字:
    echo '我的名字:'
    echo "我的名字："

    all output:
    我的名字:

## variable
  直接定义，一般大写

  
## for 

    FILES=$(ls)
    echo $FILES
    for File in $FILES
      do
        echo $File
    done
  
    output:
    learn.html      learn.md        learn.sh  

## while

    LINE=1
    while read -r CURRENT_LINE
      do 
        echo "$LINE: $CURRENT_LINE"
        ((LINE++))
      done < './test.txt'

    output:
    1: 英文的gentleman是指英国绅士，
    2: 他们通常会手拿文明棍，
    3: 头戴大礼帽，身着笔挺的西装，
    4: 足蹬亮皮鞋。

## funciton

    function sayHello(){
      echo "hello bowentang"
    }
    sayHello

    output:
    hello bowentang

## function params

    function sayHello(){
      echo "hello $1, $2"
    }
    sayHello "bowentang" "welcome!"

    output:
    hello bowentang, welcome!




