var tooltips = document.querySelectorAll('#tooltip');

window.onmousemove = function(e){
  var x = (e.clientX - 260) + 'px',
  y = (e.clientY + 20) + 'px';
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
  hideActiveButton();
  if($('.sidebar__content').hasClass('hide')){
    toggleBar();
  }
}

function hideActiveButton(){
  $('#homebtn').children().removeClass('active');
  $('#langbtn').children().removeClass('active');
  $('#statbtn').children().removeClass('active');
  $('#setbtn').children().removeClass('active');
}

function toggleBar(){
  var target = $('#setMinSidebar');
  $('.sidebar__content').toggleClass('hide');
  if($(target).find('i').html().includes('up')){
    $(target).find('i').html('keyboard_arrow_down').parent().hide();
  }else{
    $(target).find('i').html('keyboard_arrow_up').parent().show();
  }
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

$('#treebtn').click(function(){
  $('.tree').toggle();
  $('.body').toggleClass('frame--blur');
});

$('#searchbtn').click(function(){
  $('#searchbtn').children().toggleClass('active');
  $('#searchbar').toggleClass('active');
  if($(this).children().hasClass('active')){
    $('#searchbar').find('#provider-file').focus().select();
  }
});

$('#setCityLabel').click(function(){
  if(hydda==hyddaFull){
    hydda = hyddaBase;
  }else{
    hydda = hyddaFull;
  }
  L.tileLayer.provider(hydda).addTo(map);
});

$('#setMinSidebar').click(function(){
  toggleBar();
});

$('#setTooltip').click(function(){
  if($(this).is(':checked')){
    $('#tooltip').removeClass('hide');
    $('.sidebar__info').hide();
    $('.sidebar__info__footer').hide();
  }else{
    $('#tooltip').addClass('hide');
    $('.sidebar__info').show();
    $('.sidebar__info__footer').show();
  }
});
