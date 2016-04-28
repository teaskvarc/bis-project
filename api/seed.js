var mongoose    = require('mongoose');
var bcrypt      = require('bcryptjs');
var Promise     = require('bluebird');

// ustvarimo admin uporabnika

exports.seedAdmin = function () {

    var adminEmail      = 'bisadmin';
    var adminPassword   = 'mojegeslo';

    return new Promise(function (resolve, reject) {

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash( adminPassword, salt, function (err, hash) {

                var Account = mongoose.model('Account');

                //preden shranimo novega admina, preverimo, ce obstaja ze email: bisadmin
                Account.findOne( { email:adminEmail }, function (err, doc) {

                    //ce dokument se ni narejen, sledece:
                    if(!doc){

                        var account = new Account({
                            role        : 'admin',
                            email       : adminEmail,
                            password    : hash
                        });

                        account.save(function (err) {
                            if(err){
                                reject(err);
                            }else{
                                resolve();
                            }
                        }); 
                    }else{
                        resolve();
                    }
                });
            });
        });
    });
};


