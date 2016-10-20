var User = require('../models/user');

exports.login = function(req,res,next) {
    User.login(req, res);
}