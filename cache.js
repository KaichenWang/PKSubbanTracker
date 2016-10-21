var redis  = require('redis');
var client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

var scrape = require("./scrape");

exports.getStats = function(url, callback){
    var key = url;

    client.get(key, function(err, reply){
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
                    .expire(key, 3600 * 2) // cache will last for two minutes
                    .incr("expensive-hit")
                    .exec(function(err, replies){
                        callback(stats)
                    })
            })
        }
    })
}