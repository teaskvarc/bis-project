var mongoose        = require('mongoose');
var bcrypt          = require('bcryptjs');
var guid            = require ('guid');

require('../../node_modules/mailin-api-node-js/V2.0/mailin.js');


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

    //INVITE - ta funkcija se sprozi, ko zelimo nekoga povabiti

    server.post('/api/account/invite', function (req, res) {

        //basic validation
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('role', 'No role present').notEmpty();

        var errors = req.validationErrors();

        if(errors){
            return res.status(400).send(errors);
        }

        //na server-ju bomo dolocili, da je bil povabljen. v model.js smo dolocili, da je 0 = povabljen
        var Account = mongoose.model('Account');    //skozi ta Account delamo novi account na bazi

        var inviteCode = guid.raw();

        //accountData je tisto, kar pride iz nasega app-a. Iz browser-ja pride request body
        var accountData = req.body;
        var email = accountData.email;

        accountData.status = 0;
        accountData.inviteCode = inviteCode;

        var account = new Account(accountData);        // ustvarimo novi model

        account.save(function (err) {                      // shranimo v bazo

            sendInvitation(email, inviteCode, function () {

                res.send(account);

            });

        });
    });
};

function sendInvitation(email, id, cb) {

    var client = new Mailin("https://api.sendinblue.com/v2.0","tqB7kdnpw2LRxZ5V");

    var to = {};
    to[email] = email;

    data = { "to" : to,
        "from" : ["invite@bis.com","BIS Invitation"],
        "subject" : "Invite to BIS",
        "html" : '<h1>BIS Invitation</h1>' +
            '<a href="http://localhost:9001/#/invitation/'+id+'">Click here to accept invite!</a>'

    };

    client.send_email(data).on('complete', function(data) {
        cb(data);
    });

};