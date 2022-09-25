import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper, FormControl , InputLabel, Select, option, FormHelperText } from '@material-ui/core'
//import Autocomplete from '@material-ui/lab/Autocomplete';
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom';
import moment from 'moment'
// import Autocomplete, { usePlacesWidget } from 'react-google-autocomplete';
import Auto from './useAutocomplete'

import DestPlaceAuto from './DestPlaceAuto'
import SourcePlaceAuto from './SourcePlaceAuto'

import useStyles from './styles'
import { createPost, updatePost } from '../../actions/posts'
import { isAuthenticated } from '../../auth/auth'
import location from '../../assests/json/bd-postcodes.json'
// GET THE ID FOR EDIT


const Form = ({ currentId, setCurrentId }) => {

    const [postData, setPostData] = useState({
        title: '', message: '', tags: '', selectedFile: '', destination: '', source: '', guest: '', leavingTime: '',
        destPlaceId: '', sourcePlaceId: '', 
    })
    const posts = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null)

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory()
    const {user} = isAuthenticated()

    const destValue = async (e) => {
         setPostData({...postData, destination: e?.terms[0].value, destPlaceId: e?.place_id })
    
        console.log(e);
    } 
    const sourceValue = async (e) => {
         setPostData({...postData, source: e?.terms[0].value, sourcePlaceId: e?.place_id })
    }



    useEffect(() => {
        if(posts) setPostData(posts)
    }, [posts])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updatePost(currentId, {...postData, name: user?.name, creator: user?._id }))
           
        } else{
            dispatch(createPost({...postData, name: user?.name, creator: user?._id }, history))
            
        }
        clear()

    }


    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: '', destination: '', source: '', guest: '', leavingTime: ''})
    }



    if(!user) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In / Up to interact more.
                </Typography>
            </Paper>
        )
    }

    if(user && !user?.isVerified) {
        return (
            <Paper className={classes.paper}>
                <Link to="/verification"> <Typography variant="h6" align="center">
                    Please Verify your profile to became a Host or to became a Guest.
                </Typography></Link>
            </Paper>
        )
    }


    return (
        <Paper className={classes.paper}>
               <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                     <Typography variant="h6">{currentId ? "Editing" : "Hosting"} a Ride</Typography>
                     
                     {/* <Autocomplete
                            apiKey={"AIzaSyDt9br636Un8x819x8DyqF-eIS1pgO-xMs"}
                            style={{ width: "90%" }}
                            onPlaceSelected={(place) => {
                                console.log(place);
                            }}
                            options={{
                                componentRestrictions: { country: "bd" },
                            }}
                            />; */}
                     {/* <TextField 
                     required={true}
                     name="title" 
                     variant="outlined" 
                     label="Title" 
                     fullWidth
                     value={postData.title}
                     onChange={(e) => setPostData({...postData, title: e.target.value })}
                     /> */}
                    {/* <Autocomplete
                            id="combo-box-demo"
                            options={location.postcodes}
                            getOptionLabel={(option) => option.upazila}
                            style={{ width: '93%' }}
                            value={postData.destination}
                            renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                    /> */}
                    {!posts && <>
                    <DestPlaceAuto destValue={destValue} />
                    <SourcePlaceAuto sourceValue={ sourceValue } />
                    </>
                    }
                    {/* <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Destination</InputLabel>
                        <Select
                        required
                        native
                        value={postData.destination}
                        onChange={(e) => setPostData({...postData, destination: e.target.value })}
                        label="Destination"
                        inputProps={{
                            name: 'Destination',
                            id: 'outlined-age-native-simple',
                        }}
                        >
                        <option aria-label="None" value="" />
                       { location.postcodes.map((dest, i) => 
                        <option key={i} value={dest.upazila}>{dest.upazila}</option>
                        )}
                        </Select>
                    </FormControl> */}
                    {/* <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Leaving From</InputLabel>
                        <Select
                        required
                        native
                        value={postData.source}
                        onChange={(e) => setPostData({...postData, source: e.target.value })}
                        label="Leaving From"
                        inputProps={{
                            name: 'Leaving From',
                            id: 'outlined-age-native-simple',
                        }}
                        >
                        <option aria-label="None" value="" />
                       { location.postcodes.map((dest,d) => 
                        <option key={d} value={dest.upazila}>{dest.upazila}</option>
                        )}
                        </Select>
                    </FormControl> */}
                     <TextField
                        required={true}
                        id="datetime-local"
                        label="Leaving Time"
                        type="datetime-local"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        //value={postData.leavingTime}
                        value={moment(postData.leavingTime).format('YYYY-MM-DDTHH:mm')}
                        onChange={(e) => setPostData({...postData, leavingTime: e.target.value })}
                    />
                     <TextField 
                     required={true}
                     name="message" 
                     variant="outlined" 
                     label="Message" 
                     placeholder="Any request!"
                     fullWidth
                     value={postData.message}
                     onChange={(e) => setPostData({...postData, message: e.target.value })}
                     />
                     {/* <TextField 
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
                     /> */}
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
                     {/* <TextField 
                     required={true}
                     name="tags" 
                     variant="outlined" 
                     label="Tags" 
                     fullWidth
                     value={postData.tags}
                     onChange={(e) => setPostData({...postData, tags: e.target.value.split(',') })}
                     /> */}
                    
                     
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
