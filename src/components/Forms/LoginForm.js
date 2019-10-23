import React from 'react';
import useSignUpForm from './FormHook';
import './Form.css'

/**
 * Login Form Component
 * @returns {*}
 */
const LoginForm = () => {
    const {inputs, handleInputChange, handleSubmit} = useSignUpForm(); //retreives functions and state variables from form hook
    // console.log({validationErrors});

    /**
     * toggles the "login" class to close the form with display: none
     */
    const toggleForm = () => {
        document.getElementById("login").classList.toggle("login");
    };

    return (
        <div className={"blur-background"}>
            <form onSubmit={handleSubmit} id="pop-up-form" className={"form-style"}>{/*Runs the handleSubmit function from form hook when submit button is clicked*/}
                <a onClick={toggleForm} className="close"/>{/*Runs the toggleForm function on click to close the form*/}
                <h1>Login</h1>
                <div>
                    <label>Username</label>
                    <input type="text" name="userName" onChange={handleInputChange} value={inputs.userName} required/><br/>{/*Runs the handleInputChange function in form hook on input change*/}
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="userPassword" onChange={handleInputChange} value={inputs.userPassword} required/><br/>
                </div>
                <input type="submit" value="Login"/>
            </form>
        </div>
    );
};

export default LoginForm;