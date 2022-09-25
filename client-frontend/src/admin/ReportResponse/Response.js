import React from 'react'
import Axios from 'axios'
import moment from 'moment'
import Post from './Post/Post'
import useStyles from './style'
import { CircularProgress, Paper, Typography, Divider, Grid, TextField, Button, FormHelperText } from '@material-ui/core'
import { toast } from "react-toastify";
import load from '../../assests/images/load2-unscreen.gif';

const Response = ({data, newValue}) => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = React.useState()
    const [post, setPost] = React.useState()
    const [postId2, setPostId2] = React.useState()
    const [postIdError2, setPostIdError2] = React.useState()
    const [postId, setPostId] = React.useState()
    const [postIdError, setPostIdError] = React.useState()
    const [postOwnerId, setPostOwnerId] = React.useState()
    const [postOwnerIdError, setPostOwnerIdError] = React.useState()
    const [reporterId, setReporterId] = React.useState()
    const [reporterIdError, setReporterIdError] = React.useState()
    const [deletePost, setDeletePost] = React.useState()
    const [deletePostError, setDeletePostError] = React.useState()
    const [response, setResponse] = React.useState()
    const [responseError, setResponseError] = React.useState()

    const searchPost = (e) => {
        setPostId2(e.target.value)
        setPostIdError2("")
    }
    const fetchPost = async (e) => {
        e.preventDefault()
        if (!postId2) {
            setPostIdError('Please Enter the post id.')
        } else {
        setIsLoading(true)
            Axios.post('http://localhost:8080/posts/single-post', { postId2 })
        .then(function (response) {
          setPost(response.data);
          setIsLoading(false)
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
        }
    }

    const handleChange = (e) => {
        setDeletePost(e.target.value);
        setDeletePostError("")
      }
    const handleChange2 = (e) => {
        setPostId(e.target.value)
        setPostIdError("")
      }
    const handleChange3 = (e) => {
        setPostOwnerId(e.target.value)
        setPostOwnerIdError("")
      }
    const handleChange4 = (e) => {
        setReporterId(e.target.value)
        setReporterIdError("")
      }
    const handleChange5 = (e) => {
        setResponse(e.target.value)
        setResponseError("")
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (deletePost) {
            if (deletePost === "no") {
                if (!postId) {
                    setPostIdError2("Enter above post id.")
                } else {
                    if (!reporterId) {
                        setReporterIdError("Enter reporter id from above.")
                    } else {
                        if (!response) {
                            setResponseError("Enter your reponse here")
                        } else {
                            Axios.post('http://localhost:8080/admin/dashboard/report-response', { 
                                postId, reporterId, deletePost, response
                             })
                                .then(function (response) {
                                console.log(response.data);
                                newValue(postId)
                                toast.success(response.data.message);
                                })
                                .catch(function (error) {
                                    toast.error("Internal Server Error. Please, try again later. or Check you input again!");
                                });
                        }
                    }
                }
            } else {
                if (!postId) {
                    setPostIdError2("Enter above post id.")
                } else {
                    if (!postOwnerId) {
                        setPostOwnerIdError("Enter post owner id from above.")
                    } else {
                        if (!reporterId) {
                            setReporterIdError("Enter reporter id from above.")
                        } else {
                            if (!response) {
                                setResponseError("Enter your reponse here")
                            } else {
                                Axios.post('http://localhost:8080/admin/dashboard/report-response', { 
                                postId, reporterId, deletePost, response, postOwnerId
                             })
                                .then(function (response) {
                                console.log(response.data);
                                newValue(postId)
                                toast.success(response.data.message);
                                })
                                .catch(function (error) {
                                    toast.error("Internal Server Error. Please, try again later. or Check you input again!");
                                });
                            }
                    }
                    }
                }
            }
            
        } else {
            setDeletePostError("Select yes or no")
        }
    }

    return (
            <div className={classes.paper}>
            <Typography className={classes.title} variant="h6" color="secondary" >Need Attention Here</Typography>
            <Divider variant="middle" />
            <Typography className={classes.title} variant="h6" >Reported Post Id: {data.reportedPost}</Typography>
            <Typography className={classes.title} variant="body1" >Post Owner: {data.postOwner}</Typography>
            <Typography className={classes.title} variant="h6" >Report Text: {data.reportedText}</Typography>
            <Typography className={classes.title} variant="body1" >Report Time: {moment(data.createdAt).format('YYYY-MM-DD hh:mm A')}</Typography>
            <Typography className={classes.title} variant="body1" >Reported By: {data.reportedBy}</Typography>
            <Divider variant="middle" />
            <Grid className={classes.space} container spacing={3}  > 
            <Grid item xs={12} sm={6}>
             <TextField 
             className={classes.fileInput} onChange={searchPost}
             variant="outlined" label="Enter Post Id" />  
             <FormHelperText className={classes.error} >{postIdError2}</FormHelperText>
             <Button 
             onClick={fetchPost}
             className={classes.buttonSubmit} 
             variant="outlined" 
             color="primary" >
                 Fetch Post
            </Button>
            { isLoading && <div align="center" > <img height="300px" src={load} alt="Loading"/> </div>}
            {post && <Post post={post} />}
            </Grid>
            <Grid item xs={12} sm={6}>
               <form autoComplete="off" className={`${classes.root} ${classes.form}`}>
               <TextField
                label="Deleting this post?"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                className={classes.fileInput}
                variant="outlined"
              >
                <option value=""></option>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </TextField>
              <FormHelperText className={classes.error} >{deletePostError}</FormHelperText>
              { deletePost && <>
                  
               <TextField className={classes.fileInput} onChange={handleChange2} variant="outlined" label="Enter Post Id" />  
               <FormHelperText className={classes.error} >{postIdError}</FormHelperText>
               { deletePost === "yes" && 
               <>
               <TextField className={classes.fileInput} onChange={handleChange3} variant="outlined" label="Enter Post Owner User Id" />  
               <FormHelperText className={classes.error} >{postOwnerIdError}</FormHelperText>  
               </> 
               }
               <TextField className={classes.fileInput} onChange={handleChange4} variant="outlined" label="Enter Reporter User Id" />  
               <FormHelperText className={classes.error} >{reporterIdError}</FormHelperText>   
                     <TextField 
                     required={true}
                     name="ReportedText" 
                     variant="outlined" 
                     label="Write Your Response Here" 
                     fullWidth
                     multiline={true}
                     rows="4"
                     rowsMax="17"
                     onChange={handleChange5}
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
