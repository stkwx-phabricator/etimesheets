require.config({
    'deps': ['main'],
    'paths': {    
        //libraries
        'jquery': 'js/libs/jquery',
        'underscore': 'js/libs/underscore',
        'backbone': 'js/libs/backbone',
        'respond': 'js/libs/respond',
        'bootstrap': 'js/libs/bootstrap',
        'text': 'js/libs/text',        
        'html5shiv': 'js/libs/html5shiv',
        'css': 'js/libs/require-css/css.min',
        'jquery.msg' : 'js/libs/jquery.msg.min',
        'jquery.center' : 'js/libs/jquery.center.min',
        'jquery.ui' : 'js/libs/jquery.ui',
        'jquery.cookie' : 'js/libs/jquery.cookie',
        'modernizr' : 'js/libs/modernizr.localstorage',
        //Views
        'View' : 'js/module/View',
        //models
        'Model' : 'js/module/Model',
        //collections
        'Collection' : 'js/module/Collection',
        
        'backboneView' : 'js/view/view',
        
        'Router': 'router',
        'mycss': 'css',
        'tmpl': 'templates',
        'templates':'templates',
        'main': 'main'
    },
    'shim': {
        'backbone': {
            'deps': ['underscore', 'jquery'],
            'exports': function() {
                return Backbone.noConflict();
            }
        },
        'jquery.msg' : {
        	'deps' : ['jquery.center']
        },
        'jquery.center':{
        	'deps':['jquery']
        },
        'bootstrap': ['jquery'],
        'utils':['jquery']
    }
});
