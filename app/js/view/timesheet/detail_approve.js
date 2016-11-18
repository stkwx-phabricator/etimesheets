define([ 'backbone', 'text!tmpl/timesheet/detail_approve.html','Model' ], function(Backbone,
		template,Model) {
	'use strict';

	return Backbone.View.extend({
		el : '.main',
		events : {
			'click #timesheet-detail-approve' : 'approve',
			'click #timesheet-detail-reject' : 'reject'
		},
		template : function() {
			return _.template(template);
		}(),
		initialize : function(options) {
			this.listenTo(this.model,'change', function(){
				this.render();
			}.bind(this));
		},
		render : function() {
			var data = this.model.toJSON();			
            console.log(data);
			this.$el.html(this.template({
				data : data				
			}));
			
		},
        
		'reject': function (event) {
		    var approve = new Model.TimesheetToApprove();
		    approve.set({ id: this.model.get('timeSheetId') });
		    approve.destroy({
				success : function(){
                    console.log('rejected');
					app_router.navigate("/",{trigger:true});
				}
			});
        },

		'approve' : function(event){
            
            var approve = new Model.TimesheetToApprove();
            console.log(this.model);
            
            approve.save({id:this.model.get('timeSheetId')},{
				success : function(){
					app_router.navigate("/",{trigger:true});
				}
			});
            //var timesheet = Model.Timesheet();
		},

	});

});