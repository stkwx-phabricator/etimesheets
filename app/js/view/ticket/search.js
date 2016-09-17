define([ 'backbone', 'text!tmpl/ticket.html', 'Collection' ], function(Backbone, tmpl, Collection) {
	return Backbone.View.extend({
		el : '#open-tickets',
		tickets : null,
		events : {
			'click #btn-create-ticket' : 'create-ticket'
		},
		success : function(collection) {
			var filter = collection.search(this.term);
			this.collection = collection;
			this.render(filter);
		},
		template : function() {
			return _.template(tmpl);
		}(),
		initialize : function(options) {
			this.term = options.term;
			this.tickets = new Collection.Ticket();

			this.tickets.fetch({
				success : this.success.bind(this)
			});
		},
		render : function(filter) {
			this.$el.html(this.template({
				tickets : filter
			}));
		},

		// Events
		'create-ticket' : function(event) {
			event.preventDefault();

			app_router.navigate('/ticket/create', {
				trigger : true
			});
		}
	});
});