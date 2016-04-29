var mongoose        = require('mongoose');
var bcrypt          = require('bcryptjs');
var guid            = require ('guid');
var nodemailer      = require('nodemailer');
var smtpTransport   = require('nodemailer-smtp-transport');

require('../../node_modules/mailin-api-node-js/V2.0/mailin.js');

var client = new Mailin("https://api.sendinblue.com/v2.0","tqB7kdnpw2LRxZ5V");

data = { "to" : {"teaskvarc@gmail.com":"to whom!"},
    "from" : ["from@email.com","from email!"],
    "subject" : "My subject",
    "html" : "This is the <h1>HTML</h1>"
}

client.send_email(data).on('complete', function(data) {
    console.log(data);
});



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
    
    //LOG IN
    server.post('/api/account/login', function (req, res) {

        //req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('password', 'Password is too short').notEmpty().isLength({min:5});

        var errors = req.validationErrors();

        if(errors) {
            return res.status(400).send(errors); 
        }

        var userData = req.body;

        var Account = mongoose.model('Account');

        Account.findOne({email:userData.email}, function (err, accountDoc) {

            if(accountDoc){

                bcrypt.compare(userData.password, accountDoc.password, function (err, result) {

                    if(result){

                        //success
                        //tukaj smo ustvarili token, ki ga bomo dodali uporabniku
                        var token = {
                          token:guid.raw()
                        };

                        accountDoc.tokens.push(token);

                        accountDoc.save(function (err) {

                            if(!err){
                                res.send(token);
                            }else{
                                res.sendStatus(401);
                            }
                        });

                    }else {
                        //wrong password
                        res.sendStatus(401);
                    }
                });

            }else{
                res.sendStatus(401);
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



        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });



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

    //INVITE
    server.post('/api/account/invite', function (req, res) {

        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('role', 'No role present').notEmpty();





        var accountData = req.body;
        //na server-ju bomo dolocili, da je bil povabljen. v model.js smo dolocili, da je 0 = povabljen
        accountData.status = 0;

        var Account = mongoose.model('Account');    //skozi ta Account delamo novi account na bazi

        var account = new Account(accountData);        // ustvarimo novi model

        account.save(function (err) {                      // shranimo v bazo


        });


    });

}