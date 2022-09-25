import React from 'react'
import Axios from 'axios'
import moment from 'moment'
import { Grid, Card, Typography, FormHelperText, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import red from "@material-ui/core/colors/red";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
        head: {
          marginTop: '10px',
        },
        fileInput: {
          margin: '10px 0 5px 0',
        },
        error: {
            color: red[600],
            marginLeft: '26px'
          }
      }));

const Help = ({ data, newValue }) => {
    const classes = useStyles()
    const [id, setId] = React.useState()
    const [idError, setIdError] = React.useState()
    const [replyMessage, setReplyMessage] = React.useState()
    const [replyMessageError, setReplyMessageError] = React.useState()


    const handleId = (e) => {
        setId(e.target.value)
        setIdError("")
    }
    const handleReplyMessage = (e) => {
        setReplyMessage(e.target.value)
        setReplyMessageError("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!id) {
            setIdError('Enter the help token here.')
        } else {
            if (!replyMessage) {
                setReplyMessageError('Please, give your response here.')
            } else {
                await Axios.post('http://localhost:8080/admin/dashboard/contact-us/reply', {
                    id, replyMessage
                   })
                      .then(function (response) {
                        toast.success(response.data.message);
                      })
                      .catch(function (error) {
                        //  console.log(error);
                        toast.error("Internal Server Error. Please, try again later. or Check you input again!");
                      });
                newValue(id)
            }
            
        }
    }
    return (
        <div className={classes.head}>
            <Typography color="secondary" align="center" variant="h6" >Need Help Here!</Typography>
            <Grid  container spacing={4} >
           <Grid item xs={12} sm={6} align="center">
            <Card >
                <Typography>Help Token: {data._id}</Typography>
                <Typography>Asked Time: {moment(data.createdAt).format('YYYY-MM-DD hh:mm A')}</Typography>
                <Typography color="primary">Query: {data.message}</Typography>
                <TextField 
                required={true}
                variant="outlined" 
                fullWidth 
                className={classes.fileInput} 
                label="Enter The Help Token"
                onChange={handleId}
                />
               <FormHelperText className={classes.error} >{idError}</FormHelperText>
            </Card>
           </Grid>
           <Grid item xs={12} sm={6} align="center">
            <Card >
            <TextField 
                     required={true}
                     fullWidth
                     name="Wirte your response here..." 
                     variant="outlined" 
                     label="Wirte your response here..." 
                     className={classes.fileInput}
                     multiline={true}
                     rows="3"
                     rowsMax="17"
                     onChange={handleReplyMessage}
                     />
             <FormHelperText className={classes.error} >{replyMessageError}</FormHelperText>
            <Button fullWidth onClick={handleSubmit} variant="contained" color="primary" > Submit</Button>
              </Card>
           </Grid>
          </Grid>
        </div>
    )
}

export default Help
