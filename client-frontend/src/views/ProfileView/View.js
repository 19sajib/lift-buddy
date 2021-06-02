import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import moment from 'moment';
import Axios from 'axios'
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {Avatar, Box, Button,  CardActions,   
    Divider,  Typography,  makeStyles, Grid } from '@material-ui/core';

import { isAuthenticated } from '../../auth/auth'


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
}
}));

const Profile = ({ className, ...rest }) => {

  const { id } = useParams()
  console.log(id);
  const history = useHistory()
  const { user } = isAuthenticated()
  const classes = useStyles();
  const [formData, setFormData] = useState({
    id: user._id,
    avatar: user.avatar})

    React.useEffect(() => {
        Axios.post('http://localhost:8080/')
          .then(function (response) {
            setFormData(response.data.user);
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        }, [])

    const handleSubmit = (e) => {
      e.preventDefault();
  
    }

  return (
    <Grid container component='main' 
      className={classes.root}
    >
      <Grid item xs={12} md={4} sm={12} align="center" style={{padding: "0 5px 0 5px", backgroundColor: 'white', boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)"}}>
          <Grid  >
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={formData.avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.name}
          </Typography>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {user.job}
          </Typography>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="body1"
          >
            {user.aboutMe}

            </Typography>
            
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
                <MailIcon />
                    <Typography
                        variant="subtitle1"
                    >
                        {user.email} 
                    </Typography>
            </div> 

            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
                <HomeIcon />
                    { (user.state && user.country) &&
                    <Typography
                        variant="subtitle1"
                    >
                        {`${user.state} ${user.country}`} 
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
          color="primary"
          fullWidth
          variant="outlined"
          onClick={handleSubmit}
        >
          Edit Profile
        </Button>
      </CardActions>
    </Grid>
    </Grid>
  );
};

export default Profile;