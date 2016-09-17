define(function(require) {
	'use strict';

	
    var a = require('js/view/common/layout');
	var b = require('js/view/ticket');
	var c = require('js/view/timesheet');
	var d = require('js/view/timesheet/create');
	var e = require('js/view/timesheet/detail');
	var f = require('js/view/ticket/create');	
	var g = require('js/view/timesheet/search');
	var h = require('js/view/ticket/search');		
	var i = require('js/view/ticket/advancedSearch');
	var j = require('js/view/login');
	var k = require('js/view/timesheet/to-approve');
	var l = require('js/view/timesheet/detail_approve');

	return {
		Layout : a,
		Ticket : b,
		Timesheet : c,
		TimesheetCreate : d,
		TimesheetDetail : e,			
		TimesheetSearch : g,
		TicketCreate : f,
		TicketSearch : h,				
		TicketAdvSearch : i,
		Login : j,
		ToApprove : k,
		TimesheetDetailApprove : l
	};
});