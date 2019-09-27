document.addEventListener("DOMContentLoaded", function(){
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    // const links = document.querySelectorAll('.nav-links li');

    const signUpBtn = document.querySelector(".signUp");
    const closeBtn = document.querySelector(".close")
    const blur = document.querySelector("div#blur");
    const box = document.querySelector("#blur>div");

    console.log(navLinks);

    hamburger.addEventListener("click", function(){
        navLinks.classList.toggle('open');
    });

    signUpBtn.addEventListener("click", function(){
        signUpBtn.style.display = "none";
        closeBtn.style.display = "inline";
        closeBtn.style.backgroundColor = "rgba(63, 179, 255, 0.5)";
        blur.style.backgroundColor = "rgba(0,0,0,0.31)";
        box.style.backgroundColor = "rgba(255,255,255,0.75)";
    });

    closeBtn.addEventListener("click", function(){
        signUpBtn.style.display = "inline";
        closeBtn.style.display = "none";
        closeBtn.style.backgroundColor = "rgba(63, 179, 255, 0)";
        blur.style.backgroundColor = "rgba(0,0,0,0)";
        box.style.backgroundColor = "rgba(255,255,255,0)";
    });

  });

