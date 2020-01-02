import React, {useState, useContext, useEffect, useRef} from 'react'; //React hooks, allows state to be used in functional components

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
    const wrapperRef = useRef(null);
    //isOpen is a state variable, when true the mobile version of the NavBar is open, toggleLinks controls isOpen
    const [openHamburger, setHamburger] = useState(false);
    const [openSearch, setSearch] = useState(false);
    const [isOpen, toggleLinks] = useState(false);
    const [userButtonToggle, toggleUserButton] = useState(false);
    const location = useLocation();
    const {user, setUser} = useContext(UserContext);

    const handleClickOutside = event => {
        if (wrapperRef.current && !(wrapperRef.current.contains(event.target))) {
            toggleUserButton(false);
        }
    };

    useEffect(() => {
        if(location.pathname === "/Results") setSearch(false);
    }, [location.pathname]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    let navButtons;
    if(user){navButtons = //if the user is logged in, navbar will contain a logout button and "Hey, username"
        <div style={{gridTemplateColumns: "auto max-content 40px",gridTemplateRows:"minmax(0,100%)"}} className="buttons-nav">
            <div className={"search-nav"}>
                <SearchBar/>
            </div>
            <div>Hey, {user.name}</div>
            <div ref={wrapperRef}>
                <button className={`user-button`} onClick={()=>{
                    if (!userButtonToggle) toggleUserButton(true);
                    else toggleUserButton(false);
                }}/>
                {userButtonToggle &&
                    <div className={`user-options`}>
                        <div>My Account</div>
                        <div>My Messages</div>
                        <div onClick={()=>{
                            axios.post(config.IP + '/signin/logout', {token: JSON.parse(localStorage.getItem('review_app_key'))}) //sents a logout request to server
                                .then(res => console.log(res.data.message)); //console logs message from promise
                            setUser(false); //if logout button is clicked, user is set to false
                        }}>Logout</div>
                    </div>
                }
            </div>
        </div>
    }
    else{navButtons = //if user is not logged in, navbar will contain login and signup button
        <div style={{gridTemplateColumns: "4fr 1fr 1fr"}} className="buttons-nav">
            <div className={"search-nav"}>
                <SearchBar/>
            </div>
            <SigninLoginButton setLoginSignup={props.setLogin} formName={"login"}> Login </SigninLoginButton>
            <SigninLoginButton setLoginSignup={props.setSignup} formName={"signup"}> Sign Up </SigninLoginButton>
        </div>
    }

    return(
        //Container with NavBar contents
        <nav id="navbar" className={location.pathname === "/" ? "transparent" : ""}>
            <div style={{visibility: location.pathname !== "/" ? "visible": "hidden"}}
                 className="search search-button-mobile"
                 onClick={() => setSearch(!openSearch)}>
                <i style={{fontSize: "29px"}} className="fa fa-search"/>
            </div>

            <div
                style={{visibility: location.pathname !== "/" && openSearch ? "visible": "hidden"}}
                className={"search-main"}>
                <SearchBar/> {/* Search Bar (aka Search Form) component*/}
            </div>

            {/*Routes to the home page when the logo is pressed */}
            <NavLink to="/" id="nav-brand"/>

            {navButtons}

            {/* Hamburger button in the mobile version of the NavBar,
             when clicked isOpen = !isOpen*/}
            <div className="hamburger" onClick={() => setHamburger(!openHamburger)}>
                <div className="line"/>
                <div className="line"/>
                <div className="line"/>
            </div>

            {/*List of links to other areas of the site.
            isOpen controls a conditional render for the mobile version of the navbar,
            if true the open class is enabled therfore the links are visible*/}
            <ul className={`nav-links ${openHamburger ? 'open' : ''}`}>
                <NavLink to={"/Submission"} onClick={() => setHamburger(!openHamburger)}>Add Area</NavLink>
                <NavLink to={"/Submission"} onClick={() => setHamburger(!openHamburger)}>My List</NavLink>
                <NavLink to={"/Submission"} onClick={() => setHamburger(!openHamburger)}>Contact</NavLink>
            </ul>
        </nav>
    );
};

export default Navbar;