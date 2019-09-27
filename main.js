document.addEventListener("DOMContentLoaded", function(){
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    // const links = document.querySelectorAll('.nav-links li');

    const signUpBtn = document.querySelector(".signUp");
    const closeBtn = document.getElementById("close");
    const blur = document.querySelector("div#blur");
    const box = document.querySelector("#blur>div");

    console.log(navLinks);

    hamburger.addEventListener("click", function(){
        navLinks.classList.toggle('open');
    });

    signUpBtn.addEventListener("click", function(){
        signUpBtn.style.display = "none";
        closeBtn.style.display = "";
        blur.style.display = "";
        blur.style.backgroundColor = "rgba(0,0,0,0.31)";
        box.style.backgroundColor = "rgba(255,255,255,0.75)";
    })

  });

