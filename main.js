document.addEventListener("DOMContentLoaded", function(){
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    // const links = document.querySelectorAll('.nav-links li');

    //btn[0] = Login, btn[1] = SignUp, btn[2] = close
    const btn = document.querySelectorAll("btn");

    const blur = document.querySelector("div#blur");
    const box = document.querySelector("#blur>div");
    const form_signUp = document.getElementById("form_signUp");
    const form_login = document.getElementById("form_login");

    console.log(navLinks);

    hamburger.addEventListener("click", function(){
        navLinks.classList.toggle('open');
    });

    /*   LOGIN BUTTON    */
    btn[0].addEventListener("click", function () {
        setBlur(true);
        setButtons(false);
        form_login.style.display = "inline";
    });


    /*   SIGN UP BUTTON   */
    btn[1].addEventListener("click", function(){
        form_signUp.style.display = "inline";
        setButtons(false);
        setBlur(true);
    });

    /*    CLOSE BUTTON   */
    btn[2].addEventListener("click", function(){
        form_signUp.style.display = "none";
        form_login.style.display = "none";
        setBlur(false);
        setButtons(true);
    });

    /* ----- Helper Functions ----- */

    function setButtons(condition){
        if(condition){
            btn[0].style.display = "inline";
            btn[1].style.display = "inline";
        }else{
            btn[0].style.display = "none";
            btn[1].style.display = "none";
        }
    }

    function setBlur(condition){
        if(condition){
            btn[2].style.display = "inline";
            btn[2].style.backgroundColor = "rgba(63, 179, 255, 0.5)";
            blur.style.backgroundColor = "rgba(0,0,0,0.31)";
            box.style.backgroundColor = "rgba(255,255,255,0.75)";
        }else{
            btn[2].style.backgroundColor = "rgba(63, 179, 255, 0)";
            btn[2].style.display = "none";
            blur.style.backgroundColor = "rgba(0,0,0,0)";
            box.style.backgroundColor = "rgba(255,255,255,0)";
        }
    }
  });

