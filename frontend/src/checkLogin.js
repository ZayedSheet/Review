import axios from "axios";

export const checkLogin = async (setUser) => {
    let key = JSON.parse(localStorage.getItem('review_app_key'));
    let res;

    //checks if the key is a valid key (unique and not deleted)
    try {
        res = await axios.get('http://localhost:5000/signin/verify?token=' + key)
    } catch{
        setUser(false);
    }

    //if the session exists and is unique and not deleted
    if (res.data.success){
        //gets the userid using the key
        try {
            res = await axios.get('http://localhost:5000/signin/getuserid/' + key)
        } catch{
            setUser(false);
        }
    }

    //gets the user document and sets it as the state
    try {
        res = await axios.get('http://localhost:5000/users/' + res.data);
        setUser(res.data)
    } catch{
        setUser(false);
    }

    // axios.get('http://localhost:5000/signin/verify?token=' + key) //checks if the key is a valid key (unique and not deleted)
    //     .then( res => {
    //         if(res.data.success){ //if key is valid and unique
    //             axios.get('http://localhost:5000/signin/getuserid/' + key) //retrieves the userID corresponding to the session token
    //                 .then(res => {
    //                     axios.get('http://localhost:5000/users/' + res.data) //retrieves the user document corresponding to the userID from res.data
    //                         .then(res => {
    //                             setUser(res.data);
    //                         }) //sets the user document as the state
    //                         .catch(() => {
    //                             setUser(false);
    //                         });
    //                 })
    //                 .catch(() => {
    //                     setUser(false);
    //                 });
    //         }
    //         console.log(res.data.message);
    //     });
};