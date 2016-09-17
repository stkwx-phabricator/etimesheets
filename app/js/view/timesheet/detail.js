define([ 'backbone', 'text!tmpl/timesheet/detail.html','Model' ], function(Backbone,
		template,Model) {
	'use strict';

	return Backbone.View.extend({
		el : '.main',
        total : 0,
		events : {
			'click #timesheet-detail-ticket-create' : 'ticket-create',
			'click .timesheet-detail-addRecent' : 'ticket-addRecent',
			'change .timesheet-days .timesheet-detail input' : 'ticket-edit',
			'click #timesheet-detail-submit' : 'submit',
			'click #timesheet-detail-save' : 'save',
			'click #timesheet-detail-remove' : 'remove'
		},
		template : function() {
			return _.template(template);
		}(),
		initialize : function(options) {
			this.tickets = options.tickets;
			this.tickets.fetch();
			this.listenTo(this.tickets, 'sync', this.fillRecentTickets);
			this.listenTo(this.model,'change', function(){
				this.render();
				this.fillRecentTickets(this.tickets);
			}.bind(this));
		},
		render : function() {
            ga('set', 'page', '/timesheet/detail');
            ga('send', 'pageview');
			var data = this.model.toJSON();			
            console.log(data);
			this.$el.html(this.template({
				data : data				
			}));
			
			this.updateGrandTotal();
		},
		getTicket: function(id){
			var tickets = this.model.get('timeSheetLines'),
				i = 0,
				len = tickets.length,
				ID = id || false,
				res = false,
				ticket;
			if(!ID)
				return res;
			for(; i < len; i++){
				ticket = tickets[i];
				if(ticket.id == id){
					res = ticket;
					break;
				}
			}
			return res;
		},
		updateGrandTotal: function(){
            var self = this;
			var sum = 0,
				ideal = 40,
				rawPercent = 0,
				percent = 0,
				bar = $(".progress .progress-bar"),
				total = $(".timesheet-total"),
				newClass;
			$(".total").each(function(){
				sum += parseFloat($(this).text());
                self.total = sum;
            });
			$("#grandTotal").text(sum);
			rawPercent = Math.round(sum / ideal * 100);
			percent = Math.max(rawPercent,0);
			percent = Math.min(percent,100);
			bar.css("width",percent+"%");
			bar.removeClass("progress-bar-success progress-bar-warning progress-bar-danger");
			newClass = (rawPercent == 100) ? "success" : (rawPercent < 100) ? "warning" : "danger";
			bar.addClass("progress-bar-"+newClass);
			total.removeClass("alert-success alert-warning alert-danger");
			total.addClass("alert-"+newClass);
		},

		// Events
		'ticket-create' : function(event) {
			event.preventDefault();

			app_router.navigate('/timesheet/' + this.model.id
					+ '/ticket/create', {
				trigger : true
			});
		},
		'ticket-addRecent' : function(event){
			event.preventDefault();		
			var ticket = new Model.Timesheet_Ticket(),
			ticketId = $(event.currentTarget).data('id'),
			setId = $(event.currentTarget).data('setid');
			
			var data = {
				timesheet_id : this.model.id,
				ticket_id : ticketId,
				set_id : setId
			};
			
			ticket.save(data,{success:function(){
                    this.$('#alert-unable').addClass('hide');
				this.model.fetch();
			}.bind(this),
            error:function(){
                this.$('#alert-unable').removeClass('hide');
            }.bind(this)
        });
			
		},
		'ticket-edit' : function(event) {
			var el = $(event.currentTarget),
				ticketField = el.data('name'),
				ticketId = el.data('id'),
				ticket = this.getTicket(ticketId),
				sum = 0,
				min = parseFloat(el.attr("min")) || 0,
				max = parseFloat(el.attr("max")) || 24,
				newVal;
				
			var data  = this.$el.find('input[data-id="'+ticketId+'"]');
			
			_.each(data,function(item){
				sum += parseFloat($(item).val());
			});
				
			
			newVal = el.val();
			newVal = parseFloat(newVal) || min;
			newVal = Math.max(newVal,min);
			newVal = Math.min(newVal,max);
			el.val(newVal);
					
			$("#res_"+ticketId).text(sum);
			this.updateGrandTotal();
		},
		'submit' : function(event){
            var self = this;
			event.preventDefault();			
			var ticket = new Model.Timesheet_Ticket();	
			
			var data = [];			
			var timeSheetLines = this.model.get('timeSheetLines');			
			_.each(timeSheetLines,function(ticket){
                var efforts = [];
                _.each(this.$el.find('input[data-id="'+ticket.workItemId+'"]'),function(input){
                    efforts.push($(input).val());
                });
                var sapActivity = this.$el.find('select[data-id="'+ticket.workItemId+'"]').find('option:selected');
				var obj = {
						timeSheetLineId  : ticket.timeSheetLineId,
						effort : efforts.join(),
						sapActivityId : sapActivity.val(),
						sapActivityName : sapActivity.text()
				};
				data.push(obj);
			}.bind(this));
			ticket.set({id:this.model.get('timeSheetId')});
			ticket.save({data:data},{success:function(){
				this.model.save({type:'submit'},{
                    success : function(){
                        ga('send', 'event', 'timesheet', 'submit', 'hours', self.total);
                        app_router.navigate("/",{trigger:true});
                    }
                });
			}.bind(this)});
			
		},		
		'save' : function(event){
			event.preventDefault();			
			var ticket = new Model.Timesheet_Ticket();	
			
			var data = [];			
			var timeSheetLines = this.model.get('timeSheetLines');			
			_.each(timeSheetLines,function(ticket){
                var efforts = [];
                _.each(this.$el.find('input[data-id="'+ticket.workItemId+'"]'),function(input){
                    efforts.push($(input).val());
                });
                var sapActivity = this.$el.find('select[data-id="'+ticket.workItemId+'"]').find('option:selected');
				var obj = {
						timeSheetLineId  : ticket.timeSheetLineId,
						effort : efforts.join(),
						sapActivityId : sapActivity.val(),
						sapActivityName : sapActivity.text()
				};
				data.push(obj);
			}.bind(this));
			ticket.set({id:this.model.get('timeSheetId')});
			ticket.save({data:data},{success:function(){
				this.model.fetch();
			}.bind(this)});
		},
		'remove' : function(event){
			event.preventDefault();
			var elementsToRemove = this.$el.find('.timesheet-detail-mark-checkbox:checked');
			var data = [];
            var timelines = this.model.get('timeSheetLines');
			_.each(elementsToRemove,function(element){
				_.each(timelines, function(tm){
                    if(tm.timeSheetLineId != $(element).val()){
                        data.push(tm);
                        console.log(tm);
                    }
                });
                timelines = data;
                data = [];
			});
			console.log(this.model.get('timeSheetLines'));
            this.model.set('timeSheetLines',timelines);
			console.log(this.model.get('timeSheetLines'));
            this.save(event);
		},		
		// Private Methods
		'fillRecentTickets' : function(tickets) {			
			var tmpl = '<li><a class="timesheet-detail-addRecent" data-id="<%- ticket.id %>" data-setid="<%- ticket.setId %>"><%- ticket.name %></a></li>';
			
			for(var i=0; i < tickets.models.length && i < 5; i++ ){				
				this.$el.find('#timesheet-detail-actionMenu').append(_.template(tmpl,{ticket:tickets.models[i].toJSON()}));
			}
		},
		'removed' : function(response){
			this.model.fetch();
		}

	});

});