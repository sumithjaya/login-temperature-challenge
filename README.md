# login-temperature-challenge
login temperature code challenge

# Overview
This project is created using Laravel and Laravel Breeze with React. React serves  the frontrend and the back end runs on Laravel.

# Follwing functionalies added to the project
- Created custom config file to read and manage the two cities lattitude, longtitde and city names
- ENV file updated to keepthe city related values
- Model created to insert and read data from database
- React front end displays the data using the API calls to the backend using axios
- UseEffect is used to load the data on intial page load
- Hottest First button load data using axois and back end orders the data by temprature in decending order

# Celsius to Fahrenheit  conversion
(0°C × 9/5) + 32 = 32°F

# Steps to run the project
Fllow the steps as below prior to run the project
```
composer install
php artisan migrate
npm install
npm run dev
```
