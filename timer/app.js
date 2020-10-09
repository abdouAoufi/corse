const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll(".deadline-format h4");

let futureDate = new Date(2020, 4, 25, 5, 30, 0);

const year = futureDate.getFullYear();
const hour = futureDate.getHours();
const minutes = futureDate.getMinutes();
const secs = futureDate.getSeconds();

let month = futureDate.getMonth();
let weekday = futureDate.getDay();
let date = futureDate.getDate();

month = months[month];
weekday = weekdays[weekday];



giveaway.textContent = `giveaway ends on ${weekday} ${date} ${month}
${year}  ${hour}:${minutes}AM`;