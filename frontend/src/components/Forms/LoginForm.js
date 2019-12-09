import React, {useContext} from 'react';
import useForm from './FormHook';
import './Form.css'
import axios from "axios";
import UserContext from "../../UserContext";
import {checkLogin} from "../../checkLogin";
import config from '../../config'

/**
 * Login Form Component
 * @returns {*}
 */
const LoginForm = (props) => {
    const {inputs, fieldNames, handleInputChange, checkSubmit} = useForm(); //retreives functions and state variables from form hook
    const {setUser} = useContext(UserContext);


    const handleSubmit = (event) => {
        event.preventDefault(); //prevents default behavior
        if(checkSubmit()){//uses formhook to check for errors in form
            axios.post(config.IP + '/signin/signin', inputs)//sends the form inputs to backend
                .then(res => {
                    console.log('res', res.data);
                    if (res.data.success) { //if successful (username and password match)
                        try {
                            localStorage.setItem('review_app_key', JSON.stringify(res.data.token)); //sets the usersession token received from backend to localstorage
                            props.setLogin(false);//closes login form
                            checkLogin(setUser);
                            setUser(true);
                        } catch (err) {
                            console.error(err);
                        }
                    }
                    else{
                        alert(res.data.message);
                    }
                })
        }
        else{
            alert("invalid inputs"); //if formhook check submit fails, inputs were invalid
        }
    };

    return (
        <div className={"blur-background"}>
            <form onSubmit={handleSubmit} id="pop-up-form" className={"form-style"}>{/*Runs the handleSubmit function from form hook when submit button is clicked*/}
                <span onClick={()=> props.setLogin(false)} className="close"/>{/*Runs the toggleForm function on click to close the form*/}
                <h1>Login</h1>
                <div>
                    <label>Username</label>
                    <input autoComplete={"username"} type="text" name={fieldNames.username} onChange={handleInputChange} value={inputs.username} required/><br/>{/*Runs the handleInputChange function in form hook on input change*/}
                </div>
                <div>
                    <label>Password</label>
                    <input autoComplete={"password"} type="password" name={fieldNames.password} onChange={handleInputChange} value={inputs.password} required/><br/>
                </div>
                <input type="submit" value="Login"/>
            </form>
        </div>
    );
};

export default LoginForm;