//객체 이용해서 폴더처럼 관리 가능 -> 다른 객체에 이름 같은 변수 만들어도 기존 객체의 변수와 혼동하지 않을 수 있음

var o = {
    v1:'a',
    v2:'b',

    f1:function f1(){
        console.log(this.v1);
    },
    f2:function f1(){
        console.log(this.v2);
    }
}

o.f1();
o.f2();
