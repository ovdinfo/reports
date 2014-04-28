requirejs.config({
    appDir: ".",
    baseUrl: "/ext",
    paths: { 
        'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min','libs/jquery/jquery.min'],
        'bootstrap': ['//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/js/bootstrap.min','libs/bootstrap/js/bootstrap.min'],
        'tablesorter': 'libs/tablesorter/jquery.tablesorter.min',
        'tablesorter.widgets': 'libs/tablesorter/jquery.tablesorter.widgets.min',
        'underscore': 'libs/underscore/underscore-min',
        'spin': 'libs/spin/spin.min',
        'moment': 'libs/moment/moment.min',
        'mapbox': ['//api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox','libs/mapbox/latest/mapbox'],
        'Leaflet.fullscreen': 'libs/mapbox/Leaflet.fullscreen.min',
        'leaflet-heat': 'libs/mapbox/leaflet-heat',
        //'omnivore': ['//api.tiles.mapbox.com/mapbox.js/plugins/leaflet-omnivore/v0.0.1/leaflet-omnivore.min','libs/mapbox/leaflet-omnivore.min'],
        'async': 'libs/require/async',
        'goog': 'libs/require/goog',
        'propertyParser': 'libs/require/propertyParser'

    },
    shim: {
        'bootstrap' : ['jquery'],
        'tablesorter' : ['jquery','bootstrap'],
        'tablesorter.widgets' : ['jquery','bootstrap','tablesorter'],
        'spin' : ['jquery'],
        'Leaflet.fullscreen': ['mapbox'],
        'leaflet-heat': ['mapbox']
    }
});

