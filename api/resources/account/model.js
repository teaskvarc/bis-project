var mongoose = require('mongoose');

var Schema =  new mongoose.Schema({

    name            : String,
    surname         : String,
    email           : { type : String, unique : true, required:true },
    password        : String,
    dateCreated     : { type : Date, default : Date.now },
    role            : String,                              //doctor, patient, admin, superdamin
    status          : Number, // active = 1, invited = 0, banned = 2
    dateOfBirth     : Date,
    gender          : String,
    profileImage    : String,
    kzz             : String,
    inviteCode      : String,  // tukaj bomo shranili kodo za invite
    tokens          : [
        {
            token : String,
            expires : {
                type : Date,
                default : function () { return Date.now() + 1000*60*60*24*14 }
            }
        }
    ]
});

mongoose.model('Account', Schema);
