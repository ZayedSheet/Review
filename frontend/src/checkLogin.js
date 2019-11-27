import axios from "axios";

export const checkLogin = (setUser) => {
        let key = JSON.parse(localStorage.getItem('review_app_key'));

        axios.get('http://localhost:5000/signin/verify?token=' + key) //checks if the key is a valid key (unique and not deleted)
            .then( res => {
                if(res.data.success){ //if key is valid and unique
                    axios.get('http://localhost:5000/signin/getuserid/' + key) //retrieves the userID corresponding to the session token
                        .then(res => {
                            axios.get('http://localhost:5000/users/' + res.data) //retrieves the user document corresponding to the userID from res.data
                                .then(res => {
                                    setUser(res.data);
                                }) //sets the user document as the state
                                .catch(() => {
                                    setUser(false);
                                });
                        })
                        .catch(() => {
                            setUser(false);
                        });
                }
                console.log(res.data.message);
            });
};