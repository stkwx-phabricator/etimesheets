define([ 'backbone', 'jquery','text!tmpl/login.html','modernizr','jquery.cookie' ], function(Backbone, $, tmpl) {
	'use strict';

	return Backbone.View.extend({
		el : '.application',
		events : {
			'submit #login-form' : 'login'
		},
		template : function() {
			return _.template(tmpl);
		}(),
		initialize : function() {            
            if (Modernizr.localstorage) {
                window.localStorage.clear();
            } else {
                $.removeCookie('token');
            }
		},
		render : function() {
			console.log('rendering');
            ga('set', 'page', '/login');
            ga('send', 'pageview');
            console.log('rendering');
			this.$el.html(this.template());
		},

		// Events
		'login' : function(event) {
			event.preventDefault();
			var arrData = this.$el.find('#login-form').serializeArray(),
			data = {};
			
			for(var i = 0; i < arrData.length; i++){
				data[arrData[i].name] = arrData[i].value;
			}
			
			this.model.save(data,{
				success: this.onLogin.bind(this),
				error : this.onLoginError.bind(this)
			});
		},
		
		//private events
		onLogin : function(model, response){
			//@todo when an app object being created, improve this functionality
			this.model.clear().set(response);
            //console.log(response);
			this.model.store();			
            ga('set', { userId: response.username });
			app_router.navigate('/',{trigger:true});
		},
		onLoginError : function(model, jqXHR, textStatus, errorThrown){
			this.$el.find('.alert').html(jqXHR.responseText).show();
		}
	});
});