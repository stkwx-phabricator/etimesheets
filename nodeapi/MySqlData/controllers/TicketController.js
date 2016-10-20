var Ticket = require('../models/ticket');

exports.get = function (req, res, next) {
    Ticket.getlist(req, res);
}