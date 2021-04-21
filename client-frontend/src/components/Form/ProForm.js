import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button, Typography, Paper} from '@material-ui/core'


import useStyles from './styles'
import { createProPost } from '../../actions/proPost'
import { isAuthenticated } from '../../auth/auth'

// GET THE ID FOR EDIT


const ProForm = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        source: '', destination: '', vehicle: '', message: '', dateTime: ''
    })

     const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)

    const classes = useStyles();
    const dispatch = useDispatch();
    const { user } = isAuthenticated();

    useEffect(() => {
        if(post) setPostData(post)
    }, [post])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if(currentId) {
        //     dispatch(updatePost(currentId, {...postData, name: user?.result?.name}))
        // } else{
            dispatch(createProPost({...postData, name: user?.name}));
        // }
         clear()

    }

    const clear = () => {
        setCurrentId(null);
        setPostData({  source: '', destination: '', vehicle: '', message: '', dateTime: '' })
    }

    if(!user?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to became a host or to became a guest.
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
               <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                     <Typography variant="h6">{currentId ? "Editing" : "Creating"} a Post</Typography>
                     <TextField 
                     name="source" 
                     variant="outlined" 
                     label="Source" 
                     fullWidth
                     value={postData.source}
                     onChange={(e) => setPostData({...postData, source: e.target.value })}
                     />
                     <TextField 
                     name="destination" 
                     variant="outlined" 
                     label="Destination" 
                     fullWidth
                     value={postData.destination}
                     onChange={(e) => setPostData({...postData, destination: e.target.value })}
                     />
                     <TextField 
                     name="vehicle" 
                     variant="outlined" 
                     label="Vehicle" 
                     fullWidth
                     value={postData.vehicle}
                     onChange={(e) => setPostData({...postData, vehicle: e.target.value })}
                     />
                     <TextField 
                     name="message" 
                     variant="outlined" 
                     label="Message" 
                     fullWidth
                     value={postData.message}
                     onChange={(e) => setPostData({...postData, message: e.target.value })}
                     />
                    <TextField
                        id="datetime-local"
                        label="Leaving Time"
                        type="datetime-local"
                        value={postData.dateTime}
                        onChange={(e) => setPostData({...postData, dateTime: e.target.value })}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                     <Button className={classes.buttonSubmit} variant="outlined" color="primary" size="large" type="submit" fullWidth >Create</Button>
                     <Button  variant="outlined" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
               </form>
        </Paper>
    )
}
export default ProForm
