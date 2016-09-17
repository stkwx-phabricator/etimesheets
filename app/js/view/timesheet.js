define([ 'backbone', 'text!tmpl/timesheet.html' ], function(Backbone, tmpl) {
	'use strict';

	return Backbone.View.extend({
		el : '.main',
		childView : null,
		childView2 : null,
        syncCounter: 0,
        errors: 0,
		events : {
			'click #btn-create-timesheet' : 'create-timesheet',
            'click #lnk-show-more' : 'getMoreClick'
		},
		template : function() {
			return _.template(tmpl);
		}(),
		initialize : function(options) {
			console.log(options);
			this.user = options.user;
		},
		render : function() {
            ga('set', 'page', '/');
            ga('send', 'pageview');
			this.$el.html(this.template({
				//timesheets : this.collection.toJSON(),
				user : this.user.toJSON()
			}));
            this.$("#loading-tm").hide();
            this.listenTo(this.collection, 'sync', this.addTimesheet);
            this.listenTo(this.collection, 'request', this.showLoader);
            if(this.collection.size() <= 3 ){
                this.$("#lnk-show-more").hide();
            }
            this.getMore();
		},
		onClose: function(){
			if(this.childView){
				this.childView.close();
			}
			if(this.childView2){
				this.childView2.close();
			}
		},

		// Events
		'create-timesheet' : function(event) {
			event.preventDefault();

			app_router.navigate('/timesheet/create', {
				trigger : true
			});
		},
        
        addTimesheet : function(timesheet){
            console.log(timesheet);
            //this.$("#tbl-timesheetHistory > tbody");
            if (timesheet instanceof Backbone.Model) {
                var tr = $("<tr />");
                tr.append($("<td />").append($("<a />").attr("href","#timesheet/" + timesheet.get("timeSheetId")).html(timesheet.get("period").name)));
                tr.append($("<td />").append($("<a />").attr("href","#timesheet/" + timesheet.get("timeSheetId")).html(timesheet.get("description") )));
                tr.append($("<td />").html(timesheet.get("state").meaning));
                this.$("#tbl-timesheetHistory > tbody").append(tr);
                this.syncCounter--;

                if(this.syncCounter === 0){
                    this.hideLoader();
                }
                if(this.collection.filter(function(timesheet){
                    return !timesheet.has('description');
                }).length == 0){
                    this.$("#lnk-show-more").hide();
                }
            }
        },
        getMore : function(){
            var self = this;
            var timesheetsToSync = this.collection.filter(function(timesheet){
                return !timesheet.has('description');
            }).slice(0,3);
            _.each(timesheetsToSync,function(timesheet){
                self.syncCounter++;
                timesheet.fetch({
                    global : false
                }).fail(function(jqXHR, textStatus, errorThrown){
                        self.syncCounter--;
                        self.$("#alert-not-retrieving").removeClass("hide");
                        if(self.syncCounter === 0){
                            self.hideLoader();
                        }
                    });
            });
            
        },
        getMoreClick : function(event){
            event.preventDefault();
            self.$("#alert-not-retrieving").addClass("hide");
            this.getMore();
        },
        showLoader : function(model){
            this.$("#lnk-show-more").hide();
            this.$("#loading-tm").show();
        },
        hideLoader : function(){
            this.$("#lnk-show-more").show();
            this.$("#loading-tm").hide();
        }
	});

});