define([ 'backbone','jquery','modernizr','jquery.cookie' ], function(Backbone, $) {
	'strict mode';
	return Backbone.Model.extend({
		url : 'http://stkamsets.cloudapp.net/api/user',
		idAttribute : "id",
		authenticated : false,
		store : function() {
			this.authenticated = true;
            if (Modernizr.localstorage) {
                window.localStorage.setItem('token', this.get('token'));
            } else {
                $.cookie('token', this.get('token'), {  
                    expires: 365  
                });
            }
			$.ajaxSetup({
				headers : {
					'Authorization' : 'Token ' + this.get('token')
				}
			});
		},
		isAuthenticated : function(options) {
			if (typeof this.get('token') == 'undefined') {
				if (Modernizr.localstorage && window.localStorage.hasOwnProperty('token')) {
					this.set('token', window.localStorage.getItem('token'));					
				} else if(!Modernizr.localstorage && $.cookie('token')){
                    this.set('token', $.cookie('token'));
                }else{
					options.error.call(this);
					return ;
				}
			}
			this.fetch({
				headers : {
					'Authorization' : 'Token ' + this.get('token')
				},
				success: function(model){
					$.ajaxSetup({
						headers : {
							'Authorization' : 'Token ' + model.get('token')
						}
					});
					this.authenticated = true;
                    ga('set', { userId: model.get('username') });
					options.success.call(this);
				}.bind(this),
				error : options.error
			});
		},
		destroy: function(){
			this.clear();
			this.authenticated = false;
            if (Modernizr.localstorage) {
                window.localStorage.clear();
            } else {
                $.removeCookie('token');
            }
		}
	});
});
