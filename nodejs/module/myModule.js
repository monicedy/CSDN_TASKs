function myModule(){
	var originName = 'yxd' ;
	
	//correct way	
	this.showName = function(name){
		if(name != undefined)
			console.log('temp name:' + name);
		else
			console.log('origin name:' + originName);
	}

	/*
	 * wrong way
	function setName(name){
		this.name = name;
		console.log('modified success ' + name);
	}
	*/
}

module.exports = myModule;
