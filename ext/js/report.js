requirejs.config({
    appDir: ".",
    baseUrl: "/ext",
    paths: { 
        /* Load jquery from google cdn. On fail, load local file. */
        'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min','/libs/jquery/jquery.min'],
        'jquery-ui': ['//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min','/libs/jquery-ui/jquery-ui.min'],
        /* Load bootstrap from cdn. On fail, load local file. */
        'bootstrap': ['//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/js/bootstrap.min','/libs/bootstrap/js/bootstrap.min'],
        'tocify': '/libs/tocify/jquery.tocify.min'
    },
    shim: {
        /* Set bootstrap dependencies (just jQuery) */
        'bootstrap' : ['jquery'],
        'tocify' : ['jquery','jquery-ui','bootstrap']
    }
});

require([
    'jquery', 'jquery-ui', 'bootstrap', 'tocify'
],
function($){
    $(function() {
    	$("#toc").tocify();
    });
});