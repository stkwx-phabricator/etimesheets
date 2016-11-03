define([ 'backbone', ], function(Backbone) {
	return Backbone.Model.extend({
		urlRoot : 'http://172.16.96.240:8081/api/ticket'
	});
});