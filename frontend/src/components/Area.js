import React, {useState, useEffect} from 'react';
import './area.css'
import Star from "./Submission/Star";
import Review from "./Submission/Review"
import MapContainer from "./MapContainer";
import axios from 'axios';
import AddReviewForm from "./Forms/AddReviewForm";

const Area = (props) => {

    let photoUrl = "https://review-bucket-react.s3.us-east-2.amazonaws.com/" + props.match.params.name.replace(" ", "+") + "/cover.png";
    console.log(photoUrl);

    const [area, setArea] = useState({});
    const [reviews, setReviews] = useState(false);

    const getReviews = () => {
        axios.get("http://localhost:5000/reviews/find/byObjectName/" + props.match.params.name)
            .then(res =>
                setReviews(res.data.map(review => <Review username={review.username} stars={review.stars}>
                    {review.description}
                </Review>)))
    };

    useEffect(  () => {
        axios.post("http://localhost:5000/objects", {name: props.match.params.name})
                .then(res => {
                    setArea(res.data[0]);
                    getReviews();
                }).catch(() => {
                    setArea({});
                });
        }, [props.match.params.name]
    );

    //TODO - Page when area not found

    let page;

    let photoStyle = {
        backgroundImage: "url(" + photoUrl + ")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    };

    if(area && area.coordinates){
        page = (
            <>
                <div className="description">
                    <h1>{area.name}</h1>
                    <li className="known-for">
                        <span>Tourist Region</span>
                        <span>Waterfall</span>
                        <span>Nature</span>
                    </li>
                    <p>{area.overview}</p>
                </div>

                <div className="obj-overview-content">
                    <div id="remove-style" className="obj-pictures">
                        <div style={photoStyle} className="overview-main-image">
                            <h1>Photo (22)</h1>
                        </div>
                        <div className="side-image overview-side-image1"/>
                        <div className="side-image overview-side-image2"/>
                        <div className="side-image overview-side-image3"/>
                    </div>
                    <div className="obj-review-overview">
                        <h1>Review Overview</h1>
                        <div className="obj-overview-rating">
            <span>Rating
            <Star value={5}/>
            </span>
                            <a href="#reviews" className="obj-overview-rating-allreviews"> 39 Reviews</a>
                        </div>
                        <div className="obj-overview-list">
                            <li>
                                <div className="active-review left-style five-overview ">5 Star Reviews</div>
                                <div className="right-style five-overview-bar">95%</div>
                            </li>
                            <li>
                                <div className="left-style four-overview">4 Star Reviews</div>
                                <div className="right-style four-overview-bar">5%</div>
                            </li>
                            <li>
                                <div className="left-style three-overview">3 Star Reviews</div>
                                <div className="right-style three-overview-bar">0%</div>
                            </li>
                            <li>
                                <div className="left-style two-overview">2 Star Reviews</div>
                                <div className="right-style two-overview-bar">0%</div>
                            </li>
                            <li>
                                <div className="left-style one-overview">1 Star Reviews</div>
                                <div className="right-style one-overview-bar">0%</div>
                            </li>
                        </div>
                        <div className="obj-overview-reviews">
                            <div className="overview-review-list">
                                <li><h3>Username1</h3><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex,
                                    soluta!</p></li>
                                <li><h3>Username2</h3><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta
                                    consectetur voluptatum beatae sint voluptate illo, ipsa quis labore assumenda excepturi
                                    dignissimos adipisci. Dolorum esse ab ipsam molestiae sequi vero voluptas.</p></li>
                                <li><h3>Username3</h3><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
                                    eligendi dolore dicta at quasi nisi.</p></li>
                                <li><h3>Username4</h3><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
                                    odio eligendi consequatur perspiciatis earum officia modi dolorum illum voluptatem
                                    sit!</p></li>
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

                    <AddReviewForm objectname={area.name} setReviews={setReviews} reviews={reviews}/>

                    <div id="reviews" className="obj-review">
                        <div className="obj-review-list">
                            {reviews}
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