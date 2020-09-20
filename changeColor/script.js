const colors = [
    "#EEEEEE",
    "#fc85ae",
    "#574b90",
    "#17b978",
    "#f469a9",
    "#0e153a",
    "#2d6cdf",
    "#faee1c",
    "#cb3b3b",
    "#cabbe9",
    "#107a8b",
    "#0b8457",
    "#fcb1b1",
    "#ff5959",
];
const buttonChange = document.querySelector('#change');
const body = document.querySelector('#body');
const title = document.querySelector("#hexValue");
const simple = document.querySelector("#simple");
const hex = document.querySelector("#hex");
buttonChange.addEventListener('click', () => {
    chnageBodyColor();
});

simple.addEventListener('click', () => {
    setBackColor();
});

hex.addEventListener("click", () => {
    chnageBodyColor();
});

function chnageBodyColor() {
    let random = Math.floor(Math.random() * colors.length);
    console.log(colors[random]);
    body.style.backgroundColor = colors[random];
    title.innerText = colors[random];
}



function setBackColor() {
    title.innerText = " not set";
    body.style.backgroundColor = "#ffffff";
}