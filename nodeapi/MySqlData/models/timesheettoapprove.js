var db = require('../mysql.js');
require('../common.js');
var logger = require('../logger.js');


function Timesheettoapprove() {
    this.getlist = function (req, res) {
        var data = [];
        //Define sql
        var sql = 'select distinct tm.TIME_SHEET_ID as timesheetid,s.STATE_NAME as state,tm.PERIOD_ID as periodid,pe.START_DATE as startdate,pe.END_DATE as enddate,tm.PERIOD_HOURS as totalhours' +
            ' from afsc_timesheet tm, afsc_timesheet_line tml, afsc_timesheet_state s, afsc_period pe' +
            ' where tm.TIME_SHEET_ID=tml.TIME_SHEET_ID  and s.STATE_Code=tm.STATE_Code and pe.PERIOD_ID=tm.PERIOD_ID and tml.STATE_CODE=2 and tml.ACTUAL_APPROVER_USERID=' + req.session.user.id +' order by tm.TIME_SHEET_ID';

        //Execute Query
        db.query(sql, function (err, rows) {
            if (err) {
                res.writeHead(503, { 'Content-type': 'application/json' });
                res.end(err);
                logger.error(err);
                return;
            }
            if (rows.length != undefined) {
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    var tmpdata = {
                        "UserID": req.session.user.id,
                        "UserName": req.session.user.username,
                        "TimesheetID": row.timesheetid,
                        "StatusCode": row.state,
                        "PeriodName": new Date(row.startdate).format('MM/dd/yyyy') + '-' + new Date(row.enddate).format('MM/dd/yyyy'),
                        "PeriodID": row.periodid,
                        "Project": '',
                        "Totalhours": row.totalhours
                    }
                    data.push(tmpdata);
                }
                res.writeHead(200, { 'Content-type': 'application/json' });
                res.end(JSON.stringify(data));
            }
            else {
                res.writeHead(404, { 'Content-type': 'application/json' });
                res.end('No pending timesheet!');
            }
        });
    }

    this.putapprove = function (req, res) {
        //Define sql
        var sql = 'call sp_AuditTimesheet ("' + req.params.id + '","' + req.session.user.id + '",1)';
        //Execute Query
        db.query(sql, function (err, rows) {
            if (err) {
                res.writeHead(503, { 'Content-type': 'application/json' });
                res.end(err);
                logger.error(err);
                return;
            }
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end("null");
        });
    }

    this.deletereject = function (req, res) {
        //Define sql
        var sql = 'call sp_AuditTimesheet ("' + req.params.id + '","' + req.session.user.id + '",2)';
        //Execute Query
        db.query(sql, function (err, rows) {
            if (err) {
                res.writeHead(503, { 'Content-type': 'application/json' });
                res.end(err);
                return;
            }
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end("null");

        });
    }

}
module.exports = new Timesheettoapprove();