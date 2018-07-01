


var topics = ["hello" , "funny" , "dogs" , "cars"];


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

$(".myButton").on("click", function(event) {
        event.preventDefault();  // stops reset
        var newInput = $("#textInput").val().trim();
        topics.push(newInput);
        makeButton();
        $("#textInput").val("");
        
        main(newInput);
});

makeButton();   


//*************************************************************************************************************************
//*************************************************************************************************************************

// main function for ajax gif grabbing and html 

function main(input) {
        var query = "";
        if(input) {
            query = input;
        } else {
            query = $(this).attr("search");
        }

        $(".gifsHere").empty();
       
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        query + "&api_key=EN6uyz1vD9DefuxnDyfhRD9X7iEE33K0&limit=10";

        
            
        // creates the ajax call for selected theButton
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {

            var results = response.data;

            console.log(results);

            for (var i = 0; i < results.length; i++) {

                var display = $("<div>");
                    display.addClass("display");
                
                var gif = results[i].images.fixed_height.url;
                var image = results[i].images.fixed_height_still.url;

                var gifImage = $('<img class="gifImage">'+'<br>');
                    gifImage.attr("src", image);
                    gifImage.attr("data-still", image);
                    gifImage.attr("data-animate", gif)
                    gifImage.attr("data-state", "still");

                var getRating = results[i].rating;

                var rated = $('<p class="rating">').text("Rating: " + getRating);

                display.prepend(gifImage);
                display.append(rated);
                $(".gifsHere").append(display);

            };

        });

}


//*************************************************************************************************************************
//*************************************************************************************************************************

// listener on theButton class to run main function

$(document).on("click", ".theButton", main);

// click event to toggle animate state

$(document).on("click" , ".gifImage" , function() {

        var state = $(this).attr("data-state");

    
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
            else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            }
    
});




