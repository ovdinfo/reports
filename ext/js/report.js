requirejs.config({
    appDir: ".",
    baseUrl: "/ext",
    paths: { 
        'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min','libs/jquery/jquery.min'],
        'jquery-ui': ['//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min','libs/jquery-ui/jquery-ui.min'],
        'bootstrap': ['//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/js/bootstrap.min','libs/bootstrap/js/bootstrap.min'],
        'tocify': 'libs/tocify/jquery.tocify.min'
    },
    shim: {
        'tocify' : ['jquery','jquery-ui','bootstrap']
    }
});

require([
    'jquery', 'jquery-ui', 'bootstrap', 'tocify'
],
function($){
    $(function() {
    	$("#toc").tocify({context:'#app',selectors:'h2,h3',extendPage:false});
    	$('#prose a').hover(
			function () {
    			$(this).animate({ color: '#F04E23' }, 'slow');
  			},
			function () {
    			$(this).animate({ color: '#333' }, 'slow');
  			}
    	);		
    });
});