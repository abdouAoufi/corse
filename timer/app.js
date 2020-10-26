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

let futureDate = new Date(2020, 9, 19, 17, 06, 0);

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

const futureTime = futureDate.getTime();


function format(item) {
    if (item < 10) {
        return `0${item}`;
    } else {
        return item;
    }
}

function getRemainintgTime() {
    const today = new Date().getTime(); // !this is current time 
    let diff = futureTime - today;
    /* //*--- important stuff ---
      //*1s = 1000 ms
      //*1 minutes = 60s 
      1 hour = 60 minutes
      1 day = 24 hours
      */
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;
    const oneSeconds = 1000;
    let days = diff / oneDay;
    days = Math.floor(days);
    let hours = (diff % oneDay) / oneHour;
    hours = Math.floor(hours);
    let minutes = (diff % oneHour) / oneMinute;
    minutes = Math.floor(minutes);
    let seconds = (diff % oneMinute) / oneSeconds;
    seconds = Math.floor(seconds);
    const values = [days, hours, minutes, seconds];


    items.forEach(function(item, index) {
        item.textContent = format(values[index]);
    });

    if (diff < 0) {
        clearInterval(contDown);
        deadline.innerHTML = `<h4 class:"expired" > sorry this giveaway has expired </h4>`
    }
}


let contDown = setInterval(getRemainintgTime, 1000);
getRemainintgTime();