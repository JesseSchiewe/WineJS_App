import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import Paper from '@mui/material/Paper';

import WineJS_Cork from '../Style/WineJS_Cork.png';
import {auth} from "../Firebase";
import { useContext } from 'react';
import { UserContext } from '../providers/UserProvider';
// import MenuList from './MenuList';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import WineBarIcon from '@mui/icons-material/WineBar';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import PhoneIcon from '@mui/icons-material/Phone';
import { Version, ManualVersion } from './Application';


function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function MenuAppBar(props) {
  // const [auth, setAuth] = React.useState(true);
  const [anchorElProfile, setAnchorElProfile] = React.useState(null);
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);

  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleProfileMenu = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };
  const handleCloseProfile = () => {
    setAnchorElProfile(null);
  };

  const signOut = () => {
    auth.signOut();
  };

  const user = useContext(UserContext);

  return (  
    <div className="NavBar">   
      <Box sx={{ flexGrow: 1 }}>
        <HideOnScroll {...props}>
          <AppBar sx={{ background:"#80002a" }} style={{background: 'transparent', boxShadow:'none'}}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                aria-label="menu options"
                aria-controls="menu-options"
                aria-haspopup="true"
                color="inherit"
                sx={{ mr: 2 }}
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                  id="menu-options"
                  anchorEl={anchorElMenu}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElMenu)}
                  onClose={handleCloseMenu}
                >
                <Paper variant="outlined" style={{backgroundColor:"#ffcccc", marginTop:'-8px', marginBottom:'-8px'}}>
                  <MenuItem onClick={handleCloseMenu} component={Link} to={'/home'}><HomeIcon/>Home</MenuItem>
                  <MenuItem onClick={handleCloseMenu} component={Link} to={'/review'}><WineBarIcon/>Review</MenuItem>
                  <MenuItem onClick={handleCloseMenu} component={Link} to={'/reviewresult'}><StarOutlineIcon/>Results</MenuItem>
                  <MenuItem onClick={handleCloseMenu} component={Link} to={'/profilepage'}><PersonIcon/>Profile</MenuItem>
                  <MenuItem onClick={handleCloseMenu} component={Link} to={'/about'}><InfoIcon/>About Us</MenuItem>
                  <MenuItem onClick={handleCloseMenu} component={Link} to={'/contact'}><PhoneIcon/>Contact</MenuItem>
                  <MenuItem onClick={handleCloseMenu}>Version: {Version} ({ManualVersion})</MenuItem>
                </Paper>
              </Menu>
              <Typography variant="h4" sx={{ flexGrow: 1 }} component={Link} to={'/home'} >
                <img src={WineJS_Cork} alt="logo" height="50" />
              </Typography>
              <Typography >
                WineJS
              </Typography>
              {/* {auth && ( */}
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-profile"
                    aria-haspopup="true"
                    onClick={handleProfileMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-profile"
                    anchorEl={anchorElProfile}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElProfile)}
                    onClose={handleCloseProfile}
                  >
                    {user ? 
                      <div>
                        <Paper variant="outlined" style={{backgroundColor:"#ffcccc", marginTop:'-8px', marginBottom:'-8px'}}>
                          <MenuItem onClick={handleCloseProfile} component={Link} to={'/profilepage'}>Profile</MenuItem>
                          <MenuItem onClick={signOut}>Sign Out</MenuItem>
                        </Paper>
                      </div>
                      :
                        <MenuItem onClick={handleCloseProfile} component={Link} to={'/signin'}>Sign In</MenuItem>
                    }
                  </Menu>
                </div>
              {/* )}                   */}
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      {/* <MenuList />      */}
    </Box>
    </div>
  );
}