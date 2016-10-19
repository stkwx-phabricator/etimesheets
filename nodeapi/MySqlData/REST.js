var mysql   = require("mysql");
var fs = require("fs");
var crypto = require('crypto');
var db = require('./mysql.js');
var common = require('./common.js');

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {
    var self = this;
    router.get("/",function(req,res){
      console.log("get");
        res.json({"Message" : "Hello World !"});
    });

    var getdatee= function (date) {
      return date.getFullYear() + "/" + date.getMonth() +"/" +date.getDate();
    }

    Date.prototype.addDays = function(days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };

    Date.prototype.substractDays = function(days) {
        this.setDate(this.getDate() - parseInt(days));
        return this;
    };

    router.post('/user', function (req, res) {
      var data = req.body;
      var username = req.body.username;
      var password = req.body.password;
      var token = req.body.token;
      //var token = "bdfbab29f7a3550eadb59e2b313264ed60784a37c3d3ff8dfbce2e2a3c7ce0ee";
      //decode password
      var md5 = crypto.createHash('md5');
      md5.update(password + '' + password);
      var securepassword = md5.digest("hex");
      //Define sql
      var sql = 'call sp_login ("' + username + '","' + securepassword + '")';
      //Execute Query
      db.query(sql, function (err, rows) {
          if (err) {
              console.log(err);
              res.writeHead(503, { 'Content-type': 'application/json' });
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
                  "token": token,
                  "token_issued": curdate.format("yyyy-MM-dd hh:mm:ss"),
                  "token_lastuse": curdate.format("yyyy-MM-dd hh:mm:ss"),
                  "token_expire": expiredate.format("yyyy-MM-dd hh:mm:ss"),
                  "resourceId": data.EMPID,
                  "is_approver": data.ISAPPROVER
              }
              res.writeHead(200, { 'Content-type': 'application/json' });
              res.end(JSON.stringify(user));
              console.log(user);
          }
          else
          {
              res.writeHead(403, { 'Content-type': 'application/json' });
              res.end("User name or password invalid!");
          }
      });

    })



    router.get("/metadata",function(req,res){

      var today = new Date();

      var dateahead = new Date().getDay() -1;
      var startweekday = new Date().substractDays(14+dateahead);
      var endweekday = new Date().addDays(14-dateahead);
      var startweek = startweekday.toLocaleDateString()
      var endweek = endweekday.toLocaleDateString()
      //
      // console.log("today", today.getDay());
      // console.log("dateahead: ", dateahead );
      // console.log(" startweekday: ", startweekday);
      // console.log(" endweekday: ", endweekday);
      // console.log(" startweek: ", startweek);
      // console.log(" endweek: ", endweek );


        var query = "SELECT period_id as id, start_date as startDate, end_date as endDate FROM ??  where start_date between  ? and ?";
        var table = ["afsc_period", startweek, endweek];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
          var data = [];
          for (var key in rows) {
            if (rows.hasOwnProperty(key)) {
              var dataitem={
                "id": rows[key].id,
                 "name": rows[key].startDate.toLocaleDateString()+" - "+ rows[key].endDate.toLocaleDateString(),
                 "startDate": rows[key].startDate.toLocaleDateString(),
                 "endDate": rows[key].endDate.toLocaleDateString(),
                }
              data.push(dataitem);
            }
          }

            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"times" : data});
            }
        });
    });


    router.get("/ticket",function(req,res){
        var data = {
            activities: [],
            projects:[]
        };
        //var query ="select project_id as  id , NAME as name, 'project' type from ?? limit 10 union select ACTIVITY_ID as id , ACTIVITY_NAME as name, 'activity' type from ??";
        var query = "select project_id as  id , NAME as name from ?? limit 10 ; select ACTIVITY_ID as id , ACTIVITY_NAME as name  from ??";
        var table = ["afsc_project", "afsc_activity"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
          //console.log(rows[0]);
          for (var key in rows[0]) {
          //  if (rows.hasOwnProperty(key)) {
              var dataitem={
                "id": rows[0][key].id,
                "name": rows[0][key].name,
                "type": "project",
                "setId": ''
                }
              data.projects.push(dataitem);
          //  }
          }

          for (var key in rows[1]) {
            if (rows.hasOwnProperty(key)) {
              var dataitem={
                "id": rows[1][key].id,
                "name": rows[1][key].name,
                "type": "activity",
                "setId": ''
                }
              data.activities.push(dataitem);
            }
          }
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
            res.json(data);
          }
        });
    });


    router.get("/timesheet",function(req,res){
        var data = [];
        // var query ="SELECT * FROM ?? 	JOIN ?? ON		??.PERIOD_ID=??.PERIOD_ID	JOIN ?? ON		??.STATE_CODE=??.STATE_CODE";
        // var table = ["afsc_timesheet", "afsc_period","afsc_timesheet" ,"afsc_period", "afsc_timesheet_state", "afsc_timesheet" ,"afsc_timesheet_state"];
        var query = "select time_sheet_id as timeSheetId from ??";
        var table = ["afsc_timesheet"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
          //console.log(rows);
          for (var key in rows) {
            if (rows.hasOwnProperty(key)) {
              var dataitem={
                "timeSheetId": rows[key].timeSheetId
                }
              data.push(dataitem);
            }
          }
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
            res.json(data);
          }
        });
    });


    router.post("/timesheet",function(req,res){
      console.log("req: ", req.body.periodId)
      var query = "INSERT INTO afsc_timesheet (RESOURCE_ID, PERIOD_ID, STATE_CODE, CREATED_BY ) VALUES (?, ?, ?, ?)"; "select TIME_SHEET_ID  from afsc_timesheet order by TIME_SHEET_ID desc limit 1"; "select * from afsc_period where PERIOD_ID = ?";
      var table = ["317", req.body.periodId, "1", "", req.body.periodId];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
        console.log(rows[0]);
        console.log(rows[1]);
        console.log(rows[2]);
        for (var key in rows[1]) {
          console.log(rows[1][key].TIME_SHEET_ID);
        }

        dataitem =    {
    "resourceId": 317,
    "periodId": 201,
    "timeSheetId": 1,
    "description": "Lemon Yang - 10\/10\/16 - 10\/16\/16",
    "sequence": 1,
    "state": {
      "code": 1,
      "meaning": "unsubmitted"
    },
    "period": {
      "id": "201",
      "name": "10\/10\/16 - 10\/16\/16"
    }
  };

        console.log("err: ", err)
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json(dataitem);
          }
      });
  });

  router.put("/timesheet/:id",function(req,res){
    console.log("req: ", req.body.periodId)
    var query = "INSERT INTO afsc_timesheet (RESOURCE_ID, PERIOD_ID, STATE_CODE, CREATED_BY ) VALUES (?, ?, ?, ?)";
    var table = ["317", req.body.periodId, "1", ""];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
      dataitem =   {
          "resourceId": 317,
          "periodId": 201,
          "timeSheetId": 791410,
          "description": "Lemon Yang - 10\/10\/16 - 10\/16\/16",
          "sequence": 1,
          "state": {
            "code": 1,
            "meaning": "unsubmitted"
          },
          "period": {
            "id": "100911",
            "name": "10\/10\/16 - 10\/16\/16"
          }
        }
      console.log("err: ", err)
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json(dataitem);
        }
    });
});

    router.get("/timesheet/:id",function(req,res){
        var data, dataitem ;
        var query ="SELECT * FROM afsc_timesheet 	JOIN afsc_period ON		afsc_timesheet.PERIOD_ID=afsc_period.PERIOD_ID	JOIN afsc_timesheet_state ON		afsc_timesheet.STATE_CODE=afsc_timesheet_state.STATE_CODE where time_sheet_id = ?";
        var table = [ req.params.id];

        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
        //  console.log(rows);
          for (var key in rows) {
          //  if (rows.hasOwnProperty(key)) {
              var dataitem={
                "resourceId": rows[key].RESOURCE_ID,
                "periodId": rows[key].PERIOD_ID,
                "timeSheetId": rows[key].TIME_SHEET_ID,
                "description": rows[key].DESCRIPTION,
                "sequence": rows[key].SEQ,
                "state": {
                  "code": rows[key].STATE_CODE,
                  "meaning": rows[key].STATE_NAME,
                },
                "period": {
                  "id": rows[key].PERIOD_ID,
                  "name": rows[key].START_DATE.toLocaleDateString() + " - "+ rows[key].END_DATE.toLocaleDateString()
                }
              }
              //data.push(dataitem);
          //  }
          }
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
            res.json(dataitem);
          }
        });
    });


}

module.exports = REST_ROUTER;