require([
    'jquery', 'bootstrap', 'tablesorter', 'tablesorter.widgets', 'underscore', 'spin', 'moment', 'mapbox', 'Leaflet.fullscreen', 'leaflet-heat', 'goog!visualization,1,packages:[corechart],language:ru'
],
function($,tablesorter){
$('#header ul.nav a[href="'+ window.location.pathname +'"]').parent().addClass('active');
loadCss('/ext/libs/mapbox/latest/mapbox.css');
loadCss('/ext/libs/mapbox/leaflet.fullscreen.css');
loadCss('/ext/libs/mapbox/map.css');
var opts = {
  lines: 13, // The number of lines to draw
  length: 13, // The length of each line
  width: 8, // The line thickness
  radius: 29, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  color: '#fff', // #rgb or #rrggbb
  speed: 1, // Rounds per second
  trail: 58, // Afterglow percentage
  shadow: true, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: 'auto', // Top position relative to parent in px
  left: 'auto' // Left position relative to parent in px
};

var mapHeight = ($(window).height()/100)*90-140;

$('#map,#loader').height(mapHeight+'px');

$('#loader').spin(opts);

var map = L.mapbox.map('map', 'integral.map-asmf5yqy')
    .setView([55.7512419, 37.6184217], 11).addControl(L.mapbox.shareControl());
    L.control.fullscreen().addTo(map);

map.scrollWheelZoom.disable();

var ovdData = {};

document.getElementById('navigation').onclick = function(e) {
    var pos = e.target.getAttribute('data-position');
    if (pos) {
        var loc = pos.split(',');
        map.setView(loc, 11);
    }
}

var ui = document.getElementById('map-ui');
var ovds = omnivore.csv('https://docs.google.com/spreadsheet/pub?key=0Au4PSkYLKeoTdHdRYV9SN3BGOVhJTEZtNnFLaWE4RXc&single=true&gid=72&output=csv',{latfield: 'lat',
    lonfield: 'lon',
    delimiter: ','}).on('ready', function() {
      $('#navigation').fadeIn()
      $.ajax({
        url: 'https://spreadsheets.google.com/feeds/list/0Au4PSkYLKeoTdHdRYV9SN3BGOVhJTEZtNnFLaWE4RXc/obh/public/values?alt=json-in-script',
        dataType: 'jsonp',
        success: buildTable
      });
    });
var heat = L.heatLayer([], { maxZoom: 14, blur: 30 });
var heatLayer = omnivore.csv('https://docs.google.com/spreadsheet/pub?key=0Au4PSkYLKeoTdHdRYV9SN3BGOVhJTEZtNnFLaWE4RXc&single=true&gid=77&output=csv',{latfield: 'lat',
    lonfield: 'lon',
    delimiter: ','}).on('ready', function() {
        heatLayer.eachLayer(function(l) {
            heat.addLatLng(l.getLatLng());
        });
    });
addLayer(ovds, 'Отделения полиции', 1);
addLayer(heat, 'Места задержаний', 2);

ovds.on('ready', function(){
  _.each(ovds._layers,function(ovd){
    var marker = document.createElement('div'),
    total = parseInt(ovd.feature.properties.value),
    bgoffset = 0,
    size = 0;

    // Classification scale
  if (total > 0 && total <=10) {
      bgoffset = -362;
      size = 20;
  }
  if (total > 10 && total <=30) {
      bgoffset = -324;
      size = 22;
  }
  if (total > 30 && total <=70) {
      bgoffset = -276;
      size = 32;
  }
  if (total > 70 && total <=100) {
      bgoffset = -218;
      size = 42;
  }
  if (total > 100 && total <=130) {
      bgoffset = -151;
      size = 52;
  }
  if (total > 130 && total <=170) {
      bgoffset = -80;
      size = 57;
  }
  if (total > 170) {
      bgoffset = 0;
      size = 62;
  }
  marker.className = 'marker';
  marker.setAttribute('style', 
      'width: ' + size + 'px; ' +
      'height: ' + size + 'px; ' +
      'left: ' + size / -2 + 'px; ' +
      'top: ' + size / -2 + 'px; ' +
      'line-height: ' + size + 'px; ' +
      'background-position: ' + bgoffset + 'px 100%;'
  );
  marker.innerHTML = (total > 0) ? total : '';
    var ovdIcon = L.divIcon({
            // specify a class name that we can refer to in styles, as we
            // do above.
            className: 'count-icon',
            // html here defines what goes in the div created for each marker
            html: marker.outerHTML,
            // and the marker width and height
            iconSize: [size, size]
    })
    ovd.setIcon(ovdIcon)
  })
});
ovds.on('mouseover',function(e) {
    $('.wax-tooltip').remove();
    e.layer.closePopup();

    var feature = e.layer.feature;
    var info = '<div class="wax-tooltip"><div class="int_total">' +
               '<h2>' + feature.properties.Name + '</h2>' +
               '<p>Адрес: ' + feature.properties.Address + '</p>' +
               '<p>Общее количество задержанных: ' + feature.properties.value + '</p>' +
               '<div id="visualization"></div>' +
               '</div></div>';
    document.getElementById('info').innerHTML = info;
    drawVisualization(ovdData[feature.properties.id]);
});
ovds.on('mouseout',function(e) {
    $('.wax-tooltip').remove();
});
ovds.on('click',function(e) {
    var feature = e.layer.feature;
    filterOvd(feature.properties.id,feature.properties.Name);
});

function addLayer(layer, name, zIndex) {
    layer
        //.setZIndex(zIndex)
        .addTo(map);

    // Create a simple layer switcher that toggles layers on
    // and off.
    var item = document.createElement('li');
    var link = document.createElement('a');

    link.href = '#';
    link.className = 'active';
    link.innerHTML = name;

    link.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
            this.className = '';
        } else {
            map.addLayer(layer);
            this.className = 'active';
        }
    };

    item.appendChild(link);
    ui.appendChild(item);
}


 
/*  marker.onmouseover = function() {
      $('.wax-tooltip').remove();
      $('body').append(_.template(formatter[f.properties.id](), f.properties));
      drawVisualization(ovdData[f.properties.id]);
  };
  marker.onmouseout = function() {
      $('.wax-tooltip').remove();
  };
  marker.onclick = function() {
	filterOvd(f.properties.id,f.properties.name);
  };
  marker.style.pointerEvents = 'all';
  d.appendChild(marker);
  d.style.position = 'absolute';
  return d;*/

