import React from 'react';
import useForm from './FormHook';
import './Form.css'
import axios from "axios";

/**
 * Login Form Component
 * @returns {*}
 */
const LoginForm = (props) => {
    const {inputs, fieldNames, handleInputChange, checkSubmit} = useForm(); //retreives functions and state variables from form hook

    const handleSubmit = (event) => {
        event.preventDefault();
        if(checkSubmit()){
            axios.post('http://localhost:5000/signin/signin', inputs)
                .then(res => {
                    console.log('res', res.data);
                    if (res.data.success) {
                        try {
                            localStorage.setItem('review_app_key', JSON.stringify(res.data.token));
                        } catch (err) {
                            console.error(err);
                        }
                    }
                })
        }
    };

    return (
        <div className={"blur-background"}>
            <form onSubmit={handleSubmit} id="pop-up-form" className={"form-style"}>{/*Runs the handleSubmit function from form hook when submit button is clicked*/}
                <a onClick={()=> props.setLogin(false)} className="close"/>{/*Runs the toggleForm function on click to close the form*/}
                <h1>Login</h1>
                <div>
                    <label>Username</label>
                    <input type="text" name={fieldNames.username} onChange={handleInputChange} value={inputs.username} required/><br/>{/*Runs the handleInputChange function in form hook on input change*/}
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name={fieldNames.password} onChange={handleInputChange} value={inputs.password} required/><br/>
                </div>
                <input type="submit" value="Login"/>
            </form>
        </div>
    );
};

export default LoginForm;