var name = 'booroogi ';
var letter = 'dear ' + name + 'Lorem ipsum do\
\n\
lor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
console.log(letter);

var name = 'booroogi ';
var letter = `dear  ${name}
'Lorem ipsum dolor sit amet, ${1 + 1}consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
console.log(letter);


// 줄 바꿈 할 땐 마지막에 '/' 붙이기
// 실행 결과에서 줄 바꾼 할 땐 '\n' 붙이기
// 더 편리한 방법 : template
// '`'로 문자열 묶어서 template 만들기
// '${내용}' 사용해서 변수나 문자, 숫자 삽입 가능
