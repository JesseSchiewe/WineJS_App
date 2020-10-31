import React, {Fragment, useContext, useState, useRef} from 'react';
import Select from 'react-select'
import { Link } from "react-router-dom";
import {auth} from "../Firebase";
import { UserContext } from '../providers/UserProvider';
import Review from '../Review';


//Burger Styles
//import React, { useState, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from '../hooks';
import { GlobalStyles } from '../Style/Burger/global';
import { theme } from '../theme';
import { default as Burger } from './Burger';
import { default as Menu } from './Menu';
import FocusLock from 'react-focus-lock';
//End Burger Styles


export default function PageHeader() {
    const user = useContext(UserContext);

    // var sitePages = [
    //     {
    //         label: "Review",
    //         value: "/review"
    //     },
    //     {
    //         label: "Results",
    //         value: "/reviewresult"
    //     },
    //     {
    //         label: "About",
    //         value: "/about"
    //     },
    //     {
    //         label: "Contact",
    //         value: "/contact"
    //     }
    // ];
    
    // function handleChange(e){
    //     alert(e);
    //     // <Link to={e} />        
    // }


    //Burger Menu
    const [open, setOpen] = useState(false);
    const node = useRef();
    const menuId = "main-menu";
    useOnClickOutside(node, () => setOpen(false));
    //End Burger Menu

    return(

            user ?
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

                        <p/>
                        <a className="bn39" href="/"><span className="bn39span" onClick = {() => {auth.signOut()}}>Sign Out</span></a>     
                        <button className="bn39span" onClick = {() => {auth.signOut()}} >Google Sign Out</button>                   
                    </div>                         
                    {/* <Link to="/review">
                        <button type="menubutton" className="headerbutton" >Review</button>
                    </Link>
                    <Link to="/reviewresult">
                        <button type="menubutton" className="headerbutton" >Results</button>
                    </Link>
                    <Link to="/about">
                        <button type="menubutton" className="headerbutton" >About</button>
                    </Link>
                    <Link to="/contact">
                        <button type="menubutton" className="headerbutton" >Contact</button>
                    </Link> */}
                    {/* <Select className="sitepages" defaultInputValue="Site Menu" selec options={ sitePages } onChange={e => handleChange(e.value)} /> */}
                </div>
            :
                <div className="SiteMenu">   
                    <div className="SiteHeader"> 
                        <p>Not Signed In</p>
                        <Link to="/">
                            <a className="bn39" href="/"><span className="bn39span" >Sign In</span></a>
                        </Link>
                    </div>                         
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


    )
};
