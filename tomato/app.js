let isOpen = false;
$(document).ready(function() {
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

function hideSideBar() {
    $(".sidebar").removeClass("getback-aside");
    $(".container").removeClass("hide-container");
    $(".nav-center").removeClass("hide-container");
    $(".section").removeClass("hide");
    isOpen = false;
}