import React, {useContext} from 'react'
import UserContext from "../UserContext";

const SettingsItem = (props) => {

    const handleClick = (event) => {
        console.log(event.target.name);
    };
    const divStyle={position:"relative", margin: "12px 0",};
    const buttonStyle = {position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)"};

    let button = (<button name={props.name} onClick={handleClick} style={buttonStyle}>{props.btnText}</button>);
    console.log(props.noBtn);
    if(props.noBtn) button = null;

    return(
        <div style={divStyle}>
            <h3>{props.children}</h3>
            {button}
            <p>{props.value}</p>
        </div>
    )
};

const UserSettings = () => {

    const {user} = useContext(UserContext);
    const textStyle = {padding: "20px 0"};

    return(
            <div style={{margin: "100px 0"}}>
                <h1 style={{textAlign: "center"}}>Account Settings</h1>
                <div style={{width: "50%", margin: "auto"}}>
                    <SettingsItem name={"Username"} btnText={"Change Username"} value={user.username}>Username: </SettingsItem>
                    <SettingsItem name={"Email"} btnText={"Change Email"} value={user.email}>Email: </SettingsItem>
                    <SettingsItem name={"Name"} btnText={"Change Name"} value={user.name}>Name: </SettingsItem>
                    <SettingsItem name={"Verified"} btnText={"Verify Email"} value={user.verified ? 'Yes' : 'No'}
                                  noBtn={user.verified}>
                        Email Verified:
                    </SettingsItem>
                </div>
            </div>
    )
};

export default UserSettings