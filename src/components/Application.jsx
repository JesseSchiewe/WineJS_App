import React, {useContext} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import { UserContext } from '../providers/UserProvider';
import PasswordReset from "./PasswordReset";
import '../Style/App.css';
import '../useToggle';
import '../OutputForm';
import {About} from '../About.js';
import {Contact} from '../Contact.js';
import {ReviewResult} from '../ReviewResult';
import Review from "../Review";
import Home from '../Home';
import PageHeader from './PageHeader';

export const Version = process.env.REACT_APP_VERSION;
export const ManualVersion = "1.0.9";

function Application() {
  const user = useContext(UserContext);
  return (
    user ?
      <Router>
        {/* <Switch> */}
          <Route path="/" component={PageHeader} />
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/review" exact component={Review} />
          <Route path="/reviewresult" exact component={ReviewResult} />
          <Route path= "/signin" exact component={SignIn} />
          <Route path= "/signUp" exact component={SignUp} />
          <Route path= "/passwordreset" exact component={PasswordReset} />
          <Route path= "/profilepage" exact component={ProfilePage} />    
          {/* <Route path="*" component={NotFoundPage} /> */}
        {/* </Switch>      */}
      </Router>
    :
      <Router>
          <Route path="/" component={PageHeader} />
          <Route path="/" exact component={SignIn} />
          <Route path="/home" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/contact" exact component={Contact} />
          <Route path= "/signin" exact component={SignIn} />
          <Route path= "/signUp" exact component={SignUp} />
          <Route path= "/passwordreset" exact component={PasswordReset} />
      </Router>
  );
}

// function Application() {
//     const user = useContext(UserContext);
//     return (
//         user ?
//         <ProfilePage />
//       :
//         <Router>
//           <Route path= "/signin" component={SignIn} />
//           <Route path= "/signUp" component={SignUp} />
//           <Route path= "/passwordreset" component={PasswordReset} />
//           <Route path= "/profilepage" component={ProfilePage} />

//           <Route path="/" exact component={SignIn} />
//           <Route path="/about" component={About} />
//           <Route path="/contact" component={Contact} />
//           <Route path="/reviewresult"  component={ReviewResult} />          
//         </Router>

//   );
// }
export default Application;