var db = require('../mysql.js');
require('../common.js');

function Timesheet() {
    this.getidlist = function (req, res) {
        console.log("req.body ------gettimesheet:", req.session.user);
      var logininfo=JSON.stringify(req.session.user);
      console.log("------gettimesheet:"+JSON.stringify(req.session.user));
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
        console.log("req.body", req);
        //Define sql
        var sql = "INSERT INTO afsc_timesheet (RESOURCE_ID, PERIOD_ID, STATE_CODE, CREATED_BY ) VALUES (?, ?, ?, ?)"; //  "select * from afsc_period where PERIOD_ID = ?";
        var table = [ "317", req.periodId, "1", "", req.periodId];
        sql = db.format(sql, table); //mysql.format(sql, table);

        //Execute Query
        db.query(sql, function (err, rows) {
            console.log("rows:  ",rows.insertId);
            if (err) {
                res.writeHead(503, { 'Content-type': 'application/json' });
                res.end(err);
                return;
            }
          //  if (rows.length != undefined) {
                // var data = JSON.stringify(rows[0][0]);
                // data = JSON.parse(data);
                dataitem =    {
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
      var data = [];
      //Define sql
      var sql = "SELECT * FROM afsc_timesheet 	JOIN afsc_period ON		afsc_timesheet.PERIOD_ID=afsc_period.PERIOD_ID	JOIN afsc_timesheet_state ON		afsc_timesheet.STATE_CODE=afsc_timesheet_state.STATE_CODE where time_sheet_id = ?";
      var table = [req.params.id];
      sql = db.format(sql, table);

      //Execute Query
      db.query(sql, function (err, rows) {
        console.log("gettimesheetdetail: ", rows);
          if (err) {
              res.writeHead(503, { 'Content-type': 'application/json' });
              res.end(err);
              return;
          }
          if (rows.length != undefined) {
              for (var i = 0; i < rows.length; i++) {
                  var row = rows[i];
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
                        "name": row.START_DATE.toLocaleDateString() + " - "+ row.END_DATE.toLocaleDateString()
                      }
                  }
                  data.push(dataitem);
              }
              res.writeHead(200, { 'Content-type': 'application/json' });
              res.end(JSON.stringify(dataitem));
          }
          else {
              res.writeHead(404, { 'Content-type': 'application/json' });
              res.end('Found 0 timesheet!');
          }
      });
    }

}
module.exports = new Timesheet();
