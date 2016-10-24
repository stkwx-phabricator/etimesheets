var Toapprove = require('../models/timesheettoapprove');

exports.get = function (req, res) {
    Toapprove.getlist(req, res);
}

exports.put = function (req, res) {
    Toapprove.putapprove(req, res);
}
exports.delete = function (req, res) {
    Toapprove.deletereject(req, res);
}