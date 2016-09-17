define([ 'backbone', 'text!tmpl/ticket/advancedSearch.html', 'text!tmpl/ticket/advancedSearchResults.html', 'Collection' ], 
		function(Backbone, tmpl, tmplRes, Collection) {
	return Backbone.View.extend({
		el : '.main',
		tickets : null,
		events : {
			'keyup #ticket-search-description' : 'search-ticket',
			'click #ticket-search-cancel' : 'close-view',
			'click #ticket-search-select' : 'select-ticket',
			'click .table.selectable tr' : 'clickOnTr',
			'click .table.selectable input' : 'checkClick',
			'click #selectAll' : 'select-all'
		},
		template : function() {
			return _.template(tmpl);
		}(),
		templateRes : function() {
			return _.template(tmplRes);
		}(),
		initialize : function(options) {
			this.metadata = options.metadata;
			this.timesheet = options.timesheet;
			this.tickets = new Collection.Ticket();
		},
		render : function() {
			this.$el.html(this.template({
				tickets : this.collection.toJSON()
			}));
		},
		renderResults : function(data) {
			this.$el.find("#resultsContainer").html(this.templateRes({
				tickets : data
			}));
		},

		// Events
		'checkClick' : function(event) {
			event.stopPropagation();
			var item = $(event.currentTarget),
				checked = item.prop('checked'),
				row = item.parent().parent();
			
			if(checked){
				row.addClass("selected");
			}else{
				row.removeClass("selected");
			}
		},
		'clickOnTr' : function(event) {
			$(event.currentTarget).find(".selectTicket").click();
		},
		'select-all' : function() {
			if($("#selectAll:checked").length){
				$("#resultsContainer input[type='checkbox']").not("#selectAll,:checked").click();
			}else{
				$("#resultsContainer input[type='checkbox']:checked").not("#selectAll").click();
			}
		},
		'select-ticket' : function() {
			var ticketsHTML = $("#resultsContainer input:checked").not("#selectAll"),
				data = [],
				self = this,
				idTmp,
				setidTmp,
				tickets;
			
			ticketsHTML.each(function(){
				idTmp = this.id.replace("t_","");
				setidTmp = $(this).data('setid');
				data.push({
					timesheet_id : self.timesheet,
					ticket_id : idTmp,
					set_id : setidTmp
				});
			});
			tickets = new Collection.Timesheet_Ticket(data),
			tickets.saveAll();
		},
		'search-ticket' : function(event) {
			event.preventDefault();
            _.each($("#tbl-tickets > tbody > tr"),function(tr){
                $(tr).show();
            });
            if(this.$("#ticket-search-description").val().length > 0){
                var words = this.$("#ticket-search-description").val().split(" ");
                _.each($("#tbl-tickets > tbody > tr"),function(tr){
                    var tds = $(tr).children("td");
                    var found = false;
                    _.each(words,function(word){
                        if($(tds[1]).text().toLowerCase().indexOf(word.toLowerCase()) >= 0 || $(tds[2]).text().toLowerCase().indexOf(word.toLowerCase()) >= 0){
                            found = true;
                        }
                    });
                    if(!found){
                        $(tr).hide();
                    }
                });
            }
		},
		'close-view' : function(event){
			event.preventDefault();
			Backbone.history.history.back();
		}
	});
});