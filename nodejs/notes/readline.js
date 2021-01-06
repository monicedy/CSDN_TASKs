/这是对于nodejs里面输入和输出方法学习
const readline = require('readline');
/*首先，类似任何一种后端语言，比如C++，Java等都有自己独特的输后端入和输出的方法
当然，对于nodeJs来讲，也必须要有自己的输入和输出方法。
   其中，输出方法我们通常就是console.log()
   而对于输入方法：这里比较常见的就是使用readline模块。
   这个模块的价值。对于一些算法类的答题网站而言，我们可以使用JavaScript进行算法刷题。
* */
let rl=readline.createInterface(process.stdin,process.stdout);
/*
* 这里的createInterface方法里面包含了两个接口，分别是process.stdin,process.stdout
* 咦，stdin和stdout是不是很相似，对哦，只要我们学过一点C++就会知道C++里面就有stdin和stdout，
*进一步仔细思考，JavaScript和底层语言便是C++，所以都是一类的东西。
* */
//这里首先学习question方法,人话理解就是我问你答的形式，输入什么，就输出什么
// rl.question('Who is your girlfriend ?',name => {
//     console.log('She is ',name);
// })
//为了更好地实现上面情况，我们现在还可以使用另外一种形式，也就是prompt和on方法监听
//设定问题
// rl.setPrompt('How is your girlfriend?')
// rl.prompt()
// rl.on('line',ans=>{
//     console.log('The ans is',`${ans}`);
//     rl.close()//这里必须关闭
// })
/*
* 学习实例，多行输入两个数，并多行输出。
* */
let  ans = [];//临时定义一个数组，用来把计算结果存入进去
rl.on('line', (num) => {
    let tmp = num.trim().split(' ');
    //这个tmp是对控制台的数据每行数据进行字符串处理，去掉空格并且使用空格切分，形成一个新的字符串数组
    let s=tmp.reduce((a1, a2) => a1 + parseInt(a2), 0)
    //这个s是对这个字符串数组进行累加，刚开始是0，加入一个数转化为整数，然后放到累加器中。
    ans.push(s);
    //最后这个ans将每行累加之和存入ans,最终遍历得到结果
    for (let item of ans)
        console.log(item);
})






