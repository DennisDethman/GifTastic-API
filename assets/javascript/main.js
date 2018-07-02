var topics = ["Laughing","What the", "Funny", "Dogs", "Cars", "Ouch", "GTR", "Nailed it"];


//*************************************************************************************************************************
//*************************************************************************************************************************

//new button from array

function makeButton() {

    $("#renderedButtons").empty();

    for (var i = 0; i < topics.length; i++) {
        // creates new button and adds class for future reference
        var button = $("<button>");
        button.addClass("theButton");
        button.attr("search", topics[i]);
        button.text(topics[i]);
        $("#renderedButtons").prepend(button);
    }

};

//*************************************************************************************************************************
//*************************************************************************************************************************

//click event to push info to makebutton() function

$(".myButton").on("click", function (event) {
    event.preventDefault(); // stops reset
    var newInput = $("#textInput").val().trim();
    main2();
    topics.push(newInput);
    makeButton();
    $("#textInput").val("");
});

makeButton();


//*************************************************************************************************************************
//*************************************************************************************************************************

// main function for ajax gif grabbing and html 

function main() {

    $(".gifsHere").empty();
    var query = $(this).attr("search");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        query + "&api_key=EN6uyz1vD9DefuxnDyfhRD9X7iEE33K0&limit=12";



    // creates the ajax call for selected theButton
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;

        console.log(results);

        for (var i = 0; i < results.length; i++) {

            var display = $("<div>");
            display.addClass("display");

            var gif = results[i].images.fixed_height.url;
            var image = results[i].images.fixed_height_still.url;

            var gifImage = $('<img class="gifImage">' + '<br>');
            gifImage.attr("src", image);
            gifImage.attr("data-still", image);
            gifImage.attr("data-animate", gif)
            gifImage.attr("data-state", "still");

            var getRating = results[i].rating;

            var rated = $('<p class="rating">').text("Rating: " + getRating);
            
            display.append(rated);
            display.prepend(gifImage);
            
            $(".gifsHere").append(display);

        };

    });

}

//*************************************************************************************************************************
//*************************************************************************************************************************

// main 2 function for ajax gif grabbing and html 

function main2() {
    $(".gifsHere").empty();
    var newInput = $("#textInput").val().trim();
    console.log(newInput);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        newInput + "&api_key=EN6uyz1vD9DefuxnDyfhRD9X7iEE33K0&limit=12";

    // creates the ajax call for selected theButton
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;

        console.log(results);

        for (var i = 0; i < results.length; i++) {

            var display = $("<div>");
            display.addClass("display");

            var gif = results[i].images.fixed_height.url;
            var image = results[i].images.fixed_height_still.url;

            var gifImage = $('<img class="gifImage">' + '<br>');
            gifImage.attr("src", image);
            gifImage.attr("data-still", image);
            gifImage.attr("data-animate", gif)
            gifImage.attr("data-state", "still");

            var getRating = results[i].rating;

            var rated = $('<p class="rating">').text("Rating: " + getRating);
                
            display.append(rated);
            display.prepend(gifImage);
            
            $(".gifsHere").append(display);

        };

    });

}
//*************************************************************************************************************************
//*************************************************************************************************************************

// listener on theButton class to run main function

$(document).on("click", ".theButton", main);
//$(document).keypress("", main);

// click event to toggle animate state

$(document).on("click", ".gifImage", function () {

    var state = $(this).attr("data-state");


    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});