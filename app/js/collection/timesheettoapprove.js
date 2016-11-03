define([ 'backbone' ], function(Backbone) {
	return Backbone.Collection.extend({
		url : 'http://172.16.96.240:8081/api/timesheettoapprove'
	});
});