import React from 'react';
//import Select from 'react-select'
import { Link } from "react-router-dom";
//import {auth} from "../Firebase";
//import { UserContext } from '../providers/UserProvider';
//import Review from '../Review';
import { Version, ManualVersion } from './Application';

export default function HeaderSignedOut() {
    //const user = useContext(UserContext);

    return(
        <div>
            <div className="SiteHeader"> 
                Not Signed In
                <Link to="/">
                    <a className="bn39" href="/"><span className="bn39span" >Sign In</span></a>
                </Link>
            </div> 

            <div className="Version">
                Version: {ManualVersion} {Version}
            </div>
            <div className="SiteMenu">                               
                <Link to="/home">
                    <button type="menubutton" className="headerbutton" >Home</button>
                </Link>
                <Link to="/contact">
                    <button type="menubutton" className="headerbutton" >Contact</button>
                </Link>
                <Link to="/about">
                    <button type="menubutton" className="headerbutton" >About</button>
                </Link>
            </div>
            <p/>
        </div>
    )
};
