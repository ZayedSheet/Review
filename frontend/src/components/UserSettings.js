import React, {useContext} from 'react'
import UserContext from "../UserContext";

const UserSettings = () => {

    const {user} = useContext(UserContext);

    const handleClick = (event) => {
        console.log(event.target.name);
    };

    const divStyle={position:"relative", margin: "12px 0",};
    const textStyle = {padding: "20px 0"};
    const buttonStyle = {position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)"};


    return(
            <div style={{margin: "100px 0"}}>
                <h1 style={{textAlign: "center"}}>Account Settings</h1>
                <div style={{width: "50%", margin: "auto"}}>
                    <div style={divStyle}>
                        <button name={"Username"} onClick={handleClick} style={buttonStyle}>Change Username</button>
                        <h3>Username: </h3>
                        <p>{user.username}</p>
                    </div>
                    <div style={divStyle}>
                        <button name={"Email"} onClick={handleClick} style={buttonStyle}>Change Email</button>
                        <h3>Email: </h3>
                        <p>{user.email}</p>
                    </div>
                    <div style={divStyle}>
                        <button name={"Name"} onClick={handleClick} style={buttonStyle}>Change Email</button>
                        <h3>Name:</h3>
                        <p>{user.name}</p>
                    </div>
                    <div style={divStyle}>
                        <button name={"Verified"} onClick={handleClick} style={buttonStyle}>Verify Email</button>
                        <h3>Email Verified: </h3>
                        <p>{user.verified ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            </div>
    )
};

export default UserSettings