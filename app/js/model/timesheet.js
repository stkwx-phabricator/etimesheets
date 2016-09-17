define([ 'backbone' ], function(Backbone) {
	'strict mode';
	return Backbone.Model.extend({
		url : function() {
			return 'http://stkamsets.cloudapp.net/api/timesheet/'
					+ (typeof this.id !== 'undefined' ? this.get('timeSheetId')
							: '');
		},
		idAttribute : "timeSheetId"
	});
});
