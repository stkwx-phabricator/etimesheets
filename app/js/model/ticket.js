define([ 'backbone', ], function(Backbone) {
	return Backbone.Model.extend({
		urlRoot : 'http://localhost:8081/api/ticket'
	});
});