var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


module.exports = function(server){

    //READ
    server.get('/api/accounts', function (req, res) {

        var Account = mongoose.model('Account');
        
        Account.find(function (err, accountDocs) {
            
            if(err){
                console.log(err);
                res.status(400).send(err);
            }else{
                res.send(accountDocs);
            }
        });
    });

    //READ ONE
    server.get('/api/account/:id', function (req, res) {

    });

    //UPDATE
    server.put('/api/account/:id', function (req, res) {

    });

    //DELETE
    server.delete('/api/account/:id', function (req, res) {

    });

    //CREATE
    //racun s akreditiranim username in password
    server.post('/api/account', function (req, res) {

        //METODA s katero preverimo body. ce email in password ustrezata formatu
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('password', 'Password is too short').notEmpty().isLength({min:5});

        //to smo sedaj pregledali, tukaj nam vrze vse errors
        var errors = req.validationErrors();

        if(errors){
            return res.status(400).send(errors);
        }
        
        //v body pricakujemo podatke: email, password
        var accountData = req.body;

        var email = accountData.email;
        var password = accountData.password;

        //tukaj zgeneriramo nas password, ga spravimo v hash
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {

              var Account = mongoose.model('Account');
                var account = new Account({ email:email, password:hash });

                account.save(function (err) {

                    if(err){
                        console.log(err);
                        res.status(400).send(err);
                    }else{
                        res.send(account);
                    }
                });
            });
        });

    });
};