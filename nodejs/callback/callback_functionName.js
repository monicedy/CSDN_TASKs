var fs = require("fs");

var callback =  function(err,data){
    if (err) return console.error(err);
    console.log(data.toString());	
}

function callback2(err,data){
    if (err) return console.error(err);
    console.log(data.toString());	
}

fs.readFile('input.txt', callback2);

/*callback3
fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});
*/
console.log("程序执行结束!");
