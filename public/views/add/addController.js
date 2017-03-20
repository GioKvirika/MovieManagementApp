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
        data: {
            name: document.getElementById("name").value,
            director: document.getElementById("director").value,
            year: document.getElementById("year").value
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