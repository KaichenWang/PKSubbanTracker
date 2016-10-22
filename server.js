var express = require('express');
var fs = require('fs');
var request = require('request');
var app = express();
var path = require('path');
var parseString = require('xml2js').parseString;

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.get('/player/pksubban', function (req, res) {
    var url = 'http://nhlwc.cdnak.neulion.com/fs1/nhl/league/playerstatsline/20162017/2/NSH/iphone/playerstatsline.json';
    var json = {};
    request(url, function (err, response, data) {
        if (err || response.statusCode != 200) {
            console.log('REQUEST ERROR: ' + err);
        }
        else {
            json = JSON.parse(data);
        }
        res.send(json);
    })
})

app.get('/player/sheaweber', function (req, res) {
    var url = 'http://nhlwc.cdnak.neulion.com/fs1/nhl/league/playerstatsline/20162017/2/MTL/iphone/playerstatsline.json';
    var json = {};
    request(url, function (err, response, data) {
        if (err || response.statusCode != 200) {
            console.log('REQUEST ERROR: ' + err);
        }
        else {
            json = JSON.parse(data);
        }
        res.send(json);
    })
})

app.get('/team', function (req, res) {
    var url = 'http://www.tsn.ca/datafiles/XML/NHL/standings.xml';
    var json = {};
    request(url, function (err, response, data) {
        if (err || response.statusCode != 200) {
            console.log('REQUEST ERROR: ' + err);
        }
        else {
            parseString(data, function (err, result) {
                if(!err){
                   json = JSON.parse(JSON.stringify(result));
                }
            });
        }
        res.send(json);
    })
})

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(express.static('static'));

app.get('/*', function(req, res) {
    res.redirect('/');
});


if (process.env.NODE_ENV === 'development') {
    app.listen('8081');
}
if (process.env.NODE_ENV === 'production') {
    app.listen(server_port, server_ip_address, function () {

        console.log( "Listening on " + server_ip_address + ", server_port " + server_port  );

    });
}

exports = module.exports = app;
