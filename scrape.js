var request = require('request');
var cheerio = require('cheerio');

exports.scrapePage = function(url, callback){
    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var json = {};

            if(url.indexOf('89716') != -1 || url.indexOf('62488') != -1) {
                var data = $('table.st.reg tbody tr').last().children();
                json[0]= data.eq(3).text();
                json[1]= data.eq(4).text();
                json[2]= data.eq(5).text();
                json[3]= data.eq(6).text();
                json[4]= data.eq(8).text();
            }
            else {
                var data = $('.sortable.ti tbody tr').last().children();
                json[0]= data.eq(5).text();
                json[1]= data.eq(6).text();
                json[2]= data.eq(8).text();
                json[3]= data.eq(9).text();
                json[4]= data.eq(10).text();
            }
        }
        callback(json);
    })
}