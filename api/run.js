
//initialize server
//initialize database
//initialize resources (doctor, patient, admin)

var server      = require('./server');
var database    = require('./database');
var resources   = require('./resources');

function init() {

    server.init()
        .then(database.init)
        .then(function () {

            resources.init(server.getServer());

        });
}

init();
