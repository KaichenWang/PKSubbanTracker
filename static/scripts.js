$(function(){
    $.ajax({
        url: '/player/pksubban',
        dataType: 'json',
        cache: false
    }).done(function(json){
        if ($.isEmptyObject(json)){
            $('#stats-subban tbody').append("<tr><td class='message' colspan='5'>Update in progress...<br>check back later</td></tr>");
        }
        else {
            var skaters = json.skaterData;
            var data;
            var tr = $('<tr/>');
            for(var i = 0, length = skaters.length; i < length; i++) {
                if(skaters[i].id == '8474056') {
                    data = skaters[i].data;
                }
            }
            data = data.split(',');
            for (var i = 3; i < 8; i++){
                tr.append(  "<td>" + data[i] + "</td>");
            }
            $('#stats-subban tbody').append(tr);
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
            $('#stats-weber tbody').append("<tr><td class='message' colspan='5'>Update in progress...<br>check back later</td></tr>");
        }
        else {
            var skaters = json.skaterData;
            var data;
            var tr = $('<tr/>');
            for(var i = 0, length = skaters.length; i < length; i++) {
                if(skaters[i].id == '8470642') {
                    data = skaters[i].data;
                }
            }
            data = data.split(',');
            for (var i = 3; i < 8; i++){
                tr.append(  "<td>" + data[i] + "</td>");
            }
            $('#stats-weber tbody').append(tr);
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

$(document).ready(function() {
    console.log($('.qp_a:first input').is(":visible"));
    $("#vote-subban").click(function(){
        $('.qp_a:first input').prop("checked", true);
        $('input[name=qp_b857477]').click();
        $('.button.vote').toggleClass('hidden');
        function getData() {
            var percent = $('#qp_rp_0_857477').text();
            if(percent != ''){
                $('#percent-subban').html(percent);
                $('#votes-subban').html($('#qp_rv_0_857477 div').text());
                $('#results-subban').toggleClass('hidden');
            };
            var percent = $('#qp_rp_1_857477').text();
            if(percent != ''){
                $('#percent-weber').html(percent);
                $('#votes-weber').html($('#qp_rv_1_857477 div').text());
                $('#results-weber').toggleClass('hidden');
            };
        }
        setTimeout(getData,500);
    });

    $("#vote-weber").click(function(){
        $('.qp_a:last input').prop("checked", true);
        $('input[name=qp_b857477]').click();
        $('.button.vote').toggleClass('hidden');
        function wait() {
            var percent = $('#qp_rp_0_857477').text();
            if(percent != ''){
                $('#percent-subban').html(percent);
                $('#votes-subban').html($('#qp_rv_0_857477 div').text());
                $('#results-subban').toggleClass('hidden');
            };
            var percent = $('#qp_rp_1_857477').text();
            if(percent != ''){
                $('#percent-weber').html(percent);
                $('#votes-weber').html($('#qp_rv_1_857477 div').text());
                $('#results-weber').toggleClass('hidden');
            };
        }
        setTimeout(wait,500);
    });
});