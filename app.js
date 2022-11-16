//  PSEUDOCODE 

// Create a horoscope app object that gives users present-day horoscope (horoApp).

// Letting the user choose their horoscope from a drop down menu holding all 12 astrological signs
// When mouse or keyboards clicks on the 'submit' button, our method (getUserInput) gets the users selection and updates the variable (selection).
// Create a method (horoApp.getHoroscope) that makes API calls using the fetch() method, and is passed the user selection as a parameter (astroSign)
// Then make our Fetch API call
// If our API call is successful, our results (chosen horoscope description) will be displayed on a paragraph element in a 'li', which in turn is in a 'ul' with an id="horoFortune"
// If the user wants to get a horoscope for another astrological sign, the previous horoscope description will clear (("#horoFortune").innerHTML = "";) to make way for the new horoscope description
// If the API call fails, display an error message

// Create an init method (horoApp.init) to get the ball rolling in the set up of the app.
// - calls the local method (getUserInput) after the submit button is clicked after user has chosen astrological sign.




// Namespace object for our app:
const horoApp = {};

// Let's save our api key and the endpoint we want to hit to properties on our namespace object, so that we have them easily available to reference throughout our code:
horoApp.endpoint = `https://aztro.sameerkumar.website/`;

// Method to go get horoscope from aztro API
horoApp.getHoroscope = function (astroSign) {

    // Using the URL() contructor to get a new object back without endpoint url in it. This simplifies it for us to add on things like query parameters
    const url = new URL(horoApp.endpoint);
    // console.log(url);

    // search parameters
    url.search = new URLSearchParams({
        sign: astroSign,
        day: "today",
    });

    //Taking our url object, ready to use full url, including query params, and we're going to use this to call the API using fetch.
    fetch(url, {
        method: 'POST'
    })
        .then(function (response) {
            // After getting API response, a response object is passed to .then's callback function. We then need to parse this object for our JSON data. 
            // console.log(response);
            // To do this we call built-in .json() method into the response object and then return the result of our callback
            // console.log(response.json())
            // We also want to throw an error in case our fetch() call is unsuccessful (i.e. response.ok is false.)
            // To do this we want to skip over running the second .then() and instead have another function execute some error handling behaviour
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(function (jsonData) {
            console.log(jsonData);
            // The parsed JSON data is then received by this .then callback function from the previous .then as its parameter. Now we can use it in this callback like any other object
            // We are targetting the id=horoscope tag and setting the HTML of it to a blank string
            // console.log(jsonData);
            document.querySelector("#horoFortune").innerHTML = "";

            horoApp.displayHoroscope(jsonData);
        })
        // The error is caught here and we pass what was thrown into the .catch() method and an alert will be sent to user depending on the error
        .catch(function (err) {
            // console.log(err);
            if (err.message === "Bad Request") {
                alert("We couldn't find a match for that day! Please choose yesterday, today or tomorrow")
            } else {
                alert("Something went wrong. No idea what. Trying my best")
            }
        });
    // .then() x 2
    // .json()
};


// Create a function to display our horocope to the page
// horoApp.displayHoroscope()
horoApp.displayHoroscope = function (fortune) {
    // console.log(fortune);

    // Create a paragraph element
    const horoscopeDes = document.createElement("p");
    // Add the horoscope description
    horoscopeDes.innerText = fortune.description;
    // console.log(horoscopeDes);
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
    // console.log(horoContainer);
    // Appending the horoContainer li to the ul (by queryselecting selecting its id=horoFortune)
    document.querySelector("#horoFortune").append(horoContainer);

};

// This is the function that will get us the user's input
horoApp.getUserInput = function () {
    // Targeting the id=starSign attribute and assigning it to the 'const selectHoroscope' variable
    // Then want to store the value of the chosen star sign (ie. selectHoroscope.value) in the 'const selection' variable
    // Last, want to call the 'horoApp.getHoroscope' function with 'selection' taken as its argument
    // const selectHoroscope = document.querySelector("#starSign");
    // const selection = selectHoroscope.value;
    // console.log(selection);
    // horoApp.getHoroscope(selection);
    const formEl = document.querySelector('form')
    formEl.addEventListener('submit', (event) => {
        event.preventDefault()
        const userInput = document.querySelector('#starSign').value;
        console.log(userInput);
        // console.log(event);
        horoApp.getHoroscope(userInput);


    });
};
const form = document.querySelector('form')
form.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log(event);
})
// Created our init method
// This is where we will store our code/function that need to run on the page load
horoApp.init = function () {
    horoApp.getUserInput();

    // horoApp.init = function () {
    //     //Create a button element
    //     const button = document.createElement('button');
    //     //Set the text of the button
    //     button.innerText = 'Submit!';
    //     //Add an event listener for the "click" event
    //     document.querySelector('.submit').appendChild(button);
    //     document.querySelector('button').addEventListener('click', () => {
    //         horoApp.getUserInput();
    //     });
    // }
};

// all the init method to get the ball rolling
horoApp.init();
