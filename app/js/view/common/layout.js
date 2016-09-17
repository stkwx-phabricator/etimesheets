define([ 'backbone', 'text!tmpl/common/layout.html' ], function(Backbone,
		layoutTemplate) {
	'use strict';

	return Backbone.View.extend({
		el : '.application',
		events : {
			'submit .navbar-form.navbar-right':'search'
		},
		ticketsView : null,
		initialize : function() {

		},
		render : function() {
			this.$el.html(layoutTemplate);
		},
		search : function(e){
			e.preventDefault();
			var data = $(e.currentTarget).serializeArray();
			app_router.navigate("search/" + data[0].value);
			app_router.search(data[0].value)
		}
	});

});