requirejs.config({
    appDir: ".",
    baseUrl: "/ext",
    paths: { 
        'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min','libs/jquery/jquery.min'],
        'jquery-ui': ['//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min','libs/jquery-ui/jquery-ui.min'],
        'bootstrap': ['//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/js/bootstrap.min','libs/bootstrap/js/bootstrap.min'],
        'tablesorter': 'libs/tablesorter/jquery.tablesorter.min',
        'tablesorter.widgets': 'libs/tablesorter/jquery.tablesorter.widgets.min',
        'tocify': 'libs/tocify/jquery.tocify.min'
    },
    shim: {
    	'bootstrap' : ['jquery'],
    	'tablesorter' : ['jquery','bootstrap'],
        'tablesorter.widgets' : ['jquery','bootstrap','tablesorter'],
    	'jquery-ui' : ['jquery'],
        'tocify' : ['jquery','jquery-ui','bootstrap']
    }
});

require([
    'jquery', 'jquery-ui', 'bootstrap', 'tocify', 'tablesorter', 'tablesorter.widgets'
],
function($,tablesorter){
	$('#header ul.nav a[href="'+ window.location.pathname +'"]').parent().addClass('active');
	loadCss('/ext/libs/tocify/jquery.tocify.css');
    $(function() {
    	$("#toc").tocify({context:'#app',selectors:'h2,h3',extendPage:false});
    	$('#prose a').hover(
			function () {
    			$(this).animate({ color: '#F04E23' }, 'fast');
  			},
			function () {
    			$(this).animate({ color: '#333' }, 'fast');
  			}
    	);
    	$('#toc').affix({'offset':160});
    });
    $('#toc').fadeIn('slow');
  $.ajax({
	url: 'https://spreadsheets.google.com/feeds/list/0AqL_R49TiUuAdGpDMUphai0wemI4NXBkQ3BBUTJpYWc/ocy/public/values?alt=json-in-script',
    dataType: 'jsonp',
    success: buildTableFormat
  });
  function buildTableFormat(data) {
    $.each(data.feed.entry, function (key, val) {
    var content = '<tr><td>' + val.gsx$_cn6ca.$t + '</td><td>' + val.gsx$_cokwr.$t + '</td><td>' + val.gsx$_d5fpr.$t + '</td></tr>';
    $('.event-format table tbody').append(content);
    });
  };
  
  $('.event-format table').tablesorter({
  	
 
    widthFixed: false, 
 
    headerTemplate : '{content} {icon}', // new in v2.7. Needed to add the bootstrap icon! 
 
    // widget code contained in the jquery.tablesorter.widgets.js file 
    // use the zebra stripe widget if you plan on hiding any rows (filter widget) 
    widgets : ["filter", "zebra" ], 
 
    widgetOptions : { 
      // using the default zebra striping class name, so it actually isn't included in the theme variable above 
      // this is ONLY needed for bootstrap theming if you are using the filter widget, because rows are hidden 
      zebra : ["even", "odd"], 
 
      // reset filters button 
      filter_reset : ".reset", 
 
      // set the uitheme widget to use the bootstrap theme class names 
      // uitheme : "bootstrap" 
    }
  });
});

function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}