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
            var tr;
            tr = $('<tr/>');
            $.each(json, function (key, data) {
                tr.append("<td>" + data + "</td>");
            });
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
            var tr;
            tr = $('<tr/>');
            $.each(json, function (key, data) {
                tr.append("<td>" + data + "</td>");
            });
            $('#stats-weber tbody').append(tr);
        }
        $('#container-weber .loading').toggleClass('hidden');
        $('#stats-weber').toggleClass('hidden');
    });
});

$(function(){
    $.ajax({
        url: '/team/mtl',
        dataType: 'json',
        cache: false
    }).done(function(json){
        if (!$.isEmptyObject(json)) {
            var nonRegLoss = parseInt(json[2]) + parseInt(json[3]);
            var record = json[0]+'-'+json[1]+'-'+nonRegLoss;
            var points = json[4];
            $('#stats-mtl .record').append(record);
            $('#stats-mtl .points').append(points);
        }
        $('#stats-mtl').toggleClass('hidden');
    });
});

$(function(){
    $.ajax({
        url: '/team/nsh',
        dataType: 'json',
        cache: false
    }).done(function(json){
        if (!$.isEmptyObject(json)) {
            var nonRegLoss = parseInt(json[2]) + parseInt(json[3]);
            var record = json[0]+'-'+json[1]+'-'+nonRegLoss;
            var points = json[4];
            $('#stats-nsh .record').append(record);
            $('#stats-nsh .points').append(points);
        }
        $('#stats-nsh').toggleClass('hidden');
    });
});