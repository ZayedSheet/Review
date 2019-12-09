import React, {useState, useEffect} from 'react';
import './area.css'
import Star from "./Submission/Star";
import Review from "./Submission/Review"
import MapContainer from "./MapContainer";
import axios from 'axios';
import AddReviewForm from "./Forms/AddReviewForm";
import config from "../config";

const Area = (props) => {

    let photoUrl = "https://review-bucket-react.s3.us-east-2.amazonaws.com/" + props.match.params.name.replace(" ", "+") + "/cover.png";

    const [area, setArea] = useState({});
    const [reviews, setReviews] = useState(false);

    const getReviews = () => {
        axios.get(config.IP + "/reviews/find/byObjectName/" + props.match.params.name)
            .then(res =>
                setReviews(res.data.map(review => <Review key={review._id} username={review.username} stars={review.stars}>
                    {review.description}
                </Review>)))
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
        const getValues = async () => {
            await getObject();
            getReviews();
        };
        getValues().then();
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
                        <div style={photoStyle} className="overview-main-image">
                            <h1>Photo (1)</h1>
                        </div>
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
                                <div className="active-review left-style five-overview ">5 Star Reviews</div>
                                <div style={{backgroundSize: fiveStarPercent + "% 100%"}}
                                    className="right-style overview-bar">{fiveStarPercent}%</div>
                            </li>
                            <li>
                                <div className="left-style four-overview">4 Star Reviews</div>
                                <div style={{backgroundSize: fourStarPercent + "% 100%"}}
                                    className="right-style overview-bar">{fourStarPercent}%</div>
                            </li>
                            <li>
                                <div className="left-style three-overview">3 Star Reviews</div>
                                <div style={{backgroundSize: threeStarPercent + "% 100%"}}
                                    className="right-style overview-bar">{threeStarPercent}%</div>
                            </li>
                            <li>
                                <div className="left-style two-overview">2 Star Reviews</div>
                                <div style={{backgroundSize: twoStarPercent + "% 100%"}}
                                     className="right-style overview-bar">{twoStarPercent}%</div>
                            </li>
                            <li>
                                <div className="left-style one-overview">1 Star Reviews</div>
                                <div style={{backgroundSize: oneStarPercent + "% 100%"}}
                                     className="right-style overview-bar">{oneStarPercent}%</div>
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

                    <AddReviewForm objectname={area.name} updateObject={getObject} setReviews={setReviews} reviews={reviews}/>

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