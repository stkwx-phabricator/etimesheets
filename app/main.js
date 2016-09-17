define([
    'jquery',
    'require',
    'bootstrap',
    'backbone',
    'Router',
    'jquery.msg',
    navigator.appVersion.indexOf("MSIE 8.") !== -1 ? 'respond' : undefined,
    navigator.appVersion.indexOf("MSIE 8.") !== -1 ? 'html5shiv' : undefined
], function($, require, bootstrap, Backbone, Router, Msg) {

var ua = window.navigator.userAgent.toLowerCase(),
		isIE = ua.match(/msie 7|msie 8|msie 9/gi),
		classList = "";
	
	$.ajaxSettings.cache = false;
	$(document).ajaxStart(function() {
        $.msg({
            autoUnblock: false,
            clickUnblock: false
        });
    }).ajaxStop(function() {
    	$.msg('unblock');
    }).ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {
        $.msg('unblock');
    });
	if(isIE != null){
		classList = "oldIE " + isIE.join("|").replace(/\s/g,"").replace("|"," ");
		$("html").addClass(classList);
	}

	$.ajaxSetup({
	    statusCode: {
	        401: function(){
	            // Redirec the to the login page.
	                     
	        },
	        403: function() {
	            // 403 -- Access denied
	            
	        }
	    }
	});


var ua = window.navigator.userAgent.toLowerCase(),
	isIE = ua.match(/msie 7|msie 8|msie 9/gi),
	classList = "";
	window.ga = function(){

	}


	window.app_router = new Router();
	window.app_router.start({
		 pushState: true
	});
});
