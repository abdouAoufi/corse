 const btn = document.querySelectorAll(".tab-btn");
 const about = document.querySelector(".about");
 const articles = document.querySelectorAll(".content");
 let previous;

 about.addEventListener('click', function(e) {
     // console.log(e.target.dataset.id);
     if (!e.target.classList.contains('active')) {
         e.target.classList.add("active");
         selectArticele(e.target.dataset.id);
         previous = e.target.dataset.id;
         // console.log(previous);
     } else {
         e.target.classList.remove("active");
         deselectArticele(e.target.dataset.id);
     }

     btn.forEach(function(button) {
         if (button.dataset.id != previous) {
             button.classList.remove("active");
         }

     });

 });

 function selectArticele(name) {
     console.log(name);
     articles.forEach(function(e) {
         if (e.id == name) {
             e.classList.add("active");
         } else {
             e.classList.remove("active");
         }
     });
 }

 function deselectArticele(name) {
     console.log(name);
     articles.forEach(function(e) {
         if (e.id == name) {
             e.classList.remove("active");
         }
     });
 }