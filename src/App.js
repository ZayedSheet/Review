import React from 'react';
import './style.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Submission from './components/Submission';
import NavBar from './components/Nav/Navbar';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
      <BrowserRouter>
        <div>
          <NavBar/>
            <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/Submission" component={Submission}/>
            </Switch>
            <Footer/>
        </div>
      </BrowserRouter>
  )
}

export default App;
