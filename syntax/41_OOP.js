//자바스크립트에서 함수는 변수의 값이 될 수 있음
var f = function(){
    console.log('hi');
}

//함수 f를 배열a에 넣음
var a = [f];

a[0]();

//함수 f를 객체o에 넣음
var o = {
    func:f
}

o.func();