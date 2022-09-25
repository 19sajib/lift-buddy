import React from 'react'
import Axios from 'axios'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, 
     Card, CardMedia, Grid, Divider, TextField, FormHelperText } from '@material-ui/core/';
import Paper from '@material-ui/core/Paper';
import red from "@material-ui/core/colors/red";
import { toast } from "react-toastify";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  media: {
    height: '100%',
    paddingTop: '100%',
  },
  head: {
    marginTop: '10px',
    padding: '10px 0 10px 0'
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  root: {
    marginTop: '20px'
  },
  error: {
    color: red[600],
    marginLeft: '26px'
  }
});

const Verify = ({data, newValue}) => {
    //console.log(data);
    const classes = useStyles()
    
    const [userId, setUserId] = React.useState();
    const [verified, setVerified] = React.useState();
    const [idType, setIdType] = React.useState();
    const [idValue, setIdValue] = React.useState();
    const [reject, setReject] = React.useState();
    const [userIdError, setUserIdError] = React.useState();
    const [verifiedError, setVerifiedError] = React.useState();
    const [idTypeError, setIdTypeError] = React.useState();
    const [idValueError, setIdValueError] = React.useState();
    const [rejectError, setRejectError] = React.useState();

    const handleUserId = (e) => {
      setUserId(e.target.value)
      setUserIdError("")
    }
    const handleChange = (e) => {
      setVerified(e.target.value);
      setVerifiedError("")
    }
    const handleChange2 = (e) => {
      setIdType(e.target.value)
      setIdTypeError("")
    }
    const handleChange3 = (e) => {
      setIdValue(e.target.value)
      setIdValueError("")
    }
    const handleChange4 = (e) => {
      setReject(e.target.value)
      setRejectError("")
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(!userId) {
        setUserIdError("Please enter above user id here. Make sure you enterd right user id.")
      } else {
      if (!verified) {
        return setVerifiedError("Please Select Yes or No!")
      } else {
        if (verified === "yes") {   
          if(!idType) {
            return setIdTypeError("Please Select a Type of Id Card!")
          } else {
            if(!idValue) {
              return setIdValueError("Please Write the Number of that Id Card!")
            } else {
             await Axios.post('http://localhost:8080/admin/dashboard/verify-response', {
              verified, idType, idValue, userId
             })
                .then(function (response) {
                  toast.success(response.data.message);
                })
                .catch(function (error) {
                  toast.error(error);
                });
                setVerified("")
              setIdType("")
              setIdValue("")
              newValue(userId);
            }
          }
        } else {
          if (!reject) {
            return setRejectError("You Must Give A Reason.")
          } else {
            await Axios.post('http://localhost:8080/admin/dashboard/verify-response', {
              verified, reject, userId
             })
                .then(function (response) {
                  toast.success(response.data.message);
                })
                .catch(function (error) {
                  toast.error(error);
                });
                setVerified("")
            setReject("")
            newValue(userId)
          }
        }
        }
      }}


    return (
      <div>
        <Paper elevation={7} className={classes.root} >
         <Grid container spacing={2} >
           <Grid item xs={12} align="center">

            <Card className={classes.head}>
                <Typography>User Id: {data.userId}</Typography>
                <Typography>Total Attempt: {data.attempt}</Typography>
                <Typography>First Submit At: {moment(data.createdAt).format('YYYY-MM-DD hh:mm A')}</Typography>
            </Card>
           </Grid>
           <Divider />
            <Grid item xs={12} sm={4} align="center" >
            <Card>
            <CardMedia className={classes.media} image={data.file1} title="Media 1" />
            </Card>
            </Grid>
            <Grid item xs={12} sm={4} align="center" >
            <Card>
            <CardMedia className={classes.media} image={data.file2} title="Media 2" />
            </Card>
            </Grid>
            <Grid item xs={12} sm={4} align="center" >
            <Card>
            <CardMedia className={classes.media} image={data.file3} title="Media 3" />
            </Card>
            </Grid>
            <Grid item xs={12} align="center">

            <Card className={classes.head}>
                <Typography color="secondary" variant="h6" >Your Response Here</Typography>
                <Divider variant="middle" />
                <TextField label="Please Enter The Above User Id Here" variant="outlined" onChange={handleUserId} required className={classes.fileInput} >
                </TextField>    
                <FormHelperText className={classes.error} >{userIdError}</FormHelperText>
            <TextField
                label="Verified?"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                className={classes.fileInput}
                variant="outlined"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </TextField>
              <FormHelperText className={classes.error} >{verifiedError}</FormHelperText>
              { verified === "yes" ?
              (<div>  <TextField
                label="ID Type?"
                onChange={handleChange2}
                required
                select
                SelectProps={{ native: true }}
                className={classes.fileInput}
                variant="outlined"
              >
                <option value=""></option>
                <option value="nid">National Identity Card</option>
                <option value="passport">Passport</option>
                <option value="dl">Driving Licenes</option>
              </TextField>
              <FormHelperText className={classes.error} >{idTypeError}</FormHelperText>
              <TextField label="Id Number" variant="outlined" onChange={handleChange3} required className={classes.fileInput} >

              </TextField>
              <FormHelperText className={classes.error} >{idValueError}</FormHelperText>
              </div>)
              : null }
              {verified === "no" ? ( <div>
                <TextField label="Wiret Your Reason Here!" variant="outlined" onChange={handleChange4} required className={classes.fileInput} >

                </TextField>
                <FormHelperText className={classes.error} >{rejectError}</FormHelperText>
                </div>) : null
}
               <Button color="primary" variant="contained" onClick={handleSubmit} >
                 Submit
               </Button>
            </Card>
           </Grid>
            </Grid>
            </Paper>
      </div>
    )
}

