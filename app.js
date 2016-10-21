var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var path = require('path');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

// if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
//     connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
//         process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
//         process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
//         process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
//         process.env.OPENSHIFT_APP_NAME;
//     config.db.mongo.url = connection_string;
// }

var mongoose = require('mongoose');
var db = mongoose.connection;

if (process.env.NODE_ENV === 'development') {
    mongoose.connect('mongodb://localhost/pksubban');
}
if (process.env.NODE_ENV === 'production') {
    mongoose.connect(OPENSHIFT_data_DB_URL);
}

var playerSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    stats: Array
});

var Player = mongoose.model('Player', playerSchema);

var pkSubban = new Player({
    id: '1',
    name: 'PK Subban',
    stats: [3,1,1,2,-2]
});

var sheaWeber = new Player({
    id: '2',
    name: 'PK Subban',
    stats: [4,1,3,4,6]
});

Player.count({id: '1'}, function (err, count) {
    if (!count) {
        pkSubban.save();
        console.log('Inserted Player 1');
    }
    else {
        // Handle err.
        console.log('Already Exists');
    }
});

Player.count({id: '2'}, function (err, count) {
    if (!count) {
        sheaWeber.save();
        console.log('Inserted Player 2');
    }
    else {
        // Handle err.
        console.log('Already Exists');
    }
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(express.static('static'));

app.get('/player/pksubban', function(req, res, next) {
    Player.find({id : '1'}, function(err, obj) {
        res.json(obj[0].stats);
    })
});

app.get('/player/sheaweber', function (req, res) {
    Player.find({id : '2'}, function(err, obj) {
        res.json(obj[0].stats);
    })
});

var the_interval = 5000;
setInterval(function() {
    console.log("I am doing my 5 minutes check");
    // do your stuff here
}, the_interval);


if (process.env.NODE_ENV === 'development') {
    app.listen('8081');
}
if (process.env.NODE_ENV === 'production') {
    app.listen(server_port, server_ip_address, function () {

        console.log( "Listening on " + server_ip_address + ", server_port " + server_port  );

    });
}

exports = module.exports = app;
