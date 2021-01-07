var player = {
        name : 'hero',
        carrer : 'ghost',
        hp : 100,
        mp : 100,
        money : 0

};

var bag = {
        bar:3,
        hat:2,
        shoes:2,
        cloth:3
};


function prt(a){
        console.log(a);
}

function showall(a){
        for(x in a){
                prt(x);
        // prt('\t');
                prt('$:'+a[x]);
        }
}
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
while(1){
        //prt('nihaocaidan');
        //player;
        showstat();
        showbag();
/* switch(){
                case 1:
                        ;
                case 2:
                        ;
                default:
                        ;

        }
*/
        return 0;

}
