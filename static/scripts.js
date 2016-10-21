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