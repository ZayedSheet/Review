import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios';
import useForm from './FormHook';
import UserContext from "../../UserContext";
import Star from "../Submission/Star";
import Review from "../Submission/Review";


const AddReviewForm = (props) => {

    const {user} = useContext(UserContext);
    const [visibility, setVisible] = useState(true);
    const {inputs, setInputs, handleInputChange} = useForm(); //retreives functions and state variables from form hook
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (user){
            try{
                await axios.post("http://localhost:5000/reviews/add", inputs);
                setVisible(false);
                props.setReviews([...props.reviews,
                    <Review username={inputs.username} stars={inputs.stars}>
                        {inputs.description}
                    </Review>]);
            }catch {
                alert("Duplicate Review or Improper Format")
            }
            // axios.post("http://localhost:5000/reviews/add", inputs)
            //     .then(() => {
            //         props.setReviews([...props.review,
            //             <Review username={inputs.username} stars={inputs.stars}>
            //                 {inputs.description}
            //             </Review>]);
            //         setVisible(false);
            //     })
            //     .catch(() => alert("Duplicate Review or Improper Format"))
        }else{alert("Not signed in");}
    };
    useEffect(() => {
        let username = user.username ? user.username : false;
        setInputs({...inputs, username: username, stars:5, object_name: props.objectname});
    },[user]);

    console.log(inputs);

    let reviewForm = (
        <div className="submit-review-border">
            <h1>Submit Your Own Review!</h1>
            <form onSubmit={handleSubmit} className="review-form" action="">
                <div className="review-form-item">
                    <label>Rating</label>
                    <Star value={5}/>
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

    if (!visibility) {
        reviewForm = (
            <div className="submit-review-border">
                <h1>Review Submitted</h1>
            </div>
        );
    }

    return(
        <div className="submit-review-form">
            {reviewForm}
        </div>

    )
};

export default AddReviewForm