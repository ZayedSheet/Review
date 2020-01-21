import React, {useContext} from 'react';

import SigninLoginButton from "./Buttons/SigninLoginButton";

import SearchBar from "./Search/SearchBar";
import UserContext from "../UserContext";
import {NavLink} from "react-router-dom";
import axios from "axios";
import config from "../config";

/**
 * Home page containing login/signup buttons, search bar and background image.
 * @returns Home Page as a Component
 */
const Home = (props) => {
    const {user} = useContext(UserContext);

    let page;
    if(user){page = //if the user is logged in, navbar will contain a logout button and "Hey, username"
        <div className={"buttons-main"}>
            <button className={"button-style"}>My List</button>
            <button className={"button-style"}>Add an Area</button>
        </div>
    }
    else{page = //if user is not logged in, navbar will contain login and signup button
        <div className={"buttons-main"}>
            {/*Login/Signup buttons are done through a component
                     as the buttons have similar style and functionality*/}
            <SigninLoginButton setLoginSignup={props.setLogin} formName={"login"}>Login</SigninLoginButton>
            <SigninLoginButton setLoginSignup={props.setSignup} formName={"signup"}>Sign Up</SigninLoginButton>
        </div>
    }

    return (
        /* div.container contains the buttons, search bar and
         * displays the background of the home page between the navbar and header
         */
        <div className={"container"}>
            <div id={"background-mobile-top"}/>
            {/*Mobile login and signup buttons*/}
            {/*<div className={"buttons-main"}>*/}
            {/*    /!*Login/Signup buttons are done through a component*/}
            {/*     as the buttons have similar style and functionality*!/*/}
            {/*    <SigninLoginButton setLoginSignup={props.setLogin} formName={"login"}>Login</SigninLoginButton>*/}
            {/*    <SigninLoginButton setLoginSignup={props.setSignup} formName={"signup"}>Sign Up</SigninLoginButton>*/}
            {/*</div>*/}
            {page}
            {/*Mobile Search Bar*/}
            <div className={"search-main"}>
                <SearchBar/> {/* Search Bar (aka Search Form) component*/}
            </div>
            <div id={"background-mobile-bottom"}/>
        </div>
    );
};

export default Home;