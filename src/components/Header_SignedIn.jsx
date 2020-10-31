import React, {Fragment, useContext, useState, useRef} from 'react';
import { Link } from "react-router-dom";
import {auth} from "../Firebase";
import { UserContext } from '../providers/UserProvider';

//Burger Styles
//import React, { useState, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from '../hooks';
//import { GlobalStyles } from '../Style/Burger/global';
import { theme } from '../theme';
import { default as Burger } from './Burger';
import { default as Menu } from './Menu';
import FocusLock from 'react-focus-lock';
//End Burger Styles


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

            <ThemeProvider theme={theme}>
                <>
                    {/* <GlobalStyles /> */}
                    <div ref={node}>
                        <FocusLock disabled={!open}>
                            <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
                            <Menu open={open} setOpen={setOpen} id={menuId} />
                        </FocusLock>
                    </div>
                </>
            </ThemeProvider>
            <div className="SiteHeader"> 
                {/* <a className="UserName">Current User: {user.displayName}</a> */}
                <Link to="/profilepage">
                {user.displayName}
                    {/* <button type="menubutton" className="usernamebutton" >{user.displayName}</button> */}
                    {/* <button type="menubutton" className="headerbutton" >Contact</button> */}
                </Link>


                <a className="bn39" href="/"><span className="bn39span" onClick = {() => {auth.signOut()}}>Sign Out</span></a>     
                {/* <button className="bn39span" onClick = {() => {auth.signOut()}} >Google Sign Out</button>                    */}
                <p/>
            </div>                         
        </div>
    )
};
