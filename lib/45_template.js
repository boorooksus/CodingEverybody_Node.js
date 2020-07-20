module.exports = {
    html:function(title, list, body, control){
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
    },
    list:function(filelist){
        var list = '<ul>';
        var i = 0;
        while(i < filelist.length){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i + 1;
        }
        list = list + '</ul>';
        return list
    }
}

//module.exports = template;