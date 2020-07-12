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

            fs.readdir('./data', function(error, filelist){
                title = 'Welcome';
                var description = 'Welcome';
                var list = '<ul>';
                var i = 0;
                while(i < filelist.length){
                    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</li>`;
                    i = i + 1;
                }
                list = list + '</ul>';

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
                            ${list}
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
            fs.readdir('./data', function(error, filelist){
                title = 'Welcome';
                var description = 'Welcome';
                var list = '<ul>';
                var i = 0;
                while(i < filelist.length){
                    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</li>`;
                    i = i + 1;
                }
                list = list + '</ul>';

                fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
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
                                ${list}
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
            });
            })
        }
    }
    else{
        // == 1 =========================
        response.writeHead(404);
        response.end('Not found')
    }

 
});
app.listen(3000);


// data 폴더 안에 있는 파일 목록을 불러와서 <li> 목록을 만들도록 구현. data 폴더에 파일을 추가해도 해당 코드 수정 필요없이 웹페이지 새로고침하면 자동으로 등록됨