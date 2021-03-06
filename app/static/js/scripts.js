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
    if (stats.selectedSeason().isLatest || stats.selectedSeason().id === 'total') {
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

            // Latest season
            var currentA = stats.seasons[0][playerA].votes();
            var currentB = stats.seasons[0][playerB].votes();
            var newCurrent =
                isSubban ?
                    mapPollToObject(currentA.votes + 1, currentB.votes, 0, 0)
                    :
                    mapPollToObject(currentB.votes, currentA.votes + 1, 0, 0);

            stats.seasons[0][playerA].votes(newCurrent[playerA].votes);
            stats.seasons[0][playerB].votes(newCurrent[playerB].votes);

            // Totals
            var index = stats.seasons.length - 1;
            var totalsA = stats.seasons[index][playerA].votes();
            var totalsB = stats.seasons[index][playerB].votes();
            var newTotals =
                isSubban ?
                    mapPollToObject(totalsA.votes + 1, totalsB.votes, 0, 0)
                    :
                    mapPollToObject(totalsB.votes, totalsA.votes + 1, 0, 0);

            stats.seasons[index][playerA].votes(newTotals[playerA].votes);
            stats.seasons[index][playerB].votes(newTotals[playerB].votes);

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
            id : 'r2019',
            name :  'REG. SEASON 2018-2019',
            isLatest: false,
            isPlayoff: false,
            subban : {
                stats: {
                    played: 63,
                    goals: 9,
                    assists: 22,
                    points: 31,
                    plusMinus: 5
                },
                team: {
                    wins: 47,
                    losses: 29,
                    otLosses: 6,
                    points: 100,
                    status: ''
                },
                votes: {
                    votes: 126150,
                    percent: 76
                }
            },
            weber : {
                stats: {
                    played: 58,
                    goals: 14,
                    assists: 19,
                    points: 33,
                    plusMinus: 15
                },
                team: {
                    wins: 44,
                    losses: 30,
                    otLosses: 8,
                    points: 96,
                    status: ''
                },
                votes: {
                    votes: 40605,
                    percent: 24
                }
            }
        },
        {
            id : 'p2018',
            name :  'PLAYOFFS 2018',
            isLatest: false,
            isPlayoff: true,
            subban : {
                stats: {
                    played: 13,
                    goals: 4,
                    assists: 5,
                    points: 9,
                    plusMinus: -2
                },
                team: {
                    wins: 3,
                    losses: 4,
                    otLosses: '',
                    points: '',
                    status: 'Round 2'
                },
                votes: {
                    votes: 179459,
                    percent: 72
                }
            },
            weber : {
                stats: {
                    played: 0,
                    goals: 0,
                    assists: 0,
                    points: 0,
                    plusMinus: 0
                },
                team: {
                    wins: 0,
                    losses: 0,
                    otLosses: '',
                    points: '',
                    status: 'No Playoffs'
                },
                votes: {
                    votes: 70481,
                    percent: 28
                }
            }
        },
        {
            id : 'r2018',
            name :  'REG. SEASON 2017-2018',
            isLatest: false,
            isPlayoff: false,
            subban : {
                stats: {
                    played: 82,
                    goals: 16,
                    assists: 43,
                    points: 59,
                    plusMinus: 18
                },
                team: {
                    wins: 53,
                    losses: 18,
                    otLosses: 11,
                    points: 117,
                    status: ''
                },
                votes: {
                    votes: 106234,
                    percent: 64
                }
            },
            weber : {
                stats: {
                    played: 26,
                    goals: 6,
                    assists: 10,
                    points: 16,
                    plusMinus: -8
                },
                team: {
                    wins: 29,
                    losses: 40,
                    otLosses: 13,
                    points: 71,
                    status: ''
                },
                votes: {
                    votes: 61001,
                    percent: 36
                }
            }
        },
        {
            id : 'p2017',
            name :  'PLAYOFFS 2017',
            isLatest: false,
            isPlayoff: true,
            subban : {
                stats: {
                    played: 22,
                    goals: 2,
                    assists: 10,
                    points: 12,
                    plusMinus: 5
                },
                team: {
                    wins: 2,
                    losses: 4,
                    otLosses: '',
                    points: '',
                    status: 'CUP FINAL'
                },
                votes: {
                    votes: 12271,
                    percent: 64
                }
            },
            weber : {
                stats: {
                    played: 6,
                    goals: 1,
                    assists: 2,
                    points: 3,
                    plusMinus: 1
                },
                team: {
                    wins: 2,
                    losses: 4,
                    otLosses: '',
                    points: '',
                    status: 'Round 1'
                },
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
            isPlayoff: false,
            subban : {
                stats: {
                    played: 66,
                    goals: 10,
                    assists: 30,
                    points: 40,
                    plusMinus: -8
                },
                team: {
                    wins: 41,
                    losses: 29,
                    otLosses: 12,
                    points: 94,
                    status: ''
                },
                votes: {
                    votes: 11433,
                    percent: 20
                }
            },
            weber : {
                stats: {
                    played: 78,
                    goals: 17,
                    assists: 25,
                    points: 42,
                    plusMinus: 20
                },
                team: {
                    wins: 47,
                    losses: 26,
                    otLosses: 9,
                    points: 103,
                    status: ''
                },
                votes: {
                    votes: 45061,
                    percent: 80
                }
            }
        }
    ];
    this.isDataLoaded = ko.observable(false);
    this.selectedSeason = ko.observable();
}

