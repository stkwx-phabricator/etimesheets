define([ 'backbone', 'Model' ], function(Backbone, Model) {
	return Backbone.Collection.extend({
		url : 'http://localhost:8081/api/timesheethasticket',
		model : Model.Timesheet_Ticket,
		saveAll : function(){
			var tmp = new this.model;
			tmp.save({tickets:this.toJSON()},{success:function(){
				Backbone.history.history.back();
			}});
		}
	});
});