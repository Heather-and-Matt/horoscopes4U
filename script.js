//  PSEUDOCODE 

// Create a horoscope app that gives users present-day horoscope. 

// Letting the user choose their horoscope from a drop down menu holding all 12 astrological signs
// Eventlistener listening for the user to submit one of the 12 astrological signs
// Store user's choice in a variable
// Pass that variable to our API endpoint
// Then make our fetch call
// Call the API to get back horoscope information based on user's choice
// Display results to the page
// Create new paragraph element and add horoscope info to it
// Clear previous horoscope when user makes another choice



// Namespace object for our app:
const horoApp = {};

// Let's save our api key and the endpoint we want to hit to properties on our namespace object, so that we have them easily available to reference throughout our code:
horoApp.endpoint = `https://aztro.sameerkumar.website/`;

// Method to go get horoscope from aztro
horoApp.displayHoroscope = function (query) {

    // Using the URL() contructor to get a new object back without endpoint url in it. This simplifies it for us to add on things like query parameters
    const url = new URL(horoApp.endpoint);
    console.log(url);

    // search parameters
    url.search = new URLSearchParams({
        sign: "capricorn",
        day: "today",
        q: query
    });

    //Taking our url object, ready to use full url, including query params, and we're going to use this to call the API using fetch.
    fetch(url, {
        method: 'POST'
    })
        .then(function (response) {
            // After getting API response, a response object is passed to .then's callback function. We then need to parse this object for our JSON data. 
            // To do this we call built-in .json() method into the response object and then return the result of our callback
            // console.log(response.json())
            return response.json();
        })
        .then(function (jsonData) {
            // The parsed JSON data is then received by this .then callback function from the previous .then as its parameter. Now we can use it in this callback like any other object
            console.log(jsonData);
        })
}

horoApp.getUserInput = function () {
    horoApp.displayHoroscope();
}

horoApp.init = function () {
    horoApp.getUserInput();
}

// Call the init method to get the ball rolling
horoApp.init();
