import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import SigninLoginButton from './components/Buttons/SigninLoginButton';
import SearchBar from "./components/Search/SearchBar";
import Navbar from "./components/Nav/Navbar";
import SignupForm from "./components/Forms/SignupForm";
import LoginForm from "./components/Forms/LoginForm";
import Footer from "./components/Footer/Footer";

const landing = (
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


ReactDOM.render(landing, document.getElementById('landing-page'));
ReactDOM.render(<Navbar />, document.getElementById('nav'));
ReactDOM.render(<SignupForm />, document.getElementById('signup'));
ReactDOM.render(<LoginForm/>, document.getElementById('login'));
ReactDOM.render(<Footer/>, document.getElementById('footer'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
