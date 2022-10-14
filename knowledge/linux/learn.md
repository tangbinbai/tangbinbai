# linux命令行
## 基本工具

  | 命令 | 全称 | 解释 | 结果 |
  | -   | - | - | - |
  |  ls    | list directory contents | 查看当前目录         | * |
  |  ls -a | --all                   | 查看当前目录 所有文件 | clear                        find-jar               ipcs                         mkfifo             pod2latex                 semodule_unpackage          sz                              xzgrep |
  |  ls -l | List in long format     | 查看当前目录 所有文件 | -rwxr-xr-x   1 root root      11408 11月 23 2015 xrefresh |
  |  cd /    | root |   去根目录         | * |
  |  cd ～    | user |   去当前用户目录         | * |
  | file   | file|   查看文件信息         | * |
  | cal   | calendar|   查看日历          | * |
  | history   | history|   查看command line 操作日志          | * |
  | man   | manual |   查看命令的详细参数          | * |
  | mkdir   | make directory |   建文件夹,可建多个文件夹 folder1 folder2 folder3       | * |
  | touch   | touch |   建文件,可建多个文件 touch file1.js file2.js file3.js       | * |
  | cp   | copy |   复制文件 cp 1/a.js 2/a.js       | * |
  | mv   | move |   移动文件 cp 1/a.js 2/       | * |
  | rm   | remove |   删除文件 rm a.js       | * |
  | rm -f   | --force 暴力 |   删除文件 rm a.js       | * |
  | rm -r   | --recursive 递归 |   递归删除子文件 rm a.js       | * |
  | rm -rf   | 暴力+递归 |   递归暴力删除     | * |
  | rmdir   | 删除目录 |  只能删除空目录    | * |
  | rmdir *  | 删除当前所有空目录 |  只能删除所有空目录    | * |
  | cat  | 连接并打印出文件,可以同时打印多个文件 |  cat index1.html  index2.html   | * |
  | cat >> | 可以编辑文件，后面拼接 |  cat >> index.html    | * |
  | more  | 大文件打印必用 |  more bigfile.html  | * |
  | less  | 大文件打印必用,反向 |  less bigfile.html  | * |
  | pwd  | print work directory | pwd  | * |



    find /Users/ -type f -name README.md -not -path "*/node_modules/*"



