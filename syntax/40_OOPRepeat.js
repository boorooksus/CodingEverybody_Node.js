//배열
var members = ['abc', 'def', 'hij'];
console.log(members[1]); // def
var i = 0;
while(i < members.length){
    console.log('members :', members[i]);
    i = i + 1;
}



//객체
var roles = {
    'name':'abc',
    'job':'student',
    'grade':'a'
}
console.log(roles.name); // abc

for(var name in roles){
    console.log('object: ', name, 'value: ', roles[name]);
}