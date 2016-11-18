var $user = require('../controllers/UserController');
var $meta = require('../controllers/MetadataController');
var $ticket = require('../controllers/TicketController');
var $timesheet = require('../controllers/TimesheetController');
var $timesheethasticket = require('../controllers/TimesheethasticketController');
var $timesheettoapprove = require('../controllers/TimesheettoapproveController');

/*
POST    /api/user   $user.login
*/

module.exports = {
    configure: function (app) {
        //get
        app.get('/api/metadata', function (req, res) {
            var usersession = $user.user(req);
            if (usersession != undefined) {
                req.session.user = usersession;
                $meta.get(req, res);
            }
            else {
                res.writeHead(403, { 'Content-type': 'application/json' });
                res.end('Access Dinied');
            }
        });
        app.get('/api/ticket', function (req, res) {
            var usersession = $user.user(req);
            if (usersession != undefined) {
                req.session.user = usersession;
                $ticket.get(req, res);
            }
            else {
                res.writeHead(403, { 'Content-type': 'application/json' });
                res.end('Access Dinied');
            }
        })
        app.get('/api/timesheet', function (req, res) {
            var usersession = $user.user(req);
            if (usersession != undefined)
            {
                req.session.user = usersession;
                $timesheet.get(req, res);
            }
            else {
                res.writeHead(403, { 'Content-type': 'application/json' });
                res.end('Access Dinied');
            }
        })
        app.get('/api/timesheet/:id', function (req, res) {
            var usersession = $user.user(req);
            if (usersession != undefined) {
                req.session.user = usersession;
                $timesheet.getwithids(req, res);
            }
            else {
                res.writeHead(403, { 'Content-type': 'application/json' });
                res.end('Access Dinied');
            }
        })
        app.get('/api/timesheettoapprove', function (req, res) {
            var usersession = $user.user(req);
            if (usersession != undefined) {
                req.session.user = usersession;
                $timesheettoapprove.get(req, res);
            }
            else {
                res.writeHead(403, { 'Content-type': 'application/json' });
                res.end('Access Dinied');
            }

        })
        //post
        app.post('/api/user', function (req, res) {
            $user.login(req, res, app);
        });
        app.post('/api/timesheet', function (req, res) {
            var usersession = $user.user(req);
            if (usersession != undefined) {
                req.session.user = usersession;
                $timesheet.post(req, res);
            }
            else {
                res.writeHead(403, { 'Content-type': 'application/json' });
                res.end('Access Dinied');
            }
        })
        app.post('/api/timesheethasticket', function (req, res) {
            var usersession = $user.user(req);
            if (usersession != undefined) {
                req.session.user = usersession;
                $timesheethasticket.post(req, res);
            }
            else {
                res.writeHead(403, { 'Content-type': 'application/json' });
                res.end('Access Dinied');
            }

        })
        //put
        app.put('/api/timesheet/:id', function (req, res) {
            var usersession = $user.user(req);
            if (usersession != undefined) {
                req.session.user = usersession;
                $timesheet.put(req, res);
            }
            else {
                res.writeHead(403, { 'Content-type': 'application/json' });
                res.end('Access Dinied');
            }

        })
        app.put('/api/timesheethasticket', function (req, res) {
            var usersession = $user.user(req);
            if (usersession != undefined) {
                req.session.user = usersession;
                $timesheethasticket.put(req, res);
            }
            else {
                res.writeHead(403, { 'Content-type': 'application/json' });
                res.end('Access Dinied');
            }

        })

        app.put('/api/timesheettoapprove/:id', function (req, res) {
            var usersession = $user.user(req);
            if (usersession != undefined) {
                $timesheettoapprove.put(req, res);
            }
            else {
                res.writeHead(403, { 'Content-type': 'application/json' });
                res.end('Access Dinied');
            }

        })
        //delete
        app.delete('/api/timesheet/:id', function (req, res) {
            var usersession = $user.user(req);
            if (usersession != undefined) {
                req.session.user = usersession;
                $timesheet.delete(req, res);
            }
            else {
                res.writeHead(403, { 'Content-type': 'application/json' });
                res.end('Access Dinied');
            }
        })
        app.delete('/api/timesheettoapprove/:id', function (req, res) {
            var usersession = $user.user(req);
            if (usersession != undefined) {
                req.session.user = usersession;
                $timesheettoapprove.delete(req, res);
            }
            else {
                res.writeHead(403, { 'Content-type': 'application/json' });
                res.end('Access Dinied');
            }

        })

    }
}