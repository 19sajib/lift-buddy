import React, { useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { AppBar, Avatar, Button, Typography, Toolbar } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'

import useStyles from './styles'
import logo from '../../assests/images/name.png'
import { isAuthenticated, logout } from '../../auth/auth'

const Navbar = () => {
    const classes = useStyles()

    const { user, token } = isAuthenticated()

   // const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
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
         
        // setUser(JSON.parse(localStorage.getItem('profile')))
     }, [location])

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static" color="inherit">
                <div  className={classes.brandContainer}>

                {/* <Typography component={Link} to="/"  className={classes.heading} variant="h2" align="center">
                  Sajib
                </Typography> */}
                <Link to="/">
                <img className={classes.image} src={logo} alt="logo" height="60" />
                </Link>
                </div>
                <Toolbar className={classes.toolbar}>
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
    )
}

export default Navbar