export default Verify

// const [file, setFile] = React.useState();
// const [open, setOpen] = React.useState(false);
// const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

// const imageIcon = (media) => {
//   return ( 
//   <div>
//       <ImageIcon variant="outlined" color="primary" onClick={handleClickOpen} />   
//       <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
//       <DialogContent>
//       {/* <Card>
//           <CardMedia className={classes.media} image={media} ></CardMedia>
//       </Card> */}
//       <img src={media} alt="media" id="media" ></img>
//       </DialogContent>
//       <DialogActions>
//           <Button onClick={handleClose} color="primary">
//           Close
//           </Button>
//       </DialogActions>
//       </Dialog>
//       </div>
//       )
//   };
// const imageIcon2 = (media2) => {
//       return ( 
//       <div>
//           <ImageIcon variant="outlined" color="primary" onClick={handleClickOpen} />   
//           <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
//           <DialogContent>
//           {/* <Card>
//               <CardMedia className={classes.media} image={media} ></CardMedia>
//           </Card> */}
//           <img src={media2} alt="media" id="media2" ></img>
//           </DialogContent>
//           <DialogActions>
//               <Button onClick={handleClose} color="primary">
//               Close
//               </Button>
//           </DialogActions>
//           </Dialog>
//           </div>
//           )
//   };
// const imageIcon3 = (media3) => {
//   return ( 
//   <div>
//       <ImageIcon variant="outlined" color="primary" onClick={handleClickOpen} />   
//       <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
//       <DialogContent>
//       {/* <Card>
//           <CardMedia className={classes.media} image={media} ></CardMedia>
//       </Card> */}
//       <img src={media3} alt="media" id="media3" ></img>
//       </DialogContent>
//       <DialogActions>
//           <Button onClick={handleClose} color="primary">
//           Close
//           </Button>
//       </DialogActions>
//       </Dialog>
//       </div>
//       )
//   };
{/* <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">UserId</TableCell>
            <TableCell align="right">Media&nbsp;1</TableCell>
            <TableCell align="right">Media&nbsp;2</TableCell>
            <TableCell align="right">Media&nbsp;3</TableCell>
            <TableCell align="right">Attempt</TableCell>
            <TableCell align="right">Created&nbsp;At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
            <TableRow>
              <TableCell component="th" scope="row">
                {data.data._id}
              </TableCell>
              <TableCell align="right">{data.data.userId}</TableCell>
              <TableCell align="right">{imageIcon(data.data.file1)}</TableCell>
              <TableCell align="right">{imageIcon2(data.data.file2)}</TableCell>
              <TableCell align="right">{imageIcon3(data.data.file3)}</TableCell>
              <TableCell align="right">{data.data.attempt}</TableCell>
              <TableCell align="right">{data.data.createdAt}</TableCell>
            </TableRow>

        </TableBody>
      </Table>
    </TableContainer> */}
