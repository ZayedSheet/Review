import React, {useState} from 'react';
import SearchBar from '../Search/SearchBar';
import SigninLoginButton from '../Buttons/SigninLoginButton';
import { NavLink } from 'react-router-dom';
import "./Navbar.css";


const Navbar = () => {
    const [isOpen, toggleLinks] = useState(false);

    return(
        <nav id="navbar">
            {/*<a href="index.html" id="nav-brand"></a>*/}
            <NavLink to="/" id="nav-brand"></NavLink>
            <div class="search-nav">
                <SearchBar/>
            </div>
            <div class="buttons-nav">
                <SigninLoginButton formName={"login"}> Login </SigninLoginButton>
                <SigninLoginButton formName={"signup"}> Sign Up </SigninLoginButton>
            </div>
            <div className="hamburger" onClick={() => toggleLinks(!isOpen)}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                <NavLink to={"/Submission"}>Add an Area</NavLink>
                <NavLink to={"/Submission"}>About</NavLink>
                <NavLink to={"/Submission"}>Contact</NavLink>
            </ul>
        </nav>
    );
}

export default Navbar;