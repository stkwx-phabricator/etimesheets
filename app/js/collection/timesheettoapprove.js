define([ 'backbone' ], function(Backbone) {
	return Backbone.Collection.extend({
		url : 'http://localhost:8081/api/timesheettoapprove'
	});
});