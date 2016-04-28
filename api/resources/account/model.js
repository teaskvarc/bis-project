var mongoose = require('mongoose');

var Schema =  new mongoose.Schema({

    name            : String,
    surname         : String,
    email           : String,
    password        : String,
    dateCreated     : { type: Date, default: Date.now},
    roles           : [String],                              //doctor, patient, admin
    dateOfBirth     : Date,
    gender          : String,
    profileImage    : String,
    kzz             : String,
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
