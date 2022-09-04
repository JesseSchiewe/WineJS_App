import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInUserNameandPassword from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import PasswordReset from "./PasswordReset";
import '../Style/App.css';
import './useToggle';
import {About} from './About';
import {Contact} from './Contact';
import WineReviewForm from './WineReviewForm';
import Home from './Home';
import MenuAppBar from "./MenuAppBar";
import {ReviewResult} from './ReviewResult';
import LoadingScreen from './LoadingScreen';
import { useAuth } from '../providers/AuthContext';

export const Version = process.env.REACT_APP_VERSION;
export const ManualVersion = "3.0.4";

function Application() {
  const { currentUser } = useAuth();
  
  return (
    <div>
      {
        currentUser ?
          <Router>
            <Routes>
              <Route path="/" exact element={<LoadingScreen />} />
              <Route path="/" element={<MenuAppBar />} />
              <Route path="/home" exact element={<><MenuAppBar/><Home /></>} />
              <Route path="/about" exact element={<><MenuAppBar/><About /></>} />
              <Route path="/contact" exact element={<><MenuAppBar/><Contact /></>} />
              <Route path="/review" exact element={<><MenuAppBar/><WineReviewForm /></>} />
              <Route path="/reviewresult" exact element={<><MenuAppBar/><ReviewResult /></>} />
              <Route path= "/signin" exact element={<><MenuAppBar/><Home /></>} />
              <Route path= "/signUp" exact element={<><MenuAppBar/><Home /></>} />
              <Route path= "/passwordreset" exact element={<><MenuAppBar/><PasswordReset /></>} />
              <Route path= "/profilepage" exact element={<><MenuAppBar/><ProfilePage /></>} />    
            </Routes>
          </Router>
        :
          <Router>   
            <Routes>         
              <Route path="/" exact element={<LoadingScreen />} />
              <Route path="/" element={<MenuAppBar />} />
              <Route path="/home" exact element={<><MenuAppBar/><Home /></>} />
              <Route path="/about" exact element={<><MenuAppBar/><About /></>} />
              <Route path="/contact" exact element={<><MenuAppBar/><Contact /></>} />
              <Route path="/review" exact element={<><MenuAppBar/><SignInUserNameandPassword /></>} />
              <Route path="/reviewresult" exact element={<><MenuAppBar/><SignInUserNameandPassword /></>} />
              <Route path= "/signin" exact element={<><MenuAppBar/><SignInUserNameandPassword /></>} />
              <Route path= "/signUp" exact element={<><MenuAppBar/><SignUp /></>} />
              <Route path= "/passwordreset" exact element={<><MenuAppBar/><PasswordReset /></>} />
              <Route path= "/profilepage" exact element={<><MenuAppBar/><SignInUserNameandPassword /></>} />    
            </Routes>
          </Router>
      } 
    </div>
  );
}

export default Application;