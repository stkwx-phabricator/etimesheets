define([ 'backbone', 'Model' ], function(Backbone, Model) {
	return Backbone.Collection.extend({
		url : 'http://172.16.96.240:8081/api/timesheet',
		model : Model.Timesheet,
		search: function(t){
			var term = t || "",
				results,formatedRes = [];
			term = term.match(/[A-Za-z 0-9]/g);
			if(term){
				term = term.join("");
				results = this.filter(function(c){
					var matcher = new RegExp(term,"gi"),
						string = c.values().join("|");
					return matcher.test(string)
				});
				_.each(results,function(r){
					formatedRes.push(r.toJSON());
				})
				return formatedRes
			}else{
				return this;
			}
		}
	});
});