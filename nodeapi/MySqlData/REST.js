var mysql   = require("mysql");
var fs = require("fs");
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

    router.get("/period",function(req,res){
        var query = "SELECT period_id, start_date, end_date FROM ??";
        var table = ["afsc_period"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
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
      fs.readFile(__dirname + "/MockData/" + "user.json", 'utf8', function (err, data) {
          res.end(data);
      });
    })

    router.get("/metadata",function(req,res){

      var today = new Date();
      var dateahead = new Date().getDay() -1;
      var startweekday = new Date().substractDays(14+dateahead);
      var endweekday = new Date().addDays(14-dateahead);
      var startweek = getdatee(startweekday);
      var endweek = getdatee(endweekday);

      console.log("today", today.getDay());
      console.log("dateahead: ", dateahead );
      console.log(" startweekday: ", startweekday);
      console.log(" endweekday: ", endweekday);
      console.log(" startweek: ", startweek);
      console.log(" endweek: ", endweek );


        var query = "SELECT period_id as id, start_date as startDate, end_date as endDate FROM ??  where start_date between  ? and ?";
        var table = ["afsc_period", startweekday, endweekday];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
          var data = [];

          for (var key in rows) {
            if (rows.hasOwnProperty(key)) {
              var dataitem={
                "id": rows[key].id,
                 "name": getdatee(rows[key].startDate)+"-"+ getdatee(rows[key].endDate),
                 "startDate": getdatee(rows[key].startDate),
                 "endDate": getdatee(rows[key].endDate),
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
          console.log(rows[0]);
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


    // router.get("/ticket",function(req,res){
    //     var data = [];
    //     var query ="select project_id as  id , NAME as name, 'project' type from ?? limit 10 union select ACTIVITY_ID as id , ACTIVITY_NAME as name, 'activity' type from ??";
    //     var table = ["afsc_project", "afsc_activity"];
    //     query = mysql.format(query,table);
    //     connection.query(query,function(err,rows){
    //       for (var key in rows) {
    //         if (rows.hasOwnProperty(key)) {
    //           var dataitem={
    //             "id": rows[key].id,
    //             "name": rows[key].name,
    //             "type": rows[key].type,
    //             "setId": ''
    //             }
    //           data.push(dataitem);
    //         }
    //       }
    //       if(err) {
    //           res.json({"Error" : true, "Message" : "Error executing MySQL query"});
    //       } else {
    //         res.json(data);
    //       }
    //     });
    // });

    router.get("/timesheet",function(req,res){
        var data = [];
        // var query ="SELECT * FROM ?? 	JOIN ?? ON		??.PERIOD_ID=??.PERIOD_ID	JOIN ?? ON		??.STATE_CODE=??.STATE_CODE";
        // var table = ["afsc_timesheet", "afsc_period","afsc_timesheet" ,"afsc_period", "afsc_timesheet_state", "afsc_timesheet" ,"afsc_timesheet_state"];
        var query = "select time_sheet_id as timeSheetId from ??";
        var table = ["afsc_timesheet"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
          console.log(rows);
          for (var key in rows) {
            if (rows.hasOwnProperty(key)) {
              var dataitem={
                "id": rows[key].id,
                "name": rows[key].name,
                "type": rows[key].type,
                "setId": ''
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


}

module.exports = REST_ROUTER;
