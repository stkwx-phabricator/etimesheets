﻿var db = {};
var mysql = require('mysql');
var config = require('./config');

var pool = mysql.createPool({
    host: config.dbinfo.host,
    port: config.dbinfo.port,
    user: config.dbinfo.username,
    password: config.dbinfo.password,
    database: config.dbinfo.dbname,
    acquireTimeout:100000,
    multipleStatements: true
});


db.query = function (sql, callback) {

    if (!sql) {
        callback();
        return;
    }
    pool.getConnection(function (err, connection) {
        if (err)
        {
            console.log(err);
            return;
        }
        pool.query(sql, function (err, rows, fields) {
            if (err) {
                console.log(err);
                callback(err, null);
                return;
            };

            callback(null, rows, fields);
            connection.release();
        });
    });
}

db.format = function (query, table) {
    return mysql.format(query, table);
}
module.exports = db;
