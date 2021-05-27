import React from 'react'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography, Divider, TextField, FormHelperText } from '@material-ui/core/';
import red from "@material-ui/core/colors/red";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
        head: {
          width: '60%',
          marginTop: '10px',
          [theme.breakpoints.down('sm')]: {
            width: '90%',
          },
        },
        fileInput: {
          margin: '10px 0',
        },
        root: {
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        error: {
            color: red[600],
            marginLeft: '26px'
          }
      }));
const Index = () => {
    const classes = useStyles();
    const history = useHistory()
    const [mail, setMail] = React.useState()
    const [message, setMessage] = React.useState()
    const [mailError, setMailError] = React.useState()
    const [messageError, setMessageError] = React.useState()

    

    const handleMail = (e) => {
        setMail(e.target.value)
        setMailError("")
    }
    const handleMessage = (e) => {
        setMessage(e.target.value)
        setMessageError("")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!mail) {
         setMailError("Enter a mail address")
        } else {
        if (!message) {
         setMessageError("Enter a your query.")
          } else {
        await Axios.post('http://localhost:8080/admin/dashboard/contact-us', {
            mail, message
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
    }

    return (
        <div className={classes.root}>
            <Typography color="secondary" variant="h4" align="center" >Need Help?</Typography>
            <Divider variant="middle" />
            
        <div className={classes.head} >

            <TextField 
            required={true}
            variant="outlined" 
            fullWidth 
            className={classes.fileInput} 
            label="Enter Your Email"
            type="email"
            onChange={handleMail}
            />
               <FormHelperText className={classes.error} >{mailError}</FormHelperText>
            <TextField 
                     required={true}
                     fullWidth
                     name="Wirte your query here..." 
                     variant="outlined" 
                     label="Wirte your query here..." 
                     className={classes.fileInput}
                     multiline={true}
                     rows="4"
                     rowsMax="17"
                     onChange={handleMessage}
                     />
             <FormHelperText className={classes.error} >{messageError}</FormHelperText>
            <Button fullWidth onClick={handleSubmit} variant="contained" color="primary" > Submit</Button>
        </div>
        </div>
    )
}

export default Index
