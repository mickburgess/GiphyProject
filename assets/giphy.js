$(document).ready(function() {
  var topics = [
    "dumplings",
    "lasagna",
    "pho",
    "burgers",
    "lay's chips",
    "bacon",
    "pizza"
  ]

var queryURL = "https://api.giphy.com/v1/gifs/search?";

  // for loop that creates a button for each item in the array
  for (var i = 0; i < topics.length; i++) {
    // create buttons with Jquery
    var foodButton = $("<button>");
    // add value that will add a topic string to each button
    foodButton.attr("data-name", topics[i]);
    foodButton.addClass("food");
    foodButton.text(topics[i]);
    console.log(topics[i]);
    // append the new buttons to the food button div
    $("#foodButtons").append(foodButton);
  }

});
