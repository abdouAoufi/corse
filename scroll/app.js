//  * date
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

// * close links
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');

// *  navbar 
const navbar = document.getElementById("nav");
const toplink = document.querySelector(".top-link");
navToggle.addEventListener('click', () => {
    // linksContainer.classList.toggle("show-links");
    // another approach 
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;
    console.log(linksHeight);
    console.log();
    if (containerHeight === 0) {
        linksContainer.style.height = `${linksHeight}px`;
    } else {
        linksContainer.style.height = 0;
    }
});

window.addEventListener('scroll', () => {

    if (window.pageYOffset > navbar.getBoundingClientRect().height) {
        navbar.classList.add("fixed-nav");
    } else {
        toplink.classList.remove("show-link");
        navbar.classList.remove("fixed-nav");
    }

    if (window.pageYOffset > 500) {
        toplink.classList.add("show-link");
    }
});