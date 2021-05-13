import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Divider, Fab, Grid, Typography, Box,
         Checkbox, FormControlLabel } from '@material-ui/core';
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import {  useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { isAuthenticated } from '../../auth/auth'
import { verifyProfile } from '../../actions/auth';
import useStyles from './styles'

export const GreenCheckbox = withStyles({
  root: {
    margin: '10px',
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

 const ImageUpload = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const history = useHistory();
   const { user } = isAuthenticated()
   const [base64, setbase64] = React.useState({file1:[], file2:[], file3:[]})

    function handleImageChange (e) {
        e.preventDefault();
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
                setbase64({...base64, file1: reader.result})
              }
     }          
    function handleImageChange2 (e) {
        e.preventDefault();
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
                setbase64({...base64, file2: reader.result})
     } 
     }        
    function handleImageChange3 (e) {
        e.preventDefault();
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
                setbase64({...base64, file3: reader.result})
     }

    }

    const [checked, setChecked] = React.useState(false);
  
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(checked) {
        dispatch(verifyProfile({formData: {userId: user._id, file1: base64.file1, file2: base64.file2, file3: base64.file3 }, history}))
      } else {
        return(
          <Typography>Please, thik this before submit.</Typography>
        )
      }
    }

    return (
        <div>
          <form >
          <Typography color="secondary" variant="h4" align="center" >Verify Your Profile!</Typography>
            <Divider className={classes.titleHead} variant="middle" />
            <Grid container spacing={2} >
            <Grid item xs={12} sm={4} align="center" >
                        <Card className={classes.paper}>
                        { !base64.file1.length ? (<Typography className={classes.title} variant="h5" gutterBottom>Your Image Will Be Here, Upload Your Image!</Typography>) : 
                        (<img src={base64.file1} alt="img" className={classes.img} ></img>)
                                  }
                                  <Divider variant="middle" />
                    <input 
                    required
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    name="file1" 
                    onChange={handleImageChange} />
                    <label htmlFor="contained-button-file">
                    <Fab component="span" className={classes.button} >
                            <AddPhotoAlternateIcon />
                          </Fab> </label>
                              </Card>
            </Grid>
            <Grid item xs={12} sm={4} align="center" >
                      <Card className={classes.paper}>
                      { !base64.file2.length ? (<Typography className={classes.title} variant="h5" gutterBottom>
                        Upload A Image With Your Face And ID Card Here</Typography>) : 
                      (<img src={base64.file2} alt="img" className={classes.img} ></img>)
                                }
                                 <Divider variant="middle" />
                  <input 
                  required
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file2"
                  multiple
                  type="file"
                  name="file2" 
                  onChange={handleImageChange2} />
                  <label htmlFor="contained-button-file2">
                  <Fab component="span" className={classes.button} >
                          <AddPhotoAlternateIcon />
                        </Fab> </label>
                            </Card>
            </Grid>
            <Grid item xs={12} sm={4} align="center" >
                        <Card className={classes.paper}>
                        { !base64.file3.length ? (<Typography className={classes.title} variant="h5" gutterBottom >
                          Upload A Image Of Your Identity Card Which Have Your Face </Typography>) : 
                        (<img src={base64.file3} alt="img" className={classes.img} ></img>)
                                  }
                                   <Divider variant="middle" />
                    <input 
                    required
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file3"
                    multiple
                    type="file"
                    name="file3" 
                    onChange={handleImageChange3} />
                    <label htmlFor="contained-button-file3">
                    <Fab component="span" className={classes.button} >
                            <AddPhotoAlternateIcon />
                          </Fab> </label>
                              </Card>
            </Grid>
                    
            </Grid>

        <FormControlLabel
          required={true}
          control={<GreenCheckbox checked={checked} 
          onChange={handleChange} 
          name="checked"
          />}
          label={<Typography >By checking this box, I am accepting all the <Link to={"/terms-and-conditions"} >terms and conditions</Link> and will act accordingly.</Typography>}
        />

        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={handleSubmit}
          >
            Submit Details
          </Button>
        </Box>
      </form>
      </div>
    )
}

export default ImageUpload
