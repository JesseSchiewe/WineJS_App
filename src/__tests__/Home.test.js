import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../components/Home';
import { BrowserRouter as Router } from 'react-router-dom';

it("renders without crashing", () => {
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => {};  // provide an empty implementation for window.alert
    const div = document.createElement("div");
    ReactDOM.render(
        <Router>
            <Home>
            </Home>
        </Router>, 
        div
    );
    window.alert = jsdomAlert;  // restore the jsdom alert
});