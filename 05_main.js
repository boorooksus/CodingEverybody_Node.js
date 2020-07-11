var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response){
    var url = request.url;
    if(request.url == '/'){
      url = '/00_index.html';
    }
    if(request.url == '/favicon.ico'){
      //return response.writeHead(404);
      response.writeHead(404);
      response.end();
      return;
    }
    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + url));
 
});
app.listen(3000);


//앞으로 배울 내용
//cmd 창에 명령어 cd로 디렉토리 이동 ex) cd C:\Users\booro\Desktop\Nodejs
//cmd 창에 명령어 node로 파일 실행 ex) node main.js
//cmd 창에 CTRL + C 로 파일 종료