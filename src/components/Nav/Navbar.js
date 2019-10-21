import React, {useState} from 'react';
import SearchBar from '../Search/SearchBar';
import SigninLoginButton from '../Buttons/SigninLoginButton';
import "./Navbar.css";


const Navbar = () => {
    const [isOpen, toggleLinks] = useState(false);

    return(
        <nav id="navbar">
            <a href="index.html" id="nav-brand"></a>
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
                <a href="create.html">Add an Area</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
            </ul>
        </nav>
    );
}

export default Navbar;