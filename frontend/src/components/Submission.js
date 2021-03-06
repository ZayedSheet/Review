import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import useForm from './Forms/FormHook';
import UserContext from '../UserContext';
import LocationSearch from './Search/LocationSearch'
import conf from "../config";

/**
 * Submission page where users can add an area (a object) to the website
 * @returns A Submission Page Component
 */
const Submission = (props) => {
    const {inputs, handleInputChange, setInputs} = useForm(); //retrieves the following functions and state variables from the form hook
    const {user} = useContext(UserContext);
    const [file, setFile] = useState({});

    useEffect(() => {
        setInputs({country: "CA"});
    }, []);

    const upload = (url) => {
        console.log("URL: ", url);

        axios.put(url,new File(file, "cover.png"))
            .then(res => {console.log("Done: ", res);})
            .catch(err => {console.log('err', err);});
    };

    const getFile = (event) => {
        console.log("getting file");
        setFile(event.target.files);
        console.log(event.target.files);
    };

    /**
     * Function that handles the form's submit
     * @param event submit event
     */
    const handleSubmit = (event) => {
        event.preventDefault(); //prevents default form submit action
        if (user) { //if user is logged in, sends post request to server with inputs from form hook as input, and coordinates object appended to it
            axios.post(conf.IP + '/objects/add', {...inputs, coordinates:{latitude: inputs.latitude, longitude: inputs.longitude}, username: user})
                .then(async (res) => {
                    await upload(res.data.putURL);
                    alert("Area Added!");
                    setTimeout(() => props.history.push('/area/' + inputs.name),500);
                }).catch((e) => {alert("Duplicate Object, Invalid Inputs, or Error Uploading Image");console.log(e)})
                .catch(res => {alert("Duplicate Object or Invalid Inputs"); console.log(res.message)}); //if an issue with posting occurs, log the message
        }
        else {
            alert("no user");
        }
    };

    /*
    Coordinates (longitude and latitude) of the user, set the false until the button is clicked to retrieve them
     */
    let coords = {longitude: false, latitude:false};

    /**
     * Checks if the geolocation api is supported,
     * if it is the location will be initalized via showPosition function
     */
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosition);
        } else {
            alert("Geolocation unsupported");
        }
    }

    /**
     * Initializes the coordinates of the user, and displays them to the user
     * @param position The longitude and latitude of the user,
     * obtained from the geoLoaction api.l
     */
    function getPosition(position) {
        coords = {longitude: position.coords.longitude, latitude: position.coords.latitude};

        document.querySelector("input[name='longitude']").value = coords.longitude;
        document.querySelector("input[name='latitude']").value = coords.latitude;
        setInputs(
            inputs => ({...inputs, latitude: coords.latitude, longitude: coords.longitude})
        );
    }
    const addressComplete = (
        <>
            <div>
                <label htmlFor="city">City</label>
                <input onChange={handleInputChange} type="text" name="city" placeholder="City Name.." pattern="^([a-zA-Z]+\s)*[a-zA-Z]+$" required/><br/>
            </div>
            <div>
                <label htmlFor="country">Country</label>
                {/*Select Input is used to only allow one country to be selected from a set of predetermined options*/}
                <select onChange={handleInputChange} name="country">
                    <option value="CA">Canada</option>
                    <option value="US">United States</option>
                    <option value="AF">Afghanistan</option>
                    <option value="AX">Åland Islands</option>
                    <option value="AL">Albania</option>
                    <option value="DZ">Algeria</option>
                    <option value="AS">American Samoa</option>
                    <option value="AD">Andorra</option>
                    <option value="AO">Angola</option>
                    <option value="AI">Anguilla</option>
                    <option value="AQ">Antarctica</option>
                    <option value="AG">Antigua and Barbuda</option>
                    <option value="AR">Argentina</option>
                    <option value="AM">Armenia</option>
                    <option value="AW">Aruba</option>
                    <option value="AU">Australia</option>
                    <option value="AT">Austria</option>
                    <option value="AZ">Azerbaijan</option>
                    <option value="BS">Bahamas</option>
                    <option value="BH">Bahrain</option>
                    <option value="BD">Bangladesh</option>
                    <option value="BB">Barbados</option>
                    <option value="BY">Belarus</option>
                    <option value="BE">Belgium</option>
                    <option value="BZ">Belize</option>
                    <option value="BJ">Benin</option>
                    <option value="BM">Bermuda</option>
                    <option value="BT">Bhutan</option>
                    <option value="BO">Bolivia, Plurinational State of</option>
                    <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                    <option value="BA">Bosnia and Herzegovina</option>
                    <option value="BW">Botswana</option>
                    <option value="BV">Bouvet Island</option>
                    <option value="BR">Brazil</option>
                    <option value="IO">British Indian Ocean Territory</option>
                    <option value="BN">Brunei Darussalam</option>
                    <option value="BG">Bulgaria</option>
                    <option value="BF">Burkina Faso</option>
                    <option value="BI">Burundi</option>
                    <option value="KH">Cambodia</option>
                    <option value="CM">Cameroon</option>
                    <option value="CV">Cape Verde</option>
                    <option value="KY">Cayman Islands</option>
                    <option value="CF">Central African Republic</option>
                    <option value="TD">Chad</option>
                    <option value="CL">Chile</option>
                    <option value="CN">China</option>
                    <option value="CX">Christmas Island</option>
                    <option value="CC">Cocos (Keeling) Islands</option>
                    <option value="CO">Colombia</option>
                    <option value="KM">Comoros</option>
                    <option value="CG">Congo</option>
                    <option value="CD">Congo, the Democratic Republic of the</option>
                    <option value="CK">Cook Islands</option>
                    <option value="CR">Costa Rica</option>
                    <option value="CI">Côte d'Ivoire</option>
                    <option value="HR">Croatia</option>
                    <option value="CU">Cuba</option>
                    <option value="CW">Curaçao</option>
                    <option value="CY">Cyprus</option>
                    <option value="CZ">Czech Republic</option>
                    <option value="DK">Denmark</option>
                    <option value="DJ">Djibouti</option>
                    <option value="DM">Dominica</option>
                    <option value="DO">Dominican Republic</option>
                    <option value="EC">Ecuador</option>
                    <option value="EG">Egypt</option>
                    <option value="SV">El Salvador</option>
                    <option value="GQ">Equatorial Guinea</option>
                    <option value="ER">Eritrea</option>
                    <option value="EE">Estonia</option>
                    <option value="ET">Ethiopia</option>
                    <option value="FK">Falkland Islands (Malvinas)</option>
                    <option value="FO">Faroe Islands</option>
                    <option value="FJ">Fiji</option>
                    <option value="FI">Finland</option>
                    <option value="FR">France</option>
                    <option value="GF">French Guiana</option>
                    <option value="PF">French Polynesia</option>
                    <option value="TF">French Southern Territories</option>
                    <option value="GA">Gabon</option>
                    <option value="GM">Gambia</option>
                    <option value="GE">Georgia</option>
                    <option value="DE">Germany</option>
                    <option value="GH">Ghana</option>
                    <option value="GI">Gibraltar</option>
                    <option value="GR">Greece</option>
                    <option value="GL">Greenland</option>
                    <option value="GD">Grenada</option>
                    <option value="GP">Guadeloupe</option>
                    <option value="GU">Guam</option>
                    <option value="GT">Guatemala</option>
                    <option value="GG">Guernsey</option>
                    <option value="GN">Guinea</option>
                    <option value="GW">Guinea-Bissau</option>
                    <option value="GY">Guyana</option>
                    <option value="HT">Haiti</option>
                    <option value="HM">Heard Island and McDonald Islands</option>
                    <option value="VA">Holy See (Vatican City State)</option>
                    <option value="HN">Honduras</option>
                    <option value="HK">Hong Kong</option>
                    <option value="HU">Hungary</option>
                    <option value="IS">Iceland</option>
                    <option value="IN">India</option>
                    <option value="ID">Indonesia</option>
                    <option value="IR">Iran, Islamic Republic of</option>
                    <option value="IQ">Iraq</option>
                    <option value="IE">Ireland</option>
                    <option value="IM">Isle of Man</option>
                    <option value="IL">Israel</option>
                    <option value="IT">Italy</option>
                    <option value="JM">Jamaica</option>
                    <option value="JP">Japan</option>
                    <option value="JE">Jersey</option>
                    <option value="JO">Jordan</option>
                    <option value="KZ">Kazakhstan</option>
                    <option value="KE">Kenya</option>
                    <option value="KI">Kiribati</option>
                    <option value="KP">Korea, Democratic People's Republic of</option>
                    <option value="KR">Korea, Republic of</option>
                    <option value="KW">Kuwait</option>
                    <option value="KG">Kyrgyzstan</option>
                    <option value="LA">Lao People's Democratic Republic</option>
                    <option value="LV">Latvia</option>
                    <option value="LB">Lebanon</option>
                    <option value="LS">Lesotho</option>
                    <option value="LR">Liberia</option>
                    <option value="LY">Libya</option>
                    <option value="LI">Liechtenstein</option>
                    <option value="LT">Lithuania</option>
                    <option value="LU">Luxembourg</option>
                    <option value="MO">Macao</option>
                    <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                    <option value="MG">Madagascar</option>
                    <option value="MW">Malawi</option>
                    <option value="MY">Malaysia</option>
                    <option value="MV">Maldives</option>
                    <option value="ML">Mali</option>
                    <option value="MT">Malta</option>
                    <option value="MH">Marshall Islands</option>
                    <option value="MQ">Martinique</option>
                    <option value="MR">Mauritania</option>
                    <option value="MU">Mauritius</option>
                    <option value="YT">Mayotte</option>
                    <option value="MX">Mexico</option>
                    <option value="FM">Micronesia, Federated States of</option>
                    <option value="MD">Moldova, Republic of</option>
                    <option value="MC">Monaco</option>
                    <option value="MN">Mongolia</option>
                    <option value="ME">Montenegro</option>
                    <option value="MS">Montserrat</option>
                    <option value="MA">Morocco</option>
                    <option value="MZ">Mozambique</option>
                    <option value="MM">Myanmar</option>
                    <option value="NA">Namibia</option>
                    <option value="NR">Nauru</option>
                    <option value="NP">Nepal</option>
                    <option value="NL">Netherlands</option>
                    <option value="NC">New Caledonia</option>
                    <option value="NZ">New Zealand</option>
                    <option value="NI">Nicaragua</option>
                    <option value="NE">Niger</option>
                    <option value="NG">Nigeria</option>
                    <option value="NU">Niue</option>
                    <option value="NF">Norfolk Island</option>
                    <option value="MP">Northern Mariana Islands</option>
                    <option value="NO">Norway</option>
                    <option value="OM">Oman</option>
                    <option value="PK">Pakistan</option>
                    <option value="PW">Palau</option>
                    <option value="PS">Palestinian Territory, Occupied</option>
                    <option value="PA">Panama</option>
                    <option value="PG">Papua New Guinea</option>
                    <option value="PY">Paraguay</option>
                    <option value="PE">Peru</option>
                    <option value="PH">Philippines</option>
                    <option value="PN">Pitcairn</option>
                    <option value="PL">Poland</option>
                    <option value="PT">Portugal</option>
                    <option value="PR">Puerto Rico</option>
                    <option value="QA">Qatar</option>
                    <option value="RE">Réunion</option>
                    <option value="RO">Romania</option>
                    <option value="RU">Russian Federation</option>
                    <option value="RW">Rwanda</option>
                    <option value="BL">Saint Barthélemy</option>
                    <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                    <option value="KN">Saint Kitts and Nevis</option>
                    <option value="LC">Saint Lucia</option>
                    <option value="MF">Saint Martin (French part)</option>
                    <option value="PM">Saint Pierre and Miquelon</option>
                    <option value="VC">Saint Vincent and the Grenadines</option>
                    <option value="WS">Samoa</option>
                    <option value="SM">San Marino</option>
                    <option value="ST">Sao Tome and Principe</option>
                    <option value="SA">Saudi Arabia</option>
                    <option value="SN">Senegal</option>
                    <option value="RS">Serbia</option>
                    <option value="SC">Seychelles</option>
                    <option value="SL">Sierra Leone</option>
                    <option value="SG">Singapore</option>
                    <option value="SX">Sint Maarten (Dutch part)</option>
                    <option value="SK">Slovakia</option>
                    <option value="SI">Slovenia</option>
                    <option value="SB">Solomon Islands</option>
                    <option value="SO">Somalia</option>
                    <option value="ZA">South Africa</option>
                    <option value="GS">South Georgia and the South Sandwich Islands</option>
                    <option value="SS">South Sudan</option>
                    <option value="ES">Spain</option>
                    <option value="LK">Sri Lanka</option>
                    <option value="SD">Sudan</option>
                    <option value="SR">Suriname</option>
                    <option value="SJ">Svalbard and Jan Mayen</option>
                    <option value="SZ">Swaziland</option>
                    <option value="SE">Sweden</option>
                    <option value="CH">Switzerland</option>
                    <option value="SY">Syrian Arab Republic</option>
                    <option value="TW">Taiwan, Province of China</option>
                    <option value="TJ">Tajikistan</option>
                    <option value="TZ">Tanzania, United Republic of</option>
                    <option value="TH">Thailand</option>
                    <option value="TL">Timor-Leste</option>
                    <option value="TG">Togo</option>
                    <option value="TK">Tokelau</option>
                    <option value="TO">Tonga</option>
                    <option value="TT">Trinidad and Tobago</option>
                    <option value="TN">Tunisia</option>
                    <option value="TR">Turkey</option>
                    <option value="TM">Turkmenistan</option>
                    <option value="TC">Turks and Caicos Islands</option>
                    <option value="TV">Tuvalu</option>
                    <option value="UG">Uganda</option>
                    <option value="UA">Ukraine</option>
                    <option value="AE">United Arab Emirates</option>
                    <option value="GB">United Kingdom</option>
                    <option value="UM">United States Minor Outlying Islands</option>
                    <option value="UY">Uruguay</option>
                    <option value="UZ">Uzbekistan</option>
                    <option value="VU">Vanuatu</option>
                    <option value="VE">Venezuela, Bolivarian Republic of</option>
                    <option value="VN">Viet Nam</option>
                    <option value="VG">Virgin Islands, British</option>
                    <option value="VI">Virgin Islands, U.S.</option>
                    <option value="WF">Wallis and Futuna</option>
                    <option value="EH">Western Sahara</option>
                    <option value="YE">Yemen</option>
                    <option value="ZM">Zambia</option>
                    <option value="ZW">Zimbabwe</option>
                </select>
            </div>
        </>
    );

    return(

        /*
        Form for the add an object (aka an area) to a page,
        contains css/html5 form validation using the pattern and required attribute
        Each input is separated in divs to allow easier css grids usage
         */
        <form onSubmit={handleSubmit} id="full-page-form" className="form-style">
            <h1>Add an Area!</h1>
            {/*Input for the name of the area*/}
            <div>
                <label htmlFor="name">Area Name</label>
                <input onChange={handleInputChange} type="text" name="name" placeholder="Name of area.." pattern="^([a-zA-Z]+\s)*[a-zA-Z]+$" required autoFocus/><br/>
                {/*Ensures input matches the regex pattern for names. No white spaces can occur before or after the full name and only one space is allowed between strings. This field is autofocused when page renders. This field is required to be filled*/}
            </div>
            {/*Input for the city of the object*/}
            <div>
                {/*<label htmlFor="city">City</label>*/}
                {/*<input onChange={handleInputChange} type="text" name="city" placeholder="City Name.." pattern="^([a-zA-Z]+\s)*[a-zA-Z]+$" required/><br/>*/}
                <LocationSearch name={"address"} setInputs={setInputs}/>
                {/*Ensures input matches regex pattern for names. Required attributes means this field is required to be filled*/}
            </div>

            {addressComplete}

            {/*Input of the country of the object*/}

            {/*Input for a general overview/description of the object*/}
            <div>
                <label htmlFor="areaOverview">Overview</label>
                <input onChange={handleInputChange} type="text" name="overview" required={true} placeholder="Short overview on the area..."/><br/>
            </div>
            {/*Inputs of the coordinates of the object,
            can be autofilled via geolocation api*/}
            <div>
                <label htmlFor="areaCords">Co-ordinates</label>
                <input onChange={handleInputChange} type="number"  step="0.0000001" name="latitude" placeholder='Latitude...'/>
                <input onChange={handleInputChange} type="number"  step="0.0000001" name="longitude" placeholder="Longitude.."/><br/>
                {/*Button the allow user to autofill coordinates based on location*/}
                <button type={"button"} onClick={getLocation}>Enter my current coordinates</button>
            </div>
            {/*Input for a picture upload section for the form*/}
            <div>
                <label htmlFor="pic">Picture</label>
                <input onChange={getFile} type="file" id="pic" name="pic" accept="image/*"/>
            </div>
            <input type="submit" value="Submit"/>
        </form>
    );
};

export default Submission;

