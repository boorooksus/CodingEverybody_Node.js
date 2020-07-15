var fs = require('fs');

//readFileSync
console.log('A');
var result = fs.readFileSync('syntax/28.2_sample.txt', 'utf8');
console.log(result);
console.log('C');