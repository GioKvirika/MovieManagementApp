/**
 * Created by giorgim on 3/5/17.
 */

function initAddView()
{
    // Register handler for button click
    $("button").click(saveHandler);
}


function saveHandler()
{
    // Send request to the server
    $.ajax({
        type: 'POST',
        url: '/addnewmovie',

        // Send object created using data from input fields
        data: {
            name: $('#name').val(),
            director: $('#director').val(),
            year: $('#year').val()
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