var fs = require('fs');

console.log('A');
fs.readFile('syntax/28.2_sample.txt', 'utf8', function(err, result){
    console.log(result);
});
console.log('C');