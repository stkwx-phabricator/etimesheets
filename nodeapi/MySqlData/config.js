
var config = require('./config.json')
    , env = config.environment["current"];


var envConfig = config.environment[env], i;

for (i in envConfig) {
    config[i] = envConfig[i];
}

module.exports = config; 