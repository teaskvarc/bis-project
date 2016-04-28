//tukaj povezujemo vse route in modele
// require all resources
//when adding new resource add a require statements for all the resources components

exports.init = function (server) {

    require('./account/model');
    require('./account/routes')(server);    // routes rabijo server,

    require('./report/model');
    require('./report/routes')(server);



    // se zgodi takoj, ni asinhronega procesa
    return true;

};
