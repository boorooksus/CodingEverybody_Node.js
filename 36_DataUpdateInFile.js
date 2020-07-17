var http = require('http');
var fs = require('fs');
var url = require('url')
var qs = require('querystring');


function templateHTML(title, list, body, control){
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
            ${control}
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
                var template = templateHTML(title, list, `<p><h2>${title}</h2>${description}</p>`, `<a href="/create">create</a>`);
                response.writeHead(200);
                response.end(template);
            })                
        } 
        else{
            fs.readdir('./data', 'utf8', function(error, filelist){
                fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
                    var title = queryData.id;
                    var list = templateList(filelist);
                    var template = templateHTML(title, list, `<p><h2>${title}</h2>${description}</p>`, `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
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
            <form action="/create_process" method="post">
                <p></p><input type="text" name="title" placeholder="Title"></p>
                <p>
                    <textarea name="description" placeholder="description"></textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>
            `, '');
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
                response.writeHead(302, {Location: `/?id=${qs.escape(title)}`});
                response.end('success');
            })
        });
    }
    //update 링크를 눌렀을 때,
    else if(pathname === '/update'){
        fs.readdir('./data', 'utf8', function(error, filelist){
            fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
                var title = queryData.id;
                var list = templateList(filelist);
                var template = templateHTML(title, list, 
                    `
                    <form action="/update_process" method="post">
                        <input type="hidden" name="id" placeholder="title" value="${title}">
                        <p></p><input type="text" name="title" placeholder="Title" value="${title}"></p>
                        <p>
                            <textarea name="description" placeholder="description">${description}</textarea>
                        </p>
                        <p>
                            <input type="submit">
                        </p>
                    </form>
                    `, 
                    `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
                );
                response.writeHead(200);
                response.end(template);   
            });
        });
    }
    //수정 사항 작성 후 전송 눌른 후
    else if (pathname ==='/update_process'){
        var body = '';
        request.on('data',function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            //이름 변경
            fs.rename(`data/${id}`, `data/${title}`, function(err){
                //본문 변경
                fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                    response.writeHead(302, {Location: `/?id=${qs.escape(title)}`});
                    response.end('success');
                })
            });
        });
    }
    else{
        response.writeHead(404);
        response.end('Not found')
    } 
});
app.listen(3000);


// 글 수정 - 파일명 변경, 내용 저장
