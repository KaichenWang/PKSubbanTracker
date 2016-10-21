var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var path = require('path');

var cache = require('./cache');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.get('/player/pksubban', function (req, res) {
    url = 'http://www.hockeydb.com/ihdb/stats/pdisplay.php?pid=89716';

    cache.getStats(url, function(stats){
        if(stats){
            res.send(stats);
        }else{
            res.send("stats not found\n", 404)
        }
    })
})

app.get('/player/sheaweber', function (req, res) {
    url = 'http://www.hockeydb.com/ihdb/stats/pdisplay.php?pid=62488';

    cache.getStats(url, function(stats){
        if(stats){
            res.send(stats);
        }else{
            res.send("stats not found\n", 404)
        }
    })
})

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

if (process.env.NODE_ENV === 'development') {
    app.listen('8081');
}
if (process.env.NODE_ENV === 'production') {
    app.listen(server_port, server_ip_address, function () {

        console.log( "Listening on " + server_ip_address + ", server_port " + server_port  );

    });
}

app.listen('8081');

exports = module.exports = app;
