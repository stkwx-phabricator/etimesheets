define([ 'backbone', ], function(Backbone) {
	return Backbone.Model.extend({
		urlRoot : 'http://stkamsets.cloudapp.net/api/ticket'
	});
});