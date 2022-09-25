import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Avatar, Button, Typography, Toolbar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import { Link, useHistory, useLocation } from 'react-router-dom'


import logo from '../../assests/images/name.png'
import { isAuthenticated, logout } from '../../auth/auth'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    padding: '10px 50px',
  }
}));

export default function MenuAppBar() {
    const { user, token } = isAuthenticated()
  const classes = useStyles();



  const dispatch = useDispatch()
  const history = useHistory()
  let location = useLocation()

  const signOut = () => {
    dispatch({ type: 'LOGOUT'})
    history.push('/')

    logout()
  }
  
  useEffect(() => {
    //const token = getCookie("token")

       if(token) {
         const decodedToken = decode(token)
         
         if (decodedToken.exp * 1000 < new Date().getTime()) {
           logout()
           history.push('/')
         }
       }
   }, [location])

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <Link to="/">
                <img className={classes.image} src={logo} alt="logo" height="60" />
           </Link>
          </IconButton>
          { user ? (
                       <div className={classes.profile}>
                         <Avatar component={Link} to="/profile" className={classes.purple} alt={user.name} src={user.avatar}>{user.name.charAt(0)}</Avatar>
                         <Typography className={classes.userName} variant="h6">{user.name}</Typography>
                         <Button variant="contained" className={classes.logout} color="secondary" onClick={signOut}>Logout</Button>
                       </div>
                   ) : (
                       <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                   )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
