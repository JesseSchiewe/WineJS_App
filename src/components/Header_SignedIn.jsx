import React, {useContext, useState, useRef} from 'react';
import { Link } from "react-router-dom";
import {auth} from "../Firebase";
import { UserContext } from '../providers/UserProvider';
import { Version, ManualVersion } from './Application';
import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from '../hooks';
import { theme } from '../theme';
import { default as Burger } from './Burger';
import { default as Menu } from './Menu';
import FocusLock from 'react-focus-lock';

export default function HeaderSignedIn() {
    const user = useContext(UserContext);

    //Burger Menu
    const [open, setOpen] = useState(false);
    const node = useRef();
    const menuId = "main-menu";
    useOnClickOutside(node, () => setOpen(false));
    //End Burger Menu

    return(
        <div className="SiteMenu">
            <div className="Version">
                v {ManualVersion} {Version}
            </div>

            <ThemeProvider theme={theme}>
                {/* <GlobalStyles /> */}
                <div ref={node}>
                    <FocusLock disabled={!open}>
                        <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
                        <Menu open={open} setOpen={setOpen} id={menuId} />
                    </FocusLock>
                </div>
            </ThemeProvider>
            <div className="SiteHeader"> 
                <Link to="/profilepage">
                    {user.displayName}
                </Link>                
                <div className="bn39" href="/">
                    <span className="bn39span" onClick = {() => {auth.signOut()}}>
                        Sign Out
                    </span>
                </div>
   
                {/* <button className="bn39span" onClick = {() => {auth.signOut()}} >Google Sign Out</button>                    */}
            </div>
        </div>
    )
};
