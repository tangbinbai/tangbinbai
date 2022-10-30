# 结合Spotlight，制作一个打开项目的快捷键
## Spotlight能执行.command结尾的文件，command文件中可以直接写bash
command文件不执行吗？修改文件权限 chmod 777 xxx.command    
exit 不关闭terminal？ 修改terminal偏好设置，profile>shell> "select Close if the shell exited cleanly for When the shell exits."

tangbinbai.github.io.command文件放入tangbinbai.github.io中，spotlight可以搜索到


    #! /bin/bash
    code /Users/tangbin/github.com/tangbinbai.github.io;
    exit;
