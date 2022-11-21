
// Namespace object
const horoApp = {};

// API endpoint
horoApp.endpoint = `https://aztro.sameerkumar.website/`;

// Method to go get horoscope from aztro API
horoApp.getHoroscope = function (astroSign) {

    // Using the URL() constructor to get a new object back 
    const url = new URL(horoApp.endpoint);

    // Search parameters
    url.search = new URLSearchParams({
        sign: astroSign,
        day: "today",
    });

    // Fetch call to API
    fetch(url, {
        method: 'POST'
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(function (jsonData) {
            document.querySelector("#horoFortune").innerHTML = "";
            horoApp.displayHoroscope(jsonData);
            document.querySelector("#horoOptions").innerHTML = "";
        })
        .catch(function (err) {
            if (err.message === "Bad Request") {
                alert("We couldn't find a match for that day! Please choose yesterday, today or tomorrow")
            } else {
                alert("Something went wrong. No idea what. Trying my best")
            }
        });
};

// Horoscope display function
horoApp.displayHoroscope = function (fortune) {

    const horoscopeDate = document.createElement("p");
    horoscopeDate.classList.add("dateP");
    horoscopeDate.innerText = fortune.current_date;

    const horoscopeDes = document.createElement("p");
    horoscopeDes.classList.add("fortuneP");
    horoscopeDes.innerText = fortune.description;

    const horoContainer = document.createElement("li");
    horoContainer.classList.add("fortune");
    horoContainer.appendChild(horoscopeDate);
    horoContainer.appendChild(horoscopeDes);
    document.querySelector("#horoFortune").append(horoContainer);

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
};

// User input function
horoApp.getUserInput = function () {
    const form = document.querySelector('form')
    form.addEventListener("submit", (event) => {
        event.preventDefault()
    
    const userInput = document.querySelector("#starSign").value
    horoApp.getHoroscope(userInput)
    })
};

// Init function
horoApp.init = function () {
    horoApp.getUserInput();
}


// Init call
horoApp.init();

