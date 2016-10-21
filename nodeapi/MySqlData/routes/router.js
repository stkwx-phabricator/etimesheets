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
            if (req.session.user) {
                $meta.get(req, res);
            }
            else {
                req.session.error = 'Access denied!';
                res.redirect('/');
            }
        });
        app.get('/api/ticket', function (req, res) {
            if (req.session.user) {
                $ticket.get(req, res);
            }
            else {
                req.session.error = 'Access denied!';
                res.redirect('/');
            }
        })
        app.get('/api/timesheet', function (req, res) {
            if (req.session.user) {
                $timesheet.get(req, res);
            }
            else {
                req.session.error = 'Access denied!';
                res.redirect('/');
            }
        })
        app.get('/api/timesheet/:id', function (req, res) {
            if (req.session.user) {
                $timesheet.getwithids(req, res);
            }
            else {
                req.session.error = 'Access denied!';
                res.redirect('/');
            }
        })
        app.get('/api/timesheettoapprove', function (req, res) {
            if (req.session.user) {
                $timesheettoapprove.get(req, res);
            }
            else {
                req.session.error = 'Access denied!';
                res.redirect('/');
            }

        })
        //post
        app.post('/api/user', function (req, res) {
            $user.login(req, res);
        });
        app.post('/api/timesheet', function (req, res) {
            if (req.session.user) {
                $timesheet.postperiodid(req, res);
            }
            else {
                req.session.error = 'Access denied!';
                res.redirect('/');
            }
        })
        app.post('/api/timesheethasticket', function (req, res) {
            if (req.session.user) {
                $timesheethasticket.post(req, res);
            }
            else {
                req.session.error = 'Access denied!';
                res.redirect('/');
            }

        })
        //put
        app.put('/api/timesheet/:id', function (req, res) {
            if (req.session.user) {
                $timesheet.put(req, res);
            }
            else {
                req.session.error = 'Access denied!';
                res.redirect('/');
            }

        })
        app.put('/api/timesheethasticket', function (req, res) {
            if (req.session.user) {
                $timesheethasticket.put(req, res);
            }
            else {
                req.session.error = 'Access denied!';
                res.redirect('/');
            }

        })

        app.put('/api/timesheettoapprove/?id', function (req, res) {
            if (req.session.user) {
                $timesheettoapprove.put(req, res);
            }
            else {
                req.session.error = 'Access denied!';
                res.redirect('/');
            }

        })
        //delete
        app.delete('/api/timesheettoapprove/?id', function (req, res) {
            if (req.session.user) {
                $timesheettoapprove.delete(req, res);
            }
            else {
                req.session.error = 'Access denied!';
                res.redirect('/');
            }

        })

    }
}