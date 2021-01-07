/*
*name: rpg小游戏
*auther: monicedy
*date: 2021-01-06
*/

//事件发生器
var evt = require('events');
var ee =new  evt.EventEmitter();


//----------------------------自定义函数-------------------------

//自定义输入
function input(str){
	var readline =require('readline')

	var rl = readline.createInterface({
		input:process.stdin,
		output: process.stdout
		});

	rl.question(str,(data) => {
		opt = data
		ee.emit('E-opt');
		//rl.close()
		});
}

//自定义输出
function prt(a){
          console.log(a);
}

function showall(a){
        for(x in a){
		if(a[x] == 'player')
			prt(line+a[x]+line);
		else if(a[x] == 'bag'){
			prt(line+a[x]+line);
			prt('[item]\t[number]');
		}
		else if(a[x] == 'shop'){
			prt(line+a[x]+line);
			prt('[item]\t[price]');
		}
		else if(typeof(a[x]) != 'function'){
			prt( x +':\t'+a[x]);
		}
		else
			prt(x);
        }
}
/*
function showstat(){
        prt('________'+player.name+'Status_________');
        //prt('name:' + player.name );
        //prt(player.carrer);
        prt('Hp:' + player.hp);
        prt('Mp:'+player.mp);
        prt('$:'+player.money);
        prt('____________________________');
}

function showbag(){
        prt('_________bag____________');
        //prt(bag);
        showall(bag);
        prt('________________________');
}

function shop(){
        prt('_________shop____________');

        prt('_________________________');
}
*/

//----------------------------对象----------------------------

//玩家
var player = {
	tag : 'player',
        name : 'hero',
        carrer : 'ghost',
        hp : 100,
        mp : 100,
        money : 0
};

//背包
var bag = {
//name-number
	tag : 'bag',
        hat:0,
        shoes:0,
        cloth:0,
	pants:0,
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
var line = '-------------'

//菜单 '-' x 13
const menu =
`-------------menu-------------
	1) status	2) bag
	3) shop		4) game	
	q) exit
[choose]:`;


//选项
var opt;

//-------------------------main-----------------------------------

input(menu);

ee.on('E-opt',function(){
	switch(opt){
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
		default:{prt('err input')}
	}
});

console.log('end of program');
