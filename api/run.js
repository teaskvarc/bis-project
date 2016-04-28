
//initialize server
//initialize database
//initialize resources (doctor, patient, admin)

var server      = require('./server');
var database    = require('./database');
var resources   = require('./resources');
var seed        = require('./seed');

function init() {

    server.init()
        .then(database.init)
        .then(function () {

            return resources.init(server.getServer());  // tukaj inicializiramo resources

        })
        .then(seed.seedAdmin)
        .then(function () {

            console.log('All is well!');
        })
        .catch(function (err) {

            console.log(err);

        });
}

init();
