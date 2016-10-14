var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require("fs");

app.use(bodyParser.json({ limit: '1mb' }));  //这里指定参数使用 json 格式
app.use(bodyParser.urlencoded({
    extended: true
}));
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
    else next();
});
app.post('/api/user', function (req, res) {
    var data = req.body;
    fs.readFile(__dirname + "/MockData/" + "user.json", 'utf8', function (err, data) {
        res.end(data);
    });
})
app.get('/api/metadata', function (req, res) {
    fs.readFile(__dirname + "/MockData/" + "metadata.json", 'utf8', function (err, data) {
        res.end(data);
    });
})

app.get('/api/ticket', function (req, res) {
    fs.readFile(__dirname + "/MockData/" + "ticket.json", 'utf8', function (err, data) {
        res.end(data);
    });
})

app.get('/api/timesheet', function (req, res) {
    fs.readFile(__dirname + "/MockData/" + "gettimesheet.json", 'utf8', function (err, data) {
        res.end(data);
    });
})

app.post('/api/timesheet', function (req, res) {
    fs.readFile(__dirname + "/MockData/" + "gettimesheetdetail791410.json", 'utf8', function (err, data) {
        res.end(data);
    });
})
app.put('/api/timesheet/:id', function (req, res) {
    var data = req.body;
    console.log(data);
    fs.readFile(__dirname + "/MockData/" + "gettimesheetdetail790439.json", 'utf8', function (err, data) {
        res.end(data);
    });
})
app.get('/api/timesheet/:id', function (req, res) {
    var id = req.params.id;
    fs.readFile(__dirname + "/MockData/" + "gettimesheetdetail" + id + ".json", 'utf8', function (err, data) {
        res.end(data);

    });
})

app.post('/api/timesheethasticket', function (req, res) {
    var data = req.body;
    res.end();
})

app.put('/api/timesheethasticket', function (req, res) {
    var data = req.body;
    console.log(data);
    fs.readFile(__dirname + "/MockData/" + "gettimesheetdetail790439.json", 'utf8', function (err, data) {
        res.end(data);
    });
})
app.get('/api/timesheettoapprove', function (req, res) {
    fs.readFile(__dirname + "/MockData/" + "timesheettoapprove.json", 'utf8', function (err, data) {
        res.end(data);
    });
})
app.put('/api/timesheettoapprove/?id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    res.end(null);

})

app.delete('/api/timesheettoapprove/?id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    res.end(null);

})
var server = app.listen(8081, function (req, res) {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})



