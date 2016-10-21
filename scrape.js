var request = require('request');
var cheerio = require('cheerio');

exports.scrapePage = function(url, callback){
    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var json = {};
            var data = $('table.st.reg tbody tr').last().children().eq(3);

            for (var j = 0; j<5; j++) {
                if (j == 4) {
                    data = data.next();
                    json[j] = data.text();
                }
                else {
                    json[j] = data.text();
                    data = data.next();
                }
            }
        }
        callback(json);
    })
}