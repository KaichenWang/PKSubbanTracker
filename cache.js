var redis  = require('redis');
var app = require('./server');

if (process.env.NODE_ENV === 'development') {
    var client = redis.createClient();

    client.on("error", function (err) {
        console.log("Error " + err);
    });
}
if (process.env.NODE_ENV === 'production') {
    var redisHost = process.env.OPENSHIFT_REDIS_DB_HOST;
    var redisPort = process.env.OPENSHIFT_REDIS_DB_PORT;
    var redisPass = process.env.OPENSHIFT_REDIS_DB_PASSWORD;

    var client = redis.createClient( redisPort, redisHost );
    client.auth( redisPass );

    client.on("error", function (err) {
        console.log("Error " + err);
    });
}

var scrape = require("./scrape");

exports.getStats = function(url, callback){
    var key = url;

    client.get(key, function(err, reply){
        if(err) {
            console.log('REDIS CLIENT ERROR: ' + err);
            callback(err);
        }
        if(reply){
            // use cache
            client.incr("cache-hit", function(e,r){ })
            callback(JSON.parse(reply))
        }
        else{
            // update cache
            scrape.scrapePage(url, function(stats){
                client.multi()
                    .set(key, JSON.stringify(stats))
                    .expire(key, 300) // cache will last for 5 minutes
                    .incr("expensive-hit")
                    .exec(function(err, replies){
                        callback(stats)
                    })
            })
        }
    })
}