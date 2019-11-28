import React, {useEffect, useState} from 'react';
import './style.css';
import UserContext from "./UserContext";
import {Route, Switch, useLocation } from 'react-router-dom';


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
import {checkLogin} from "./checkLogin";


/**
 * This component represents every page on the website.
 * It contains the logic needed to switch between the pages.
 * @returns A Page on the website
 */
const App = () => {

    const[user,setUser] = useState(false);
    const [signup, setSignup] = useState(false);
    const [login, setLogin] = useState(false);
    let location = useLocation();

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
            checkLogin(setUser);
    },[]);

    //TODO run asychronously
    useEffect(() => {
        if(!user && location.pathname.match(/\/Submission.*/)){
            setLogin(true);
        }
    },[location.pathname, user]);

    return (
      // BrowseRouter Enables switching between components via NavLink Components
        <div>
            <UserContext.Provider value={{user, setUser}}>
                <NavBar setLogin={setLogin} setSignup={setSignup}/> {/*  Navigation Bar (will be on all pages)*/}

                {/*Switch Component contains all possible components that
                may be rendered between the NavBar and the Footer*/}
                <Switch>
                      <Route path="/Review" render={(props) => <Home {...props} setLogin={setLogin} setSignup={setSignup} />} exact/>
                      <Route path="/Submission" component={Submission}/>
                      <Route path="/Results" component={Results}/>
                      <Route path="/Area/:name" component={Area}/>
                </Switch>

                {/*Content on all pages below*/}
                {/*Container for Sign Up Form*/}
                {/*Container for Log in Form*/}
                {form}

                <Footer/>
            </UserContext.Provider>
        </div>
  )
};

export default App;
