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
var target = document.getElementById('loader');
var spinner = new Spinner(opts).spin(target);

var map = mapbox.map('map');
    map.addLayer(mapbox.layer().id('lxbarth.map-mejpxnkf'));
    ovdData = {};



mapbox.converters.googledocs('0AqL_R49TiUuAdGpDMUphai0wemI4NXBkQ3BBUTJpYWc', 'odb', function(features) {
  var markerLayer = mapbox.markers.layer().factory(factory).features(features);
  map.addLayer(markerLayer);
  
  $.ajax({
            url: 'https://spreadsheets.google.com/feeds/list/0AqL_R49TiUuAdGpDMUphai0wemI4NXBkQ3BBUTJpYWc/oda/public/values?alt=json-in-script',
            dataType: 'jsonp',
            success: buildTable
        });
});

var formatter = {};
function factory(f) {
        var d = document.createElement('div'),
            marker = document.createElement('div');
            
        var total = parseInt(f.properties.value);
        var bgoffset = 0, size = 0;
        
        // Classification scale
        if (total > 0 && total <=50) {
            bgoffset = -362;
            size = 20;
        }
        if (total > 50 && total <=100) {
            bgoffset = -324;
            size = 22;
        }
        if (total > 100 && total <=150) {
            bgoffset = -276;
            size = 32;
        }
        if (total > 150 && total <=200) {
            bgoffset = -218;
            size = 42;
        }
        if (total > 200 && total <=250) {
            bgoffset = -151;
            size = 52;
        }
        if (total > 250 && total <=300) {
            bgoffset = -80;
            size = 57;
        }
        if (total > 300) {
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
        formatter[f.properties.id] = function() {
        return '<div class="wax-tooltip"><div class="int_total">' +
                '<h2>ОВД: <%= name %></h2>' +
                '<p>Адрес: <i><%= address %></i></p>' +
                '<p>Общее количество задержанных: <strong><%= value %></strong></p>' +
                '<div id="visualization"></div>' +
            '</div></div>';
        };
        marker.innerHTML = (total > 0) ? total : '';
        marker.onmouseover = function() {
            $('.wax-tooltip').remove();
            $('body').append(_.template(formatter[f.properties.id](), f.properties));
            drawVisualization(ovdData[f.properties.id]);
        };
        marker.onmouseout = function() {
            $('.wax-tooltip').remove();
        };
        marker.style.pointerEvents = 'all';
        d.appendChild(marker);
        d.style.position = 'absolute';
        return d;
};

function buildTable(data) {
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
      	var content = '<tr class="data ' + val.gsx$ovdid.$t + ' hider"><td>' + val.gsx$date.$t + '</td><td>' + val.gsx$ovd.$t + '</td><td>' + val.gsx$ovdaddress.$t + '</td><td>' + val.gsx$ovdvalue.$t + '</td></tr>';
        $('#table-wrapper table tbody').append(content);
      });
      $.tablesorter.defaults.widgets = ['zebra'];
      $('#table-wrapper table').tablesorter();
};

function drawVisualization(ovd) {
        var data = new google.visualization.DataTable();
        
        data.addColumn('date', 'Date');
		data.addColumn('number', 'Value');
		
		data.addRows(ovd.detentions);
		
		var options = {
          hAxis: {title: 'Дата', minValue:new Date(2011, 12, 4), maxValue:new Date(2012, 11, 31), textStyle: {color: 'white'}, titleTextStyle: {color: 'white'}, baselineColor: 'white'},
          vAxis: {title: 'Количество задержаний', textStyle: {color: 'white'}, titleTextStyle: {color: 'white'}, baselineColor: 'white'},
          legend: 'none',
          backgroundColor: { fill:'transparent' },
          colors: ['#b7e750'],
        };
      
        new google.visualization.ScatterChart(document.getElementById('visualization')).
            draw(data, options);
      }

map.eventHandlers[3].remove();
map.centerzoom({ lat: 55.7512419, lon: 37.6184217 }, 11);
map.setZoomRange(9, 17);
map.ui.zoomer.add();
map.ui.zoombox.add();
map.ui.fullscreen.add();
map.interaction.auto();