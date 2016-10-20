var Timesheet = require('../models/timesheethasticket');

exports.get = function (req, res) {
    Timesheet.getids(req, res);
}
exports.post = function (req, res) {
    Timesheet.postperiodid(req.body, res);
}
exports.put = function (req, res) {
    Timesheet.puttimesheet(req.body, res);
}
exports.getwithid = function (req, res) {
    Timesheet.gettimesheetdetail(req, res);
}