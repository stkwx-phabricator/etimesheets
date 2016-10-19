var db = require('../mysql.js');
require('../common.js');

function Timesheet() {
    this.getidlist = function (logininfo, res) { 
        var data = [];      
        //Define sql
        var sql = "select time_sheet_id as timeSheetId from ??";
        var table = ["afsc_timesheet"];
        sql = db.format(sql, table);

        //Execute Query
        db.query(sql, function (err, rows) {
            if (err) {
                res.writeHead(503, { 'Content-type': 'application/json' });
                res.end(err);
                return;
            }
            if (rows.length != undefined) {
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    var dataitem = {
                        "timeSheetId": rows.timeSheetId
                    }
                    data.push(dataitem);
                }
                res.writeHead(200, { 'Content-type': 'application/json' });
                res.end(JSON.stringify(data));
            }
            else {
                res.writeHead(404, { 'Content-type': 'application/json' });
                res.end('Found 0 timesheet!');
            }
        });
    }

    this.postperiodid = function (periodid, res) {
        //Define sql
        var sql = "INSERT INTO afsc_timesheet (RESOURCE_ID, PERIOD_ID, STATE_CODE, CREATED_BY ) VALUES (?, ?, ?, ?)"; "select TIME_SHEET_ID  from afsc_timesheet order by TIME_SHEET_ID desc limit 1"; "select * from afsc_period where PERIOD_ID = ?";
        var table = ["317", periodId, "1", "", periodId];
        sql = mysql.format(sql, table);

        //Execute Query
        db.query(sql, function (err, rows) {
            if (err) {
                res.writeHead(503, { 'Content-type': 'application/json' });
                res.end(err);
                return;
            }
            if (rows.length != undefined) {
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

    this.puttimesheet = function (periodid, res) {
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

    this.gettimesheetdetail = function (periodid, res) {
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
module.exports = new Timesheet();