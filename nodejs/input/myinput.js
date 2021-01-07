function myinput(str,func){
var readline =require('readline')

var rl = readline.createInterface({
	input:process.stdin,
	output: process.stdout
	});

rl.question(str,(data) => {
	func;
	rl.close()
	});
}

module.exports = myinput;
