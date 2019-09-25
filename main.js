document.addEventListener("DOMContentLoaded", function(){
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');
    console.log(navLinks);

    hamburger.addEventListener("click", function(){
        navLinks.classList.toggle('open');
    });
  });

