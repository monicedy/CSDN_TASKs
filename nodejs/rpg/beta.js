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

function prtx(a){
	console.log('***system: '+a+' ***');
}

function showall(a){
        for(x in a){
		if(a[x] == 'player')
			prt(form+player.name+form);
		else if(a[x] == 'bag'){
			prt(form+a[x]+form);
			prt(' \t'+bag.__+'/'+limit);
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
        name : 'Safeguard.M',
        carrer : 'coder',
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
	buy:function(str){
		if((player.money - shop[str]) >= 0){
			player.money -= shop[str];
			bag[str] += 1 ;
			bag.__ += 1;
			prtx('purchase success.');
		}
		else{
			prtx('U dont hava enough money. Your $:'+player.money)
		}
	},

	//sell: function(){;},
	
	work: function(){
		player.hp -=10;
		player.mp -=10;
		player.money +=5;
		prtx(' After 996 , Your $: '+player.money);
		}
}


//------------------------全局变量--------------------------------

var limit = 100 ;//[可选项]物品栏上限

var ipt;//用于接收输入

var form = '-------------';

var shoplist = `b) buy		w) work`;

//菜单 '-' x 13
const menu =
` ----------choose menu------------
 |	1) status	2) bag   |
 |	3) shop		4) game  |	
 |	5) menu 	0) exit  |
 ---------------------------------`;

//-------------------------main-----------------------------------


prt(menu);

rl.on('line',function(line) {
	
	if(player.hp <= 0){
		prt('Your health is:'+player.hp);
		prt('ICU welcom');
		rl.close();
	}
	
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
			prt(shoplist);
			break;
		}
		case '4':  {
			ceasa();
			break;
		}
		case '0':  {
			rl.close();
			break;
		}
		case '5':   {
			prt(menu);
			break;
		}
		case 'b':{
			prtx('input the ITEM NAME to Buy');
			rl.once('buySth',function(){
				shop.buy(ipt);
			});
			break;
		}
		case 'w':{
			shop.work();
			break;
		}
		default :{
			ipt = line;
			rl.emit('buySth');
			break;
		}
	
	}
});

rl.on('close',function(){
	prt('GameOver');
	});
