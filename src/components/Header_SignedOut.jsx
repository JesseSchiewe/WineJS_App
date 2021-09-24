import React from 'react';
import { Link } from "react-router-dom";
import { Version, ManualVersion } from './Application';

export default function HeaderSignedOut() {
    //const user = useContext(UserContext);

    return(
        <div className="SiteMenu" >
            <div className="Version">
                v {ManualVersion} {Version}
            </div>
            <div className="SiteHeader"> 
                Not Signed In
                <Link to="/">
                    <div className="bn39" href="/">
                        <span className="bn39span" >
                            Sign In
                        </span>
                    </div>
                </Link>
            </div> 

            <div>                               
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
