define([ 'backbone' ], function(Backbone) {
	'strict mode';
	return Backbone.Model.extend({
		url : function() {
			return 'http://172.16.96.240:8081/api/timesheet/'
					+ (typeof this.id !== 'undefined' ? this.get('timeSheetId')
							: '');
		},
		idAttribute : "timeSheetId"
	});
});
