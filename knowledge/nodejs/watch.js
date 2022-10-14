var fs=require("fs");
// 例子，处理 fs.watch 监听器
fs.watch('./test', { recursive:true,encoding: 'utf8' }, (eventType, filename) => {
  if (filename) {
    console.log(filename);
    // 输出: <Buffer ...>
  }
});