var logger = {};
var log4js = require("log4js");
var log4js_config = require("./log4js.json");
log4js.configure(log4js_config);

console.log("log_start start");
var LogFile = log4js.getLogger('log_date');
logger.trace = function (msg) {
    LogFile.trace(msg);
}
logger.info = function (msg) { 
    LogFile.info(msg);
}
logger.debug = function (msg) {
    LogFile.debug(msg);
}
logger.warn = function (msg) {
    LogFile.warn(msg);
}
logger.error = function (msg) {
    LogFile.error(msg);
}

module.exports = logger; 