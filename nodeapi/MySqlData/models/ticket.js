var crypto = require('crypto');
var db = require('../mysql.js');
require('../common.js');

function Ticket() {
    this.getlist = function (logininfo, res) {
        var data = {
            activities: [],
            projects:[]
        }
        //Define sql
        var sql = " select ACTIVITY_ID as id, ACTIVITY_NAME as name, 'activity' as type  from afsc_activity"+ 
       " union all"+
       " select  ID , NAME as name, 'project' as type from afsc_project";
        //var table = ["afsc_activity", "afsc_project"];
        // sql = db.format(sql, table);

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
                        "id": row.id,
                        "name": row.name,
                        "type": row.type,
                        "setId": ''
                    }
                    if (row.type == "project") {
                        data.projects.push(dataitem);
                    }
                    else if (row.type == "activity")
                    {
                        data.activities.push(dataitem);
                    }
 
                }
                res.writeHead(200, { 'Content-type': 'application/json' });
                res.end(JSON.stringify(data));
            }
            else {
                res.writeHead(403, { 'Content-type': 'application/json' });
                res.end('User name or Password invalid!');
            }
        });
    }
}
module.exports = new Ticket();