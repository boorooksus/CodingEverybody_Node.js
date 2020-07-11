var Body = {
  setColor:function(color){
    //document.querySelector('body').style.color = color;
    $('body').css('color', color);
  },
  setBackgroundColor:function(color){
    //document.querySelector('body').style.backgroundColor = color;
    $('body').css('backgroundColor', color);
  }
}
var Links = {
  setColor:function(color){
    // var list = document.querySelectorAll('li');
    // var i = 0;
    // while(i < list.length){
    //   list[i].style.color = color;
    //   i = i + 1;
    // }
    $('a').css('color', color);
  }
}
function nightDayHandler(self){
  //var target = document.querySelector('body');
  var list = document.querySelectorAll('li');
  var button = document.querySelectorAll('#night_day')
  if (self.value === 'night'){
    //target.style.backgroundColor = 'DimGray';
    //target.style.color = 'white';
    //self.value = 'day';
    Body.setBackgroundColor('DimGray');
    Body.setColor('white');
    var i = 0;
    while(i < button.length){
      button[i].value = 'day';
      i = i + 1;
    }

    /*var i = 0;
    while(i < list.length){
      list[i].style.color = 'cyan';
      i = i + 1
    }*/
    Links.setColor('cyan');
  }
  else{
    //target.style.backgroundColor = 'LightGray';
    //target.style.color = 'black';
    //self.value = 'night';
    Body.setBackgroundColor('LightGray');
    Body.setColor('black');
    var i = 0;
    while(i < button.length){
      button[i].value = 'night';
      i = i + 1;
    }
    /*var i = 0;
    while(i < list.length){
      list[i].style.color = 'MediumSlateBlue';
      i = i + 1;
    }*/
    Links.setColor('MediumSlateBlue');
  }
}


//  4, 8, 19: jQuery로 표현
