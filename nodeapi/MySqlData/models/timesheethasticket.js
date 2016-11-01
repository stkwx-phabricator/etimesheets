var db = require('../mysql.js');
require('../common.js');
var logger = require('../logger.js');

function Ticket() {

    this.posttimesheetdetail = function (req, res) {
        //Define sql
        var sql = 'call sp_AddTimesheetLine (' + req.body.timesheet_id + ',' + req.body.project_id + ',' + req.body.activity_id + ',' + req.session.user.id + ')';
        //Execute Query
        db.query(sql, function (err, rows) {
            if (err) {
                res.writeHead(503, { 'Content-type': 'application/json' });
                res.end(err);
                logger.error(err);
                return;
            }
            if (rows.length != undefined) {
                var row = rows[0][0];
                var data = {
                    "periodId": row.PERIOD_ID,
                    "timeSheetId": row.TIME_SHEET_ID,
                    "timeSheetLines": [
                        {
                            "timeSheetLineId": row.TIME_SHEET_LINE_ID,
                            "projectId": row.PROJECT_ID,
                            "workItemSetId": '',
                            "workItemType": "",
                            "state": {
                                "code": row.STATE_CODE,
                                "meaning": row.STATE_NAME
                            },
                            "effortsList": row.EFFORTS_LIST,
                            "description": row.description,
                            "project": row.NAME
                        }
                    ]
                }
                res.writeHead(200, { 'Content-type': 'application/json' });
                res.end(JSON.stringify(data));
            }
            else {
                res.writeHead(403, { 'Content-type': 'application/json' });
                res.end('No data found!');
            }
        });
    }

    this.puttimesheetdetail = function (req, res) {
        var linedata = req.body.data;
        //MAIN-GET THE OLD ARRAY.
        var sql = 'select TIME_SHEET_LINE_ID from afsc_timesheet_line where TIME_SHEET_ID=' + req.body.id;
        db.query(sql, function (err, rows) {
            if (err) {
                res.writeHead(503, { 'Content-type': 'application/json' });
                res.end(err);
                logger.error(err);
                return;
            }
            if (rows.length != undefined) {
                var oldarray = [];
                //build up old timesheetlineid array.
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    oldarray.push(row.TIME_SHEET_LINE_ID);
                }
                logger.trace(oldarray.length);
                //MAIN-SAVE THE UPDATES.
                var count = 0;
                if (linedata.length == 0) {
                    var sql = 'delete from afsc_timesheet_line where TIME_SHEET_ID=' + req.body.id;
                    db.query(sql, function (err, rows) {
                        if (err) {
                            res.writeHead(503, { 'Content-type': 'application/json' });
                            res.end(err);
                            return;
                        }
                        GetTimesheetDetail(req.body.id, res);
                    });
                }
                else {
                    for (var i = 0; i < linedata.length; i++) {
                        var data = linedata[i];
                        //Define sql
                        var sql = 'call sp_SaveTimesheetLine (' + req.session.user.id + ',' + data.timeSheetLineId + ',' + 1 + ',"[' + data.effort + ']","' + data.description + '")';
                        //Delete the id if it is updated
                        if (oldarray.length != 0) {
                            oldarray.remove(data.timeSheetLineId);
                        }
                        //Execute Query
                        db.query(sql, function (err, rows) {
                            if (err) {
                                res.writeHead(503, { 'Content-type': 'application/json' });
                                res.end(err);
                                logger.error(err);
                                return;
                            }
                            count++;
                            if (count == linedata.length) {
                                //MAIN-DELTE
                                var deletecount = 0;
                                if (oldarray.length == 0) {
                                    GetTimesheetDetail(req.body.id, res);
                                }
                                else {
                                    for (var i = 0; i < oldarray.length; i++) {
                                        var sql = 'delete from afsc_timesheet_line where TIME_SHEET_LINE_ID=' + oldarray[i];
                                        db.query(sql, function (err, rows) {
                                            if (err) {
                                                res.writeHead(503, { 'Content-type': 'application/json' });
                                                res.end(err);
                                                return;
                                            }
                                            deletecount++;
                                            if (deletecount == oldarray.length) {
                                                GetTimesheetDetail(req.body.id, res);
                                            }
                                        });
                                    }
                                }

                            }
                        });


                    }


                }



            }
        });


    }


}
function GetTimesheetDetail(id, res) {
    //MAIN-GET RETURN DATA
    var data;
    //Define sql
    var sql = "call sp_GetTimesheetDetail (" + id + ")";
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
module.exports = new Ticket()