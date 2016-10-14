define([ 'backbone' ], function(Backbone) {
	'strict mode';
	return Backbone.Model.extend({
		url : function() {
			return 'http://localhost:8081/api/timesheettoapprove/'
					+ (typeof this.id !== 'undefined' ? this.get('id')
							: '');
		}
	});
});
