import React from 'react';
import useForm from './FormHook';
import './Form.css'

/**
 * Login Form Component
 * @returns {*}
 */
const LoginForm = (props) => {
    const {inputs, nameFields, handleInputChange, handleSubmit} = useForm(); //retreives functions and state variables from form hook


    return (
        <div className={"blur-background"}>
            <form onSubmit={handleSubmit} id="pop-up-form" className={"form-style"}>{/*Runs the handleSubmit function from form hook when submit button is clicked*/}
                <a onClick={()=> props.setLogin(false)} className="close"/>{/*Runs the toggleForm function on click to close the form*/}
                <h1>Login</h1>
                <div>
                    <label>Username</label>
                    <input type="text" name={nameFields.username} onChange={handleInputChange} value={inputs.username} required/><br/>{/*Runs the handleInputChange function in form hook on input change*/}
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name={nameFields.password} onChange={handleInputChange} value={inputs.password} required/><br/>
                </div>
                <input type="submit" value="Login"/>
            </form>
        </div>
    );
};

export default LoginForm;