var evt = require('events');
var ee = new  evt.EventEmitter();

var readline = require('readline')

var rl = readline.createInterface({
                        input:process.stdin,
                        output: process.stdout
                        });

function prt(str){
	console.log(str);
	}

function brk(){
	break;
	}

function cls(){
	rl.close();
	}
rl.on('line',function(line){
	
	switch(line){
		case '1': {
			prt('[1]');
						prt('---------------------err after break[3]');
			break;
		}
		case 'q': {
			rl.close();
			break;
		}

		case 'm' : {
			prt('[default]');
			break;
		}	

	}

});
