var db = require('../mysql.js');
require('../common.js');

function Timesheet() {
    this.getidlist = function (req, res) {
        var data = [];
        //Define sql
        var value = [req.session.user.id];
        var sql = "select time_sheet_id as timeSheetId from afsc_timesheet where state_code=1 and resource_id=?";
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
        var sql = "INSERT INTO afsc_timesheet (RESOURCE_ID, PERIOD_ID, STATE_CODE, CREATED_BY ) VALUES (?, ?, ?, ?)"; //  "select * from afsc_period where PERIOD_ID = ?";
        var table = ["317", req.periodId, "1", "", req.periodId];
        sql = db.format(sql, table); //mysql.format(sql, table);

        //Execute Query
        db.query(sql, function (err, rows) {
            if (err) {
                res.writeHead(503, { 'Content-type': 'application/json' });
                res.end(err);
                return;
            }
            //  if (rows.length != undefined) {
            // var data = JSON.stringify(rows[0][0]);
            // data = JSON.parse(data);
            dataitem = {
                "resourceId": "317",
                "periodId": req.periodId,
                "timeSheetId": rows.insertId,
                "description": "Lemon Yang - 10\/10\/16 - 10\/16\/16",
                "sequence": 1,
                "state": {
                    "code": 1,
                    "meaning": "unsubmitted"
                },
                "period": {
                    "id": req.periodId,
                    "name": "10\/10\/16 - 10\/16\/16"
                }
            };
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(dataitem));
            // }
            // else {
            //     res.writeHead(403, { 'Content-type': 'application/json' });
            //     res.end('User name or Password invalid!');
            // }
        });
    }

    this.puttimesheet = function (periodid, res) {
        // //Define sql
        // var sql = 'call sp_login ("' + logininfo.username + '","' + securepassword + '")';
        // //Execute Query
        // db.query(sql, function (err, rows) {
        //     if (err) {
        //         res.writeHead(503, { 'Content-type': 'application/json' });
        //         res.end(err);
        //         return;
        //     }
        //     if (rows.length != undefined) {
        //         var data = JSON.stringify(rows[0][0]);
        //         data = JSON.parse(data);
        //         var user = {
        //             "id": data.EMPID,
        //             "username": data.FIRST_NAME + ' ' + data.LAST_NAME,
        //             "token": logininfo.token,
        //             "token_issued": curdate.format("yyyy-MM-dd hh:mm:ss"),
        //             "token_lastuse": curdate.format("yyyy-MM-dd hh:mm:ss"),
        //             "token_expire": expiredate.format("yyyy-MM-dd hh:mm:ss"),
        //             "resourceId": data.EMPID,
        //             "is_approver": data.ISAPPROVER
        //         }
        //         res.writeHead(200, { 'Content-type': 'application/json' });
        //         res.end(JSON.stringify(user));
        //     }
        //     else {
        //         res.writeHead(403, { 'Content-type': 'application/json' });
        //         res.end('User name or Password invalid!');
        //     }
        // });
    }

    this.gettimesheetdetail = function (req, res) {
        var data;
        //Define sql
        var sql = "select distinct tm.RESOURCE_ID,tm.PERIOD_ID,tm.TIME_SHEET_ID,tm.DESCRIPTION,tm.SEQ,tm.STATE_CODE,s.STATE_NAME,pe.START_DATE,pe.END_DATE,tml.TIME_SHEET_LINE_ID, tml.PROJECT_ID, tml.STATE_CODE as LINE_STATE_CODE,s.STATE_NAME as LINE_STATE_NAME, tml.EFFORTS_LIST,tml.ACTUAL_APPROVER_USERID,tml.DESCRIPTION as LINE_DESCRIPTION, p.NAME, a.ACTIVITY_NAME" +
            " from afsc_timesheet tm, afsc_timesheet_line tml, afsc_timesheet_state s, afsc_period pe, afsc_project P, afsc_ACTIVITY a " +
            " where tml.ACTUAL_APPROVER_USERID and s.STATE_Code=tm.STATE_Code and pe.PERIOD_ID=tm.PERIOD_ID and p.ID =tml.PROJECT_ID and a.ACTIVITY_ID=tml.ACTIVITY_ID and tm.TIME_SHEET_ID=tml.TIME_SHEET_ID and tm.TIME_SHEET_ID=?";
        var table = [req.params.id];
        sql = db.format(sql, table);
        console.log(sql);
        //Execute Query
        db.query(sql, function (err, rows) {
            if (err) {
                res.writeHead(503, { 'Content-type': 'application/json' });
                res.end(err);
                return;
            }
            if (rows.length != undefined) {
                if (rows[0].TIME_SHEET_LINE_ID == null) {
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
                        console.log("-------------row:" + row);
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
                    data=dataitem;

                }
                res.writeHead(200, { 'Content-type': 'application/json' });
                res.end(JSON.stringify(data));
                console.log('-----------Details:' + JSON.stringify(data));
            }
            else {
                res.writeHead(404, { 'Content-type': 'application/json' });
                res.end('Not found timesheet line ' + req.params.id + '!');
            }
        });
    }





}
module.exports = new Timesheet();
