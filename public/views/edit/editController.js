/**
 * Created by giorgim on 3/5/17.
 */


function initEditView()
{
    // Register click handler for the button
    $("button").click(saveClickHandler);

    // Details of movie we want to edit is embedded in URL link, parse it
    var results = parseQuery(window.location.search);

    // Show movie details now on the screen
    $('#name').val(results.name);
    $('#director').val(results.director);
    $('#year').val(results.year);
    $('#_id').val(results._id);

}


function saveClickHandler()
{

    // Send request.
    $.ajax({
        type: 'POST',
        url: '/editmovie',

        // Send object created using data from input fields
        data: {
            name: $('#name').val(),
            director: $('#director').val(),
            year: $('#year').val(),
            _id: $('#_id').val(),
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
