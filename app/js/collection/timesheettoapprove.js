define([ 'backbone' ], function(Backbone) {
	return Backbone.Collection.extend({
		url : 'http://stkamsets.cloudapp.net/api/timesheettoapprove'
	});
});