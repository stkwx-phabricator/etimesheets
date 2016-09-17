define([ 'backbone', 'text!tmpl/timesheet/create.html' ], function(Backbone,
		template) {
	'use strict';

	return Backbone.View
			.extend({
				el : '.main',
				events : {
					'submit #timesheet-create-form' : 'create',
					'click #timsheet-create-cancel' : 'cancel'
				},
				template : function() {
					return _.template(template);
				}(),
				initialize : function(options) {
					this.metadata = options.metadata;
				},
				render : function() {
                    ga('set', 'page', '/timesheet/create');
                    ga('send', 'pageview');
					this.$el.html(this.template({
						metadata : this.metadata.toJSON()
					}));
				},

				// Events
				create : function(event) {
					event.preventDefault();
					var data = {
						periodId : this.$el.find(
								'select#timesheet-create-time').val()
					};					
					this.model.save(data, {
						success : this.onSave,
						error : this.onError.bind(this)
					});
				},
				onSave : function(model) {
                    console.log(model);
                    ga('send', 'event', 'timesheet', 'create');
					app_router.navigate('/timesheet/' + model.get('timeSheetId'), {
						trigger : true
					});
				},
				onError : function(model, jqXHR, textStatus, errorThrown){
					
					this.$el.find('.alert').html(jqXHR.responseText).show();
				},
				cancel : function(event) {
					window.history.back();
				}
			});

});