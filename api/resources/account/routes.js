
module.exports = function(server){

    //READ
    server.get('/api/accounts', function (req, res) {

        console.log('get accounts');
        res.send('All accounts');
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
    server.post('/api/account', function (req, res) {

    });
};