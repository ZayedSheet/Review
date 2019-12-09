import axios from "axios";
import config from './config'

/**
 * Function for checking if user is logged in by checking for and verifying user token
 * @param setUser user state
 */
export const checkLogin = async (setUser) => {
    let key = JSON.parse(localStorage.getItem('review_app_key')); //sets key to the user session token
    let res;

    //checks if the key is a valid key (unique and not deleted)
    try {
        res = await axios.get(config.IP +'/signin/verify?token=' + key)
    } catch{
        setUser(false);
    }

    if(!res.data.success) return;

    //if the session exists and is unique and not deleted
    if (res.data.success){
        //gets the userid using the key
        try {
            res = await axios.get(config.IP + '/signin/getuserid/' + key)
        } catch{
            setUser(false);
        }
    }

    //gets the user document and sets it as the user state
    try {
        res = await axios.get(config.IP + '/users/' + res.data);
        setUser(res.data)
    } catch{
        setUser(false);
    }

};