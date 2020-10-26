let isOpen = false;
let isStarted = false;
let time = 25 * 60 * 1000;


$(document).ready(function() {
    $(".start").click(startTime);
    $('.hamburger').click(function(param) {
        showSideBar();
    })
    $('.section').click(function(param) {
        if (isOpen) {
            hideSideBar();
        }
    })
})

function showSideBar() {
    $(".sidebar").addClass("getback-aside");
    $(".container").addClass("hide-container");
    $(".nav-center").addClass("hide-container");
    $(".section").addClass("hide");
    isOpen = true;
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


function hideSideBar() {
    $(".sidebar").removeClass("getback-aside");
    $(".container").removeClass("hide-container");
    $(".nav-center").removeClass("hide-container");
    $(".section").removeClass("hide");
    isOpen = false;
}

const minute = 60 * 1000;
const secs = 1000;
let min, sec;

async function startTime() {
    isStarted = true;
    while (time > 0) {
        await sleep(1000);
        min = Math.floor(time / minute);
        sec = (time % minute) / secs;
        time = time - 1000;
        format(min, sec);
    }
}

function format(min, sec) {

    if (min < 10) {
        $("#time").html(`  0${min} : ${sec}  `);
    } else if (sec < 10) {
        $("#time").html(`  ${min} : 0${sec}  `);
    } else {
        $("#time").html(` ${min} : ${sec}  `);
    }
}