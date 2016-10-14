define([ 'backbone', ], function(Backbone) {
	return Backbone.Model.extend({
		url : 'http://localhost:8081/api/metadata'
	});
});