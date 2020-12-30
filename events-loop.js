var events = require('events');

var eventEmitter = new events.EventEmitter();


//-----------1------------
var connectHandler = function connected(){
	console.log('success connected');
	eventEmitter.emit('data_received');
}

eventEmitter.on('connection',connectHandler);


//----------2-------------
eventEmitter.on('data_received',function(){console.log('success to receive data');});

eventEmitter.emit('connection');

console.log('finished');

