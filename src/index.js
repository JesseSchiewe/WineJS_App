import React, {Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


// ReactDOM.render(
//   <Router>
    
//     <ul>
//       <li><Link to="/">Home</Link></li>
//       <li><Link to="/about">About</Link></li>
//       <li><Link to="/contact">Contact</Link></li>
//       <li><Link to="/app">App</Link></li>
//       <li><Link to="/review">Review</Link></li>
//       <li><Link to="/reviewresult">Review Result</Link></li>
//       <li><Link to="/outputform">Output Form</Link></li>
//       <li><Link to="/appauth">Authentication</Link></li>
//     </ul>

//     <Route path="/" exact component={Home} />
//     <Route path="/about" component={About} />
//     <Route path="/contact" component={Contact} />
//     <Route path="/app"  component={App} />
//     <Route path="/review"  component={Review} />
//     <Route path="/reviewresult"  component={ReviewResult} />
//     <Route path="/outputform"  component={outputForm} />
//     <Route path="/appauth"  component={AppAuth} />

//     <Route exact path="/login" component={Login} />
//     <Route exact path="/register" component={Register} />
//     <Route exact path="/profile" component={Profile} />
//     <Route path="/user" component={BoardUser} />
//     <Route path="/mod" component={BoardModerator} />
//     <Route path="/admin" component={BoardAdmin} />
//     {/* <Route path="/review"  component={Review} /> */}

//   </Router>,
//   document.getElementById('root')
// );




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
