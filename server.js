var express = require('express');
var fs = require('fs');
var request = require('request');
var app = express();
var path = require('path');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/poll', function (req, res) {
    var url = 'https://api.polldaddy.com/';
    var json = {};
    var requestData = {
        "pdRequest": {
            "partnerGUID": "1ee4c797-af30-2a28-cb75-0000049ec0d5",
            "userCode": "$P$BgdIE24QfRZp3WI9zdCuiKsts2c0PI0",
            "demands": {
                "demand": {
                    "poll": {
                        "id": "9559362"
                    }, "id": "GetPollResults"
                }
            }
        }
    };
    request({
        url: url,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: requestData
    }, function (err, response, data) {
        if (err || response.statusCode != 200) {
            console.log('REQUEST ERROR: ' + err);
        }
        else {
            if(data.pdResponse.hasOwnProperty('demands')){
                json = data.pdResponse.demands;
            }
        }
        res.send(json);
    })
})

if (process.env.NODE_ENV === 'development') {
    app.listen('8081');
}
if (process.env.NODE_ENV === 'production') {
    app.listen(server_port, server_ip_address, function () {
        console.log( "Listening on " + server_ip_address + ", server_port " + server_port  );
    });
}

exports = module.exports = app;
