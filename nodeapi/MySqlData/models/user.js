var crypto = require('crypto');
var db = require('../mysql.js');
require('../common.js');

function User() {
    this.login = function (req, res) {
        var logininfo = req.body;
        //decode password
        var md5 = crypto.createHash('md5');
        md5.update(logininfo.password + '' + logininfo.password);
        var securepassword = md5.digest("hex");
        //Define sql
        var sql = 'call sp_login ("' + logininfo.username + '","' + securepassword + '")';
        //Execute Query
        db.query(sql, function (err, rows) {
            if (err) {
                res.writeHead(503, { 'Content-type': 'application/json' });
                res.end(err);
                return;
            }
            if (rows.length != undefined) {

                var curdate = new Date();
                var expiredate = new Date();
                expiredate.setHours(expiredate.getHours() + 1);
                var data = JSON.stringify(rows[0][0]);
                data = JSON.parse(data);
                var user = {
                    "id": data.EMPID,
                    "username": data.FIRST_NAME + ' ' + data.LAST_NAME,
                    "token": data.token,
                    "token_issued": curdate.format("yyyy-MM-dd hh:mm:ss"),
                    "token_lastuse": curdate.format("yyyy-MM-dd hh:mm:ss"),
                    "token_expire": expiredate.format("yyyy-MM-dd hh:mm:ss"),
                    "resourceId": data.EMPID,
                    "is_approver": data.ISAPPROVER == true ? "1" : "0",
                    "path":'/'
                }
                req.session.user = user;
                req.session.success = true;
                user.token = req.sessionID;
                res.writeHead(200, { 'Content-type': 'application/json' });
                res.end(JSON.stringify(user));
            }
            else {
                res.writeHead(403, { 'Content-type': 'application/json' });
                res.end('User name or Password invalid!');
            }
        });
    },
        this.user = function (req) {
        var sessionuser;
        if (req.session.user) {
            sessionuser = req.session.user;
        }
        else
        {
            var sessionid = req.headers.authorization.split(' ').length > 1 ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
            sessionuser = req.sessionStore.sessions[sessionid] != undefined ? JSON.parse(req.sessionStore.sessions[sessionid]).user : undefined;
        }
        return sessionuser;
    }
}
module.exports = new User();