var http = require('http');
var fs = require('fs');
var url = require('url') //url이라는 모듈을 사용

var app = http.createServer(function(request,response){
    var _url = request.url; //query string 저장
    var queryData = url.parse(_url, true).query; //query string 분석해서 얻어낸 데이터 저장하는 객체
    var title = queryData.id; //query string의 data 저장 변수

    console.log(_url); 
    console.log(queryData.id);

    var pathname = url.parse(_url, true).pathname;

    // == 1 ======================================
    if(pathname ==='/'){
        if(queryData.id === undefined){
            fs.readFile(`data/13_${queryData.id}`, 'utf8', function(err, description){
                title = 'Welcome';
                var description = 'Welcome';
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
                response.writeHead(200);
            //template을 웹페이지에 출력
            response.end(template);   
            })
        } 
        else{
            fs.readFile(`data/13_${queryData.id}`, 'utf8', function(err, description){
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
                response.writeHead(200);
            //template을 웹페이지에 출력
            response.end(template);   
            })
        }
    }
    else{
        response.writeHead(404);
        response.end('Not found')
    }

 
});
app.listen(3000);


// index 페이지에서 undefined 였던 title과 description이 welcome으로 출력하도록 구현
// 1: 조건문을 이용해서 queury string의 값이 없을 땐 welcome 출력하도록 함