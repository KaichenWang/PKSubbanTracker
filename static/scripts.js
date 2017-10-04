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

// Stats

function StatsModel() {
    this.seasons = [
        {
            id : 'p2017',
            name :  'PLAYOFFS 2017',
            subban : {
                stats: [22,2,10,12,5],
                team: ['2-4', 'CUP FINAL']
            },
            weber : {
                stats: [6,1,2,3,1],
                team: ['2-4', '1ST RND']
            }
        },
        {
            id : 'r2016',
            name :  'REG. SEASON 2016-2017',
            subban : {
                stats: [66,10,30,40,-8],
                team: ['41-29-12', '94 PTS']
            },
            weber : {
                stats: [78,17,25,42,20],
                team: ['47-26-9', '103 PTS']
            }
        }
    ];
    this.selectedSeason = ko.observable();
}

var dataLoaded = 0;
var stats = new StatsModel();

ko.applyBindings(stats);

// var DATA_URL_SUBBAN_REGULAR = 'https://statsapi.web.nhl.com/api/v1/people/8474056?expand=person.stats&stats=yearByYear&site=en_nhlCA';
// var DATA_URL_WEBER_REGULAR = DATA_URL_SUBBAN_REGULAR.replace('8474056','8470642');
// var DATA_URL_SUBBAN_PLAYOFF = 'https://statsapi.web.nhl.com/api/v1/people/8474056/stats?stats=yearByYearPlayoffs&site=en_nhlCA';
// var DATA_URL_WEBER_PLAYOFF = DATA_URL_SUBBAN_PLAYOFF.replace('8474056','8470642');
//
// $.when(
//     fetch (DATA_URL_SUBBAN_REGULAR),
//     fetch (DATA_URL_WEBER_REGULAR)
// ).done(function(a1, a2){
//     stats.seasons[0].subban.stats = mapPlayerDataToArray(a1);
//     stats.seasons[0].weber.stats = mapPlayerDataToArray(a2);
//     ko.applyBindings(stats);
// });

// Helpers

function fetch (url) {
    return $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json'
    });
}

function mapPlayerDataToArray (json) {
    var seasons = json[0].people[0].stats[0].splits;
    var i = seasons.length - 1;
    var cur = seasons[i];
    while(cur.league.name !== "National Hockey League") {
        cur = seasons[i - 1];
        i--;
    }
    cur = cur.stat;
    return [
        cur.games,
        cur.goals,
        cur.assists,
        cur.points,
        cur.plusMinus
    ]
}