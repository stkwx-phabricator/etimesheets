define([ 'backbone', ], function(Backbone) {
	return Backbone.Model.extend({
		url : 'http://172.16.98.175:8081/api/metadata'
	});
});