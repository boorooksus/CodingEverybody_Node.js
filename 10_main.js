var http = require('http');
var fs = require('fs');
var url = require('url') //url이라는 모듈을 사용

var app = http.createServer(function(request,response){
    var _url = request.url; //query string 저장
    var queryData = url.parse(_url, true).query; //query string 분석해서 얻어낸 데이터 저장하는 객체

    //== 1 ==================================
    console.log(_url); 
    console.log(queryData.id);
    //=======================================

    if(_url == '/'){
      _url = '/00_index.html';
    }
    if(_url == '/favicon.ico'){
      //return response.writeHead(404);
      response.writeHead(404);
      response.end();
      return;
    }
    response.writeHead(200);
    //query string의 뒷부분 웹페이지에 출력
    response.end(queryData.id);
 
});
app.listen(3000);


// query string의 값을 웹페이지에 출력함
// ex)주소창에 https://localhost:3000/?id=HTML 이라고 치면 화면에 'HTML'이라고 뜸
// 1: console.log(_url): 주소창에 https://localhost:3000/?id=HTML치면 console 창에 '/?id=HTML' 뜸
// 1: console.log(queryData.id): 주소창에 https://localhost:3000/?id=HTML치면 console 창에 'HTML' 뜸