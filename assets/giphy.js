$(document).ready(function () {
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
    "Leon Bridges",
    "Portugal. The Man"
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
      artistButton.attr("type", "button");
      artistButton.addClass("btn btn-primary");
      artistButton.addClass("artist");
      artistButton.text(topics[i]);
      console.log(topics[i]);
      // append the new buttons to the food button div
      $("#artistButtons").append(artistButton);
    }
  };

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

    $("#artist").empty();

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        console.log(response);
        // storing response
        var results = response.data;
        // looping over response to create divs to display response
        for (var j = 0; j < results.length; j++) {
          // create and storing divs
          var giphyDiv = $("<div>").addClass("giphyDiv");
          // create a p tag that contains the rating text for each artist
          var rating = $("<p>").text("Rating: " + results[j].rating);
          // create an image tag to hold our giphy
          var giphyImg = $("<img>").addClass("images", "img-fluid");
          // store still images for each giphy
          var giphyStill = results[j].images.fixed_height_still.url;
          // add giphyStill as an attribute
          giphyImg.attr("giphystill", giphyStill);
          // store active images for each giphy
          var giphyActive = results[j].images.fixed_height.url;
          // add giphyActive as an attribute
          giphyImg.attr("giphyactive", giphyActive);
          // add attribute that can be switched depending on if image is moving or not
          giphyImg.attr("giphy-state", "still");
          // add each still image to a img tag
          giphyImg.attr("src", giphyStill);
          // add the rating and image to the giphyDiv
          giphyDiv.append(rating);
          giphyDiv.append(giphyImg);
          // add giphyDiv below the buttons
          $("#artist").prepend(giphyDiv);
        };
      });
  };

  $(document).on("click", ".images", function () {
    var state = $(this).attr("giphy-state");
    console.log(state);
    var active = $(this).attr("giphyActive");
    var still = $(this).attr("giphyStill");

    if (state === "still") {
      $(this).attr("src", active);
      $(this).attr("giphy-state", "active");
    }
    else {
      $(this).attr("src", still);
      $(this).attr("giphy-state", "still");
    }
  });

  renderButtons();

  $(document).on("click", ".artist", displayGiphy);

  $(document).on("click", "#addArtist", function (event) {
    event.preventDefault();

    var addArtist = $("#artist-input").val().trim();
    console.log(addArtist);
    topics.push(addArtist);
    console.log(topics);
    renderButtons();
    $("#artist-input").val("");
  });

});
