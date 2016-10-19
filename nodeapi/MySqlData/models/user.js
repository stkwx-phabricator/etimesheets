var crypto = require('crypto');
var db = require('../mysql.js');
require('../common.js');

function User() {
    this.login = function (logininfo,res) {
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
                    "token": logininfo.token,
                    "token_issued": curdate.format("yyyy-MM-dd hh:mm:ss"),
                    "token_lastuse": curdate.format("yyyy-MM-dd hh:mm:ss"),
                    "token_expire": expiredate.format("yyyy-MM-dd hh:mm:ss"),
                    "resourceId": data.EMPID,
                    "is_approver": data.ISAPPROVER
                }
                res.writeHead(200, { 'Content-type': 'application/json' });
                res.end(JSON.stringify(user));
            }
            else {
                res.writeHead(403, { 'Content-type': 'application/json' });
                res.end('User name or Password invalid!');
            }
        });
    }
}
module.exports = new User();