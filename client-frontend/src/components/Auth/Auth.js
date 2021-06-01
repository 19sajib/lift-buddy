import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import FacebookIcon from '@material-ui/icons/Facebook';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Icon from './Icon';
import Input from './Input';
import useStyles from './styles';
import { FB_APP_ID, GOOGLE_CLIENT_ID } from '../../config/keys';
import { signin, signup, googleSignIn, facebookSignIn } from '../../actions/auth'
import { isAuthenticated } from '../../auth/auth'


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {
    const classes = useStyles()
    const history = useHistory()
    const { user } = isAuthenticated()
  
    if(user) {
      history.push('/')
    }

    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword )


    const handleSubmit =  (e) => {
      e.preventDefault()

      if (isSignup) {
          dispatch(signup(formData, history))
      } else {      
          dispatch(signin(formData, history))
    }
    }

    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)

    }

    const googleSuccess = async (res) => {
        //console.log(res);
        const result = res?.profileObj;
        const token = res?.tokenId;
 
        try {
            dispatch(googleSignIn({result, token, history}))
            //console.log(result, token);
        } catch (error) {
           console.log(error); 
        }
     }
 
     const googleFailure = () => {
         console.log('Google Sign In was unsuccessful, Try again later');
     }

     const responseFacebook = async (response) => {
         //console.log(response);
        try {
            const {accessToken, userID} = response

            dispatch(facebookSignIn({accessToken, userID, history}))

        } catch (err) {
            console.log(err);
        }
     }



    return (
        <Container component="main" maxWidth="xs">
             <Paper className={classes.paper} elevation={3}>
                  <Avatar className={classes.avatar}>
                      <LockOutlinedIcon />
                  </Avatar>
                      <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                      <form className={classes.form} onSubmit={handleSubmit}>
                          <Grid container spacing={2}>
                              {
                                  isSignup && (
                                      <>
                                      <Input autoFocus={true} required="true" name="firstName" label="First name" handleChange={handleChange} half />
                                      <Input required="true" name="lastName" label="Last name" handleChange={handleChange} half />
                                      </>
                                  )
                              }
                              <Input autoFocus={true} required="true" name="email" label="Email Address" handleChange={handleChange} type="email" />
                              <Input required="true" name="password" label="Password" 
                                     handleChange={handleChange} 
                                     type={showPassword ? "text" : "password"} 
                                     handleShowPassword={handleShowPassword}
                                     />
                              { isSignup && <Input required="true" name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                          </Grid>
                          {!isSignup && (<Button component={Link} to="/forget-password" >Forgot your password?</Button>)}
                          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                              {isSignup ? 'Sign Up' : 'Sign In'}
                          </Button>
                          <GoogleLogin 
                          clientId={GOOGLE_CLIENT_ID}
                          render={(renderProps) => (
                              <Button className={classes.googleButton} color="secondary" fullWidth  onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained" >
                                Google {isSignup ? 'Sign Up' : 'Sign In'}
                              </Button>
                          )}
                          onSuccess={googleSuccess}
                          onFailure={googleFailure}
                          cookiePolicy="single_host_origin"
                          />
                          <FacebookLogin
                                appId={FB_APP_ID}
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={responseFacebook} 
                                render={(renderProps) => (
                                    <Button className={classes.facebookButton} color="primary" fullWidth  onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<FacebookIcon />} variant="contained" >
                                      Facebook {isSignup ? 'Sign Up' : 'Sign In'}
                                    </Button>
                                )}
                            />
                          <Grid container justify="flex-end">
                                <Grid item>
                                    <Button onClick={switchMode}>
                                        { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                                    </Button>
                                </Grid>
                          </Grid>
                      </form>
             </Paper>
            
        </Container>
    )
}

export default Auth
