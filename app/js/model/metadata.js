define([ 'backbone', ], function(Backbone) {
	return Backbone.Model.extend({
		url : 'http://stkamsets.cloudapp.net/api/metadata'
	});
});