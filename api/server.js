var express = require('express');
var server = express();
var Promise = require('bluebird');



exports.init = function () {

    return new Promise(function (resolve, reject) {

        server.listen(3050, function (err) {

            if(err){
                reject(err);
            }else{
                console.log('Server running on port 3050');
                resolve();
            }

        });
    });
}





