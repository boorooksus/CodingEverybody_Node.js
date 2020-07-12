// == 1 ======================
var args = process.argv;
console.log(args);
if(args[2] === '1'){
    console.log('This is 1');
}
else{
    console.log('This is not 1');
}


// 콘솔에서 패러미터 전달 방법
// 1: args의 0번째: 컴파일러 주소, 1번째: 파일 주소, 3번째부터 입력값 저장
// ex) 콘솔창에 node main.js 'booroogi' 입력 -> args = ['C:\Users\~\node.exe', 'C:\Users\~\main.js', 'booroogi']