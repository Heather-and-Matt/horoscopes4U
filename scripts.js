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
horoApp.getHoroscope = function (query) {

    // Using the URL() contructor to get a new object back without endpoint url in it. This simplifies it for us to add on things like query parameters
    const url = new URL(horoApp.endpoint);
    // console.log(url);

    // search parameters
    url.search = new URLSearchParams({
        sign: query,
        day: "today",
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
            // We are targetting the id=horoscope tag and setting the HTML of it to a blank string
            // console.log(jsonData);
            document.querySelector("#horoFortune").innerHTML = "";

            horoApp.displayHoroscope(jsonData);



            // some test code
            // const horoscope = jsonData.description;

            // const paragraphAries = document.querySelector('p.aries');
            // paragraphAries.innerHTML = `${horoscope}`;
            // console.log(horoscope);
        })
    // .then() x 2
    // .json()
}


// Create a function to display our horocope to the page
// horoApp.displayHoroscope()
horoApp.displayHoroscope = function (fortune) {
    console.log(fortune);

    // Create a paragraph element
    const horoscopeDes = document.createElement("p");
    // Add the horoscope description
    horoscopeDes.innerText = fortune.description;
    console.log(horoscopeDes);
    // Add the horoscope lucky numbers
    // const horoscopeNum = document.createElement("p");
    // horoscopeNum.innerText = fortune.lucky_number;
    // console.log(horoscopeNum);
    //creating li container
    const horoContainer = document.createElement("li");
    // Creating a class on the li element
    horoContainer.classList.add("fortune");
    // Adding the p to the li
    horoContainer.appendChild(horoscopeDes);
    // horoContainer.appendChild(horoscopeNum);
    console.log(horoContainer);
    // Appending the horoContainer li to the ul (by queryselecting selecting its id=horoFortune)
    document.querySelector("#horoFortune").append(horoContainer);

};

// This is the function that will get us the user's input
horoApp.getUserInput = function () {
    document.querySelector("#starSign").addEventListener("change", function () {
        const selection = this.value;
        console.log(selection);
        horoApp.getHoroscope(selection);
    })
}

horoApp.init = function () {
    // horoApp.getHoroscope();
    horoApp.getUserInput();
}

// Call the init method to get the ball rolling
horoApp.init();
