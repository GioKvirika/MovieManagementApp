/**
 * Created by giorgim on 3/5/17.
 */


function initEditView()
{
    // Register click handler for the button
    $("button").click(saveClickHandler);

    // Details of movie we want to edit is embedded in URL link,
    // parse its details and show on screen
    var results = parseQuery(window.location.search);
    document.getElementById("name").value = results.name;
    document.getElementById("director").value = results.director;
    document.getElementById("year").value = results.year;
    document.getElementById("_id").value = results._id;

}


function saveClickHandler()
{

    // Send request.
    $.ajax({
        type: 'POST',
        url: '/editmovie',
        data: {
            name: document.getElementById("name").value,
            director: document.getElementById("director").value,
            year: document.getElementById("year").value,
            _id: document.getElementById("_id").value
        },
        success: function(msg){

            // Redirect to main page.
            window.location.href='../../index.html';

        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(textStatus);
        }
    });


}


function parseQuery(qstr) {
    var query = {};
    var a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
    for (var i = 0; i < a.length; i++) {
        var b = a[i].split('=');
        query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
    }
    return query;
}
