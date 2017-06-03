var clickedBorderColor = '#FFF';
var clickedFillColor = '#3F51B5'
var hoverBorderColor = '#F5F5F5';
var hydda = 'Hydda.Base';
var hyddaBase = 'Hydda.Base';
var hyddaFull = 'Hydda.Full';

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

var map = L.map('map',{
  zoomControl:false
}).setView([-1, 117], 5);
  var maptoken = 'pk.eyJ1IjoiZ2F6YW5kaWMiLCJhIjoiY2oxZjZzc2w2MDA5dzMzb2R3dThtaXlodSJ9.sef3PR-AHDUuzJ9jgVy1WQ';
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+maptoken, {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.light'
  }).addTo(map);

  L.layerGroup().eachLayer(function (layer) {
    layer.setStyle({fillColor :'#ffffff'});
  });

  L.tileLayer.provider('Hydda.Base').addTo(map);

  // Add zoom control
  L.control.zoom({
    position:'bottomleft'
  }).addTo(map);

  // control that shows state info on hover
  var info = L.control();

  info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };
  var treeString = ""
  var props;
  var countprops = 0;
  var savetarget;
  info.onclick = function(target){
    if (props==target.feature.properties){
      countprops++;
    }
    props = target.feature.properties;
    savetarget = target;

    target.setStyle({
      weight: 5,
      color: clickedBorderColor,
      fillColor: clickedFillColor,
      dashArray: '',
      fillOpacity: 1
    });

    var name = '';
    var population = '';
    var location = '';
    var alt_name = '';
    var dialects = '';
    var writing = '';
    var status = '';
    if (props) {
      name = props.name;
      if (props.name in indexCode) {
        var liname = indexCode[props.name]['data'];
        name = '';
        population = '';
        location = '';
        alt_name = '';
        dialects = '';
        writing = '';
        status = '';
        classification = '';
        for (var i in liname) {
          countprops = countprops%liname.length;
          i = countprops;
          name = bahasa[liname[i]]['name'];
          population = bahasa[liname[i]]['population'];
          location = bahasa[liname[i]]['location'];
          if (bahasa[liname[i]]['alt_name']){
            alt_name = bahasa[liname[i]]['alt_name']
          }
          if (bahasa[liname[i]]['dialects']){
            dialects = bahasa[liname[i]]['dialects']
          }
          if (bahasa[liname[i]]['writing']){
            writing = bahasa[liname[i]]['writing']
          }
          if (bahasa[liname[i]]['status']){
            status = bahasa[liname[i]]['status']
          }
          if (bahasa[liname[i]]['classification']){
            classification = bahasa[liname[i]]['classification']
          }
          treeString = bahasa[liname[i]]['classification']+','+bahasa[liname[i]]['name'];
        	updateTreeString(treeString);
          break;
        }
      }
    }
    $('#homebar').find('.sidebar__content__head__title').html('Bahasa '+name);
    $('#homebar').find('.sidebar__content__head__title2').html(alt_name);
    $('#homebar').find('.sidebar__content__subtitle__population').html('<i class="material-icons">person &nbsp</i>Population: '+population);
    $('#homebar').find('.sidebar__content__subtitle__location').html('<i class="material-icons">location_on &nbsp</i>Location: '+location);
    $('#homebar').find('.sidebar__content__subtitle__writing').html('<i class="material-icons">create &nbsp</i>Writing: '+writing);
    $('#homebar').find('.sidebar__content__subtitle__classification').html('<i class="material-icons">timeline &nbsp</i>Classification: '+classification);
    $('.sidebar__content__head__title3').css('background-color',$('.tooltip__info__population').css('background-color')).html('Status: '+status);
    if(liname.length>1){
      $('.sidebar__content__text__right').html('Languages '+(countprops+1)+'/'+(liname.length));
      $('.sidebar__content__text').show();
    }else{
      $('.sidebar__content__text').hide();
    }
    if($('.sidebar__content').hasClass('hide')){
      toggleBar();
    }
  }

  info.update = function (props) {
    var name = ''
    var population = ''
    var location = ''
    var status = '';
    var liname;
    var classification;
    if (props) {
      name = props.name;
      if (props.name in indexCode) {
        var liname = indexCode[props.name]['data'];
        name = '';
        population = '';
        location = ''
        alt_name = ''
        classification =''
        for (var i in liname) {
          name += bahasa[liname[i]]['name'];
          population += bahasa[liname[i]]['pop_numbers'];
          location += bahasa[liname[i]]['location'];
          if (bahasa[liname[i]]['status']){
            status += bahasa[liname[i]]['status']
          }
          if (bahasa[liname[i]]['alt_name']){
            alt_name += bahasa[liname[i]]['alt_name']
          }
          if (bahasa[liname[i]]['classification']){
            classification += bahasa[liname[i]]['classification']
          }
          break;
        }
      }
    }
    if (name!=''){
      if(liname.length>1){
        $('.sidebar__info__footer').html('and '+(liname.length-1)+' more languages').removeClass('hide');
        $('.tooltip__info__footer').html('and '+(liname.length-1)+' more languages').removeClass('hide');
      }
      // Sidebar
      $('.sidebar__info__text').html('<i class="material-icons">location_on &nbsp</i> '+location);
      $('.sidebar__info__subtitle').html('<i class="material-icons">person &nbsp</i> '+population+' People');
      $('.sidebar__info__title').html(name);
      // Tooltip
      $('.tooltip__info__population #populationval').html(numberWithCommas(population));
      $('.tooltip__info__content__title').html(name.toUpperCase());
      $('#tooltipStatus').html('<i class="material-icons header--9">info_outline &nbsp</i> '+status.slice(status.indexOf("(")+1, status.indexOf(".")).replace(')',''));
      $('#tooltiptitle2').html(alt_name);
      $('#tooltipclass').html('<i class="material-icons header--9">timeline &nbsp</i> '+classification.slice(0, classification.indexOf(",")));
      $('#tooltip').addClass('active');
      populationColor(status);
    }else{
      $('#tooltip').removeClass('active');
      $('#sidebarInfo').find('.sidebar__info__subtitle').html('<i class="material-icons">info &nbsp</i>Hover map to get information.');
      $('#sidebarInfo').find('.sidebar__info__text').html('');
      $('#sidebarInfo').find('.sidebar__info__title').html('');
    }

    // this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
    //   '<b>' + name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
    //   : 'Hover over a state');
  };

  // info.addTo(map);


  // get color depending on population density value
  function getColor(d) {
    return d > 1000 ? '#800026' :
        d > 500  ? '#FFFF22' :
        d > 200  ? '#E31A1C' :
        d > 100  ? '#FC4E2A' :
        d > 50   ? '#FD8D3C' :
        d > 20   ? '#FEB24C' :
        d > 10   ? '#FED976' :
              '#FFEDA0';
  }

  function style(feature) {
    return {
      weight: 0,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
      fillColor:feature.properties.hexa
    };
  }

  function highlightFromLayer(layer) {
    if(layer.options.color!=clickedBorderColor){
      layer.setStyle({
        weight: 2,
        color: hoverBorderColor,
        dashArray: '',
        fillOpacity: 1
      });
    }

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }

    info.update(layer.feature.properties);
  }

  function highlightFeature(e) {
    var layer = e.target;
    highlightFromLayer(layer);
  }

  var geojson;

  function resetHighlight(e) {
    $('#tooltip').removeClass('active');
    $('.sidebar__info__footer').addClass('hide');
    $('.tooltip__info__footer').addClass('hide');
    if(e.target.options.color!=clickedBorderColor){
      geojson.resetStyle(e.target);
    }
    info.update();
  }

  var selected;
  function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
    if(selected){
      geojson.resetStyle(selected);
    }
    info.onclick(e.target, selected);
    selected = e.target;
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
    });
  }

  geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);

  map.attributionControl.addAttribution('From image data &copy; <a href="http://muturzikin.com/">Muturzikin</a>, Language data &copy; <a href="https://www.ethnologue.com/"> Ethnologue</a> ');

  var searchControl = new L.Control.Search({
		layer: geojson,
		propertyName: 'name',
		marker: false,
		moveToLocation: function(latlng, title, map) {
			//map.fitBounds( latlng.layer.getBounds() );
			var zoom = map.getBoundsZoom(latlng.layer.getBounds());
  			map.setView(latlng, zoom); // access the zoom
		}
	});

  searchControl.on('search:locationfound', function(e) {
      highlightFromLayer(e.layer);
	}).on('search:collapsed', function(e) {
		  console.log("do nothing");
	});

  map.addControl(searchControl);
