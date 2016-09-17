define([ 'backbone', 'text!tmpl/ticket.html', 'Collection' ], function(Backbone, tmpl, Collection) {
	return Backbone.View.extend({
		el : '#open-tickets',
		tickets : null,
		events : {
			'click #btn-create-ticket' : 'create-ticket'
		},
		success : function(collection) {
			this.collection = collection;
			this.render();
		},
		template : function() {
			return _.template(tmpl);
		}(),
		initialize : function() {
			this.tickets = new Collection.Ticket();

			this.tickets.fetch({
				success : this.success.bind(this)
			});
		},
		render : function() {
			
			this.$el.html(this.template({
				tickets : this.collection.toJSON()
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