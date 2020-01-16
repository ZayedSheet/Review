import React, {useState, useEffect} from 'react';
import './area.css'
import Star from "./Submission/Star";
import Review from "./Submission/Review"
import MapContainer from "./MapContainer";
import Image from './Image';
import axios from 'axios';
import AddReviewForm from "./Forms/AddReviewForm";
import config from "../config";

const Area = (props) => {

    let photoUrl = "https://review-bucket-react.s3.us-east-2.amazonaws.com/" + props.match.params.name.replace(" ", "+") + "/cover.png";

    const [area, setArea] = useState({});
    const [reviews, setReviews] = useState(false);
    const [ratings, setRatings] = useState({1: [], 2:[], 3:[], 4:[], 5:[]});
    const [visibleRating, setVisibleRating]= useState([]);
    const [ratingStyle, setRatingStyle] = useState(5);

    const getReviews = () => {
       axios.get(config.IP + "/reviews/find/byObjectName/" + props.match.params.name)
            .then(res => {
                setReviews(res.data);
            })
           .catch();
    };


    const sortReviews = () => {
        for(let i = 0; i < reviews.length; i++){
            let tempRating = {...ratings}; //copy the rating object to tempRating
            tempRating[reviews[i].stars].push(<li><Review key={reviews[i]._id} username={reviews[i].username}>{reviews[i].description}</Review></li>); //access the ratings index required and push this review into the array for that ratings index
            setRatings(tempRating); //set the new rating
        }
        setVisibleRating(ratings[5]);
    };



    const getObject = () => {
        axios.post(config.IP + "/objects", {name: props.match.params.name})
            .then(res => {
                setArea(res.data[0]);
            }).catch(() => {
            setArea({});
        });
    };

    useEffect(  () => {
        setRatings({1: [], 2:[], 3:[], 4:[], 5:[]});
        console.log("running useEffect, Ratings = ",ratings, "Reviews =", reviews);
        const getValues = async () => {
            await getObject();
            getReviews();
        };
        getValues().then();
        }, [props.match.params.name]
    );

    useEffect(()=> {
        sortReviews()
    }
    ,[reviews]);


    let page;

    const toggleVisibleRating = (rating) => {
        setVisibleRating(ratings[rating]);
        setRatingStyle(rating);
    };

    let photoStyle = {
        backgroundImage: "url(" + photoUrl + ")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    };

    if(area && area.coordinates){
        const totalReviews = area.rating.one + area.rating.two + area.rating.three + area.rating.four + area.rating.five;
        const oneStarPercent = Math.round(area.rating.one/totalReviews * 100) || 0;
        const twoStarPercent = Math.round(area.rating.two/totalReviews * 100) || 0;
        const threeStarPercent = Math.round(area.rating.three/totalReviews * 100) || 0;
        const fourStarPercent = Math.round(area.rating.four/totalReviews * 100) || 0;
        const fiveStarPercent = Math.round(area.rating.five/totalReviews * 100) || 0;
        page = (
            <>
                <div className="description">
                    <h1>{area.name}</h1>
                    <li className="known-for">
                        <span>Tourist Region</span>
                        <span>Waterfall</span>
                        <span>Nature</span >
                    </li>
                    <p>{area.overview}</p>
                </div>

                <div className="obj-overview-content">
                    <div id="remove-style" className="obj-pictures">
                        <Image style={photoStyle} className="overview-main-image">
                            <h1>Photo (1)</h1>
                        </Image>
                        <div className="side-image overview-side-image1"/>
                        <div className="side-image overview-side-image2"/>
                        <div className="side-image overview-side-image3"/>
                    </div>
                    <div className="obj-review-overview">
                        <h1>Review Overview</h1>
                        <div className="obj-overview-rating">
            <span>Rating
            <Star value={Math.round(area.rating.average)}/>
            </span>
                            <span className="obj-overview-rating-allreviews">{totalReviews}</span>
                        </div>
                        <div className="obj-overview-list">
                            <li>
                                <div style={ratingStyle===5 ? {color: "#0F52BA"} : {color: "black"}} onClick={() => toggleVisibleRating(5)} className="left-style five-overview ">5 Star Reviews</div>
                                <div style={{backgroundSize: fiveStarPercent + "% 100%"}}
                                    className="right-style overview-bar">{fiveStarPercent}%</div>
                            </li>
                            <li>
                                <div style={ratingStyle===4 ? {color: "#0F52BA"} : {color: "black"}} onClick={() => toggleVisibleRating(4)} className="left-style four-overview">4 Star Reviews</div>
                                <div style={{backgroundSize: fourStarPercent + "% 100%"}}
                                    className="right-style overview-bar">{fourStarPercent}%</div>
                            </li>
                            <li>
                                <div style={ratingStyle===3 ? {color: "#0F52BA"} : {color: "black"}} onClick={() => toggleVisibleRating(3)} className="left-style three-overview">3 Star Reviews</div>
                                <div style={{backgroundSize: threeStarPercent + "% 100%"}}
                                    className="right-style overview-bar">{threeStarPercent}%</div>
                            </li>
                            <li>
                                <div style={ratingStyle===2 ? {color: "#0F52BA"} : {color: "black"}} onClick={() => toggleVisibleRating(2)} className="left-style two-overview">2 Star Reviews</div>
                                <div style={{backgroundSize: twoStarPercent + "% 100%"}}
                                     className="right-style overview-bar">{twoStarPercent}%</div>
                            </li>
                            <li>
                                <div style={ratingStyle===1 ? {color: "#0F52BA"} : {color: "black"}} onClick={() => toggleVisibleRating(1)} className="left-style one-overview">1 Star Reviews</div>
                                <div style={{backgroundSize: oneStarPercent + "% 100%"}}
                                     className="right-style overview-bar">{oneStarPercent}%</div>
                            </li>
                        </div>
                        <div className="obj-overview-reviews">
                            <div className="overview-review-list">
                                {visibleRating}
                            </div>
                        </div>
                    </div>
                    <div className="obj-travel-overview">
                        <div className="travel-info">
                            <h2>Travel Overview</h2>
                            <div>
                                <h3><i className="fa fa-globe" aria-hidden="true"/> Location: <br/> {area.country}, {area.city}</h3>
                                <h3><i className="fas fa-map"/> Area: <br/> {area.name}</h3>
                                <h3><i className="fa fa-map-marker" aria-hidden="true"/> Latitute,
                                    Longitude: <br/> {area.coordinates.latitude.toFixed(6)} N, {area.coordinates.longitude.toFixed(6)} W</h3>
                            </div>
                        </div>
                        <div className="overview-map">
                            <MapContainer center={{ lat: area.coordinates.latitude, lng: area.coordinates.longitude}}/>
                        </div>
                    </div>
                    <div className="obj-location-overview">
                        <h2> Location Overview</h2>
                        <p>Niagara is a region located in south Ontario, Canada, between Lake Ontario and Lake Erie. It is
                            an 'area of wonder' with a breathtaking waterfall, nature trails, events and festivities and
                            lush vineyards</p>
                        <h3><i className="fas fa-desktop"/> https://niagarafalls.ca/</h3>
                        <h3><i className="fas fa-clock"/> Closes In: 5H</h3>
                        <h3><i className="fas fa-clock"/> People typically spend: 3H here</h3>
                    </div>
                </div>

                <div className="obj-reviews">

                    <AddReviewForm objectname={area.name} updateObject={getObject} setReviews={setReviews} reviews={reviews}/>

                    <div id="reviews" className="obj-review">
                        <div className="obj-review-list">
                            <ul>
                                {reviews &&
                                reviews.map(review =>
                                    <Review key={review._id} username={review.username} stars={review.stars}>{review.description}</Review>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        )

    }



    return (
        <div className="area-container">
            {page}
        </div>
    );
};

export default Area;