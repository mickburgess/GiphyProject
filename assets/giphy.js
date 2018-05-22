$(document).ready(function() {
  var topics = [
    "Young the Giant",
    "Talib Kweli",
    "Mos Def",
    "Common",
    "Of Monsters and Men",
    "Foster the People",
    "Lumineers",
    "Bill Withers",
    "Nathaniel Rateliff",
    "SylvanEsso",
    "Leon Bridges"
  ]

var queryURL = "https://api.giphy.com/v1/gifs/search?";

function renderButtons() {
  // clears the div before adding buttons, so you don't get duplicates
  $("#artistButtons").empty();
  
  // for loop that creates a button for each item in the array
  for (var i = 0; i < topics.length; i++) {
    // create buttons with Jquery
    var artistButton = $("<button>");
    // add value that will add a topic string to each button
    artistButton.attr("data-name", topics[i]);
    artistButton.addClass("artist");
    artistButton.text(topics[i]);
    console.log(topics[i]);
    // append the new buttons to the food button div
    $("#artistButtons").append(artistButton);
  }
}

function displayGiphy() {
  var giphy = $(this).attr("data-name");
  // URL to query the Giphy API
  var apiURL = "https://api.giphy.com/v1/gifs/search?";

  // Object to contain API call's query parameters
  var queryParams = {
    "api_key": "176gKI3hzxNTBeTaEBFOHj1tvmStqOWO"
  };

  // Add the data-name for button clicked as a search input to the queryParams object
  queryParams.q = giphy;

  // Add limit queryParam 
  queryParams.limit = 10;

  // Add rating queryParam
  queryParams.rating = "PG"

  var queryURL = apiURL + $.param(queryParams);
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {
    console.log(response);
    // storing response
    var results = response.data;
    // looping over response to create divs to display response
    for (var j = 0; j < results.length; j++) {
      // create and storing divs
      var giphyDiv = $("<div>");
      // create a p tag that contains the rating text for each artist
      var rating = $("<p>").text("Rating: " + results[j].rating);
      console.log("rating", rating);
      // create an image tag to hold our giphy
      var giphyImg = $("<img>");
      // add an image source
      giphyImg.attr("src", results[j].images.fixed_height_still.url);
      console.log("giphyImg", giphyImg);
      // add the rating and image to the giphyDiv
      giphyDiv.append(rating);
      giphyDiv.append(giphyImg);
      // add giphyDiv below the buttons
      $("#artist").prepend(giphyDiv);

    }
  })
}

renderButtons();

$(document).on("click", ".artist", displayGiphy);

});
