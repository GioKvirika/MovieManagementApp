/**
 * Created by giorgim on 3/5/17.
 */


function initListView() {

    // This will contain HTML for the table body.
    var tableRows = "";

    // First remove all rows, if there are any, from the table body.
    $("#movies tbody tr").remove();

    // Get all movies from the server.
    $.get("/listofmovies", function(data, status){

        var movies = JSON.parse(data);

        // Generate HTML for each table row.
        $.each(movies, function (i, movie) {
            tableRows += "<tr><td>" + movie.name + "</td><td>" + movie.director + "</td><td>" + movie.year + "</td>" +
                "<td><button id=d" + movie._id + " style='margin-right: 10px' onclick='deleteClick(this)'  class='btn btn-danger'> Delete </button>" +
                "<button id=e" + movie._id + " onclick='editClick(this)' class='btn btn-primary'> Edit </button></td>"
        });

        // Append above HTML to the table body.
        $(tableRows).appendTo("#movies tbody");

    });

}


function deleteClick(param) {

    // Get ID of element clicked
    var id = param.getAttribute("id").substr(1);

    // Delete movie with that ID
    $.get("/deletemovie/"+id, function(data, status) {

        // Refresh this page.
        initListView();
    });


}


function editClick(param) {

    // Get ID of item clicked
    var id = param.getAttribute("id").substr(1);


    // Get details of movie with this ID.
    $.get("/listofmovies/"+id, function(data, status) {

        var movie = JSON.parse(data);

        // Generate query string for movie we want to edit.
        var query = jQuery.param({_id: id, name: movie.name, director: movie.director, year: movie.year});

        // Redirect user to an edit page and pass along the query string in the URL.
        window.location.href = '../edit/edit.html?' + query;
    });




}


