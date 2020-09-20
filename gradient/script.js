const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
const buttonChange = document.querySelector('#change');
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
    let hexColor = '#';
    let hexColor2 = "#";
    for (let i = 0; i < 6; i++) {
        hexColor += hexValues[getRandomNumber()];
    }
    for (let j = 0; j < 6; j++) {
        hexColor2 += hexValues[getRandomNumber()];
    }
    body.style.background = "linear-gradient(to right, " +
        hexColor + "," +
        hexColor2 + ")";
    title.textContent = hexColor + " - " + hexColor2;
}



function setBackColor() {
    title.textContent = " not set";
    body.style.background = "#ffffff";
}

function getRandomNumber() {
    return Math.floor(Math.random() * hexValues.length);
}