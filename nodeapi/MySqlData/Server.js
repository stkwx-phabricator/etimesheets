
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var favicon = require('favicon');
var bodyparser = require('body-parser');
var routes = require('./routes/router');
var app = express();



app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cookieParser('timesheet'));
sessionStore = new session.MemoryStore;
//app.use(favicon);
app.use(session({
    resave: true, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    name: 'timesheet.sid',   //
    cookie: { maxAge: 1800000 },  //save login for 30 min
    secret: 'timesheet',
    store: sessionStore
}));

app.all('*', function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
    else next();
});

routes.configure(app);

var server = app.listen(8081, function () {
    console.log('Server listening on port ' + server.address().port);
});