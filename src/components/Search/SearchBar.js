import React from 'react';
import "./SearchBar.css";
import {NavLink} from "react-router-dom";

const SearchBar = () => {
    return(
        <form className={"search"} action="/action_page.php">
            <input type="text" placeholder="Search.." name="search" />
                <NavLink class="search-button" to="/Results" type="button">
                    <i className="fa fa-search"></i>
                </NavLink>
        </form>
    );
}

export default SearchBar;