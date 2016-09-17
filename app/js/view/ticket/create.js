define([ 'backbone', 'jquery', 'text!tmpl/ticket/create.html', 'jquery.ui' ], function(Backbone, $, template) {
	'use strict';

	return Backbone.View.extend({
		el : '.main',
		events : {
			'submit #ticket-create-form' : 'create',
			'click #ticket-create-cancel' : 'cancel'
		},
		template : function(){
			//compile view
			return _.template(template);
		}(),
		initialize : function(options) {
			this.timesheet = options.timesheet;
			this.metadata = options.metadata;
		},
		render : function() {
			this.$el.html(this.template({metadata:this.metadata.toJSON(),ticket:this.model}));
			
			
			$( "#ticket-create-startDate" ).datepicker({
				dateFormat: "yy-mm-dd",
				onClose: function( selectedDate ) {
					$( "#ticket-create-endDate" ).datepicker( "option", "minDate", selectedDate );
				}
			});
			$( "#ticket-create-endDate" ).datepicker({
				dateFormat: "yy-mm-dd",
				onClose: function( selectedDate ) {
					$( "#ticket-create-startDate" ).datepicker( "option", "maxDate", selectedDate );
				}
			});
			$( "#ticket-create-rStartDate" ).datepicker({
				dateFormat: "yy-mm-dd",
				onClose: function( selectedDate ) {
					$( "#ticket-create-rEndDate" ).datepicker( "option", "minDate", selectedDate );
				}
			});
			$( "#ticket-create-rEndDate" ).datepicker({
				dateFormat: "yy-mm-dd",
				onClose: function( selectedDate ) {
					$( "#ticket-create-rStartDate" ).datepicker( "option", "maxDate", selectedDate );
				}
			});
		},
		// Events
		create : function(event) {
			event.preventDefault();			
			var arrData = $('#ticket-create-form').serializeArray(),
				data = {},
				i = 0,
				len = arrData.length;
			for(; i < len; i++){
				data[arrData[i].name] = arrData[i].value;
			}
			this.model.save(data,{
				success : this.onSave.bind(this)
			});
		},
		cancel : function(event){
			event.preventDefault();
			Backbone.history.history.back();
		},
		
		//private methods
		onSave : function(model) {
			Backbone.history.history.back();
		}
	});

});