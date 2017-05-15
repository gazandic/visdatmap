var clickedBorderColor = '#3F51B5';
var hoverBorderColor = '#0091EA';
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

  info.onclick = function(target){
    var props = target.feature.properties;

    target.setStyle({
      weight: 5,
      color: clickedBorderColor,
      fillColor: clickedBorderColor,
      dashArray: '',
      fillOpacity: 1
    });

    var name = '';
    var population = '';
    var location = '';
    if (props) {
      name = props.name;
      if (props.name in indexCode) {
        var liname = indexCode[props.name]['data'];
        name = '';
        population = '';
        location = ''
        for (var i in liname) {
          name += bahasa[liname[i]]['name'];
          population += bahasa[liname[i]]['population'];
          location += bahasa[liname[i]]['location'];
          break;
        }
      }
    }
    $('#homebar').find('.sidebar__content__head__title').html(name);
    $('#homebar').find('.sidebar__content__subtitle__population').html('<i class="material-icons">person &nbsp</i>'+population);
    $('#homebar').find('.sidebar__content__subtitle__location').html('<i class="material-icons">location_on &nbsp</i>'+location);
    if($('.sidebar__content').hasClass('hide')){
      toggleBar();
    }
  }

  info.update = function (props) {
    var name = ''
    var population = ''
    var location = ''
    var liname;
    if (props) {
      name = props.name;
      if (props.name in indexCode) {
        var liname = indexCode[props.name]['data'];
        name = '';
        population = '';
        location = ''
        for (var i in liname) {
          name += bahasa[liname[i]]['name'];
          population += bahasa[liname[i]]['population'];
          location += bahasa[liname[i]]['location'];
          break;
        }
      }
    }
    if (name!=''){
      // $('#tooltip').html('<i class="material-icons">language</i>'+liname.length).addClass('active');
      if(liname.length>1){
        $('.sidebar__info__footer').html('and '+(liname.length-1)+' more languages').removeClass('hide');
      }
      $('#sidebarInfo').find('.sidebar__info__text').html('<i class="material-icons">location_on &nbsp</i> '+location).animateCss('fadeIn');
      $('#sidebarInfo').find('.sidebar__info__subtitle').html('<i class="material-icons">person &nbsp</i> '+population).animateCss('fadeIn');
      $('#sidebarInfo').find('.sidebar__info__title').html(name).animateCss('fadeIn');
    }else{
      $('#sidebarInfo').find('.sidebar__info__subtitle').html('<i class="material-icons">info &nbsp</i>Hover map to get information.').animateCss('fadeIn');
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
      weight: 2,
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
    // console.log(e.target.options.color);
    // $('#tooltip').removeClass('active');
    $('.sidebar__info__footer').addClass('hide');
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

  map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');

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
