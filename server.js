var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var path = require('path');

app.get('/player/pksubban', function (req, res) {
    url = 'http://www.nhl.com/player/p-k-subban-8474056';

    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var json = {};
            var data = $('.season-summary__table-sm table tbody tr').first();
            var i = 0;

            data.children().each(function () {
                console.log($(this).text());
                json[i] = $(this).text();
                i++;
            });
        }
        res.send(json);
    })
})

app.get('/player/sheaweber', function (req, res) {
    url = 'http://www.nhl.com/player/shea-weber-8470642';

    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var json = {};
            var data = $('.season-summary__table-sm table tbody tr').first();
            var i = 0;

            data.children().each(function () {
                console.log($(this).text());
                json[i] = $(this).text();
                i++;
            });
        }
        res.send(json);
    })
})

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
