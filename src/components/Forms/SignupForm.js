import React, { useRef } from 'react';
import useSignUpForm from './FormHook';

const SignupForm = () => {
    // let displayName = "displayName";
    // let userEmail = "userEmail";
    // let userName = "userName";
    // let userPassword = "userPassword";
    // let terms = "terms";
    // let initialErrors = {displayName: null, userEmail: null,}
    const {inputs, handleInputChange, handleSubmit, displayError, validationErrors} = useSignUpForm(5);
    console.log({validationErrors});

    const toggleForm = () => {
        document.getElementById("signup").classList.toggle("signup");
    }

    return (
        <div className={"blur-background"}>
            <form onSubmit={handleSubmit} id="pop-up-form" className={"form-style"}>
                    <a onClick={toggleForm} className="close"/>
                    <h1>Create an Account</h1>
                    <div>
                        <label>Name</label>
                        <input onBlur={displayError} type="text" name="displayName" onChange={handleInputChange} value={inputs.displayName}/><br/>
                        <p for="displayName" className={"error-message myclass"}/>
                    </div>
                    <div>
                        <label>Email</label>
                        <input onBlur={displayError} type="email" name="userEmail" onChange={handleInputChange} value={inputs.userEmail}/><br/>
                        <p for="userEmail" className={"error-message"}/>
                    </div>
                    <div>
                        <label>Username</label>
                        <input onBlur={displayError} type="text" name="userName"onChange={handleInputChange} value={inputs.userName}/><br/>
                        <p for="userName" className={"error-message"}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input onBlur={displayError} type="password" name="userPassword" onChange={handleInputChange} value={inputs.userPassword}/><br/>
                        <p for="userPassword" className={"error-message"}/>
                    </div>
                    {/*<label>Re-enter Password</label>*/}
                    {/*<input type="password" id="passwordConfirm" name="password" onChange={handleInputChange} value={inputs.passwordConfirm}/><br/>*/}
                    <div class="terms-and-conditions">
                        <input type="checkbox" id="terms" name="terms" onChange={handleInputChange} value="true"/>I accept the Terms and Conditions
                    </div>
                    <input type="submit" value={"Sign Up"}/>
            </form>
        </div>
    );
}

export default SignupForm;