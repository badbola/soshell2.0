const mongoose =  require('mongoose');

mongoose.connect('mongodb://localhost/soshell_again');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to db'));

db.once('open', function(){
    console.log('Connected to database:: Mongodb');
});

module.exports = db;