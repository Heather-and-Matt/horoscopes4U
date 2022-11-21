
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

// Extra options display function
horoApp.getUserFormOptions = function (horoscopeChoice) {

    function enableOptsBtn() {
    document.querySelector('#optsBtn').disabled = false;
    }
    enableOptsBtn();

    const formOptions = document.querySelector('#formOptions')
    formOptions.addEventListener("submit", (event) => {
    event.preventDefault();

    const userOptionsInput = document.querySelector("#starMood").value;

    const horoscopeOption = document.createElement("p");
    horoscopeOption.classList.add("otherP");
    horoscopeOption.innerText = horoscopeChoice[userOptionsInput];

    const optionContainer = document.createElement("li");
    optionContainer.classList.add("fortuneOption");
    optionContainer.appendChild(horoscopeOption);

    document.querySelector("#horoOptions").innerHTML = "";
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

