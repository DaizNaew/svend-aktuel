var mysql = require('mysql'),
    docker = require('is-docker'),
    chalk = require('chalk'),
    host = docker() ? 'db' : '127.0.0.1';

    console.log(chalk.black.bgYellow(docker() ? 'Webserver has detected running inside Docker, switching to MYSQL host' 
    : 'Webserver has detected running outside Docker, Switching to localhost'));

var dbConn = mysql.createPool({
    connectionLimit: 100,
    host: host,
    user: 'svend',
    password: 'svendsen',
    database: 'svendchk',
});

module.exports = dbConn;