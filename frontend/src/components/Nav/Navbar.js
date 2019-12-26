import React, {useState, useContext} from 'react'; //React hooks, allows state to be used in functional components

import SearchBar from '../Search/SearchBar'; //Component for the nav searchbar
import SigninLoginButton from '../Buttons/SigninLoginButton'; //Component for the nav sign in and login buttons
import UserContext from '../../UserContext';
import { NavLink, useLocation } from 'react-router-dom'; //Component to switch between pages via ReactRouter
import axios from "axios";
import config from "../../config";

import "./Navbar.css"; //Styling specific to the NavBar

/**
 * The NavBar of a page
 * @returns A NavBar Component
 */
const Navbar = (props) => {
    //isOpen is a state variable, when true the mobile version of the NavBar is open, toggleLinks controls isOpen
    const [isOpen, toggleLinks] = useState(false);
    const location = useLocation();
    const {user, setUser} = useContext(UserContext);

    let navButtons;
    if(user){navButtons = //if the user is logged in, navbar will contain a logout button and "Hey, username"
        <div style={{gridTemplateColumns: "auto max-content 40px"}} className="buttons-nav">
            <SearchBar/>
            <div>Hey, {user.name}</div>
            <button className={`user-button`} onClick={()=>{
                axios.post(config.IP + '/signin/logout', {token: JSON.parse(localStorage.getItem('review_app_key'))}) //sents a logout request to server
                    .then(res => console.log(res.data.message)); //console logs message from promise
                setUser(false); //if logout button is clicked, user is set to false
            }}/>
        </div>
    }
    else{navButtons = //if user is not logged in, navbar will contain login and signup button
        <div style={{gridTemplateColumns: "4fr 1fr 1fr"}} className="buttons-nav">
            <SearchBar/>
            <SigninLoginButton setLoginSignup={props.setLogin} formName={"login"}> Login </SigninLoginButton>
            <SigninLoginButton setLoginSignup={props.setSignup} formName={"signup"}> Sign Up </SigninLoginButton>
        </div>
    }

    return(
        //Container with NavBar contents
        <nav id="navbar" className={location.pathname === "/" ? "transparent" : ""}>
            {/*Routes to the home page when the logo is pressed */}
            <NavLink to="/" id="nav-brand"/>

            {/*Container with the nav search bar*/}
            {/*<div className="search-nav">*/}
            {/*    <SearchBar/>*/}
            {/*</div>*/}

            {navButtons}

            {/* Hamburger button in the mobile version of the NavBar,
             when clicked isOpen = !isOpen*/}
            <div className="hamburger" onClick={() => toggleLinks(!isOpen)}>
                <div className="line"/>
                <div className="line"/>
                <div className="line"/>
            </div>

            {/*List of links to other areas of the site.
            isOpen controls a conditional render for the mobile version of the navbar,
            if true the open class is enabled therfore the links are visible*/}
            <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                <NavLink to={"/Submission"} onClick={() => toggleLinks(!isOpen)}>Add Area</NavLink>
                <NavLink to={"/Submission"} onClick={() => toggleLinks(!isOpen)}>My List</NavLink>
                <NavLink to={"/Submission"} onClick={() => toggleLinks(!isOpen)}>Contact</NavLink>
            </ul>
        </nav>
    );
};

export default Navbar;