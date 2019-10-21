import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import SignupForm from "./components/Forms/SignupForm";
import LoginForm from "./components/Forms/LoginForm";
import Footer from "./components/Footer/Footer";


ReactDOM.render(<App />, document.getElementById('landing-page'));
ReactDOM.render(<SignupForm />, document.getElementById('signup'));
ReactDOM.render(<LoginForm/>, document.getElementById('login'));
ReactDOM.render(<Footer/>, document.getElementById('footer'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
