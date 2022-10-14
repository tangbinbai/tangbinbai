###
 # @Author: your name
 # @Date: 2021-09-20 04:24:17
 # @LastEditTime: 2021-09-20 04:42:24
 # @LastEditors: Please set LastEditors
 # @Description: In User Settings Edit
 # @FilePath: /knowledge/shell/learn.sh
### 
# FILES=$(ls)
# echo $FILES
# for File in $FILES
#   do
#     echo $File
# done

# LINE=1
# while read -r CURRENT_LINE
#   do 
#     echo "$LINE: $CURRENT_LINE"
#     ((LINE++))
#   done < './test.txt'


# function sayHello(){
#   echo "hello bowentang"
# }
# sayHello


function sayHello(){
  echo "hello $1, $2"
}
sayHello "bowentang" "welcome!"