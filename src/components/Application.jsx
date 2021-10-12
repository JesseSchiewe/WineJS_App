import React, { useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import { UserContext } from '../providers/UserProvider';
import PasswordReset from "./PasswordReset";
import '../Style/App.css';
import './useToggle';
import {About} from './About';
import {Contact} from './Contact';
import {Review} from "./Review";
import Home from './Home';
import PageHeader from './PageHeader';
import {ReviewResult} from './ReviewResult';
import LoadingScreen from './LoadingScreen';

export const Version = process.env.REACT_APP_VERSION;
export const ManualVersion = "2.0.4";

function Application() {
  const user = useContext(UserContext);

  return (
    <div>
      {
        user ?
          <Router>
            {/* <Route path="/" exact component={Home} /> */}
            <Route path="/" exact component={LoadingScreen} />
            <Route path="/" component={PageHeader} />
            <Route path="/home" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/review" exact component={Review} />
            <Route path="/reviewresult" exact component={ReviewResult} />
            <Route path= "/signin" exact component={Home} />
            <Route path= "/signUp" exact component={SignUp} />
            <Route path= "/passwordreset" exact component={PasswordReset} />
            <Route path= "/profilepage" exact component={ProfilePage} />    
          </Router>
        :
          <Router>            
            <Route path="/" exact component={LoadingScreen} />
            <Route path="/" component={PageHeader} />
            {/* <Route path="/" exact component={SignIn} /> */}
            <Route path="/home" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/review" exact component={SignIn} />
            <Route path="/reviewresult" exact component={SignIn} />
            <Route path= "/signin" exact component={SignIn} />
            <Route path= "/signUp" exact component={SignUp} />
            <Route path= "/passwordreset" exact component={PasswordReset} />
          </Router>
      } 
    </div>
  );
}

export default Application;