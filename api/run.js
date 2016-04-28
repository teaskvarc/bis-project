
//initialize server
//initialize database
//initialize resources (doctor, patient, admin)

var server      = require('./server');
var database    = require('./database');

function init() {

    server.init()
        .then(database.init)
        .then(function () {

            console.log('All is well');
        });
}

init();