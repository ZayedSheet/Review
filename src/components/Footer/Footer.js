import React from 'react';
import './Footer.css';

const Footer = () => {

    return (
        <footer className="web-footer">
            <div className="left-side">
                <h4>Contact Us:</h4>
                <h5>Phone Number: (905) 525-9140</h5>
                <h5>Address: 1280 Main St W, Hamilton, ON L8S 4L8</h5>
                <h6><br/><br/>Areago © 2019</h6>
            </div>
            <div className="right-side">

                <a><i className="fab fa-twitter"></i></a>
                <a><i className="fab fa-facebook-f"></i></a>
            </div>
        </footer>

    );
}

export default Footer;