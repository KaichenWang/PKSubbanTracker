var weberStats = {};
var subbanStats = {};
var montrealStats = [
    {
        record: '',
        points: ''
    },
    {
        record: '',
        points: ''
    }
];
var nashvilleStats = [
    {
        record: '',
        points: ''
    },
    {
        record: '',
        points: ''
    }
];

function updateTable (data, $container) {
    var $loader = $container.find('.loading');
    var $table = $container.find('table.stats');

    // show loader, hide current table row
    $loader.removeClass('hidden');
    $table .addClass('hidden');

    // create new table row
    var $tr = $('<tr/>')
    var length = 0;
    try {
        length = Object.keys(data).length;
    }
    catch(err) {
        console.log(err.message);
    }

    if (length > 5) {
        for (var i = 2; i <= length; i++) {
            $tr.append("<td>" + data["col_"+i] + "</td>");
        }
    }
    else {
        $tr.append('<td class="table-message" colspan="5">Data not found. The NHL is onto us...</td>');
    }

    // replace current tbody contents with new tr
    $table.find('tbody').html($tr);

    // hide loader, show updated table row
    $loader.addClass('hidden');
    $table.removeClass('hidden');
};

function updateTeam (data, $container) {
    $container.find('.record').text(data.record);
    $container.find('.status').text(data.points);
};


$(function(){
    var $container = $('#container-subban');

    $.ajax({
        url: '/player/pksubban',
        dataType: 'json',
        cache: false
    }).done(function(json){
        if ($.isEmptyObject(json)){
            updateTable({}, $container);
        }
        else {
            subbanStats = json;
            updateTable(subbanStats[1], $container);
        }
    });
});

$(function(){
    var $container = $('#container-weber');

    $.ajax({
        url: '/player/sheaweber',
        dataType: 'json',
        cache: false
    }).done(function(json){
        if ($.isEmptyObject(json)){
            updateTable({}, $container);
        }
        else {
            weberStats = json;
            updateTable(weberStats[1], $container);
        }
    });
});

$(function(){
    $.ajax({
        url: '/team',
        dataType: 'json',
        cache: false
    }).done(function(json){
        if (!$.isEmptyObject(json)) {
            var teams = json.r2016.standings['info-teams'][0]['team-standing'];
            var dataMTL, dataNSH;
            for (var i = 0, length = teams.length; i < length; i++) {
                if (teams[i].$.id == '13') {
                    dataMTL = teams[i].$;
                }
                else if (teams[i].$.id == '19') {
                    dataNSH = teams[i].$;
                }
            }
            montrealStats[0].record = dataMTL.wins + '-' + dataMTL.losses + '-' + dataMTL.overtime;
            montrealStats[0].points = dataMTL.points;

            montrealStats[1].record = json.p2017.mtl.record;
            montrealStats[1].points = json.p2017.mtl.round;

            nashvilleStats[0].record = dataNSH.wins + '-' + dataNSH.losses + '-' + dataNSH.overtime;
            nashvilleStats[0].points = dataNSH.points;

            nashvilleStats[1].record = json.p2017.nsh.record;
            nashvilleStats[1].points = json.p2017.nsh.round;

            var $montrealContainer = $('#stats-mtl');
            var $nashvilleContainer = $('#stats-nsh');

            updateTeam(montrealStats[0], $montrealContainer);
            updateTeam(nashvilleStats[0], $nashvilleContainer);

            $montrealContainer.toggleClass('hidden');
            $nashvilleContainer.toggleClass('hidden');
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

$('.select-season').change(function() {
    var $containerSubban = $('#container-subban');
    var $containerWeber = $('#container-weber');
    var $montrealContainer = $('#stats-mtl');
    var $nashvilleContainer = $('#stats-nsh');

    var val = $(this).val();
    if (val === 'p2017') {
        updateTable(subbanStats[0], $containerSubban);
        updateTable(weberStats[0], $containerWeber);
        updateTeam(montrealStats[1], $montrealContainer);
        updateTeam(nashvilleStats[1], $nashvilleContainer);
    }
    else if (val === 'r2016') {
        updateTable(subbanStats[1], $containerSubban);
        updateTable(weberStats[1], $containerWeber);
        updateTeam(montrealStats[0], $montrealContainer);
        updateTeam(nashvilleStats[0], $nashvilleContainer);
    }
});
