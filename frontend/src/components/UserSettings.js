import React, {useContext, useState} from 'react'
import UserContext from "../UserContext";
import classes from './UserSettings.module.css';
import axios from "axios";
import config from "../config";

//TODO when user logs out go to another page
const PasswordVerifyForm = (props) => {

    const {user} = useContext(UserContext); //User data (if logged in)
    const sessionId = JSON.parse(localStorage.getItem('review_app_key'));

    const [formValues, setValues] = useState({
        sessionId: sessionId, update:{[props.field]:props.value}, username: user.username
    });

    const handleInputChange = (e) => {
        setValues({...formValues, password: e.target.value});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
        axios.post(config.IP + '/users/update', formValues)
            .then(() => {alert("Update Successful!"); props.setPass(false)})
            .catch(() => alert("Could not update!"))
    };

    return (
        <div className={"blur-background"}>
            <form onSubmit={handleSubmit} id={"pop-up-form"} className={"form-style"}>
                <span onClick={() => props.setPass(false)} className="close"/>
                <h1>Verify Password</h1>
                <div>
                    <label>Password</label>
                    <input onChange={handleInputChange} autoComplete={"password"} name="password" type="password" required/><br/>
                </div>
                <input type="submit" value="Continue"/>
            </form>
        </div>
    );
};

const SettingsItem = (props) => {
    /****  Styles and Values  ****/
    let verifyPass = null;

    /****  States  ****/
    const [isEdit, setEdit] = useState(false); //If the user is editing the field
    const [isVerifyPass, setVerifyPass] = useState(false);
    const [value, setValue] = useState(null); //value of field currently being edited

    /****  Functions  ****/
    const handleClick = (event) => {
        event.preventDefault();
        if(event.target.name !== "verified") {setEdit(!isEdit)};
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setEdit(false);
        setVerifyPass(true);
    };

    if(isVerifyPass) verifyPass = <PasswordVerifyForm setPass={setVerifyPass} field={props.name} value={value}/>;

    /**** Buttons and Button Logic ****/
    let button = (<button type={"button"} name={props.name} onClick={handleClick} className={classes.ButtonStyle}>{props.btnText}</button>);
    if(isEdit) button = (<button type={"submit"} name={props.name} className={classes.ButtonStyle}>Save</button>);
    if(props.noBtn) button = null;

    /****  Edit Input Field  ****/
    let input = (<input type={props.name} name={props.name} onChange={e => setValue(e.target.value)} placeholder={props.value}/>);


    return(
        <div className={classes.DivStyle}>
            <h3>{props.children}</h3>
            <form onSubmit={handleSubmit}>
                <div>{button}</div>
                <p>{isEdit ? input: props.value}</p>
            </form>
            {verifyPass}
        </div>
    )
};

const UserSettings = (props) => {
    const {user} = useContext(UserContext); //User data (if logged in)
    if (!user) props.setLogin(true);

    const textStyle = {padding: "20px 0"};

    return(
            <div className={classes.UserSettings}>
                <h1>Account Settings</h1>
                <div>
                    <SettingsItem name={"username"} btnText={"Change Username"} value={user.username} noBtn>Username: </SettingsItem>
                    <SettingsItem name={"email"} btnText={"Change Email"} value={user.email}>Email: </SettingsItem>
                    <SettingsItem name={"name"} btnText={"Change Name"} value={user.name}>Name: </SettingsItem>
                    <SettingsItem name={"password"} btnText={"Change Password"} value={"••••••••"}>Password: </SettingsItem>
                    <SettingsItem name={"verified"} btnText={"Verify Email"} value={user.verified ? 'Yes' : 'No'}
                                  noBtn={user.verified}>
                        Email Verified:
                    </SettingsItem>
                </div>
            </div>
    )
};

export default UserSettings