var stats = new StatsModel();

// ko.applyBindings(stats);

var DATA_URL_SUBBAN_REGULAR = 'https://statsapi.web.nhl.com/api/v1/people/8474056/stats?stats=yearByYear';
var DATA_URL_WEBER_REGULAR = DATA_URL_SUBBAN_REGULAR.replace('8474056','8470642');
var DATA_URL_SUBBAN_PLAYOFF = 'https://statsapi.web.nhl.com/api/v1/people/8474056/stats?stats=yearByYearPlayoffs';
var DATA_URL_WEBER_PLAYOFF = DATA_URL_SUBBAN_PLAYOFF.replace('8474056','8470642');
var DATA_URL_LEAGUE = 'https://statsapi.web.nhl.com/api/v1/standings?expand=standings.record,standings.team&season=20182019';
var DATA_URL_POLL = 'https://nhl-tracker-api.now.sh/poll';
var DATA_URL_PLAYOFF_NASH = 'https://statsapi.web.nhl.com/api/v1/schedule?startDate=2019-04-01&endDate=2019-07-01&gameType=P&expand=schedule.game.seriesSummary,seriesSummary.series&teamId=18';
var DATA_URL_PLAYOFF_MONT = DATA_URL_PLAYOFF_NASH.replace('18','8');
var STATS_OFFSET = {
    SUBBAN: {
        played: 246,
        goals: 41,
        assists: 110,
        points: 151,
        plusMinus: 18
    },
    WEBER: {
        played: 168,
        goals: 38,
        assists: 56,
        points: 94,
        plusMinus: 28
    }
};
var POLL_OFFSET = {
    SUBBAN: 435547,
    WEBER: 224018
};

