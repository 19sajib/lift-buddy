import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import moment from 'moment';
import { useDispatch } from 'react-redux'
import FileBase from 'react-file-base64';
import clsx from 'clsx';
import {Avatar, Box, Button,  Card,  CardActions,  CardContent,  
    Divider,  Typography,  makeStyles } from '@material-ui/core';

import { isAuthenticated } from '../../auth/auth'
import { updateProfile } from '../../actions/auth'


const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    height: 300,
    width: 300,
    boxShadow: theme.shadows[7],
    marginBottom: '10px'
  }
}));

const Profile = ({ className, ...rest }) => {

  const dispatch = useDispatch()
  const history = useHistory()
  const { user } = isAuthenticated()
  const classes = useStyles();
  const [formData, setFormData] = useState({
    id: user._id,
    avatar: user.avatar})

    const handleSubmit = (e) => {
      e.preventDefault();
  
      dispatch(updateProfile(formData, history))
    }

  return (
    <Card
    overflow="visible"
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent >
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
          { (user.state && user.country) &&
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${user.state}, ${user.country}`} 
          </Typography>}
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
      <FileBase 
                  type="file"
                  multiple={false}
                  onDone={({base64}) => setFormData({...formData, avatar: base64}) }
             />
        <Button
          color="primary"
          fullWidth
          variant="text"
          onClick={handleSubmit}
        >
          Save picture
        </Button>
      </CardActions>
    </Card>
  );
};

export default Profile;