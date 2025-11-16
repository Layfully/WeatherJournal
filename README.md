# Weather Journal App

## Table of Contents

- [Project Title](#weather-journal-app)
- [Table of Contents](#table-of-contents)
- [Description](#description)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Dependencies](#dependencies)
- [Features](#features)
- [Demo](#demo)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Description
This is a web app that allows users to input a zip code and their current feelings, and then displays the current temperature for that location along with the date and feelings input. It uses the OpenWeatherMap API to fetch weather data based on the user's zip code input, and stores the user's input data in a Node.js and Express server. The front-end is built with HTML, Tailwind, and JavaScript, and the back-end uses Node.js and Express for routing and API calls.

## Technologies
- JavaScript
- Node.js
- Express.js
- HTML
- Tailwind

## Getting Started
To run this app, you'll need to have Node.js installed on your machine. Then, clone this repo and install the necessary dependencies by running `npm install` in your terminal. Finally, start the server with `node server.js` and open `index.html` in your browser. 

## Dependencies
- cors
- express

## Features
- Get current weather data based on user's zip code
- Post weather data and user's feelings to server
- Retrieve most recent entry from server and display on page

## Demo
You can see a screenshot of this project:
<img width="1129" height="980" alt="image" src="https://github.com/user-attachments/assets/80c11956-d4da-4c16-8c75-1a982647d674" />

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Acknowledgments
- [OpenWeather API](https://openweathermap.org/api) for providing the weather data used in this app.
