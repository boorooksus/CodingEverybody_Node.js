var http = require('http');
var fs = require('fs');
var url = require('url')
var qs = require('querystring');

function templateHTML(title, list, body){
    return `
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
            <a href="/create">create</a>
            ${body}
        </div>
        
    </body>
</html>
`;
}

function templateList(filelist){
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        i = i + 1;
    }
    list = list + '</ul>';
    return list
}

var app = http.createServer(function(request,response){
    var _url = request.url; //query string 저장
    var queryData = url.parse(_url, true).query; //query string 분석해서 얻어낸 데이터 저장하는 객체
    var pathname = url.parse(_url, true).pathname;

    if(pathname ==='/'){
        if(queryData.id === undefined){
            fs.readdir('./data', 'utf8', function(error, filelist){
                var title = 'Welcome';
                var description = 'Welcome';
                var list = templateList(filelist);
                var template = templateHTML(title, list, `<p><h2>${title}</h2>${description}</p>`);
                response.writeHead(200);
                response.end(template);
            })                
        } 
        else{
            fs.readdir('./data', 'utf8', function(error, filelist){
                fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
                    var title = queryData.id;
                    var list = templateList(filelist);
                    var template = templateHTML(title, list, `<p><h2>${title}</h2>${description}</p>`);
                    response.writeHead(200);
                    response.end(template);   
                });
            });
        }
    }
    else if(pathname === '/create'){
        fs.readdir('./data', 'utf8', function(error, filelist){
            var title = 'Web create';
            //var description = 'Welcome';
            var list = templateList(filelist);
            var template = templateHTML(title, list, `
            <form action="http://localhost:3000/create_process" method="post">
                <p></p><input type="text" name="title" placeholder="Title"></p>
                <p>
                    <textarea name="description" placeholder="description"></textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>
            `);
            response.writeHead(200);
            response.end(template);
        })
    }
    else if(pathname === '/create_process'){
        var body = '';
        request.on('data',function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            //전송된 내용으로 파일 생성
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                // 파일 생성 후 redirection
                // == 1 ========================
                response.writeHead(302, {Location: `/?id=${qs.escape(title)}`});
                response.end('success');
            })
        });
    }
    else{
        response.writeHead(404);
        response.end('Not found')
    } 
});
app.listen(3000);


// 파일 생성과 리다이렉션
// redirection: 현재 페이지에서 다른 페이지로 보내는 것
// 1: 302: 임시로 페이지를 바꾸라는 뜻
// 1: `/?id=${title}`이렇게만 하면 한글 입력하고 전송 했을때 오류 페이지가 나옴.