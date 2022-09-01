import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
export const ManualVersion = "3.0.2";

function Application() {
  const user = useContext(UserContext);

  return (
    <div>
      {
        user ?
          <Router>
            <Routes>
              <Route path="/" exact element={<LoadingScreen />} />
              <Route path="/" element={<PageHeader />} />
              <Route path="/home" exact element={<><PageHeader/><Home /></>} />
              <Route path="/about" exact element={<><PageHeader/><About /></>} />
              <Route path="/contact" exact element={<><PageHeader/><Contact /></>} />
              <Route path="/review" exact element={<><PageHeader/><Review /></>} />
              <Route path="/reviewresult" exact element={<><PageHeader/><ReviewResult /></>} />
              <Route path= "/signin" exact element={<><PageHeader/><Home /></>} />
              <Route path= "/signUp" exact element={<><PageHeader/><SignUp /></>} />
              <Route path= "/passwordreset" exact element={<><PageHeader/><PasswordReset /></>} />
              <Route path= "/profilepage" exact element={<><PageHeader/><ProfilePage /></>} />    
            </Routes>
          </Router>
        :
          <Router>   
            <Routes>         
              <Route path="/" exact element={<LoadingScreen />} />
              <Route path="/" element={<PageHeader />} />
              <Route path="/home" exact element={<><PageHeader/><Home /></>} />
              <Route path="/about" exact element={<><PageHeader/><About /></>} />
              <Route path="/contact" exact element={<><PageHeader/><Contact /></>} />
              <Route path="/review" exact element={<><PageHeader/><SignIn /></>} />
              <Route path="/reviewresult" exact element={<><PageHeader/><SignIn /></>} />
              <Route path= "/signin" exact element={<><PageHeader/><SignIn /></>} />
              <Route path= "/signUp" exact element={<><PageHeader/><SignUp /></>} />
              <Route path= "/passwordreset" exact element={<><PageHeader/><PasswordReset /></>} />
            </Routes>
          </Router>
      } 
    </div>
  );
}

export default Application;