define([ 'backbone', 'Model' ], function(Backbone, Model) {
	return Backbone.Collection.extend({
		url : 'http://stkamsets.cloudapp.net/api/ticket',
		model : Model.Ticket,
		search: function(t){
			var term = t || false;
			if(term){
				if(typeof term == "string"){
					return this.searchSingleTerm(term);
				}
				if(typeof term == "object"){
					return this.searchAdvanced(term);
				}
				
			}
		},
		searchSingleTerm: function(t){
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
		},
		searchAdvanced: function(t){
			var term = t || false,
				results,formatedRes = [];
			if(term){
				results = this.filter(function(c){
					var fields = 0,
						matches = 0,
						at;
					for(at in term){
						if(typeof c.get(at) == "string" && c.get(at).toLowerCase().indexOf(term[at].toLowerCase()) >= 0){
							matches++;
						}
						fields++;
					}
					return fields == matches;
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