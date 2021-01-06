const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('input', (answer) => {
  console.log(`output：${answer}`);

  rl.close();
})

/*
 * readline.Interface 类的实例是使用 readline.createInterface() 方法构造的。
 * 每个实例都关联一个 input 可读流和一个 output 可写流。
 * output 流用于为到达的用户输入打印提示，并从 input 流读取。*/
