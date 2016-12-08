define([ 'backbone' ], function(Backbone) {
	return Backbone.Collection.extend({
		url : 'http://172.16.98.175:8081/api/timesheettoapprove'
	});
});