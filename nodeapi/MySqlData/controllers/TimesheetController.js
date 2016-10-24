var Timesheet = require('../models/timesheet');

exports.get = function (req, res) {
    Timesheet.getidlist(req, res);
}
exports.post = function (req, res) {
    Timesheet.postperiodid(req, res);
}
exports.put = function (req, res) {
    Timesheet.puttimesheet(req.body, res);
}
exports.getwithids = function (req, res) {
    Timesheet.gettimesheetdetail(req, res);
}
