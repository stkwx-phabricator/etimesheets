var User = require('../models/user');

exports.login = function(req,res) {
    User.login(req, res);
}
exports.user = function (req) {
    var usersession = User.user(req);
    return usersession;
}