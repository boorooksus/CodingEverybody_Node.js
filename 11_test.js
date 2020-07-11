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
    // '00_html.html'내용 template
    var template = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>${title}</title>
        <meta charset="utf-8">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="00_colors.js"></script>
        <script>
            var a_list = {
                "html": "00_html.html",
                "css": "00_css.html",
                "javaScript": "00_javaScript.html",

                showList:function(){
                    document.write("<ol>");
                    for(key in a_list){
                        if(key !== "showList"){
                            document.write("<li><a href=\""+a_list[key]+"\">"+key+"</a></li>");
                        }
                    }
                    document.write("</ol>");

                }
            };

            function nightDayHandler(self){
                var alist = document.querySelectorAll('li');
                if(self.value === 'night'){
                    Body.setBackgroundColor('rgb(30,30,30)');
                    Body.setColor('white');
                    self.value = 'day';
                    Links.setColor('white');
                }
                else{
                    Body.setBackgroundColor('white');
                    Body.setColor('black');
                    self.value = 'night';
                    Links.setColor('black');
                }
            }
        </script>
        <link rel="stylesheet" href="00_style.css">
    </head>
    <body style=margin:0;>
        <input id="night_day" type="button" value = "night" onclick="nightDayHandler(this)">
        <h1><a href="00_index.html">WEB</a></h1>
        <div id="grid">
            <ol>
                <li><a href="/?id=HTML">html</a></li>
                <li><a href="/?id=CSS">css</a></li>
            <p style=padding:20px;>
            <h2>${title}</h2>
                <img src="00_htmlimg.png" alt="html logo" width="250"><br>
                Hypertext Markup Language (HTML) is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript.
            </p>
        </div>
        
    </body>
</html>
    `;
    //template을 웹페이지에 출력
    response.end(template);
 
});
app.listen(3000);


//template 내에서 javaScript 문법 활용했던 li tag을 수정함. html 문법만 사용하면 되긴 됨