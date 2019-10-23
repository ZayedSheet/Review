import React from 'react';
import './style.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Submission from './components/Submission';
import Results from './components/Results';
import Area from './components/Area';

import NavBar from './components/Nav/Navbar';
import Footer from './components/Footer/Footer';

/**
 * This component represents every page on the website.
 * It contains the logic needed to switch between the pages.
 * @returns A Page on the website
 */
const App = () => {
  return (
      //BrowseRouter Enables switching between components via NavLink Components
      <BrowserRouter>
        <div>
          <NavBar/> {/*  Navigation Bar (will be on all pages)*/}
            {/*Switch Component contains all possible components that
            may be rendered between the NavBar and the Footer*/}
            <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/Submission" component={Submission}/>
              <Route path="/Results" component={Results}/>
              <Route path="/Area" component={Area}/>
            </Switch>
            <Footer/> {/*  Footer (will be on all pages)*/}
        </div>
      </BrowserRouter>
  )
};

export default App;
