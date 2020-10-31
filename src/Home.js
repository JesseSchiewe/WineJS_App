import React, {Fragment} from 'react';
import { Link } from "react-router-dom";
//import {auth} from "./Firebase";

export default function Home() {
    return(
        <Fragment>
            <div className="Home">
                <h1>Home Page</h1>
                <p/>
                <h2>You must be signed in to access the Review and Review Results pages.</h2>
                <h2>Click on a link below</h2>
                <h2><Link to="/review">Review</Link></h2>
                <h2><Link to="/reviewresult">Review Results</Link></h2>
                <h2><Link to="/about">About</Link></h2>
                <h2><Link to="/contact">Contact</Link></h2>
                {/* <button onClick = {() => {auth.signOut()}}>Sign out</button> */}
            </div>
        </Fragment>
    )
};