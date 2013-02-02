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
        'moment': 'libs/moment/moment.min'

    },
    shim: {
        'bootstrap' : ['jquery'],
        'tablesorter' : ['jquery','bootstrap'],
        'tablesorter.widgets' : ['jquery','bootstrap','tablesorter'],
        'spin' : ['jquery']
    }
});

require([
    'jquery', 'bootstrap', 'tablesorter', 'tablesorter.widgets', 'underscore', 'spin', 'moment'
],
function($,tablesorter){
$('#header ul.nav a[href="2012/data"],#header ul.nav a[href="2012/data/en"]').parent().addClass('active');
$.ajax({
	url: 'https://spreadsheets.google.com/feeds/list/0AqL_R49TiUuAdGpDMUphai0wemI4NXBkQ3BBUTJpYWc/ocx/public/values?alt=json-in-script',
    dataType: 'jsonp',
    success: buildTable
});

function buildTable(data) {
  $.each(data.feed.entry, function (key, val) {
    var content = '<tr class="data ' + val.gsx$id.$t + '"><td><a id="' + val.gsx$id.$t +'"></a>' + val.gsx$dateofreceipt.$t + '</td><td>' + val.gsx$offense.$t + '</td><td>' + val.gsx$judge.$t + '</td><td>' + val.gsx$dateofdecision.$t + '</td><td>' + val.gsx$decision.$t + '</td><td>' + val.gsx$court.$t + '</td><td>' + val.gsx$article.$t + '</td></tr>';
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
  $('#table-wrapper table').show('slow');
  if(window.location.hash) {
      var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
      $('tr.' + hash).css({'background-color': '#99FF00', 'font-weight': 'bold'});
      scrollToAnchor(hash);
  }
};

function scrollToAnchor(target) {
    var aTag = $("a[id='"+ target +"']");
    $('html,body').animate({scrollTop: (aTag.offset().top - $(window).height())},'slow');
};

$(function(){
  var desiredHeight = $(window).height() - $('#header').height() - $('#footer').height();
  $("#app").css("min-height", desiredHeight );
});
});