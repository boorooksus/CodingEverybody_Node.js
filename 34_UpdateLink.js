var http = require('http');
var fs = require('fs');
var url = require('url')
var qs = require('querystring');

// == 1 =========================================
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
            <!--== 1 =============================-->
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
                // == 1 =====================
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
                    // == 1 =======================
                    var template = templateHTML(title, list, `<p><h2>${title}</h2>${description}</p>`, `<a href="/create">create</a> <a href="/update?/id=${title}">update</a>`);
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
    else{
        response.writeHead(404);
        response.end('Not found')
    } 
});
app.listen(3000);


// 파일 수정 링크 생성. 아직 수정은 안됨
// 1: 메인 페이지를 제외한 페이지에서 수정 링크가 나오도록 하기위해 templateHTML함수의 패러미터를 늘리고 create, update 링크를 넘김. 수정 링크를 누르면 쿼리 스트링이 해당 페이지 title인 수정 페이지로 넘어감
