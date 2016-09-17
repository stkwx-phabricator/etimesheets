define([ 'backbone', 'text!tmpl/timesheet/toapprove.html', 'Collection' ], function(Backbone, tmpl, Collection) {
	return Backbone.View.extend({
		el : '#to-approve',
		timesheets : null,
		events : {
		},
		success : function(collection) {
			this.render();
		},
		template : function() {
			return _.template(tmpl);
		}(),
		initialize : function() {
			this.timesheets = new Collection.TimesheetToApprove();

			this.timesheets.fetch({
				success : this.success.bind(this)
			});
		},
		render : function() {
			this.$el.html(this.template({
				timesheets : this.timesheets.toJSON()
			}));
		}
	});
});