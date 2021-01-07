var evt = require('events');
var ee =new  evt.EventEmitter();

function prt(a){
           console.log(a);
 }
 

var readline =require('readline')
function ipt(){
return  readline.createInterface({
	input:process.stdin,
	output: process.stdout
	});
};


var rl = readline.createInterface({
         input:process.stdin,
         output: process.stdout
         });
 
prt('----------input:----------')

rl.on('line',function(line) {
	
	switch(line){
		case '1':{
			prt('step1');
		//	ee.emit('dsf')  
		//	ee.on('dsf',function(){
		//			rl.on('line',function(line){prt('sucesss'+line)})
		//			prt('Igot')})
		
		
			rl.on('line',function(){
				prt('[2 shuchu]'+data);
				rl.emit('yep')
			});
			
			prt('before break');
			rl.on('yep',function(){break;});
			prt('after break')
		}
		case 'q':  {
			rl.close();
			break;
		}
		default:   {
			prt('<err input>');
		}
	}
//	prt('------------input:-----------');
});
