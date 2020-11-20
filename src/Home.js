import React, {Fragment} from 'react';
import { Link } from "react-router-dom";
//import {auth} from "./Firebase";

export default function Home() {
    return(
        <Fragment>
            <div className="Home">
                <h1>Home</h1>
                <p/>
                <h2>You must be signed in to access the Review and Review Results pages.</h2>
                <div className="standardText" >
                    After you sign in, you can access all of the features from the hamburger menu at the top left of the screen.
                </div>
                <p/>
                <h2>Click on a link below</h2>
                <h2><Link to="/about">About</Link></h2>
                <h2><Link to="/contact">Contact</Link></h2>
                {/* <button onClick = {() => {auth.signOut()}}>Sign out</button> */}
            </div>
        </Fragment>
    )
};