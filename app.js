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
            // console.log(jsonData);
            // The parsed JSON data is then received by this .then callback function from the previous .then as its parameter. Now we can use it in this callback function like any other object

            // We are targetting the id=horoFortune tag and setting the HTML of it to a blank string so that the horoscope description for a chosen zodiac sign disappears when another zodiac sign is chosen and submit button is clicked
            document.querySelector("#horoFortune").innerHTML = "";
            // JSON data is taken in as a parameter in the horoApp.displayHoroscope function
            horoApp.displayHoroscope(jsonData);
            // Also want to clear out the text from what gets displayed on the page if the user wants to look at the other options associated with each zodiac sign
            document.querySelector("#horoOptions").innerHTML = "";


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
};


// Create a function to display our horocope to the page that takes in 'fortune' as its parameter
horoApp.displayHoroscope = function (fortune) {
    // Create a paragraph element
    const horoscopeDes = document.createElement("p");
    horoscopeDes.classList.add("fortuneP");
    // Add the horoscope description
    horoscopeDes.innerText = fortune.description;
    //creating li container
    const horoContainer = document.createElement("li");
    // Creating a class on the li element called .fortune
    horoContainer.classList.add("fortune");
    // Adding the p to the li
    horoContainer.appendChild(horoscopeDes);
    // Appending the horoContainer li to the ul (by queryselecting selecting its id=horoFortune tag)
    document.querySelector("#horoFortune").append(horoContainer);
    // Now that we have everything we need for displaying our chosen horoscope on the page, let's call the function horoApp.getuserFormOptions, using 'fortune' as its parameter so that function has the JSON objects from the API call
    horoApp.getUserFormOptions(fortune);

};
// Create a function to display the other options associated with each zodiac sign that is totally optional to the user, but can only be accessed if the user choses and submits a zodiac sign first
horoApp.getUserFormOptions = function (horoscopeChoice) {
    // Submit button for the other horoscope options is now enabled now that the user has properly chosen a zodiac sign and clicked the submit button
    function enableOptsBtn() {
        document.querySelector('#optsBtn').disabled = false;
    }
    enableOptsBtn();
    // Targeting the id=formOptions attribute and assigning it to the 'const formOptions' variable
    const formOptions = document.querySelector('#formOptions')
    formOptions.addEventListener("submit", (event) => {
        // Registering 'formOptions' to listen for a particular event (submit) by attaching an 'addEventListener' method.
        // Want to prevent a new page request when we submit by using the 'preventDefault()' function
        // User's choice of their zodiac sign options value is assigned to the 'userOptionsInput' variable
        event.preventDefault();
        const userOptionsInput = document.querySelector("#starMood").value;
        // Create a paragraph element
        const horoscopeOption = document.createElement("p");
        // Adding a class of .otherP to the paragraph element
        horoscopeOption.classList.add("otherP");
        // Adding the chosen horoscope to the paragraph element
        horoscopeOption.innerText = horoscopeChoice[userOptionsInput];
        // Creating a 'li' container
        const optionContainer = document.createElement("li");
        // Creating a class on the 'li' element called .fortuneOption
        optionContainer.classList.add("fortuneOption");
        // Adding the 'p' to the 'li'
        optionContainer.appendChild(horoscopeOption);
        // Also want to clear out the text from what gets displayed on the page if the user wants to look at the other options associated with each zodiac sign
        document.querySelector("#horoOptions").innerHTML = "";
        // Appending the 'li' to the 'ul' (by queryselecting it's 'id=horoOptions tag) 
        document.querySelector("#horoOptions").append(optionContainer);


    })
}

// This is the function that will get us the user's input
horoApp.getUserInput = function () {
    // Targeting the id=formSign attribute and assigning it to the 'const form' variable
    const form = document.querySelector('#formSign')
    // Registering 'form' to listen for a particular event (submit) by attaching an 'addEventListener' method.
    // Want to prevent a new page request when we submit by using the 'preventDefault()' function
    // User's choice of zodiac sign value is assigned to the 'userInput' variable
    // 'horoApp.getHoroscope() function called taking in the 'userInput' as its parameter
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const userInput = document.querySelector("#starSign").value;
        horoApp.getHoroscope(userInput);
    })
}
// Created our init method
// This is where we will store our code/function that need to run on the page load
horoApp.init = function () {
    horoApp.getUserInput();
    // horoApp.getUserFormOptions();

    // horoApp.getUserInputOther();
}
// all the init method to get the ball rolling
horoApp.init();
