define(function(require) {
	'use strict';

	var a = require('js/collection/timesheet');
	var b = require('js/collection/ticket');
	var c = require('js/collection/timesheet_ticket');
	var d = require('js/collection/timesheettoapprove');

	return {
		Timesheet : a,
		Ticket : b,
		Timesheet_Ticket : c,
		TimesheetToApprove : d
	};
});