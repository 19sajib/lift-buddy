import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper, FormControl , InputLabel, Select, option, FormHelperText} from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'

import useStyles from './styles'
import { createPost, updatePost } from '../../actions/posts'
import { isAuthenticated } from '../../auth/auth'

// GET THE ID FOR EDIT


const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        title: '', message: '', tags: '', selectedFile: '', destination: '', source: '', guest: '', leavingTime: ''
    })
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)

    const classes = useStyles();
    const dispatch = useDispatch();
    const {user} = isAuthenticated()

    useEffect(() => {
        if(post) setPostData(post)
    }, [post])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updatePost(currentId, {...postData, name: user?.name, creator: user?._id }))
        } else{
            dispatch(createPost({...postData, name: user?.name, creator: user?._id }))
        }
        clear()

    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: '', destination: '', source: '', guest: '', leavingTime: ''})
    }

    if(!user?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to became a Host or to became a Guest.
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
               <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                     <Typography variant="h6">{currentId ? "Editing" : "Hosting"} a Ride</Typography>
                     <TextField 
                     required={true}
                     name="title" 
                     variant="outlined" 
                     label="Title" 
                     fullWidth
                     value={postData.title}
                     onChange={(e) => setPostData({...postData, title: e.target.value })}
                     />
                     <TextField 
                     required={true}
                     name="message" 
                     variant="outlined" 
                     label="Message" 
                     fullWidth
                     value={postData.message}
                     onChange={(e) => setPostData({...postData, message: e.target.value })}
                     />
                     <TextField 
                     required={true}
                     name="destination" 
                     variant="outlined" 
                     label="Destination" 
                     fullWidth
                     value={postData.destination}
                     onChange={(e) => setPostData({...postData, destination: e.target.value })}
                     />
                     <TextField 
                     required={true}
                     name="source" 
                     variant="outlined" 
                     label="Leaving From" 
                     fullWidth
                     value={postData.source}
                     onChange={(e) => setPostData({...postData, source: e.target.value })}
                     />
                     <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Guest</InputLabel>
                        <Select
                        required={true}
                        native
                        value={postData.guest}
                        onChange={(e) => setPostData({...postData, guest: e.target.value })}
                        label="Guest"
                        inputProps={{
                            name: 'Guest',
                            id: 'outlined-age-native-simple',
                        }}
                        >
                        <option aria-label="None" value="" />
                        <option value={1}>One</option>
                        <option value={2}>Two</option>
                        <option value={3}>Three</option>
                        </Select>
                        <FormHelperText>Number Of Guest Expecting</FormHelperText>
                    </FormControl>
                     <TextField 
                     required={true}
                     name="tags" 
                     variant="outlined" 
                     label="Tags" 
                     fullWidth
                     value={postData.tags}
                     onChange={(e) => setPostData({...postData, tags: e.target.value.split(',') })}
                     />
                     <TextField
                        required={true}
                        id="datetime-local"
                        label="Leaving Time"
                        type="datetime-local"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={postData.leavingTime}
                        //value={moment(postData.leavingTime).format('YYYY-MM-DD hh:mm A')}
                        onChange={(e) => setPostData({...postData, leavingTime: e.target.value })}
                    />
                     
                    <div className={classes.fileInput}>
                       <FileBase 
                       type="file"
                       multiple={false}
                       onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                       />
                     </div>
                     <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>
                     <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
               </form>
        </Paper>
    )
}
export default Form
