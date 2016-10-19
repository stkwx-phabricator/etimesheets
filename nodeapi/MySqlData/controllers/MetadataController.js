var Meta = require('../models/metadata');

exports.get = function (req, res, next) {
    Meta.list(req,res);
}