import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import { fade, makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import { Avatar, Button } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import ChatIcon from '@material-ui/icons/Chat';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ForumIcon from '@material-ui/icons/Forum';
import CssBaseline from '@material-ui/core/CssBaseline';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';


import logo from '../../assests/images/logo.png'
import { isAuthenticated, logout } from '../../auth/auth'
import { LOGOUTALRET } from '../../assets/constants/actionTypes'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'space-between',
      width: '800px',
      display: 'flex',
    },
  },
  sectionDesktop2: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'space-between',
      width: '250px',
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    marginLeft: '0px',
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(1),
      display: 'none',
    },
  },
  profile: {
    display: 'flex',
    // justifyContent: 'space-between',
    // width: '400px',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
  },
}));




export default function NewNavbar () {

    const { user, token } = isAuthenticated()

    const dispatch = useDispatch()
    const history = useHistory()
    let location = useLocation()

    const signOut = () => {
      // dispatch({ type: 'LOGOUT'})
      dispatch({ type: LOGOUTALRET })
      history.push('/')
       
      logout()
    }
    
    React.useEffect(() => {
      //const token = getCookie("token")

         if(token) {
           const decodedToken = decode(token)
           
           if (decodedToken.exp * 1000 < new Date().getTime()) {
             logout()
            //  dispatch({ type: 'LOGOUTALRET'})
             history.push('/')
           }
         }
         
        // setUser(JSON.parse(localStorage.getItem('profile')))
     }, [location])

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (

    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
     {user ? ( <div>
     <MenuItem onClick={handleMenuClose} component={Link} to="/posts" >
        <IconButton aria-label="posts" color="inherit">
            <PostAddIcon />
        </IconButton>
        <p>Post Feed</p>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/contact-us" >
        <IconButton aria-label="contact-us" color="inherit">
            <LiveHelpIcon />
        </IconButton>
        <p>Contact Us</p>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/shoutbox" >
        <IconButton aria-label="shoutbox" color="inherit">
            <ForumIcon />
        </IconButton>
        <p>Shoutbox</p>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/chat-dashboard" >
        <IconButton aria-label="chatbox" color="inherit">
            <ChatIcon />
        </IconButton>
        <p>Inbox</p>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} >
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
        <Avatar component={Link} to="/profile" className={classes.purple} alt={user.name} src={user.avatar}>{user.name.charAt(0)}</Avatar>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} >
      <Button variant="outlined" color="secondary" onClick={signOut}>Logout</Button>
      </MenuItem>
      </div>
    ) 
    : (<div>
      <MenuItem onClick={handleMenuClose} component={Link} to="/contact-us" >
      <IconButton aria-label="show 11 new notifications" color="inherit">
          <LiveHelpIcon />
      </IconButton>
      <p>Contact Us</p>
    </MenuItem>
    <MenuItem onClick={handleMenuClose} >
   <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
   </MenuItem>
    </div>               )}
                   </Menu>
  );

  return (
    <div className={classes.grow}>
      <CssBaseline />
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
          <Link to="/">
                <img className={classes.image} src={logo} alt="logo" height="70" />
           </Link>
          </IconButton>
          <div className={classes.grow} />
          { user ? (
            <div className={classes.profile}>
              <div className={classes.sectionDesktop}>
            <Button component={Link} to="/posts" endIcon={<PostAddIcon/>} >Post Feed</Button>
            <Button component={Link} to="/contact-us" endIcon={<LiveHelpIcon />} >Contact Us</Button>
            <Button component={Link} to="/shoutbox" endIcon={<ForumIcon/>} >Shoutbox</Button>
            <Button component={Link} to="/chat-dashboard" endIcon={<ChatIcon />} >Inbox</Button>
           
            <Avatar component={Link} to="/profile" className={classes.purple} alt={user.name} src={user.avatar}>{user.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={signOut}>Logout</Button>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              edge="end"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
               <MenuIcon />
              {/* <MoreIcon  /> */}
            </IconButton>
                     </div>
                         
                       </div>
                   ) : ( 
                    <div className={classes.profile}>
                   <div className={classes.sectionDesktop2}>
                    <Button component={Link} to="/contact-us" endIcon={<LiveHelpIcon />} >Contact Us</Button>
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                   </div>
                   <div className={classes.sectionMobile}>
                    <IconButton
                      edge="end"
                      aria-label="show more"
                      aria-controls={mobileMenuId}
                      aria-haspopup="true"
                      onClick={handleMobileMenuOpen}
                      color="inherit"
                    >
                      <MenuIcon />
                      {/* <MoreIcon  /> */}
                    </IconButton>
                     </div>
                   </div>
                   )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}