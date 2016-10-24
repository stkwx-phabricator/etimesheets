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
      var resourceId = req.session.user.resourceId;
      var periodId = req.body.periodId;
      var sql = "call sp_createTimesheet (" + periodId+", "+resourceId + ")";
        //Execute Query
        db.query(sql, function (err, rows) {
          var row0= rows[0];//JSON.stringify(rows[0]);
          var row1= rows[1];
          var period = row0[0].START_DATE.format("MM/dd/yyyy")+"-"+ row0[0].END_DATE.format("MM/dd/yyyy");
          var timeSheetId = row1[0].TIME_SHEET_ID;
          var description = req.session.user.username+" - "+ period;
            if (err) {
                res.writeHead(503, { 'Content-type': 'application/json' });
                res.end(err);
                return;
            }
            dataitem = {
                "resourceId": resourceId,
                "periodId": periodId,
                "timeSheetId": timeSheetId,
                "description": description,
                "sequence": 1,
                "state": {
                    "code": 1,
                    "meaning": "unsubmitted"
                },
                "period": {
                    "id": periodId,
                    "name": period
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
        var sql = "call sp_GetTimesheetDetail (" + req.params.id + ")";
        //console.log(sql);
        //Execute Query
        db.query(sql, function (err, rows) {
          // console.log("call sp_GetTimesheetDetail rows: ",rows);
            if (err) {
                res.writeHead(503, { 'Content-type': 'application/json' });
                res.end(err);
                return;
            }
            if (rows.length != undefined) {
                //console.log("ROWS" + rows);
                rows = rows[0];
                if (rows[0].TIME_SHEET_LINE_ID == null) {
                    console.log("---IF");
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
                    //console.log("---ELSE");
                    //console.log("rows:" + rows.length);
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
                        // console.log("-------------row:" + row);
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
                // console.log('-----------Details:' + JSON.stringify(data));
            }
            else {
                res.writeHead(404, { 'Content-type': 'application/json' });
                res.end('Not found timesheet line ' + req.params.id + '!');
            }
        });
    }





}
module.exports = new Timesheet();
