var map = mapbox.map('map');
    map.addLayer(mapbox.layer().id('integral.map-asmf5yqy'));



mapbox.converters.googledocs('0AqL_R49TiUuAdGpDMUphai0wemI4NXBkQ3BBUTJpYWc', 'odb', function(features) {
  var markerLayer = mapbox.markers.layer().factory(factory).features(features);
  map.addLayer(markerLayer);
});

var formatter = {};
function factory(f) {
    // Define a new factory function. This takes a GeoJSON object
    // as its input and returns an element - in this case an image -
    // that represents the point.
        //console.log(f);
        
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
            '</div></div>';
        };
        marker.innerHTML = (total > 0) ? total : '';
        marker.onmouseover = function() {
            $('.wax-tooltip').remove();
            $('body').append(_.template(formatter[f.properties.id](), f.properties));
        };
        marker.onmouseout = function() {
            $('.wax-tooltip').remove();
        };
        marker.style.pointerEvents = 'all';
        d.appendChild(marker);
        d.style.position = 'absolute';
        return d;
};

map.centerzoom({ lat: 55.7512419, lon: 37.6184217 }, 11);
map.ui.zoomer.add();
map.ui.zoombox.add();
map.ui.fullscreen.add();
map.interaction.auto();

var config = {
    "radius": 30,
    "element": document.getElementById("app"),
    "visible": true,
    "opacity": 40,
    "gradient": { 0.45: "rgb(0,0,255)", 0.55: "rgb(0,255,255)", 0.65: "rgb(0,255,0)", 0.95: "yellow", 1.0: "rgb(255,0,0)" }
};
    
    //creates and initializes the heatmap
    var heatmap = h337.create(config);
 
    // let's get some data
    var data = {
        max: 20,
        data: [
            { x: 10, y: 20, count: 18 },
            { x: 25, y: 25, count: 14 },
            { x: 50, y: 30, count: 20 }
        ]
    };
 
    heatmap.store.setDataSet(data);