$.ajax({
	url: 'https://spreadsheets.google.com/feeds/list/0AqL_R49TiUuAdGpDMUphai0wemI4NXBkQ3BBUTJpYWc/od6/public/values?alt=json-in-script',
    dataType: 'jsonp',
    success: buildTable
});

function buildTable(data) {
  $.each(data.feed.entry, function (key, val) {
    var content = '<tr class="data ' + val.gsx$id.$t + ' hider"><td>' + val.gsx$date.$t + '</td><td>' + val.gsx$agreement.$t + '</td><td>' + val.gsx$eventtype.$t + '</td><td>' + val.gsx$subject.$t + '</td><td>' + val.gsx$organizer.$t + '</td><td>' + val.gsx$description.$t + '</td><td>' + val.gsx$numberofdetentions.$t + '</td><td>' + val.gsx$links.$t + '</td></tr>';
    $('#table-wrapper table tbody').append(content);
  });
  $.tablesorter.defaults.widgets = ['zebra'];
  $('#table-wrapper table').tablesorter({
  	dateFormat : "ddmmyyyy",
  	headers: { 
      0: { sorter: "shortDate" } //, dateFormat will parsed as the default above 
      // 1: { sorter: "shortDate", dateFormat: "ddmmyyyy" }, // set day first format; set using class names 
      // 2: { sorter: "shortDate", dateFormat: "yyyymmdd" }  // set year first format; set using data attributes (jQuery data) 
    } 
  });
};