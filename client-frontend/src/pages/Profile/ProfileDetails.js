import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory,Link } from 'react-router-dom'
import clsx from 'clsx';
import {Box,  Button,  Card,  CardContent,  CardHeader,
  Divider, Grid,  TextField,  makeStyles } from '@material-ui/core';

import { isAuthenticated } from '../../auth/auth'
import { updateProfile } from '../../actions/auth'
  

const useStyles = makeStyles(() => ({
  root: {},
  box: {
    display: "flex",
    padding: 3
  },
  spreadBox: {
    justifyContent: "space-around",
    alignItems: "center"
  }
}));

const ProfileDetails = ({ className, ...rest }) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const {user} = isAuthenticated();
  console.log(user);

  const [formData, setFormData] = useState({
    id: user._id,
    name: user.name,
    password: '',
    email: user.email,
    phoneNumber: user.phoneNumber,
    state: user.state,
    country: user.country,
    job: user.job,
    aboutMe: user.aboutMe
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProfile(formData, history))
  }

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}

    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify your full name"
                label="Full Name"
                name="name"
                onChange={handleChange}
                value={formData.name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Password"
                name="password"
                onChange={handleChange}
                value=""
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                value={formData.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                onChange={handleChange}
                type="number"
                value={formData.phoneNumber}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Enter Your State"
                name="state"
                onChange={handleChange}
                value={formData.state}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                value={formData.country}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Enter Your Occupation"
                name="job"
                value={formData.job}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Something About You!"
                placeholder="Or Any Quote"
                name="aboutMe"
                onChange={handleChange}
                value={formData.aboutMe}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
             component="span"
             m={2}
             className={`${classes.spreadBox} ${classes.box}`}
        >
          <Button
            align="center"
            color="primary"
            variant="outlined"
            component={Link}
            to={"/profile/" + user._id}
          >
            Preview Profile
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};


export default ProfileDetails;