var db = require('../mysql.js');
require('../common.js');

function Timesheettoapprove() {
    this.getlist = function (req, res) {
        var data = [];
        //Define sql
        var sql = 'select distinct tm.TIME_SHEET_ID as timesheetid,s.STATE_NAME as state,tm.PERIOD_ID as periodid,pe.START_DATE as startdate,pe.END_DATE as enddate,tm.PERIOD_HOURS as totalhours,p.NAME as project' +
            ' from afsc_timesheet tm, afsc_timesheet_line tml, afsc_timesheet_state s, afsc_period pe, afsc_project p' +
            ' where tm.TIME_SHEET_ID=tml.TIME_SHEET_ID and tml.ACTUAL_APPROVER_USERID and s.STATE_Code=tm.STATE_Code and pe.PERIOD_ID=tm.PERIOD_ID and  p.ID =tml.PROJECT_ID';
        console.log(sql);

        //Execute Query
        db.query(sql, function (err, rows) {
            if (err) {
                res.writeHead(503, { 'Content-type': 'application/json' });
                res.end(err);
                return;
            }
            if (rows.length != undefined) {             
                for (var i = 0; i < rows.length; i++)
                {
                    var row = rows[i];
                    var tmpdata = {
                        "UserID": req.session.user.id,
                        "UserName": req.session.user.username,
                        "TimesheetID": row.timesheetid,
                        "StatusCode": row.state,
                        "PeriodName": new Date(row.startdate).format('MM/dd/yyyy') + '-' + new Date(row.enddate).format('MM/dd/yyyy'),
                        "PeriodID": row.periodid,
                        "Project": row.project,
                        "Totalhours": row.totalhours
                    }
                    data.push(tmpdata);                    
                }
                console.log(data);
                res.writeHead(200, { 'Content-type': 'application/json' });
                res.end(JSON.stringify(data));
            }
            else {
                res.writeHead(404, { 'Content-type': 'application/json' });
                res.end('No pending timesheet!');
            }
        });
    }

    this.putapprove = function (periodid, res) {
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

    this.deletereject = function (periodid, res) {
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
module.exports = new Timesheettoapprove();