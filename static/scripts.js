/*
 * Messages
 */

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


/*
 * Poll
 */

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

function onClickVote (model, e) {
    if (stats.selectedSeason().isLatest) {
        if(canVote) {
            canVote = false;

            var playerA = $(e.srcElement).closest('.container').data('player');
            var isSubban = playerA === 'subban';
            var playerB = isSubban ? 'weber' : 'subban';
            var playerAFullName = isSubban ? 'P.K. Subban' : 'Shea Weber'

            if (isSubban) {
                $('#PDI_answer43654459').prop("checked", true);
            } else {
                $('#PDI_answer43654460').prop("checked", true);
            }

            PD_prevote9559362(1);

            var currentA = stats.seasons[0][playerA].votes();
            var currentB = stats.seasons[0][playerB].votes();
            var votesA = currentA.votes + 1;
            var percentA = Math.round((votesA / (votesA + currentB.votes) * 100).toFixed(2));

            var newA = {
                votes: votesA,
                percent: percentA
            }

            var newB = {
                votes: currentB.votes,
                percent: 100 - percentA
            }

            stats.seasons[0][playerA].votes(newA);
            stats.seasons[0][playerB].votes(newB);

            showMessage('success', '+1 vote for ' + playerAFullName);
        }
        else {
            showMessage('error', "Sorry, you've already voted");
        }
    }
    else {
        showMessage('error', 'Voting has ended for ' + stats.selectedSeason().name);
    }
}


/*
 * Comments
 */

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


/*
 * Stats
 */

function StatsModel() {
    this.seasons = [
        {
            id : 'p2017',
            name :  'PLAYOFFS 2017',
            isLatest: false,
            subban : {
                stats: [22,2,10,12,5],
                team: ['2-4', 'CUP FINAL'],
                votes: {
                    votes: 12271,
                    percent: 64
                }
            },
            weber : {
                stats: [6,1,2,3,1],
                team: ['2-4', '1ST RND'],
                votes: {
                    votes: 6870,
                    percent: 36
                }
            }
        },
        {
            id : 'r2016',
            name :  'REG. SEASON 2016-2017',
            isLatest: false,
            subban : {
                stats: [66,10,30,40,-8],
                team: ['41-29-12', '94 PTS'],
                votes: {
                    votes: 11433,
                    percent: 20
                }
            },
            weber : {
                stats: [78,17,25,42,20],
                team: ['47-26-9', '103 PTS'],
                votes: {
                    votes: 45061,
                    percent: 80
                }
            }
        }
    ];
    this.selectedSeason = ko.observable();
}

var stats = new StatsModel();

// ko.applyBindings(stats);

var DATA_URL_SUBBAN_REGULAR = 'https://statsapi.web.nhl.com/api/v1/people/8474056?expand=person.stats&stats=yearByYear&site=en_nhlCA';
var DATA_URL_WEBER_REGULAR = DATA_URL_SUBBAN_REGULAR.replace('8474056','8470642');
var DATA_URL_SUBBAN_PLAYOFF = 'https://statsapi.web.nhl.com/api/v1/people/8474056/stats?stats=yearByYearPlayoffs&site=en_nhlCA';
var DATA_URL_WEBER_PLAYOFF = DATA_URL_SUBBAN_PLAYOFF.replace('8474056','8470642');
var DATA_URL_LEAGUE = 'https://statsapi.web.nhl.com/api/v1/standings?expand=standings.record,standings.team&season=20172018'
var DATA_URL_POLL = '/poll'
var POLL_OFFSET = {
    SUBBAN: 23704,
    WEBER: 51931
}

$.when(
    fetch (DATA_URL_SUBBAN_REGULAR),
    fetch (DATA_URL_WEBER_REGULAR),
    fetch (DATA_URL_LEAGUE),
    fetch (DATA_URL_POLL)
).done(function(a1, a2, a3, a4){
    var poll = mapPollToObject(a4);

    var latest = {
        id : 'r2018',
        name :  'REG. SEASON 2017-2018',
        isLatest: true,
        subban : {
            stats: mapPlayerDataToArray(a1),
            team: mapLeagueRegDataToArray(a3, 2, 6),
            votes: ko.observable(poll.subban.votes)
        },
        weber : {
            stats: mapPlayerDataToArray(a2),
            team: mapLeagueRegDataToArray(a3, 1, 6),
            votes: ko.observable(poll.weber.votes)
        }
    };

    stats.seasons.unshift(latest);
    ko.applyBindings(stats);
});

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

function mapLeagueRegDataToArray (json, confIndex, teamIndex) {
    var stats = json[0].records[confIndex].teamRecords[teamIndex];
    var record = stats.leagueRecord;
    return [record.wins + '-' + record.losses + '-' + record.ot, stats.points + ' PTS'];
}

function mapPollToObject (json) {
    var choices = json[0].demand[0].result.answers.answer;
    var votesSubban = choices[0].total - POLL_OFFSET.SUBBAN;
    var votesWeber = choices[1].total - POLL_OFFSET.WEBER;
    var percentSubban = votesSubban / (votesSubban + votesWeber) * 100;
    percentSubban = Math.round(percentSubban.toFixed(2));

    return {
        subban: {
            votes: {
                votes: votesSubban,
                percent: percentSubban
            }
        },
        weber: {
            votes: {
                votes: votesWeber,
                percent: 100 - percentSubban
            }
        }
    }
}