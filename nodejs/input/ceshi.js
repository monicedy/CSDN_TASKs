
var readline =require('readline')
var rl = readline.createInterface({
	input:process.stdin,
	output: process.stdout
	});

function prt(str){console.log(str)};
rl.on('line',function(line) {
	
	switch(line){
		case '1':  {
prt('shiyi')
		//	showall(player);
			break;
		}
		case '2':  {
	prt('er')	//	showall(bag);
			break;
		}
		case '3':  {
	prt('san')	//	showall(shop);
			break;
		}
		default:   {
			prt('err input')
			rl.close();
		}
	}
});
