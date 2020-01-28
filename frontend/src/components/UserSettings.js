import React, {useContext, useState} from 'react'
import UserContext from "../UserContext";

const PasswordVerifyForm = () => {

    const handleSubmit = () => {

    };

    return (
        <div className={"blur-background"}>
            <form onSubmit={handleSubmit} id={"pop-up-form"} className={"form-style"}>{/*Runs the handleSubmit function from form hook when submit button is clicked*/}
                <span className="close"/>{/*Runs the toggleForm function on click to close the form*/}
                <h1>Verify Password</h1>
                <div>
                    <label>Password</label>
                    <input autoComplete={"password"} type="password" required/><br/>
                </div>
                <input type="submit" value="Continue"/>
            </form>
        </div>
    );
}

const SettingsItem = (props) => {
    /****  Styles and Values  ****/
    const divStyle={position:"relative", margin: "12px 0",};
    const buttonStyle = {position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)"};
    let verifyPass = null;

    /****  States  ****/
    const [isEdit, setEdit] = useState(false); //If the user is editing the field

    /****  Functions  ****/
    const handleClick = (event) => {
        if (!isEdit){

        }
        if(event.target.name !== "verified") setEdit(!isEdit);
    };


    /**** Buttons and Button Logic ****/
    let button = (<button name={props.name} onClick={handleClick} style={buttonStyle}>{props.btnText}</button>);
    if(isEdit) button = (<button name={props.name} onClick={handleClick} style={buttonStyle}>Save</button>);
    if(props.noBtn) button = null;

    /****  Edit Input Field  ****/
    let input = (<input placeholder={props.value}/>);


    return(
        <div style={divStyle}>
            <h3>{props.children}</h3>
            <div>{button}</div>
            <p>{isEdit ? input: props.value}</p>
            {verifyPass}
        </div>
    )
};

const UserSettings = (props) => {
    const {user} = useContext(UserContext); //User data (if logged in)
    console.log(user);
    if (!user) props.setLogin(true);

    const textStyle = {padding: "20px 0"};

    return(
            <div style={{margin: "100px 0"}}>
                <h1 style={{textAlign: "center"}}>Account Settings</h1>
                <div style={{width: "50%", margin: "auto"}}>
                    <SettingsItem name={"username"} btnText={"Change Username"} value={user.username}>Username: </SettingsItem>
                    <SettingsItem name={"email"} btnText={"Change Email"} value={user.email}>Email: </SettingsItem>
                    <SettingsItem name={"name"} btnText={"Change Name"} value={user.name}>Name: </SettingsItem>
                    <SettingsItem name={"verified"} btnText={"Verify Email"} value={user.verified ? 'Yes' : 'No'}
                                  noBtn={user.verified}>
                        Email Verified:
                    </SettingsItem>
                </div>
            </div>
    )
};

export default UserSettings