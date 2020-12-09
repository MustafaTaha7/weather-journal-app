// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=f718893f11db4b12676b06612c03737d';
const apiUnit = '&units=imperial';

// Create a new date instance dynamically with JS

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', calculateResults);

/* Function called by event listener */
function calculateResults() {
    const zipCode = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;

    getWeatherData(baseURL, zipCode, apiKey)
    .then(function(data) {
        let d = new Date(data.dt * 1000);
        let dateForm = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
        postData('/add', {temperature: data.main.temp, date: dateForm, userResponse: userResponse});
        updateUI('/all');
    })
};

/* Function to GET Web API Data */
const getWeatherData = async (baseURL, zipCode, apiKey) => {
    const response  = await fetch(baseURL + zipCode + apiKey + apiUnit);
    try {
        const data = await response.json();
        return data;
    } catch(err) {
        console.log(err);
    };
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(err) {
        console.log(err);
    };
};

/* Function to GET Project Data */
const updateUI = async(url='') => {
    const request = await fetch(url);
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = `hi today is ${allData[0].date}`;
        document.getElementById('temp').innerHTML = `temperature today is ${allData[0].temperature}`;
        document.getElementById('content').innerHTML = `you are feeling  ${allData[0].userResponse} today`;
    } catch(err) {
        console.log(err);
    };
};

