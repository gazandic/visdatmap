$(document).ready(function(){
  $('input').iCheck({
    checkboxClass: 'icheckbox_square',
    radioClass: 'iradio_square'
  });
});

var tooltips = document.querySelectorAll('#tooltip');

window.onmousemove = function(e){
  var x = (e.clientX + 10) + 'px',
  y = (e.clientY + 10) + 'px';
  for (var i = 0; i < tooltips.length; i++) {
      tooltips[i].style.top = y;
      tooltips[i].style.left = x;
  }
};

function hideAllBar(){
  $('#homebar').removeClass('active');
  $('#langbar').removeClass('active');
  $('#statbar').removeClass('active');
  $('#setbar').removeClass('active');
  $('#searchbar').removeClass('active');
  hideActiveButton();
}

function hideActiveButton(){
  $('#homebtn').children().removeClass('active');
  $('#langbtn').children().removeClass('active');
  $('#statbtn').children().removeClass('active');
  $('#setbtn').children().removeClass('active');
  $('#searchbtn').children().removeClass('active');
}

$('#homebtn').click(function(){
  hideAllBar();
  $('#homebar').addClass('active');
  $(this).children().addClass('active');
});

$('#langbtn').click(function(){
  hideAllBar();
  $('#langbar').addClass('active');
  $(this).children().addClass('active');
});

$('#statbtn').click(function(){
  hideAllBar();
  $('#statbar').addClass('active');
  $(this).children().addClass('active');
});

$('#setbtn').click(function(){
  hideAllBar();
  $('#setbar').addClass('active');
  $(this).children().addClass('active');
});

$('#searchbtn').click(function(){
  hideActiveButton();
  $(this).children().addClass('active');
  $('#searchbar').addClass('active').find('#provider-file').focus();
});

$('#setCityLabel').click(function(){
  if(hydda==hyddaFull){
    hydda = hyddaBase;
  }else{
    hydda = hyddaFull;
  }
  L.tileLayer.provider(hydda).addTo(map);
});
