import React, {useEffect, useState} from 'react';
import './style.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

//Component for every page on the website
import Home from './components/Home';
import Submission from './components/Submission';
import Results from './components/Results';
import Area from './components/Area';

//Components for NavBar/Footer (Components that appear on all pages)
import NavBar from './components/Nav/Navbar';
import Footer from './components/Footer/Footer';

import SignupForm from "./components/Forms/SignupForm";
import LoginForm from "./components/Forms/LoginForm";

/**
 * This component represents every page on the website.
 * It contains the logic needed to switch between the pages.
 * @returns A Page on the website
 */
const App = () => {

    const[user,setUser] = useState(false);
    const [signup, setSignup] = useState(false);
    const [login, setLogin] = useState(false);

    let form;
    if(signup){form =
            <div id="signup" className="signup">
                <SignupForm setLogin={setLogin} setSignup={setSignup}/>
            </div>
    }
    if(login){form =
        <div id="login" className="login">
            <LoginForm setLogin={setLogin}/>
        </div>
    }

    useEffect(() => {
        let key = JSON.parse(localStorage.getItem('review_app_key'));

        axios.get('http://localhost:5000/signin/verify?token=' + key) //checks if the key is a valid key (unique and not deleted)
            .then(res => {
                if(res.data.success){
                    axios.get('http://localhost:5000/signin/getusername/' + key)
                        .then(res => setUser(res.data))
                        .catch(() => setUser(false));
                }
                console.log(res.data.message);
            });
    });

    return (
      // BrowseRouter Enables switching between components via NavLink Components
      <BrowserRouter>
        <div>
          <NavBar username={user} setUser={setUser} setLogin={setLogin} setSignup={setSignup}/> {/*  Navigation Bar (will be on all pages)*/}

            {/*Switch Component contains all possible components that
            may be rendered between the NavBar and the Footer*/}
            <Switch>
              {/*<Route path="/" setLogin={setLogin} setSignup={setSignup} component={Home} exact/>*/}
              <Route path="/Review" render={(props) => <Home {...props} setLogin={setLogin} setSignup={setSignup} />} exact/>
              <Route path="/Submission" component={Submission}/>
              <Route path="/Results" component={Results}/>
              <Route path="/Area" component={Area}/>
            </Switch>

            {/*Content on all pages below*/}
            {/*Container for Sign Up Form*/}
            {/*Container for Log in Form*/}
            {form}

            <Footer/>
        </div>
      </BrowserRouter>
  )
};

export default App;
