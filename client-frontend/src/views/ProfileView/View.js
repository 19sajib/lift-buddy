import React, { useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom'
import moment from 'moment';
import Axios from 'axios'
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {Avatar, Box, Button,  CardActions, Dialog, DialogContent, DialogContentText, DialogActions,  
       DialogTitle, Divider,  Typography,  makeStyles, Grid, CircularProgress, TextField, FormHelperText } from '@material-ui/core';
import red from "@material-ui/core/colors/red";
import { toast } from "react-toastify";

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
},
error: {
  color: red[600],
  marginLeft: '26px'
}
}));

const Profile = ({ className, ...rest }) => {

  const { id } = useParams()
  console.log(id);
  const history = useHistory()
  const { user } = isAuthenticated()
  const classes = useStyles();
  const [formData, setFormData] = useState()
  const [message, setMessage] = React.useState()
  const [messageError, setMessageError] = React.useState()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    React.useEffect(() => {
        Axios.post('http://localhost:8080/users/view-profile',{ id })
          .then(function (response) {
            setFormData(response.data.user);
            //console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        }, [id])

    
    const handleChange = (e) => {
      e.preventDefault();
      setMessage(e.target.value)
      setMessageError("")
    }
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!user._id) {
        history.push('/auth')
        toast.warn('Please Log In First!')
      }
      if (!message) {
        setMessageError("You must have to give the reason")
      } else {
        await Axios.post('http://localhost:8080/users/report-profile', {
          reportedId: id, reportedText: message, reportedBy: user._id
           })
              .then(function (response) {
                console.log(response.data);
                history.push('/')
                toast.success(response.data.message)
              })
              .catch(function (error) {
                //console.log(error);
                toast.error(error)
              });
             }
      }
  

  return (
    !formData ? <div align="center"> <CircularProgress /> <CircularProgress color="secondary" /> </div>: 
    <Grid container component='main' 
      className={classes.root}
    >
      <Grid item xs={12} md={4} sm={12} align="center" style={{borderRadius: '5px', padding: "0 5px 0 5px", backgroundColor: 'white', boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)"}}>
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
            {formData.name}
          </Typography>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {formData.job}
          </Typography>
          { formData.aboutMe && 
          <Typography
            color="textPrimary"
            gutterBottom
            variant="body1"
          >
            {formData.aboutMe}

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
                        {formData.email} 
                    </Typography>
            </div> 

            { (formData.state && formData.country) &&
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
                <HomeIcon />
                    
                    <Typography
                        variant="subtitle1"
                    >
                        {`${formData.state}, ${formData.country}`} 
                    </Typography>
            </div> }
            
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
        {(user._id === formData._id) ? 
        <Button style={{borderRadius: '25px'}}
          color="primary"
          fullWidth
          variant="outlined"
          component={Link} to="/profile"
        >
          Edit Profile
        </Button> 
        : 
        <>
        <Button style={{borderRadius: '25px'}}
        color="secondary"
        fullWidth
        variant="outlined"
        onClick={handleClickOpen}
      >
        Report This Profile
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" color="secondary" >Profile Report</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Write your reason in detail, why are you reporting this profile!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Your Reason Here..."
            multiline={true}
            rowsMax="17"
            fullWidth
            onChange={handleChange}
          />
          <FormHelperText className={classes.error} >{messageError}</FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      </>
        }
      </CardActions>
    </Grid>
    </Grid>
  );
};

export default Profile;