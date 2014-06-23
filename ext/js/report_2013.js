requirejs.config({
    appDir: ".",
    baseUrl: "/ext",
    waitSeconds: 60,
    paths: { 
        'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min','libs/jquery/jquery.min'],
        'jquery-ui': ['//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min','libs/jquery-ui/jquery-ui.min'],
        'bootstrap': ['//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/js/bootstrap.min','libs/bootstrap/js/bootstrap.min'],
        'tocify': 'libs/tocify/jquery.tocify.min'
    },
    shim: {
    	'bootstrap' : ['jquery'],
    	'jquery-ui' : ['jquery'],
      'tocify' : ['jquery','jquery-ui','bootstrap']
    }
});

require([
    'jquery', 'jquery-ui', 'bootstrap', 'tocify'
],
function($){
	$('#header ul.nav a[href="'+ window.location.pathname +'"]').parent().addClass('active');
	loadCss('/ext/libs/tocify/jquery.tocify.css');
  loadCss('/ext/css/report.css');
    $( document ).ready(function() {
    	$("#toc").tocify({context:'#prose',selectors:'h1,h2,h3',extendPage:false});
    	$('.article a').hover(
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
});

function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}