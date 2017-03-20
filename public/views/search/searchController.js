/**
 * Created by giorgim on 3/9/17.
 */
function initSearch()
{
    // Register handler for button click
    $("button").click(searchHandler);
}

// Create empty search object.
var searchMovie = {};

function searchHandler()
{
    // Set values for the search movie object.
    searchMovie.name = document.getElementById("name").value;
    searchMovie.director = document.getElementById("director").value;
    searchMovie.year = document.getElementById("year").value;

    // Send request to the server
    $.ajax({
        type: 'POST',
        url: '/searchmovies',
        data: searchMovie,
        success: function(movies){

            var tableRows = "";

            $("#movies tbody tr").remove();

            // Generate HTML for each table row.
            $.each(movies, function (i, movie) {
                tableRows += "<tr><td>" + movie.name + "</td><td>" + movie.director + "</td><td>" + movie.year + "</td>" +
                    "<td><button id=d" + movie._id + " style='margin-right: 10px' onclick='deleteClick(this)'  class='btn btn-danger'> Delete </button>" +
                    "<button id=e" + movie._id + " onclick='editClick(this)' class='btn btn-primary'> Edit </button></td>"
            });

            $(tableRows).appendTo("#movies tbody");

        }
    });

}



function deleteClick(param) {

    // id of element clicked
    var id = param.getAttribute("id").substr(1);

    // Delete movie with some ID
    $.get("/deletemovie/"+id, function(data, status) {

        // Refresh this page using cached search object.
        searchHandler();
    });



}

function editClick(param) {

    // Get ID of item clicked
    var id = param.getAttribute("id").substr(1);


    // Get details of movie with this ID.
    $.get("/listofmovies/" + id, function(data, status) {
        var movie = JSON.parse(data);

        // Generate query string for movie we want to edit.
        var query = jQuery.param({_id: id, name: movie.name, director: movie.director, year: movie.year});

        // Redirect user to an edit page and pass along the query string in the URL.
        window.location.href = '../edit/edit.html?' + query;
    });

}




