var a = function(){
    console.log('Hi');
}

function slowfunc(callback){
    callback();
}

slowfunc(a);