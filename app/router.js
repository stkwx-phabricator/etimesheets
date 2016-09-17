define([ 'backbone', 'backboneView', 'View', 'Collection', 'Model' ], function(Backbone, BackboneView, View,
		Collection, Model ) {
	return Backbone.Router.extend({
		'routes' : {
			'' : 'index',
			'home' : 'index',
			'login' : 'login',
			'timesheet/create' : 'timesheet-create',
			'timesheet/:id' : 'timesheet-detail',
			'timesheet/:id/toapprove' : 'timesheet-toapprove',
			'timesheet/:id/ticket/create' : 'ticket-create',
			'timesheet/:id/ticket/search' : 'ticket-search',
			'ticket/create' : 'ticket-create',
			'ticket/edit/:id' : 'ticket-edit',
			'ticket/:id' : 'ticket-detail',
			'home' : 'index',
			'search/:id' : 'search',
			'logout' : 'logout'
		},
		'user' : null,
		//privete methods
		'start' : function(){			
			this.user = new Model.User();			
			var authenticated = this.user.isAuthenticated({
				success : function(){					
					Backbone.history.start();
				}.bind(this),
				error : function(){														
					Backbone.history.start();
				}.bind(this)
			});
		},		
		//route methods
		'index' : function() {
			if(!this.user.authenticated){
				app_router.navigate('/login', {
					trigger : true
				});
				return false;
			}
			this.loadLayout();
			this.closeCurrentView();
			var timesheet = new Collection.Timesheet();

			this.currentView = new View.Timesheet({
				collection : timesheet,
				user : this.user
			});

			var success = function(collection) {
				this.currentView.render();
				this.currentView.childView = new View.Ticket();
                if(this.user.get('is_approver') === '1'){
                    this.currentView.childView2 = new View.ToApprove();
                }
			}.bind(this);

			timesheet.fetch({
				success : success
			});
		},
		'login' : function(){				
			this.closeCurrentView();
			this.currentView = new View.Login({
				model : this.user
			});
			this.currentView.render();
		},
		'logout' : function(){
			this.user.destroy();
			app_router.navigate('/login', {
					trigger : true
			});
		},
		'search' : function(term) {
			this.loadLayout();
			this.closeCurrentView();
			var timesheet = new Collection.Timesheet();

			this.currentView = new View.TimesheetSearch({
				collection : timesheet
			});

			var success = function(collection) {
				this.currentView.render(term);
				timesheet.childView = new View.TicketSearch({term:term});
			}.bind(this);

			timesheet.fetch({
				success : success
			});

			this.currentView.render();
		},
		'ticket-search' : function(timesheet) {			
			this.loadLayout();
			this.closeCurrentView();
			
			var collection = new Collection.Ticket();
			
			this.currentView = new View.TicketAdvSearch({				
				collection: collection,
				timesheet : timesheet
			});
			
			collection.fetch({
				success:function(){
					this.currentView.render();
				}.bind(this)
			});
		},
		'timesheet-create' : function() {
			this.loadLayout();
			var timesheet = new Model.Timesheet(),
				metadata = new Model.Metadata();
			

			this.closeCurrentView();
			this.currentView = new View.TimesheetCreate({
				model : timesheet,
				metadata: metadata
			});

			metadata.fetch({
				success:function(){
					this.currentView.render();
				}.bind(this)
			});			
		},
		'timesheet-detail' : function(id) {
			this.loadLayout();
			var timesheet = new Model.Timesheet(),
				tickets = new Collection.Ticket();

			this.closeCurrentView();
			timesheet.set({timeSheetId:id});
			timesheet.fetch({				
				success : function(model) {
					this.currentView = new View.TimesheetDetail({
						model : timesheet,
						tickets : tickets
					});
					this.currentView.render();
				}.bind(this)
			});
		},
		'timesheet-toapprove' : function(id) {
			this.loadLayout();
			var timesheet = new Model.Timesheet(),
				tickets = new Collection.Ticket();

			this.closeCurrentView();
			timesheet.set({timeSheetId:id});
			timesheet.fetch({				
				success : function(model) {
					this.currentView = new View.TimesheetDetailApprove({
						model : timesheet,
						tickets : tickets
					});
					this.currentView.render();
				}.bind(this)
			});
		},
		'ticket-create' : function(id) {
			this.loadLayout();
			this.closeCurrentView();

			var timesheet = new Model.Timesheet(),
				metadata = new Model.Metadata();
			
			if (typeof id !== 'undefined') {
				timesheet.set({
					id : id
				});
			}

			this.currentView = new View.TicketCreate({
				model : new Model.Ticket(),
				timesheet : timesheet,
				metadata : metadata
			});
			
			metadata.fetch({
				success : function() {
					this.currentView.render();
				}.bind(this)
			});
		},
		'ticket-detail' : function(id) {
			this.loadLayout();
			var self = this,
				ticket = new Model.Ticket({id:id}),
				metadata = new Model.Metadata();

			this.closeCurrentView();
			metadata.fetch({
				success : function() {
					self.currentView = new View.TicketCreate({
						model : ticket,
						metadata : metadata
					});
					ticket.fetch({
						success : function(model) {
							self.currentView.render();
						}
					});
				}
			});
		},
		'loadLayout' : function() {
			if (!this.layoutView) {
				this.layoutView = new View.Layout();
				this.layoutView.render();
			}
		},
		'closeCurrentView' : function() {
			if (this.currentView) {
				Backbone.View.prototype.close.apply(this.currentView);
			}
		},
		'currentView' : undefined
	});
});