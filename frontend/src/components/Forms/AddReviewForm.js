import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios';
import useForm from './FormHook';
import UserContext from "../../UserContext";
import config from "../../config";


const AddReviewForm = (props) => {

    const {user} = useContext(UserContext); //user state
    const [stars, setStars] = useState(0); //stars state initially zero
    const [visibility, setVisible] = useState(true); //state for visibility of form
    const {inputs, setInputs, handleInputChange} = useForm(); //retreives functions and state variables from form hook

    const handleSubmit = async (event) => {
        event.preventDefault(); //prevents default form behavior
        if (user){ //if user is logged in
            try{
                console.log("start");
                let key = JSON.parse(localStorage.getItem('review_app_key')); //sets key to the user session token
                await axios.post(config.IP + "/reviews/add", {...inputs, token: key}); //sends request to server to add the review with inputs (From form hook) as input
                console.log("Post");
                setVisible(false); //review form is no longer visible as it has just been submitted
                console.log("visibility");
                let date = new Date();
                date = date.toISOString();
                console.log("passing the date", date);
                props.setReviews([...props.reviews, //adds the review the user just submitted to the page to the reviews state for area page
                    {_id:"newReview", title:inputs.title, createdAt: date, username: inputs.username, stars: inputs.stars, description: inputs.description}
                    ]);
                console.log("reviewSet");
                props.updateObject();
                console.log("object update");
            }catch {
                alert("Duplicate Review or Improper Format") //if request to server fails
            }
        }else{alert("Not signed in");} //if user not signed in
    };
    useEffect(() => {
        let username = user.username ? user.username : false; //if user is logged in sets username variable
        setInputs({...inputs, username: username, object_name: props.objectname}); //adds username and object_name objects to input state
    },[user]);

    let starRating = []; //array for stars for review form
    for(let i = 5; i > 0 ; i--) { //creates 5 stars
        starRating.push(<i
            key={i}
            onClick={() => {setStars(i); setInputs({...inputs, stars: i})}} //if clicked sets star into input as the star # that was clicked
            onMouseEnter={() => setStars(i)} //makes stars gold on hover
            onMouseLeave={() => setStars(inputs.stars)} //sets stars back to what it previous was before mouse hover
            style={{color: i < stars + 1 ? "gold" : "grey"}}
            className="fas fa-star star"/>)
    }

    let reviewForm = ( //review form jsx
        <div className="submit-review-border">
            <h1>Submit Your Own Review!</h1>
            <form onSubmit={handleSubmit} className="review-form" action="">
                <div className="review-form-item">
                    <label>Rating</label>
                    {starRating}
                </div>
                <div className="review-form-item">
                    <label htmlFor="review-title">Title</label>
                    <input onChange={handleInputChange} type="text" id="review-title" name="title" placeholder=""/>
                </div>
                <div className="review-form-item">
                    <label htmlFor="review-description">Description</label>
                    <textarea onChange={handleInputChange} id="review-description" name="description" rows="100" cols="100"/>
                </div>
                <div className="review-form-item">
                    <input type="submit" value="Submit"/>
                </div>
            </form>
        </div>
    );

    if (!visibility) { //if the reviewform is not visible (has been submitted)
        reviewForm = ( //instead of a review form a review submitted div appears
            <div className="submit-review-border">
                <h1>Review Submitted</h1>
            </div>
        );
    }

    return( //returns reviewForm
        <div className="submit-review-form">
            {reviewForm}
        </div>

    )
};

export default AddReviewForm