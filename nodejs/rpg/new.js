/*
*name: rpg小游戏
*auther: monicedy
*date: 2021-01-06
*/

//事件发生器
var evt = require('events');
var ee = new  evt.EventEmitter();

var readline = require('readline')

var rl = readline.createInterface({
			input:process.stdin,
			output: process.stdout
			});
//----------------------------自定义函数-------------------------



//自定义输出
function prt(a){
          console.log(a);
}

function showall(a){
        for(x in a){
		if(a[x] == 'player')
			prt(form+player.name+form);
		else if(a[x] == 'bag'){
			prt(form+a[x]+form);
			prt(' \t'+bag.__+'/10');
		}
		else if(a[x] == 'shop'){
			prt(form+a[x]+form);
			prt('[funds:'+player.money+ ']');
			prt(' \t$');
		}
		else if(typeof(a[x]) != 'function'){
			prt( x +'\t'+a[x]);
		}
//		else
//			prt(x);
	}
	prt(form+'----'+form);
};
//----------------------------对象----------------------------

//玩家
var player = {
	tag : 'player',
        name : 'hero',
        carrer : 'ghost',
        hp : 100,
        mp : 100,
        money : 0,	
};

//背包
var bag = {
//name-number
	tag : 'bag',
        hat:0,
        shoes:0,
        cloth:0,
	pants:0,
	__:1,
};

var shop = {
//name-price
	tag : 'shop',
	hat:2,
	shoes:3,
	cloth:4,
	pants:4,
	buy:function(){
;	},
	sell: function(){
;	},
	work: function(){
		player.hp -=10;
		player.mp -=10;
		player.money +=10;	
	prt('work')}
}


//------------------------全局变量--------------------------------
var form = '-------------'

//菜单 '-' x 13
const menu =
` ----------choose menu-----------
 |	1) status	2) bag  |
 |	3) shop		4) game |	
 |	q) exit		        |
 |				|
 --------------------------------`;

//-------------------------main-----------------------------------

prt(menu);


rl.on('line',function(line) {
	
	switch(line){
		case '1':  {
			showall(player);
			break;
		}
		case '2':  {
			showall(bag);
			break;
		}
		case '3':  {
			showall(shop);
			break;
		}
		case '4':  {
			showall(game);
			break;
		}
		case 'q':  {
			rl.close();
		}
		default:   {
			prt(menu);
			//prt('err input');
		}
	}
//	prt(menu);
});

rl.on('close',function(){
	prt('finish');
	});
