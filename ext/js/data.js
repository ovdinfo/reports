$.ajax({
	url: 'https://spreadsheets.google.com/feeds/list/0AqL_R49TiUuAdGpDMUphai0wemI4NXBkQ3BBUTJpYWc/od6/public/values?alt=json-in-script',
    dataType: 'jsonp',
    success: buildTable
});

function buildTable(data) {
  $.each(data.feed.entry, function (key, val) {
    var links = '',
        datalinks = val.gsx$links.$t.split(', '),
        i = 0;
    while (i < datalinks.length) {
      if (i + 1 != datalinks.length) {
        links += '<a href=' + datalinks[i] + '>' + (i + 1) + ', </a>';
      }
      else {
        links += '<a href=' + datalinks[i] + '>' + (i + 1) + '</a>';
      }
      i++;
    }
    var content = '<tr class="data ' + val.gsx$id.$t + '"><td><a id="' + val.gsx$id.$t +'"></a>' + val.gsx$date.$t + '</td><td>' + val.gsx$agreement.$t + '</td><td>' + val.gsx$eventtype.$t + '</td><td>' + val.gsx$subject.$t + '</td><td>' + val.gsx$organizer.$t + '</td><td>' + val.gsx$description.$t + '</td><td>' + val.gsx$numberofdetentions.$t + '</td><td>' + links + '</td></tr>';
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
      scrollToAnchor(hash);
  }
};

function scrollToAnchor(target) {
    var aTag = $("a[id='"+ target +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
};

$(document).ready(function() {
  var desiredHeight = $(window).height();
  $("#app").css("min-height", desiredHeight );
});