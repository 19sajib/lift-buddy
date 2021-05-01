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
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import { Avatar, Button } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import BackToTop from "./BackToTop"

import logo from '../../images/name.png'
import { isAuthenticated, logout } from '../../auth/auth'

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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'space-between',
      width: '400px',
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
      dispatch({ type: 'LOGOUT'})
      history.push('/')

      logout()
    }
    
    React.useEffect(() => {
      //const token = getCookie("token")

         if(token) {
           const decodedToken = decode(token)
           
           if (decodedToken.exp * 1000 < new Date().getTime()) {
             logout()
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
     user ? (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to="/chat-dashboard" >
        <IconButton aria-label="show 4 new mails" color="inherit">
          {/* <Badge badgeContent={4} color="secondary"> */}
            <MailIcon />
          {/* </Badge> */}
        </IconButton>
        <p>Inbox</p>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} >
        <IconButton aria-label="show 11 new notifications" color="inherit">
          {/* <Badge badgeContent={11} color="secondary"> */}
            <NotificationsIcon />
          {/* </Badge> */}
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} >
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {/* <AccountCircle /> */}
        <Avatar component={Link} to="/profile" className={classes.purple} alt={user.name} src={user.avatar}>{user.name.charAt(0)}</Avatar>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} >
      <Button variant="outlined" color="secondary" onClick={signOut}>Logout</Button>
      </MenuItem>
    </Menu>
    ) 
    : (
    // <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
    <></>
                   )
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
                <img className={classes.image} src={logo} alt="logo" height="50" />
           </Link>
          </IconButton>
          <div className={classes.grow} />
          { user ? (
            <div className={classes.profile}>
              <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
              <p>Inbox</p>
            </IconButton> */}
            <Button component={Link} to="/chat-dashboard" endIcon={<MailIcon />} >Inbox</Button>
            <Button endIcon={<NotificationsIcon />} >Alret</Button>
            {/* <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            {/* <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
             
              <AccountCircle />
            </IconButton> */}
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
                       <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                   )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <BackToTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </BackToTop>
    </div>
  );
}