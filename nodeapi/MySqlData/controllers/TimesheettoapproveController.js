var Timesheet = require('../models/timesheettoapprove');

exports.get = function (req, res) {
    Timesheet.getlist(req, res);
}

exports.put = function (req, res) {
    Timesheet.putapprove(req.body, res);
}
exports.delete = function (req, res) {
    Timesheet.deletereject(req, res);
}