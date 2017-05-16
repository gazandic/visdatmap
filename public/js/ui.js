var tooltips = document.querySelectorAll('#tooltip');

window.onmousemove = function(e){
  var x = (e.clientX - 260) + 'px',
  y = (e.clientY + 20) + 'px';
  for (var i = 0; i < tooltips.length; i++) {
      tooltips[i].style.top = y;
      tooltips[i].style.left = x;
  }
};

function populationColor(status){
  var finalColor = '#000';
  if(status.includes('10')){
    finalColor = '#000';
  }else if(status.includes('9')||status.includes('8')){
    finalColor = '#F44336';
  }else if(status.includes('7')||status.includes('6')){
    finalColor = '#EF6C00';
  }else if(status.includes('5')||status.includes('4')){
    finalColor = '#F9A825';
  }else if(status.includes('3')||status.includes('2')){
    finalColor = '#43A047';
  }else{
    finalColor = '#3F51B5';
  }

  $('.tooltip__info__population').css('background-color', finalColor);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function hideAllBar(){
  $('#homebar').removeClass('active');
  $('#langbar').removeClass('active');
  $('#statbar').removeClass('active');
  $('#setbar').removeClass('active');
  hideActiveButton();
  checkClose();
  if($('.sidebar__content').hasClass('hide')){
    toggleBar();
  }
}

function checkClose(){
  if($('.sidebar__content').hasClass('hide')&&(!($('.sidebar__search').hasClass('active')))){
    $('#homebtn').addClass('close');
    $('#setbtn').addClass('close');
  }else{
    $('#homebtn').removeClass('close');
    $('#setbtn').removeClass('close');
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
    $('#homebtn').addClass('close');
    $('#setbtn').addClass('close');
  }else{
    $(target).find('i').html('keyboard_arrow_up').parent().show();
    $('#homebtn').removeClass('close');
    $('#setbtn').removeClass('close');
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
  $(this).children().toggleClass('active');
  $('.tree').toggle();
  $('.body').toggleClass('frame--blur');
});

$('#searchbtn').click(function(){
  $(this).children().toggleClass('active');
  $('#searchbar').toggleClass('active');
  if($(this).children().hasClass('active')){
    $('#searchbar').find('#provider-file').focus().select();
  }
  checkClose();
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
  checkClose();
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
