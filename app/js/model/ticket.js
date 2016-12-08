define([ 'backbone', ], function(Backbone) {
	return Backbone.Model.extend({
		urlRoot : 'http://172.16.98.175:8081/api/ticket'
	});
});