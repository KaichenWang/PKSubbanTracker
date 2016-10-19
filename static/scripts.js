

$(function(){
    $.ajax({
        url: '/player/pksubban', //the URL to your node.js server that has data
        dataType: 'json',
        cache: false
    }).done(function(json){
        var tr;
        tr = $('<tr/>');
        $.each(json, function (key, data) {
            tr.append("<td>" + data + "</td>");
        });
        $('#stats-subban tbody').append(tr);
        $('#container-subban .loading').toggleClass('hidden');
        $('#stats-subban').toggleClass('hidden');

    });
});

$(function(){
    $.ajax({
        url: '/player/sheaweber', //the URL to your node.js server that has data
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