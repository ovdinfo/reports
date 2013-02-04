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
    	'jquery-ui' : ['jquery'],
        'tocify' : ['jquery','jquery-ui','bootstrap'],
        'tablesorter' : ['jquery','bootstrap'],
        'tablesorter.widgets' : ['jquery','bootstrap','tablesorter']
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
  $.ajax({
	url: 'https://spreadsheets.google.com/feeds/list/0AqL_R49TiUuAdGpDMUphai0wemI4NXBkQ3BBUTJpYWc/od5/public/values?alt=json-in-script',
    dataType: 'jsonp',
    success: buildTableSubject
  });
  $.ajax({
	url: 'https://spreadsheets.google.com/feeds/list/0AqL_R49TiUuAdGpDMUphai0wemI4NXBkQ3BBUTJpYWc/ocw/public/values?alt=json-in-script',
    dataType: 'jsonp',
    success: buildTableOrganizer
  });
  function buildTableFormat(data) {
    $.each(data.feed.entry, function (key, val) {
      var content = '<tr><td>' + val.gsx$_cn6ca.$t + '</td><td>' + val.gsx$_d5fpr.$t + '</td><td>' + val.gsx$_cre1l.$t + '</td></tr>';
      $('.event-format table tbody').append(content);
    });
    $('.event-format table').trigger('update');
  };
  function buildTableSubject(data) {
    $.each(data.feed.entry, function (key, val) {
      var content = '<tr><td>' + val.gsx$_cn6ca.$t + '</td><td>' + val.gsx$_cpzh4.$t + '</td><td>' + val.gsx$_ciyn3.$t + '</td></tr>';
      $('.event-subject table tbody').append(content);
    });
    $('.event-subject table').trigger('update');
  };
  function buildTableOrganizer(data) {
    $.each(data.feed.entry, function (key, val) {
      var content = '<tr><td>' + val.gsx$_cn6ca.$t + '</td><td>' + val.gsx$_cpzh4.$t + '</td><td>' + val.gsx$_ciyn3.$t + '</td></tr>';
      $('.event-organizer table tbody').append(content);
    });
    $('.event-organizer table').trigger('update');
  };
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
  $('.table-wrapper table').tablesorter({
  	dateFormat : "ddmmyyyy",
  	headers: { 
      0: { sorter: "shortDate" }
    },
    theme : "bootstrap", // this will  
 
    widthFixed: false, 
 
    headerTemplate : '{content} {icon}', // new in v2.7. Needed to add the bootstrap icon! 
 
    // widget code contained in the jquery.tablesorter.widgets.js file 
    // use the zebra stripe widget if you plan on hiding any rows (filter widget) 
    widgets : [ "uitheme", "filter", "zebra" ], 
 
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