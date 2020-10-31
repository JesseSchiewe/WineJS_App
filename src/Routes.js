import React from 'react';
//import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom"
//import './Slider.css';
import './App.css';
import App from './App';
import './SliderJS.css';
import './useToggle.js';
import './OutputForm.js';
import {Home} from './Home.js';
import {About} from './About.js';
import {Contact} from './Contact.js';
import {ReviewResult} from './ReviewResult.js';

export default function Routes() {
    return (
        <Router>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/app"  component={App} />
            <Route path="/review"  component={App} />
            <Route path="/reviewresult"  component={ReviewResult} />
            {/* <Route path="/review"  component={Review} /> */}
        </Router>
    );
}
  