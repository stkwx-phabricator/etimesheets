define(function(require) {
	'use strict';

	var a = require('js/model/timesheet');
	var b = require('js/model/ticket');
	var c = require('js/model/metadata');
	var d = require('js/model/timesheet/ticket');
	var e = require('js/model/user');
	var f = require('js/model/timesheettoapprove');

	return {
		Timesheet : a,
		Ticket : b,
		Metadata : c,
		Timesheet_Ticket : d,
		User : e,
		TimesheetToApprove : f
	};
});