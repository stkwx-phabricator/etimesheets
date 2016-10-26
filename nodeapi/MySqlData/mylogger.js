var fs = require("fs");

var date = new Date();

var mylogger = function (msg) {
  var logmsg = "\n"+"--["+date+"]: "+ JSON.stringify(msg) + " : ---";

  console.log('LOGGED');
  fs.appendFile('log.txt', logmsg,  function(error) {
    if (error) {
        console.error("error when writing into log file :",error);
     }
      console.log("log is saved successfully");
  });
};

module.exports = mylogger;
