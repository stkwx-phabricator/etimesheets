define([ 'backbone', 'text!tmpl/timesheet.html' ], function(Backbone, tmpl) {
	'use strict';

	return Backbone.View.extend({
		el : '.main',
		childView : null,
		events : {
			'click #btn-create-timesheet' : 'create-timesheet'
		},
		template : function() {
			return _.template(tmpl);
		}(),
		initialize : function() {

		},
		render : function(t) {
			var filter = this.collection.search(t);
			this.$el.html(this.template({
				section : "searchResults",
				timesheets : filter
			}));
		},
		onClose: function(){
			if(this.childView){
				this.childView.close();
			}
		},

		// Events
		'create-timesheet' : function(event) {
			event.preventDefault();

			app_router.navigate('/timesheet/create', {
				trigger : true
			});
		}
	});

});