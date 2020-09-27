import React, {useState, useEffect} from 'react';
import './area.css'
import Star from "./Submission/Star";
import Review from "./Submission/Review"
import MapContainer from "./MapContainer";
// import Image from './Gallery/Image';
import axios from 'axios';
import AddReviewForm from "./Forms/AddReviewForm";
import config from "../config";
import {Gallery, Image} from "./Gallery/Gallery";

const Area = (props) => {

    let photoUrl = "https://review-bucket-react.s3.us-east-2.amazonaws.com/" + props.match.params.name.replace(" ", "+") + "/cover.png";

    const [area, setArea] = useState({});
    const [reviews, setReviews] = useState(false);
    const [ratings, setRatings] = useState({1: [], 2:[], 3:[], 4:[], 5:[]});
    const [visibleRating, setVisibleRating]= useState([]);
    const [ratingStyle, setRatingStyle] = useState(5);


    const getReviews = () => {
       axios.get(`${config.IP}/reviews/find/byObjectName/${props.match.params.name}`)
            .then(res => {
                setReviews(res.data);
            })
           .catch();
    };

    const sortReviews = () => {
        for(let i = 0; i < reviews.length; i++){
            let tempRating = {...ratings}; //copy the rating object to tempRating
            tempRating[reviews[i].stars].push(<Review title={reviews[i].title} date={reviews[i].createdAt} key={reviews[i]._id} username={reviews[i].username}>{reviews[i].description}</Review>); //access the ratings index required and push this review into the array for that ratings index
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

    const toggleVisibleRating = (rating) => {
        setVisibleRating(ratings[rating]);
        setRatingStyle(rating);
    };

    let photoStyle = {
        backgroundImage: `url(${photoUrl})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    };

    const ratingMap = {};
    let totalReviews = 0;
    if (area?.coordinates) {
        totalReviews = area.rating.one + area.rating.two + area.rating.three + area.rating.four + area.rating.five;
        ratingMap[1] = {percentage: Math.round(area.rating.one/totalReviews * 100) || 0, count: area.rating.one};
        ratingMap[2] = {percentage: Math.round(area.rating.two/totalReviews * 100) || 0, count: area.rating.two};
        ratingMap[3] = {percentage: Math.round(area.rating.three/totalReviews * 100) || 0, count: area.rating.three};
        ratingMap[4] = {percentage: Math.round(area.rating.four/totalReviews * 100) || 0, count: area.rating.four};
        ratingMap[5] = {percentage: Math.round(area.rating.five/totalReviews * 100) || 0, count: area.rating.five};
    }

    return (
        <div className="area-container">
             {area && area.coordinates && (
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
                            <Gallery>
                                <Image style={photoStyle} className="overview-main-image">
                                    <h1>Photo (4)</h1>
                                </Image>
                                <Image style={{...photoStyle, backgroundImage: "url(https://www.pennington.com/-/media/images/pennington2-na/us/blog/seed/all-you-need-to-know-about-bermudagrass/bermuda-header.jpg)"}}
                                       className="side-image overview-size-image1"/>
                                <Image className="side-image overview-size-image2"/>
                                <Image className="side-image overview-size-image3"/>
                            </Gallery>
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
                                {
                                    Object.entries(ratingMap).map(([stars, rating]) => (
                                        <li>
                                            <div style={{color: ratingStyle===stars ? "#0F52BA" : "black"}} onClick={() => toggleVisibleRating(stars)} className="left-style five-overview">
                                                {stars} Star Reviews
                                            </div>
                                            <div style={{backgroundSize: `${rating.percentage}% 100%`}} className="right-style overview-bar">
                                                {rating.percentage}%
                                            </div>
                                        </li>
                                    ))
                                }
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
                                            <Review date={review.createdAt} key={review._id} username={review.username} title={review.title} stars={review.stars}>{review.description}</Review>)
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        </div>
    );
};

export default Area;