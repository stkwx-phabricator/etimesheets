var db = require('../mysql.js');
var common = require('../common.js');

function Metadata() {
    this.list = function (req, res) {
        var response = { "code": '', "data": "" };
        var today = new Date();
        var startweekday = common.getMonday(-3);
        var endweekday = common.getMonday(3);
        var query = "SELECT period_id as id, start_date as startDate, end_date as endDate FROM ??  where start_date between  ? and ?";
        var table = ["afsc_period", new Date(startweekday).format('yyyy-MM-dd'), new Date(endweekday).format('yyyy-MM-dd')];
        var sql = db.format(query, table);
        db.query(sql, function (err, rows) {
            if (err) {
                res.writeHead(503, { 'Content-type': 'application/json' });
                res.end(err);
                return;
            }
            var metadata = { times: []};
            var data = JSON.stringify(rows);
            data = JSON.parse(data);
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var row = data[i];
                    var dataitem = {
                        "id": row.id,
                        "name": new Date(row.startDate).format('MM/dd/yyyy') + "-" + new Date(row.endDate).format('MM/dd/yyyy'),
                        "startDate": new Date(row.startDate).format('yyyy-MM-dd'),
                        "endDate": new Date(row.endDate).format('yyyy-MM-dd'),
                        "current":false
                    }
                    if (i == 3)
                        dataitem.current = true;
                    metadata.times.push(dataitem);
                }
                res.writeHead(200, { 'Content-type': 'application/json' });
                res.end( JSON.stringify(metadata));
                return;
            }
            else {
                res.writeHead(404, { 'Content-type': 'application/json' });
                res.end("Found 0 Period.");
                return;
            }
        });

    }
}
module.exports = new Metadata();