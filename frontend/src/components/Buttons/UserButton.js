import React, {useContext, useState} from 'react';
import {NavLink} from "react-router-dom";
import axios from "axios";
import config from "../../config";
import UserContext from '../../UserContext';

/**
 * Sign and login button
 * @param props properties of the component,
 *              props.formName is the form that the button toggles (either sign in or login form)
 * @returns A sign in or login Component (depending on formName property)
 */
const UserButton = (props) => {
    const {user, setUser} = useContext(UserContext);

    return(
        <>
            <button className={`user-button`} onClick={()=>{
                if (!props.userButton){
                    props.toggleUserButton(true);
                }
                else {
                    props.toggleUserButton(false);
                }
            }}/>
            {props.userButton &&
            <div className={`user-options`}>
                <NavLink to={"Settings"}>My Account</NavLink>
                <div>My Messages</div>
                <div onClick={()=>{
                    axios.post(config.IP + '/signin/logout', {token: JSON.parse(localStorage.getItem('review_app_key'))}) //sends a logout request to server
                        .then(res => console.log(res.data.message)); //console logs message from promise
                    setUser(false); //if logout button is clicked, user is set to false
                    props.toggleUserButton(false);
                }}>Logout</div>
            </div>
            }
        </>
    );
};

export default UserButton;