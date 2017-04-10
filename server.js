var express = require('express');
var fs = require('fs');
var request = require('request');
var app = express();
var path = require('path');
var parseString = require('xml2js').parseString;

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

function requestPlayerStats (url, json, res) {
    request(url, function (err, response, data) {
        if (err || response.statusCode != 200) {
            console.log('REQUEST ERROR: ' + err);
        }
        else {
            parseString(data, function (err, result) {
                if(!err){
                    try {
                        json.push(JSON.parse(JSON.stringify(result)).playerCard["playerCard-row"][0].$);
                    }
                    catch(err) {
                        console.log(err.message);
                    }
                }
            });
        }
        res.send(json);
    })
};

app.get('/player/pksubban', function (req, res) {
    var url = 'http://www.tsn.ca/mobile/bbcard.aspx?hub=NHL&name=PK+SUBBAN';
    var json = [
        {
            'col_1': 'Playoffs',
            'col_2': '8',
            'col_3': '8',
            'col_4': '8',
            'col_5': '8',
            'col_6': '8'
        }
    ];
    requestPlayerStats(url, json, res);
})

app.get('/player/sheaweber', function (req, res) {
    var url = 'http://www.tsn.ca/mobile/bbcard.aspx?hub=NHL&name=SHEA+WEBER';
    var json = [
        {
            'col_1': 'Playoffs',
            'col_2': '7',
            'col_3': '7',
            'col_4': '7',
            'col_5': '7',
            'col_6': '7'
        }
    ];
    requestPlayerStats(url, json, res);
})


app.get('/team', function (req, res) {
    var url = 'http://www.tsn.ca/datafiles/XML/NHL/standings.xml';
    var json = {
        p2017: {
            mtl: {
                record: '4 - 3',
                round: '2'
            },
            nsh: {
                record: '11 - 99',
                round: 'conf finals'
            }
        }
    };
    request(url, function (err, response, data) {
        if (err || response.statusCode != 200) {
            console.log('REQUEST ERROR: ' + err);
        }
        else {
            parseString(data, function (err, result) {
                if(!err){
                   json.r2016 = JSON.parse(JSON.stringify(result));
                }
            });
        }
        res.send(json);
    })
})

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
