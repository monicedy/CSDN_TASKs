var myModule = require('./myModule');

console.log('typeof Mymodule:'+typeof(myModule));

var hl = new myModule();

hl.showName();
hl.showName('monicedy');