function buildTable(data) {
  $('#loader').remove();
  i = 0;
  while (i < data.feed.entry.length) {
    ovdData[i]={"id":data.feed.entry[i].gsx$ovdid.$t, "name":data.feed.entry[i].gsx$ovd.$t, "date":data.feed.entry[i].gsx$date.$t, "value":data.feed.entry[i].gsx$ovdvalue.$t};
    i++;
  }
  ovdData = _.groupBy(ovdData, function(m){ return m.id; });
  _.map(ovdData, function(group) {
  	group.id = group[0].id;
  	group.detentions = [];
  	i = 0;
  	while (i < group.length) {
  	  group[i].detentions = group[i].date + ',' + group[i].value;
  	  group.detentions[i] = [moment(group[i].date,"DD.MM.YYYY").toDate(), parseInt(group[i].value)];
  	  i++;
    }
    group.detentions = _.sortBy(group.detentions, function(obj){ return obj[0].getTime(); });
  });
  $.each(data.feed.entry, function (key, val) {
    var content = '<tr class="data ' + val.gsx$ovdid.$t + ' hider"><td>' + val.gsx$date.$t + '</td><td>' + val.gsx$ovd.$t + '</td><td>' + val.gsx$description.$t + '</td><td>' + val.gsx$ovdvalue.$t + '</td><td><a href="/2012/data/#' + val.gsx$ovdid.$t + '">источник</a></td></tr>';
    $('#table-wrapper table tbody').append(content);
  });
  $.extend($.tablesorter.themes.bootstrap, { 
    // these classes are added to the table. To see other table classes available, 
    // look here: http://twitter.github.com/bootstrap/base-css.html#tables 
    table      : 'table table-bordered', 
    header     : 'bootstrap-header', // give the header a gradient background 
    footerRow  : '', 
    footerCells: '', 
    icons      : '', // add "icon-white" to make them white; this icon class is added to the <i> in the header 
    sortNone   : 'bootstrap-icon-unsorted', 
    sortAsc    : 'icon-chevron-up', 
    sortDesc   : 'icon-chevron-down', 
    active     : '', // applied when column is sorted 
    hover      : '', // use custom css here - bootstrap class may not override it 
    filterRow  : '', // filter row class 
    even       : '', // odd row zebra striping 
    odd        : ''  // even row zebra striping 
  });
  $('#table-wrapper table').tablesorter({
  	dateFormat : "ddmmyyyy",
  	headers: { 
      0: { sorter: "shortDate" }, 
    },
    theme : "bootstrap",
  
    headerTemplate : '{content} {icon}', // new in v2.7. Needed to add the bootstrap icon! 
 
    // widget code contained in the jquery.tablesorter.widgets.js file 
    // use the zebra stripe widget if you plan on hiding any rows (filter widget) 
    widgets : [ "uitheme", "zebra" ], 
 
    widgetOptions : { 
      // using the default zebra striping class name, so it actually isn't included in the theme variable above 
      // this is ONLY needed for bootstrap theming if you are using the filter widget, because rows are hidden 
      zebra : ["even", "odd"], 
    }
  });
};

function drawVisualization(ovd) {
  var data = new google.visualization.DataTable();
  
  data.addColumn('date', 'Date');
  data.addColumn('number', 'Value');
  data.addRows(ovd.detentions);
  var options = {
    hAxis: {title: 'Дата', minValue:new Date(2013, 01, 1), maxValue:new Date(2013, 01, 1), textStyle: {color: '#fff'}, titleTextStyle: {color: '#fff'}, baselineColor: 'white'},
    vAxis: {title: 'Количество задержаний', textStyle: {color: '#fff'}, titleTextStyle: {color: '#fff'}, baselineColor: 'white'},
    legend: 'none',
    backgroundColor: { fill:'transparent' },
    colors: ['#b7e750'],
  };
      
  new google.visualization.ScatterChart(document.getElementById('visualization')).draw(data, options);
}

function filterOvd(id, name) {
  $('<h2 class="ovheader">Задержанные в ' + name + ' с 01.01.2013 по 31.12.2013</h2>').replaceAll('.ovheader');
  $('tr.data').addClass('hider');
  $('tr.data').each(function (i) {
    if ($(this).hasClass(id)) {
      $(this).removeClass('hider');
    }
    if (id=='all') {
      $(this).removeClass('hider');
    }
  });
  $('#table-wrapper table').removeClass('hider');
}
  
/*map.eventHandlers[3].remove();
map.centerzoom({ lat: 55.7512419, lon: 37.6184217 }, 11);
map.setZoomRange(9, 17);
map.ui.zoomer.add();
map.ui.zoombox.add();
map.ui.fullscreen.add();
map.interaction.auto();
var share = mapbox.share();
share.add();*/
$("#show_data").click(function() {
  filterOvd('all');
});
});

function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}