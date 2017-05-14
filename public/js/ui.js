function hideAllBar(){
  $('#homebar').removeClass('active');
  $('#langbar').removeClass('active');
  $('#statbar').removeClass('active');
  $('#setbar').removeClass('active');
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
});
