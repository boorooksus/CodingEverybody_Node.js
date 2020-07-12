var http = require('http');
var fs = require('fs');
var url = require('url') //url이라는 모듈을 사용

var app = http.createServer(function(request,response){
    var _url = request.url; //query string 저장
    var queryData = url.parse(_url, true).query; //query string 분석해서 얻어낸 데이터 저장하는 객체
    var title = queryData.id; //query string의 data 저장 변수

    console.log(_url); 
    console.log(queryData.id);

    if(_url == '/'){
      title = 'Welcome';
    }
    if(_url == '/favicon.ico'){
      //return response.writeHead(404);
      response.writeHead(404);
      response.end();
      return;
    }
    response.writeHead(200);
    // == 1 ===================================
    fs.readFile(`data/13_${queryData.id}`, 'utf8', function(err,description){
    var template = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <meta charset="utf-8">
        </head>
        <body>
            <input type="button", value="hi", onclick="alert('hi')";>
            <h1><a href="/" style=color:red;>WEB</a></h1>
            <div id="grid">
                <ol>
                    <li><a href="/?id=html">html</a></li>
                    <li><a href="/?id=css">css</a></li>
                    <li><a href="/?id=javaScript">javaScript</a></li>
                </ol>
                <p>
                <h2>${title}</h2>
                    ${description}
                </p>
            </div>
            
        </body>
    </html>
    `;
    //template을 웹페이지에 출력
    response.end(template);   
    })
 
});
app.listen(3000);


//본문의 내용을 query string에 따라 다르게 구현
//1 : fs.fileFead()의 첫 번째 패러미터는 작은 따옴표로 하면 안되고 '`'로 감싸니까 됨. xxx(왜 인지는 모름)xxx. template 때문인 듯.