var testFolder = './data';
var fs = require('fs');

fs.readdir(testFolder, function(error, filelist){
    console.log(filelist);
})


// 파일 목록 알아내는 방법
