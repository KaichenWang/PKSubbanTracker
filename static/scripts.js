$(function(){
    $.ajax({
        url: '/player/pksubban',
        dataType: 'json',
        cache: false
    }).done(function(json){
        if ($.isEmptyObject(json)){
            $('#stats-subban tbody').append("<tr><td class='table-message' colspan='5'>Data not found. The NHL is onto us...</td></tr>");
        }
        else {
            var data = json.playerCard["playerCard-row"][0].$;
            var tr = $('<tr/>');
            var length = Object.keys(data).length;
            if (length > 5) {
                for (var i = 2; i <= length; i++) {
                   tr.append("<td>" + data["col_"+i] + "</td>");
                }
                $('#stats-subban tbody').append(tr);
            }
            else {
                $('#stats-subban tbody').append("<tr><td class='table-message' colspan='5'>Data not found. The NHL is onto us...</td></tr>");
            }
        }
        $('#container-subban .loading').toggleClass('hidden');
        $('#stats-subban').toggleClass('hidden');
    });
});

$(function(){
    $.ajax({
        url: '/player/sheaweber',
        dataType: 'json',
        cache: false
    }).done(function(json){
        if ($.isEmptyObject(json)){
            $('#stats-weber tbody').append("<tr><td class='table-message' colspan='5'>Data not found. The NHL is onto us...</td></tr>");
        }
        else {
            var data = json.playerCard["playerCard-row"][0].$;
            var tr = $('<tr/>');
            var length = Object.keys(data).length;
            if (length > 5) {
                for (var i = 2; i <= length; i++) {
                    tr.append("<td>" + data["col_"+i] + "</td>");
                }
                $('#stats-weber tbody').append(tr);
            }
            else {
                $('#stats-weber tbody').append("<tr><td class='table-message' colspan='5'>Data not found. The NHL is onto us...</td></tr>");
            }
        }
        $('#container-weber .loading').toggleClass('hidden');
        $('#stats-weber').toggleClass('hidden');
    });
});

$(function(){
    $.ajax({
        url: '/team',
        dataType: 'json',
        cache: false
    }).done(function(json){
        if (!$.isEmptyObject(json)) {
            var teams = json.standings['info-teams'][0]['team-standing'];
            var dataMTL, dataNSH;
            for (var i = 0, length = teams.length; i < length; i++) {
                if (teams[i].$.id == '13') {
                    dataMTL = teams[i].$;
                }
                else if (teams[i].$.id == '19') {
                    dataNSH = teams[i].$;
                }
            }
            var record = dataMTL.wins + '-' + dataMTL.losses + '-' + dataMTL.overtime;
            var points = dataMTL.points;
            $('#stats-mtl .record').append(record);
            $('#stats-mtl .points').append(points);

            record = dataNSH.wins + '-' + dataNSH.losses + '-' + dataNSH.overtime;
            points = dataNSH.points;

            $('#stats-nsh .record').append(record);
            $('#stats-nsh .points').append(points);

            $('#stats-mtl').toggleClass('hidden');
            $('#stats-nsh').toggleClass('hidden');
        }
    });
});

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