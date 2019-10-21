import React from 'react';
import SigninLoginButton from "./Buttons/SigninLoginButton";
import SearchBar from "./Search/SearchBar";

const Home = () => {
    return (
        <div className={"container"}>
            <div className={"buttons-main"}>
                <SigninLoginButton formName={"login"}>Login</SigninLoginButton>
                <SigninLoginButton formName={"signup"}>Sign Up</SigninLoginButton>
            </div>

            <div className={"search-main"}>
                <SearchBar/>
            </div>
        </div>
    );
}

export default Home;