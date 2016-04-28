var mongoose = require('mongoose');

var Schema =  new mongoose.Schema({

    number          : String,
    title           : String,
    body            : String,                               // vsebina reporta
    createdBy       : { type:String, ref:'Account' },       // kateri zdravnik je naredil
    authorizedBy    : { type:String, ref:'Account' },
    accountRef      : { type: String, ref:'Account'},       // na katerega pacienta se nanasa
    dateCreated     : { type: Date, default: Date.now }

});

mongoose.model('Report', Schema );
