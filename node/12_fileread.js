var fs = require('fs');
fs.readFile('12_sample.txt', 'utf8', function(err,data){
    console.log(data);
});


//file 읽는 방법