var getPollResults = function() {
    $.ajax({
        url: '/poll',
        dataType: 'json',
        cache: false
    }).done(function(json){
        if (!$.isEmptyObject(json)) {
            var choices = json.demand[0].result.answers.answer;
            var votesSubban = choices[0].total;
            var percentSubban = choices[0].percent;
            percentSubban = Math.round(percentSubban.toFixed(2));
            var votesWeber = choices[1].total;
            $('#percent-subban').html(percentSubban);
            $('#votes-subban').html(votesSubban);
            $('#percent-weber').html(100 - percentSubban);
            $('#votes-weber').html(votesWeber);
        }
    });
}
getPollResults();

var messageIsVisible = false;

var showMessage = function(msgClass, msg) {
    $('.wrapper').animate({
        scrollTop: 0
    }, 200);
    if(!messageIsVisible) {
        messageIsVisible = true;
        $('.message').toggleClass(msgClass);
        $('.message h4').text(msg);
        $('.message').toggleClass('show');
        function wait() {
            $('.message').toggleClass('show');
            $('.message').toggleClass(msgClass)
            $('.message h4').text('');
            messageIsVisible = false;
        }
        setTimeout(wait, 2000);
    }
}

var canVote;
function checkCookie() {
    var status = '';
    if (document.cookie && document.cookie.indexOf('PD_poll_9559362') != -1) {
        canVote = false;
    } else {
        canVote = true;
    }
}
checkCookie();

var commentClickable = true;
$(".trigger-comments").click(function() {
    var trigger = $(this);
    if (commentClickable) {
        commentClickable = false;
        if (trigger.is('#close-comments')) {
            function wait() {
                $('#page-1').addClass('hidden');
            }
            setTimeout(wait, 500);
        }
        else {
            $('#page-1').removeClass('hidden');
        }
        $('#page-1').toggleClass('slide-in');
        $('#page-1').toggleClass('slide-out');
        commentClickable = true;
    }
});

$(document).ready(function() {
    $("#vote-subban").click(function(){
        if(canVote) {
            canVote = false;
            $('#PDI_answer43654459').prop("checked", true);
            PD_prevote9559362(1);
            var votesSubban = parseInt($('#votes-subban').text()) + 1;
            var votesWeber = parseInt($('#votes-weber').text());
            var percentWeber = Math.round((votesWeber/(votesWeber+votesSubban))*100);
            var percentSubban = 100 - percentWeber;
            $('#votes-subban').text(votesSubban);
            $('#votes-weber').text(votesWeber);
            $('#percent-subban').text(percentSubban);
            $('#percent-weber').text(percentWeber);
            showMessage('success', '+1 vote for PK Subban');
        }
        else {
            showMessage('error', "Sorry, you've already voted");
        }
    });

    $("#vote-weber").click(function(){
        if(canVote) {
            canVote = false;
            $('#PDI_answer43654460').prop("checked", true);
            PD_prevote9559362(1);
            var votesSubban = parseInt($('#votes-subban').text());
            var votesWeber = parseInt($('#votes-weber').text()) + 1;
            var percentWeber = Math.round((votesWeber/(votesWeber+votesSubban))*100);
            var percentSubban = 100 - percentWeber;
            $('#votes-subban').text(votesSubban);
            $('#votes-weber').text(votesWeber);
            $('#percent-subban').text(percentSubban);
            $('#percent-weber').text(percentWeber);
            showMessage('success', '+1 vote for Shea Weber');
        }
        else {
            showMessage('error', "Sorry, you've already voted");
        }
    });
});


function mapStatsToArray (object) {
    var array = [];
    for (var key in object) {
        if (key !== 'col_1') {
            array.push(object[key]);
        }
    }
    return array;
}

function parseData (json) {
    var playerData = [
        {
            id: 'p2017',
            data: mapStatsToArray(json.playerCard["playerCard-row"][1].$)
        },
        {
            id: 'r2016',
            data: mapStatsToArray(json.playerCard["playerCard-row"][0].$)
        }
    ]
    return playerData;
}

function StatsModel() {
    this.seasons = [
        {
            id : 'p2017',
            name :  'PLAYOFFS 2017',
            subban : {
                stats: [],
                team: ['1-0', '1ST RND']
            },
            weber : {
                stats: [],
                team: ['1-1', '1ST RND']
            }
        },
        {
            id : 'r2016',
            name :  'REG. SEASON 2016-2017',
            subban : {
                stats: [],
                team: ['41-29-12', '94 PTS']
            },
            weber : {
                stats: [],
                team: ['47-26-9', '103 PTS']
            }
        }
    ];
    this.selectedSeason = ko.observable();
}

var dataLoaded = false;
var stats = new StatsModel();

$(function(){
    $.ajax({
        url: '/player/pksubban',
        dataType: 'json',
        cache: false
    }).done(function(json){
        var playerData = parseData(json);
        stats.seasons[0].subban.stats=playerData[0].data;
        stats.seasons[1].subban.stats=playerData[1].data;
        if (dataLoaded) {
            ko.applyBindings(stats);
        }
        else {
            dataLoaded = true;
        }
    });
});

$(function(){
    $.ajax({
        url: '/player/sheaweber',
        dataType: 'json',
        cache: false
    }).done(function(json){
        var playerData = parseData(json);
        stats.seasons[0].weber.stats=playerData[0].data;
        stats.seasons[1].weber.stats=playerData[1].data;
        if (dataLoaded) {
            ko.applyBindings(stats);
        }
        else {
            dataLoaded = true;
        }
    });
});


// function Data () {
//     var self = this;
//
//     self.seasons = [{}];
//     self.selectedSeason = '';
//
//     return self;
// }
//
// var dataModel = ko.mapping.fromJS(new Data());

