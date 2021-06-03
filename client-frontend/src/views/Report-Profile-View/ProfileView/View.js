import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import moment from 'moment';
import Axios from 'axios'
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {Avatar, Box, Button,  CardActions, Divider,  Typography,  makeStyles, Grid, CircularProgress } from '@material-ui/core';
import red from "@material-ui/core/colors/red";
import { toast } from "react-toastify";


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '150px',
        display: 'flex',
        align: 'center',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
      },
  avatar: {
    height: 250,
    width: 250,
    marginTop: '-120px',
    boxShadow: theme.shadows[13],
    marginBottom: '20px'
},
error: {
  color: red[600],
  marginLeft: '26px'
}
}));

const Profile = ({ profile, className, ...rest }) => {

  const history = useHistory()
  const classes = useStyles();


    
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!profile) {
        history.push('/auth')
        toast.warn('Please Log In First!')
      } else {
        await Axios.post('http://localhost:8080/admin/dashboard/ban-user', {
          id: profile._id
           })
              .then(function (response) {
                //console.log(response.data);
                toast.success(response.data.message)
              })
              .catch(function (error) {
                //console.log(error);
                toast.error(error)
              });
             }
      }
  

  return (
    !profile ? <div align="center"> <CircularProgress /> <CircularProgress color="secondary" /> </div>: 
    <Grid container component='main' 
      className={classes.root}
    >
      <Grid item xs={12} md={12} sm={12} align="center" style={{borderRadius: '5px', padding: "0 5px 0 5px", backgroundColor: 'white', boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)"}}>
          <Grid  >
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={profile.avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {profile.name}
          </Typography>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {profile.job}
          </Typography>
          { profile.aboutMe && 
          <Typography
            color="textPrimary"
            gutterBottom
            variant="body1"
          >
            {profile.aboutMe}

            </Typography> }
            
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
                <MailIcon />
                    <Typography
                        variant="subtitle1"
                    >
                        {profile.email} 
                    </Typography>
            </div> 

            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
                <HomeIcon />
                    { (profile.state && profile.country) &&
                    <Typography
                        variant="subtitle1"
                    >
                        {`${profile.state}, ${profile.country}`} 
                    </Typography>}
            </div> 
          <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
                <AccessTimeIcon />
                <Typography
                        variant="subtitle1"
                    >
                        {`${moment().format('hh:mm A')}`}
                    </Typography>
            </div> 
        </Box>
      </Grid>
      <Divider variant="middle" />
      <CardActions> 
        <Button style={{borderRadius: '25px'}}
          color="secondary"
          fullWidth
          variant="outlined"
          onClick={handleSubmit}
        >
          Ban User
        </Button> 

      </CardActions>
    </Grid>
    </Grid>
  );
};

export default Profile;