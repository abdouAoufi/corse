import sublinks from './data.js';

const toggleBtn = document.querySelector(".toggle-btn");
const closeBtn = document.querySelector(".close-btn");
const sidebarWrapper = document.querySelector(".sidebar-wrapper");
const sidebar = document.querySelector(".sidebar-links");
const linkBtns = [...document.querySelectorAll(".link-btn")];
const submenu = document.querySelector(".submenu");
const hero = document.querySelector(".hero");
const btn = document.querySelector("#start");


btn.addEventListener("click", () => {
    sidebarWrapper.classList.add("show");

});

toggleBtn.addEventListener("click", () => {
    sidebarWrapper.classList.add("show");
});

closeBtn.addEventListener("click", () => {
    sidebarWrapper.classList.remove("show");
});

sidebar.innerHTML = sublinks.map(function(item) {
            const { links, page } = item;
            return `<article>
    <h4> ${page} </h4>
    <div class="sidebar-sublinks">
     ${links.map(function(link){
     return `<a href="${link.url}" > 
     <i class="${link.icon}"></i>${link.label} 
     </a>`;
    }).join('')}
    <div>
    </article>`;
}).join("");