import React from 'react';

import useSignUpForm from './FormHook';

/**
 * Sign up form component
 * @returns {*}
 */
const SignupForm = (props) => {

    const {inputs, handleInputChange, handleSubmit, displayError, validationErrors, errorMessage} = useSignUpForm(); //retrieves the following functions and state variables from the form hook
    console.log({validationErrors});


    return (
        <div className={"blur-background"}>
            <form onSubmit={handleSubmit} id="pop-up-form" className={"form-style"}>{/*Runs the handleSubmit function from form hookwhen the submit button is clicked*/}
                    <a onClick={() => props.setSignup(false)} className="close" />{/*closes the form on click by running toggleForm function*/}
                    <h1>Create an Account</h1>
                    <div>
                        <label>Name</label>
                        <input onBlur={displayError} type="text" name="displayName" onChange={handleInputChange} value={inputs.displayName} required/><br/>{/*Runs the displayError function from form hook onBlur (when the field loses focus)*/}
                        <p htmlFor="displayName" className={"error-message myclass"}>{errorMessage.displayName}</p>{/*paragraph element to display any errors with the input of the field*/}
                    </div>
                    <div>
                        <label>Email</label>
                        <input onBlur={displayError} type="email" name="userEmail" onChange={handleInputChange} value={inputs.userEmail} required/><br/>{/*runs the handleInputChange function from form hook on input change*/}
                        <p htmlFor="userEmail" className={"error-message"}>{errorMessage.userEmail}</p>
                    </div>
                    <div>
                        <label>Username</label>
                        <input onBlur={displayError} type="text" name="userName" onChange={handleInputChange} value={inputs.userName} required/><br/>
                        <p htmlFor="userName" className={"error-message"}>{errorMessage.userName}</p>
                    </div>
                    <div>
                        <label>Password</label>
                        <input onBlur={displayError} type="password" name="userPassword" onChange={handleInputChange} value={inputs.userPassword} required/><br/>
                        <p htmlFor="userPassword" className={"error-message"}>{errorMessage.userPassword}</p>
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