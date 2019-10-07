document.addEventListener("DOMContentLoaded", function(){
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    // const links = document.querySelectorAll('.nav-links li');

    /*
    button[0] = Login, button[1] = SignUp, button[2] = Close
     */
    const button = document.querySelectorAll(".log_buttons");
    const signInNav = document.querySelector(".sign-button");
    const logInNav = document.querySelector(".login-button");
    const searchMain = document.querySelector(".search-main");


    const blur = document.querySelector("div#blur");
    const box = document.querySelector("#blur>div");
    const form_signUp = document.getElementById("form_signUp");
    const form_login = document.getElementById("form_login");

    console.log(navLinks);

    hamburger.addEventListener("click", function(){
        navLinks.classList.toggle('open');
    });

    /*   LOGIN BUTTON    */
    button[0].addEventListener("click", enableLogIn);
    logInNav.addEventListener("click", enableLogIn);


    /*   SIGN UP BUTTON   */
    button[1].addEventListener("click", enableSignUp);
    signInNav.addEventListener("click", enableSignUp);

    /*    CLOSE BUTTON   */
    button[2].addEventListener("click", function(){
        form_signUp.style.display = "none";
        form_login.style.display = "none";
        setBlur(false);
        setButtons(true);
    });

    /* ----- Helper Functions ----- */

    function enableLogIn(){
        setBlur(true);
        setButtons(false);
        form_login.style.display = "inline";
    }

    function enableSignUp(){
        form_signUp.style.display = "inline";
        setBlur(true);
        setButtons(false);
    }

    function setButtons(condition){
        if(condition){
            button[0].style.display = "inline";
            button[1].style.display = "inline";
            searchMain.style.display = "inline";
        }else{
            button[0].style.display = "none";
            button[1].style.display = "none";
            searchMain.style.display = "none";
        }
    }

    function setBlur(condition){
        if(condition){
            button[2].style.display = "inline";
            button[2].style.backgroundColor = "rgba(63, 179, 255, 0.5)";
            blur.style.backgroundColor = "rgba(0,0,0,0.31)";
            box.style.backgroundColor = "rgba(255,255,255,0.75)";
        }else{
            button[2].style.backgroundColor = "rgba(63, 179, 255, 0)";
            button[2].style.display = "none";
            blur.style.backgroundColor = "rgba(0,0,0,0)";
            box.style.backgroundColor = "rgba(255,255,255,0)";
        }
    }
  });

