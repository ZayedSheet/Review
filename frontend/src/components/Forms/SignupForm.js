import React from 'react';
import axios from 'axios';
import config from "../../config";

import useForm from './FormHook';

/**
 * Sign up form component
 * @returns {*}
 */
const SignupForm = (props) => {

    const {inputs, handleInputChange, fieldNames, checkSubmit, displayError, errorMessage} = useForm(); //retrieves the following functions and state variables from the form hook

    const handleSubmit = (event) => {
        event.preventDefault(); //prevents default form behavior
        if(checkSubmit()){ //if formhook checksubmit passes
            axios.post(config.IP + '/users/add', inputs) //sents a post request to the server with inputs as the input
                .then(res => console.log(res.data));
            props.setSignup(false); //closes signup form
            props.setLogin(true); //opens login form
        }
    };

    return (
        <div className={"blur-background"}>
            <form onSubmit={handleSubmit} id="pop-up-form" className={"form-style"}>{/*Runs the handleSubmit function from form hookwhen the submit button is clicked*/}
                    <span onClick={() => {props.setSignup(false)}} className="close" />{/*closes the form on click by running toggleForm function*/}
                    <h1>Create an Account</h1>
                    <div>
                        <label>Name</label>
                        <input onBlur={displayError} type="text" name={fieldNames.name} onChange={handleInputChange} value={inputs.name} required/><br/>{/*Runs the displayError function from form hook onBlur (when the field loses focus)*/}
                        <p htmlFor={fieldNames.name} className={"error-message myclass"}>{errorMessage.name}</p>{/*paragraph element to display any errors with the input of the field*/}
                    </div>
                    <div>
                        <label>Email</label>
                        <input onBlur={displayError} type="email" name={fieldNames.email} onChange={handleInputChange} value={inputs.email} required/><br/>{/*runs the handleInputChange function from form hook on input change*/}
                        <p htmlFor={fieldNames.email} className={"error-message"}>{errorMessage.email}</p>
                    </div>
                    <div>
                        <label>Username</label>
                        <input onBlur={displayError} type="text" name={fieldNames.username} onChange={handleInputChange} value={inputs.username} required/><br/>
                        <p htmlFor={fieldNames.username} className={"error-message"}>{errorMessage.username}</p>
                    </div>
                    <div>
                        <label>Password</label>
                        <input onBlur={displayError} type="password" name={fieldNames.password} onChange={handleInputChange} value={inputs.password} required/><br/>
                        <p htmlFor={fieldNames.password} className={"error-message"}>{errorMessage.password}</p>
                    </div>
                    {/*<label>Re-enter Password</label>*/}
                    {/*<input type="password" id="passwordConfirm" name="password" onChange={handleInputChange} value={inputs.passwordConfirm}/><br/>*/}
                    <div className="terms-and-conditions">
                        <input type="checkbox" id="terms" name="terms" onChange={handleInputChange} value="true"/>I accept the Terms and Conditions
                    </div>
                    <input type="submit" value={"Sign Up"}/>
            </form>
        </div>
    );
};

export default SignupForm;