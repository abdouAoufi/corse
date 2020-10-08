 const btn = document.querySelectorAll(".tab-btn");
 const about = document.querySelector(".about");
 const articles = document.querySelectorAll(".content");

 about.addEventListener("click", function(e) {
     const id = e.target.dataset.id;
     if (id) {
         // remove "active"
         btn.forEach(function(button) {
             button.classList.remove("active");
             e.target.classList.add("active");
         });
         // hide articles

         articles.forEach(function(artc) {
             artc.classList.remove("active");
         });

         const element = document.getElementById(id);
         element.classList.add("active");
     }
 });