$.when(
    fetch (DATA_URL_SUBBAN_PLAYOFF),
    fetch (DATA_URL_PLAYOFF_NASH),
    fetch (DATA_URL_POLL)
).done(function(a1, a2, a3){
    var pollChoices = a3[0].demand[0].result.answers.answer;
    var votesSubban = pollChoices[0].total;
    var votesWeber = pollChoices[1].total;
    var pollLatest = mapPollToObject(votesSubban, votesWeber, POLL_OFFSET.SUBBAN, POLL_OFFSET.WEBER);
    var pollTotal = mapPollToObject(votesSubban, votesWeber, 0, 0);

    var latest = {
        id : 'r2019',
        name :  'PLAYOFFS 2019',
        isLatest: true,
        isPlayoff: true,
        subban : {
            stats: mapPlayerDataToArray(a1),
            team:  mapLeaguePlayoffDataToObject(a2, 18),
            votes: ko.observable(pollLatest.subban.votes)
        },
        weber : {
            stats: {
                played: 0,
                goals: 0,
                assists: 0,
                points: 0,
                plusMinus: 0
            },
            team: {
                wins: 0,
                losses: 0,
                otLosses: 0,
                points: 0,
                status: 'No Playoffs'
            },
            votes: ko.observable(pollLatest.weber.votes)
        }
    };

    var total = {
        id : 'total',
        name :  'TOTALS SINCE TRADE',
        isLatest: false,
        isPlayoff: false,
        subban : {
            stats: {
                played: latest.subban.stats.played + STATS_OFFSET.SUBBAN.played,
                goals: latest.subban.stats.goals + STATS_OFFSET.SUBBAN.goals,
                assists: latest.subban.stats.assists + STATS_OFFSET.SUBBAN.assists,
                points: latest.subban.stats.points + STATS_OFFSET.SUBBAN.points,
                plusMinus: latest.subban.stats.plusMinus + STATS_OFFSET.SUBBAN.plusMinus
            },
            team: {},
            votes: ko.observable(pollTotal.subban.votes)
        },
        weber : {
            stats: {
                played: latest.weber.stats.played + STATS_OFFSET.WEBER.played,
                goals: latest.weber.stats.goals + STATS_OFFSET.WEBER.goals,
                assists: latest.weber.stats.assists + STATS_OFFSET.WEBER.assists,
                points: latest.weber.stats.points + STATS_OFFSET.WEBER.points,
                plusMinus: latest.weber.stats.plusMinus + STATS_OFFSET.WEBER.plusMinus
            },
            team: {},
            votes: ko.observable(pollTotal.weber.votes)
        }
    };

    stats.seasons.unshift(latest);
    stats.seasons.push(total);
    ko.applyBindings(stats);
    stats.isDataLoaded(true);
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
    var seasons = json[0].stats[0].splits;
    var i = seasons.length - 1;
    var cur = seasons[i];
    while(cur.league.name !== "National Hockey League") {
        cur = seasons[i - 1];
        i--;
    }
    cur = cur.stat;
    return {
        played: cur.games,
        goals: cur.goals,
        assists: cur.assists,
        points: cur.points,
        plusMinus: cur.plusMinus
    };
}

function mapLeagueRegDataToArray (json, confIndex, teamId) {


    var stats = json[0].records[confIndex].teamRecords;
    var teamStats = stats.filter(function(team) {
        return team.team.id === teamId;
    })[0];
    var record = teamStats.leagueRecord;
    return {
        wins: record.wins,
        losses: record.losses,
        otLosses: record.ot,
        points: teamStats.points,
        status: ''
    };
}

function mapPollToObject (votesA, votesB, offsetA, offsetB) {
    var votesSubban = votesA - offsetA;
    var votesWeber = votesB - offsetB;
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

function mapLeaguePlayoffDataToObject (json, teamId) {
    var dates = json[0].dates;
    if (dates.length > 0) {
        var latest = dates[dates.length - 1].games[0].seriesSummary.series;
        var record = {
            wins: 0,
            losses: 0
        };
        latest.matchupTeams.forEach(function(team){
            if (team.team.id === teamId) {
                record = team.seriesRecord;
            }
        });
        return {
            wins: record.wins,
            losses: record.losses,
            otLosses: 0,
            points: 0,
            status: 'Round ' + latest.round.number
        };
    }
    else {
        return {
            wins: 0,
            losses: 0,
            otLosses: 0,
            points: 0,
            status: ''
        };
    }
}