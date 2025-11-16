/* ---------------------- CONFIG ---------------------- */

const apiKey = '976106a6c59595f35e90fff06a09ffe9&units=imperial';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const serverUrl = '__BACKEND_URL__';

const getRoute = `${serverUrl}/getData`;
const postRoute = `${serverUrl}/addData`;
const historyRoute = `${serverUrl}/history`;


/* ---------------------- DOM ELEMENTS ---------------------- */

const sendButton = document.getElementById('generate');
const zipElement = document.getElementById('zip');
const feelingsElement = document.getElementById('feelings');

const entryTitleElement = document.getElementById('entryTitle');
const dateEntryElement = document.getElementById('date');
const zipCodeEntryElement = document.getElementById('zipcode');
const cityNameElement = document.getElementById('cityName');
const weatherDescElement = document.getElementById('weatherDesc');
const temperatureEntryElement = document.getElementById('temp');
const contentEntryElement = document.getElementById('content');

const historyElement = document.getElementById('history');
const errorElement = document.getElementById('error');


/* ---------------------- HELPERS ---------------------- */

function getCurrentDate() {
    const d = new Date();
    return `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;
}

function getWeatherIcon(description) {
    const desc = description.toLowerCase();
    if (desc.includes('clear')) return '☀️';
    if (desc.includes('clouds')) return '☁️';
    if (desc.includes('rain') || desc.includes('drizzle')) return '🌧️';
    if (desc.includes('thunderstorm')) return '⛈️';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('mist') || desc.includes('fog') || desc.includes('haze')) return '🌫️';
    return '🌡️'; // Default icon
}

async function getJSON(url) {
    const res = await fetch(url);
    return res.json();
}

async function postJSON(url, data) {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}


/* ---------------------- API CALLS ---------------------- */

async function getWeatherData(zip) {
    const url = `${baseUrl}?zip=${zip}&appid=${apiKey}&units=imperial`;
    return getJSON(url);
}


/* ---------------------- UI UPDATES ---------------------- */

function updateLatestEntry(entry) {
    if (!entry || Object.keys(entry).length === 0) {
        entryTitleElement.textContent = 'No entries yet';
        cityNameElement.textContent = '';
        dateEntryElement.textContent = '';
        zipCodeEntryElement.textContent = '';
        weatherDescElement.textContent = '';
        temperatureEntryElement.textContent = '';
        contentEntryElement.textContent = '';
        return;
    }

    entryTitleElement.textContent = 'Most recent entry:';
    cityNameElement.textContent = entry.name;
    dateEntryElement.textContent = `Date: ${entry.date}`;
    zipCodeEntryElement.textContent = `Zip: ${entry.zip}`;
    temperatureEntryElement.innerHTML = `${getWeatherIcon(entry.description)} ${Math.round(entry.temp)}° F`;
    weatherDescElement.textContent = `Currently: ${entry.description}`;
    contentEntryElement.textContent = `Feelings: ${entry.content}`;
}

function updateHistory(history) {
    if (!historyElement) return;
    historyElement.innerHTML = '';
    if (!history || history.length === 0) return;

    history.slice().reverse().forEach(entry => {
        const el = document.createElement('div');

        el.className = "p-4 rounded-xl bg-white/8 backdrop-blur-sm border border-white/10 shadow flex flex-col gap-1";

        el.innerHTML = `
            <div class="font-bold text-lg">${entry.name}</div>
            <div class="flex justify-between items-center text-xs opacity-80">
                <span>${entry.date}</span>
                <span>Zip: ${entry.zip}</span>
            </div>
            <div class="font-semibold text-xl my-1 flex items-center gap-2">
                <span>${getWeatherIcon(entry.description)}</span>
                <span>${Math.round(entry.temp)}°</span>
                <span class="text-base font-normal opacity-90 capitalize">${entry.description}</span>
            </div>
            <div class="opacity-90">${entry.content}</div>
        `;

        historyElement.appendChild(el);
    });
}


/* ---------------------- ERROR HANDLING ---------------------- */
function showError(message) {
    errorElement.style.display = 'flex';
    errorElement.firstElementChild.textContent = message;
    setTimeout(() => { errorElement.style.display = 'none'; }, 3000);
}

/* ---------------------- MAIN LOGIC ---------------------- */

async function send() {
    try {
        const zipValue = zipElement.value;
        if (!zipValue) {
            showError('Please enter a zip code.');
            return;
        }

        const weather = await getWeatherData(zipValue);

        if (weather.cod !== 200) {
            throw new Error(weather.message || 'Invalid zip code');
        }

        const payload = {
            date: getCurrentDate(),
            temp: weather.main.temp,
            content: feelingsElement.value,
            zip: zipValue,
            name: weather.name,
            description: weather.weather[0].description
        };

        const savedEntry = await postJSON(postRoute, payload);
        const history = await getJSON(historyRoute);

        updateLatestEntry(savedEntry);
        updateHistory(history);

    } catch (err) {
        showError(`Error: ${err.message}`);
        console.error(err);
    }
}

async function initialize() {
    try {
        const latest = await getJSON(getRoute);
        const history = await getJSON(historyRoute);
        updateLatestEntry(latest);
        updateHistory(history);
    } catch (err) {
        console.warn('Could not initialize data.', err);
    }
}


/* ---------------------- EVENTS ---------------------- */

sendButton.addEventListener('click', send);
window.addEventListener('DOMContentLoaded', initialize);