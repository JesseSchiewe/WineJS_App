import React, {Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Redirect, Route } from "react-router-dom"
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
// import './routes.js';
// import Main from "./Main";
// import Main2 from "./Main2"
import outputForm from "./OutputForm";
//import Firebase from './Config';
//import FirebaseContext from './Firebase';
import AppAuth from "./AppAuth";
import Review from "./Review";
//import Application from "./Components/Application";
//import UserProvider from "./providers/UserProvider";


import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

const AppA = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };
}


//export default { Firebase };
//export { FirebaseContext};

/* ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
 */

// ReactDOM.render(
//   <Main2/>, 
//   document.getElementById("root")
// );

// const Home = () => (
//   <Fragment>
//       <div className="WineJS Wine Review"></div>
//           <h1>Output Form</h1>
//           <h2>Producer: </h2>
//           <h2>Wine Name:  </h2>
//           <h2>Vintage: </h2>
//           <h2>Nose Intensity:  </h2>
//   </Fragment>
// );

// ReactDOM.render(
//   <Router>
//     <App path="/review" />
//     <ul>
//       <li><Link to="/">Home</Link></li>
//       <li><Link to="/about">About</Link></li>
//       <li><Link to="/contact">Contact</Link></li>
//       <li><Link to="/app">App</Link></li>
//       <li><Link to="/review">Review</Link></li>
//     </ul>

//     <Route path="/" exact component={Home} />
//     <Route path="/about" component={About} />
//     <Route path="/app"  component={App} />
//     {/* <Route path="/review"  component={Review} /> */}

//   </Router>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <Router>
    
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/app">App</Link></li>
      <li><Link to="/review">Review</Link></li>
      <li><Link to="/reviewresult">Review Result</Link></li>
      <li><Link to="/outputform">Output Form</Link></li>
      <li><Link to="/appauth">Authentication</Link></li>
    </ul>

    <Route path="/" exact component={Home} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
    <Route path="/app"  component={App} />
    <Route path="/review"  component={Review} />
    <Route path="/reviewresult"  component={ReviewResult} />
    <Route path="/outputform"  component={outputForm} />
    <Route path="/appauth"  component={AppAuth} />

    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/profile" component={Profile} />
    <Route path="/user" component={BoardUser} />
    <Route path="/mod" component={BoardModerator} />
    <Route path="/admin" component={BoardAdmin} />
    {/* <Route path="/review"  component={Review} /> */}

  </Router>,
  document.getElementById('root')
);




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
