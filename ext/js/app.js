var map = mapbox.map('map');
map.addLayer(mapbox.layer().id('integral.map-asmf5yqy'));

// Create and add marker layer from a spreadsheet
mapbox.converters.googledocs('0AqL_R49TiUuAdGpDMUphai0wemI4NXBkQ3BBUTJpYWc', 'odb', function(features) {
//console.log(features);
var formatter = {};
var markersLayer = mapbox.markers.layer().features(features).factory(factory);
var interaction = mapbox.markers.interaction(markersLayer);
map.addLayer(markersLayer);
});
var formatter = {};
function factory(f) {
    // Define a new factory function. This takes a GeoJSON object
    // as its input and returns an element - in this case an image -
    // that represents the point.
        console.log(f);
        
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
        marker.innerHTML = (total > 0) ? total : '';
        marker.onmouseover = function() {
            //$('.wax-tooltip').remove();
            //$('body').append(_.template(formatter[x.properties.provname](), x.properties));
            alert('onmouseover');
        };
        marker.onmouseout = function() {
            //$('.wax-tooltip').remove();
            alert('onmouseout');
        };
        marker.style.pointerEvents = 'all';
        d.appendChild(marker);
        d.style.position = 'absolute';
        return d;
};

// Set inital center and zoom
map.centerzoom({ lat: 55.7512419, lon: 37.6184217 }, 11);