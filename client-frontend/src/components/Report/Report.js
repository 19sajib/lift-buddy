import React from 'react'
import { Button, Grid, TextField, CircularProgress, Paper, Typography, Divider } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { toast } from "react-toastify";

import Post from './Post/Post'
import useStyles from './styles'
import { postReport } from '../../actions/posts'
import { isAuthenticated } from '../../auth/auth'


const Report = () => {
    const classes = useStyles();
    const history = useHistory()
    const dispatch = useDispatch();
    const { user } = isAuthenticated()
    const [reportedText, setReportedText] = React.useState("")
    const {id} = useParams()
    console.log(id);
    const {posts} = useSelector((state) => state.posts)
    console.log(posts);
    
    const post = posts.filter(obj => {
        return obj?._id === id
      })
      console.log(post);
      const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(postReport({ReportData:{ reportedPost: id, reportedBy: user._id, reportedText, postOwner: post[0].creator }, history}))

    }
    React.useEffect(() => {
    if(!posts.length) {
      toast.warn('Session expired. Please, Try again!')
      history.push('/')
    }
    }, []);
    // React.useEffect(() => {
    //   window.addEventListener("hashchange", history.push('/'), false);
    //   return () => {
    //     window.removeEventListener("hashchange", history.push('/'), false);
    //   };
    // }, [history]);
  
    // const handleUnload = (e) => {
    //   history.push('/')
    //   // const message = "o/";
    //   // (e || window.event).returnValue = message; //Gecko + IE
    //   // return message;
    // };

    return (
            !posts.length ? <CircularProgress /> : (
            <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h5" >Reporting A Post!</Typography>
            <Divider variant="middle" />
            <Grid className={classes.space} container spacing={3}  > 
            <Grid item xs={12} sm={6}>
            <Post post={post[0]} setCurrentId={id} />
            </Grid>
            <Grid item xs={12} sm={6}>
               <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                     <TextField 
                     required={true}
                     name="ReportedText" 
                     variant="outlined" 
                     label="Write Your Reason Here" 
                     fullWidth
                     multiline={true}
                     rows="4"
                     rowsMax="17"
                     value={reportedText}
                     onChange={(e) => setReportedText( e.target.value )}
                     />
             <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="large" type="submit" fullWidth >Submit</Button>
             </form>
            </Grid>
            </ Grid > 
             </Paper>)
    )
}

export default Report
