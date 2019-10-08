document.addEventListener("DOMContentLoaded", function(){

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const toggleView = document.querySelector("div.toggle");
    const toggleSwitch = document.querySelector(".toggle-switch");
    const mapView = document.querySelector(".map-view");


    hamburger.addEventListener("click", function(){
        navLinks.classList.toggle('open');
    });

    /**
     * Toggles between list and map view
     */
    toggleView.addEventListener("click", function () {
        toggleSwitch.classList.toggle("toggle-map");
        mapView.classList.toggle("map-view-enable");
    });
    
});