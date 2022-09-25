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
        card: {
            padding: '5px 5px 5px 5px',
        },
        error: {
            color: red[600],
            marginLeft: '26px'
          }
      }));

const Feedback = ({ data, newValue }) => {
    const classes = useStyles()
    const [id, setId] = React.useState()
    const [idError, setIdError] = React.useState()
    const [reply, setReply] = React.useState()
    const [replyError, setReplyError] = React.useState()


    const handleId = (e) => {
        setId(e.target.value)
        setIdError("")
    }
    const handleReply = (e) => {
        setReply(e.target.value)
        setReplyError("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!id) {
            setIdError('Enter the help token here.')
        } else {
            if (!reply) {
                setReplyError('Please, select an option.')
            } else {
                await Axios.post('http://localhost:8080/admin/dashboard/feedback-reply', {
                    id, reply
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
            <Typography color="secondary" align="center" variant="h6" >Type: {data.type}</Typography>
            <Card className={classes.card} elevation={9}>
                <Typography align="center" >Token: {data._id}</Typography>
                <Typography align="center" color="primary">Message: {data.message}</Typography>
                <Typography align="center" >Submit Time: {moment(data.reportedAt).format('YYYY-MM-DD hh:mm A')}</Typography>
                <TextField 
                required={true}
                variant="outlined" 
                fullWidth 
                className={classes.fileInput} 
                label="Enter The Token"
                onChange={handleId}
                />
               <FormHelperText className={classes.error} >{idError}</FormHelperText>
               <TextField
                label="Did we solved it?"
                onChange={handleReply}
                required={true}
                fullWidth={true}
                select
                SelectProps={{ native: true }}
                className={classes.fileInput}
                variant="outlined"
              >
                <option value=""></option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </TextField>
             <FormHelperText className={classes.error} >{replyError}</FormHelperText>
            <Button fullWidth onClick={handleSubmit} variant="contained" color="primary" > Submit</Button>
            </Card>
        </div>
    )
}

export default Feedback
