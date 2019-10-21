import React from 'react';
import "./SearchBar.css";

const SearchBar = () => {
    return(
        <form className={"search"} action="/action_page.php">
            <input type="text" placeholder="Search.." name="search" />
                <button type="button" onClick="window.location.href='results.html'">
                    <i className="fa fa-search"></i>
                </button>
        </form>
    );
}

export default SearchBar;