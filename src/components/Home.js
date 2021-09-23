import React, { Fragment } from 'react';
//import { AutoFocusInside } from 'react-focus-lock';
import { Link } from "react-router-dom";
//import {auth} from "./Firebase";

export default function Home() {
    return(
        <Fragment>
            <div className="Home">
                <h1>WineJS Home</h1>
                <p/>
                <h2>Welcome!</h2>
                <h5>You must be signed in to access the Review and Review Results pages.</h5>
                <p/>
                <div className="standardText" >
                    After you sign in, you can access all of the features from the hamburger menu at the top left of the screen.
                    <p/>
                </div>
                <hr/>


                <div className="standardText">
                    The review section allows you to record your thoughts about a wine.
                    It saves your notes and scores into a database that you can access from anywhere.
                    This can help you remember spectacular bottles of wine.
                    <p/>
                    There are "Info" buttons next to each category that will explain how to rate the wine.
                    <p/>
                    You can also click or tap the "Show/Hide Notes" button in each category to enter more details.
                </div>
                <h2><Link to="/review">Review</Link></h2>
                <p/>
                <hr/>

                <div className="standardText">
                    To look at any previous review results, use the Results section.
                    The Results section allows you to select a previous review, edit it, and save the changes.
                    It also allows you view your favorite wines and sort by many different categories.
                </div>
                <h2><Link to="/reviewresult">Results</Link></h2>
                <p/>
                <hr/>

                {/* <h2>Or click on a link below</h2> */}
                <div className="standardText">
                    Other Links:
                </div>
                <h2><Link to="/about">About</Link></h2>
                <h2><Link to="/contact">Contact</Link></h2>
                {/* <button onClick = {() => {auth.signOut()}}>Sign out</button> */}
            </div>
        </Fragment>
    )
};