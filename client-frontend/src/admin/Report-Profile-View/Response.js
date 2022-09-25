import React from 'react'
import Axios from 'axios'
import moment from 'moment'
import Prfile from './ProfileView/View'
import useStyles from './style'
import { Typography, Divider, Grid, TextField, Button, FormHelperText } from '@material-ui/core'
import { toast } from "react-toastify";

import load from '../../assests/images/load2-unscreen.gif';

const Response = ({data, newValue}) => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = React.useState()
    const [profile, setProfile] = React.useState()
    const [userId2, setUserId2] = React.useState()
    const [userIdError2, setUserIdError2] = React.useState()
    const [userId, setUserId] = React.useState()
    const [userIdError, setUserIdError] = React.useState()
    const [reporterId, setReporterId] = React.useState()
    const [reporterIdError, setReporterIdError] = React.useState()
    const [banProfile, setBanProfile] = React.useState()
    const [banProfileError, setBanProfileError] = React.useState()
    const [response, setResponse] = React.useState()
    const [responseError, setResponseError] = React.useState()

    const searchPost = (e) => {
        setUserId2(e.target.value)
        setUserIdError2("")
    }
    const fetchProfile = async (e) => {
        e.preventDefault()
        if (!userId2) {
            setUserIdError2('Please Enter the user id.')
        } else {
            setIsLoading(true)
            Axios.post('http://localhost:8080/users/view-profile', { id: userId2 })
        .then(function (response) {
          setProfile(response.data.user);
          setIsLoading(false)
          //console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
        }
    }

    const handleChange = (e) => {
        setBanProfile(e.target.value);
        setBanProfileError("")
      }

    const handleUserId = (e) => {
        setUserId(e.target.value)
        setUserIdError("")
      }
    const handleReporter = (e) => {
        setReporterId(e.target.value)
        setReporterIdError("")
      }
    const handleResponse = (e) => {
        setResponse(e.target.value)
        setResponseError("")
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (banProfile) {
            if (banProfile === "no") {
                if (!reporterId) {
                        setReporterIdError("Enter reporter id from above.")
                    } else {
                        if (!response) {
                            setResponseError("Enter your reponse here")
                        } else {
                            Axios.post('http://localhost:8080/admin/dashboard/reported-profile-action', { 
                                 reporterId, banProfile, response, id: data._id
                             })
                                .then(function (response) {
                                console.log(response.data);
                                newValue(data._id)
                                toast.success(response.data.message);
                                })
                                .catch(function (error) {
                                    toast.error("Internal Server Error. Please, try again later. or Check you input again!");
                                });
                        }
                    }
                }
             else {
                if (!userId) {
                    setUserIdError("Enter above post id.")
                } else {
                    if (!response) {
                        setResponseError("Enter your reponse here")
                    } else {
                        Axios.post('http://localhost:8080/admin/dashboard/reported-profile-action', { 
                        userId, banProfile, response, id: data._id
                     })
                        .then(function (response) {
                        console.log(response.data);
                        newValue(data._id)
                        toast.success(response.data.message);
                        })
                        .catch(function (error) {
                            toast.error("Internal Server Error. Please, try again later. or Check you input again!");
                        });
                    }
                        
                    }
                }
            
        } else {
            setBanProfileError("Select your response")
        }
    }

    return (
            <div className={classes.paper}>
            <Typography className={classes.title} variant="h6" color="secondary" >Need Attention Here</Typography>
            <Divider variant="middle" />
            <Typography className={classes.title} variant="h6" >Reported Profile: {data.reportedId}</Typography>
            <Typography className={classes.title} variant="h6" >Report Text: {data.reportedText}</Typography>
            <Typography className={classes.title} variant="body1" >Report Time: {moment(data.reportedAt).format('YYYY-MM-DD hh:mm A')}</Typography>
            <Typography className={classes.title} variant="body1" >Reported By: {data.reportedBy}</Typography>
            <Divider variant="middle" />
            <Grid className={classes.space} container spacing={3}  > 
            <Grid item xs={12} sm={6}>
             <TextField 
             className={classes.fileInput} onChange={searchPost}
             variant="outlined" label="Enter Profile Id" />  
             <FormHelperText className={classes.error} >{userIdError2}</FormHelperText>
             <Button 
             onClick={fetchProfile}
             className={classes.buttonSubmit} 
             variant="outlined" 
             color="primary" >
                 Fetch Profile
            </Button>
            { isLoading && <div align="center" > <img height="350px" src={load} alt="Loading"/> </div>}
            {profile && <Prfile profile={profile} />}
            </Grid>
            <Grid item xs={12} sm={6}>
               <form autoComplete="off" className={`${classes.root} ${classes.form}`}>
               <TextField
                label="Action Against User?"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                className={classes.fileInput}
                variant="outlined"
              >
                <option value=""></option>
                <option value="no">No</option>
                <option value="warnned">Warn User</option>
                <option value="banned">Ban User</option>
              </TextField>
              <FormHelperText className={classes.error} >{banProfileError}</FormHelperText>
              { banProfile && <>
               { (banProfile === "no") ?
               <>               
               <TextField className={classes.fileInput} onChange={handleReporter} variant="outlined" label="Enter Reporter User Id" />  
               <FormHelperText className={classes.error} >{reporterIdError}</FormHelperText>   
               </>   :   <>
               <TextField className={classes.fileInput} onChange={handleUserId} variant="outlined" label="Enter Banned User Id" />  
               <FormHelperText className={classes.error} >{userIdError}</FormHelperText>  
               </>
               }
                     <TextField 
                     required={true}
                     name="ReportedText" 
                     variant="outlined" 
                     label="Write Your Response Here" 
                     fullWidth
                     multiline={true}
                     rows="4"
                     rowsMax="17"
                     onChange={handleResponse}
                     />
                <FormHelperText className={classes.error} >{responseError}</FormHelperText>     
                  </>}
             <Button className={classes.buttonSubmit} onClick={handleSubmit} variant="contained" color="secondary" size="large" type="submit" fullWidth >Submit</Button>
             </form>
            </Grid>
            </ Grid > 
             </div>
    )
}

export default Response
