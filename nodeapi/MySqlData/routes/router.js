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
    configure: function (app)
    {
        //get
        app.get('/api/metadata', function (req, res) {
            $meta.get(req, res);
        });
        app.get('/api/ticket', function (req, res) {
            $ticket.get(req, res);
        })
        app.get('/api/timesheet', function (req, res) {
            $timesheet.get(req,res);
        })
        app.get('/api/timesheet/:id', function (req, res) {
            $timesheet.getwithids(req, res);
        })
        app.get('/api/timesheettoapprove', function (req, res) {
            $timesheettoapprove.get(req, res);
        })
        //post
        app.post('/api/user', function (req, res) {
            $user.login(req, res);
        });
        app.post('/api/timesheet', function (req, res) {
            $timesheet.post(req, res);
        })
        app.post('/api/timesheethasticket', function (req, res) {
            $timesheethasticket.post(req, res);
        })
        //put
        app.put('/api/timesheet/:id', function (req, res) {
            $timesheet.put(req, res);
        })
        app.put('/api/timesheethasticket', function (req, res) {
            $timesheethasticket.put(req, res);
        })

        app.put('/api/timesheettoapprove/?id', function (req, res) {
            $timesheettoapprove.put(req, res);
        })
        //delete
        app.delete('/api/timesheettoapprove/?id', function (req, res) {
            $timesheettoapprove.delete(req, res);
        })

    }
}