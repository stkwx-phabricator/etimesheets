var Ticket = require('../models/timesheethasticket');

exports.post = function (req, res) {
    Ticket.posttimesheetdetail(req, res);
}
exports.put = function (req, res) {
    Ticket.puttimesheetdetail(req, res);
}
