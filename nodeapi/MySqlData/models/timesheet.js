var db = require('../mysql.js');
require('../common.js');
var logger = require('../logger.js');


function Timesheet() {
    this.getidlist = function (req, res) {
        var data = [];
        //Define sql
        var value = [req.session.user.id];
        var sql = "select time_sheet_id as timeSheetId from afsc_timesheet where state_code=1 and resource_id=? order by time_sheet_id";
        sql = db.format(sql, value);

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
                        "timeSheetId": row.timeSheetId
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

    this.postperiodid = function (req, res) {

        //Define sql
        var sql = "call sp_CreateTimesheet (" + req.body.periodId + "," + req.session.user.id + ",'" + req.session.user.username + "')";
        //Execute Query
        db.query(sql, function (err, rows) {
            if (err) {
                res.writeHead(503, { 'Content-type': 'application/json' });
                res.end(err);
                logger.error(err);
                return;
            }
            if (rows.length != undefined) {
                var data = rows[0][0];
                var dataitem = {
                    "resourceId": data.RESEOUCE_ID,
                    "periodId": data.PERIOD_ID,
                    "timeSheetId": data.TIME_SHEET_ID,
                    "description": data.DESCRIPTION,
                    "sequence": data.SEQ,
                    "state": {
                        "code": data.STATE_CODE,
                        "meaning": data.STATE_NAME
                    },
                    "period": {
                        "id": data.PERIOD_ID,
                        "name": new Date(data.START_DATE).format('MM/dd/yyyy') + ' - ' + new Date(data.END_DATE).format('MM/dd/yyyy')
                    }
                };
                res.writeHead(200, { 'Content-type': 'application/json' });
                res.end(JSON.stringify(dataitem));
            }
        });
    }

    this.puttimesheet = function (req, res) {
        //Define sql
        var sql = 'call sp_AuditTimesheet ("' + req.body.timeSheetId + '","' + req.session.user.id + '",0)';
        //Execute Query
        db.query(sql, function (err, rows) {
            if (err) {
                res.writeHead(503, { 'Content-type': 'application/json' });
                res.end(err);
                logger.error(err);
                return;
            }
            var data;
            //Define sql
            var sql = "call sp_GetTimesheetDetail (" + req.body.timeSheetId + ")";
            //Execute Query
            db.query(sql, function (err, rows) {
                if (err) {
                    res.writeHead(503, { 'Content-type': 'application/json' });
                    res.end(err);
                    logger.error(err);
                    return;
                }
                if (rows.length != undefined) {
                    rows = rows[0];
                    if (rows[0].TIME_SHEET_LINE_ID == null || rows[0].TIME_SHEET_LINE_ID == undefined) {
                        var row = rows[0];
                        var dataitem = {
                            "resourceId": row.RESOURCE_ID,
                            "periodId": row.PERIOD_ID,
                            "timeSheetId": row.TIME_SHEET_ID,
                            "description": row.DESCRIPTION,
                            "sequence": row.SEQ,
                            "state": {
                                "code": row.STATE_CODE,
                                "meaning": row.STATE_NAME,
                            },
                            "period": {
                                "id": row.PERIOD_ID,
                                "name": new Date(row.START_DATE).format("MM/dd/yyyy") + " - " + new Date(row.END_DATE).format("MM/dd/yyyy")
                            },
                        }
                        data = dataitem;
                    }
                    else {
                        var dataitem = {
                            "resourceId": rows[0].RESOURCE_ID,
                            "periodId": rows[0].PERIOD_ID,
                            "timeSheetId": rows[0].TIME_SHEET_ID,
                            "description": rows[0].DESCRIPTION,
                            "sequence": rows[0].SEQ,
                            "state": {
                                "code": rows[0].STATE_CODE,
                                "meaning": rows[0].STATE_NAME,
                            },
                            "period": {
                                "id": rows[0].PERIOD_ID,
                                "name": new Date(rows[0].START_DATE).format("MM/dd/yyyy") + " - " + new Date(rows[0].END_DATE).format("MM/dd/yyyy")
                            },
                            "timeSheetLines": []
                        }
                        for (var i = 0; i < rows.length; i++) {
                            var row = rows[i];
                            dataitem.timeSheetLines.push({
                                "timeSheetLineId": row.TIME_SHEET_LINE_ID,
                                "projectId": row.PROJECT_ID,
                                "state": {
                                    "code": row.LINE_STATE_CODE,
                                    "meaning": row.LINE_STATE_NAME
                                },
                                "effortsList": JSON.parse(row.EFFORTS_LIST),
                                "timeApproverUsersIds": row.ACTUAL_APPROVER_USERID,
                                "project": row.NAME,
                                "activity": row.ACTIVITY_NAME,
                                "description": row.LINE_DESCRIPTION
                            });
                        }
                        data = dataitem;

                    }
                    res.end(JSON.stringify(data));
                }
                else {
                    res.writeHead(404, { 'Content-type': 'application/json' });
                    res.end('Not found timesheet line ' + req.params.id + '!');
                }
            });


            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end("null");
        });

    }

    this.gettimesheetdetail = function (req, res) {
        var data;
        //Define sql
        var sql = "call sp_GetTimesheetDetail (" + req.params.id + ")";
        //Execute Query
        db.query(sql, function (err, rows) {
            if (err) {
                res.writeHead(503, { 'Content-type': 'application/json' });
                res.end(err);
                logger.error(err);
                return;
            }
            if (rows.length != undefined) {
                rows = rows[0];
                if (rows[0].TIME_SHEET_LINE_ID == null || rows[0].TIME_SHEET_LINE_ID == undefined) {
                    var row = rows[0];
                    var dataitem = {
                        "resourceId": row.RESOURCE_ID,
                        "periodId": row.PERIOD_ID,
                        "timeSheetId": row.TIME_SHEET_ID,
                        "description": row.DESCRIPTION,
                        "sequence": row.SEQ,
                        "state": {
                            "code": row.STATE_CODE,
                            "meaning": row.STATE_NAME,
                        },
                        "period": {
                            "id": row.PERIOD_ID,
                            "name": new Date(row.START_DATE).format("MM/dd/yyyy") + " - " + new Date(row.END_DATE).format("MM/dd/yyyy")
                        },
                    }
                    data = dataitem;
                }
                else {
                    var dataitem = {
                        "resourceId": rows[0].RESOURCE_ID,
                        "periodId": rows[0].PERIOD_ID,
                        "timeSheetId": rows[0].TIME_SHEET_ID,
                        "description": rows[0].DESCRIPTION,
                        "sequence": rows[0].SEQ,
                        "state": {
                            "code": rows[0].STATE_CODE,
                            "meaning": rows[0].STATE_NAME,
                        },
                        "period": {
                            "id": rows[0].PERIOD_ID,
                            "name": new Date(rows[0].START_DATE).format("MM/dd/yyyy") + " - " + new Date(rows[0].END_DATE).format("MM/dd/yyyy")
                        },
                        "timeSheetLines": []
                    }
                    for (var i = 0; i < rows.length; i++) {
                        var row = rows[i];
                        dataitem.timeSheetLines.push({
                            "timeSheetLineId": row.TIME_SHEET_LINE_ID,
                            "projectId": row.PROJECT_ID,
                            "state": {
                                "code": row.LINE_STATE_CODE,
                                "meaning": row.LINE_STATE_NAME
                            },
                            "effortsList": JSON.parse(row.EFFORTS_LIST),
                            "timeApproverUsersIds": row.ACTUAL_APPROVER_USERID,
                            "project": row.NAME,
                            "activity": row.ACTIVITY_NAME,
                            "description": row.LINE_DESCRIPTION
                        });
                    }
                    data = dataitem;

                }
                res.writeHead(200, { 'Content-type': 'application/json' });
                res.end(JSON.stringify(data));
            }
            else {
                res.writeHead(404, { 'Content-type': 'application/json' });
                res.end('Not found timesheet line ' + req.params.id + '!');
            }
        });
    }

    this.deletetimesheet = function (req, res) {
        var sql = 'call sp_AuditTimesheet ("' + req.params.id + '","' + req.session.user.id + '",3)';
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
module.exports = new Timesheet();
