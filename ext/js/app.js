// Create map
var map = mapbox.map('map').addLayer(mapbox.layer().id('integral.map-asmf5yqy'));

// Create and add marker layer from a spreadsheet
mapbox.converters.googledocs('0Am4PLhe13o2JdGJmWUp3WGtLYlh4alBCNTFDWTRidkE', 'od6', function(features) {
var markersLayer = mapbox.markers.layer().features(features);
var interaction = mapbox.markers.interaction(markersLayer);
map.addLayer(markersLayer);
}).factory(function(f) {
    //var img = document.createElement('img');
    //img.className = 'marker-image';
    return '';
});

interaction.formatter(function(f) {
    return f.properties.points;
});

// Set inital center and zoom
map.centerzoom({
    lat: 34.660322,
    lon:132.506103
}, 9);