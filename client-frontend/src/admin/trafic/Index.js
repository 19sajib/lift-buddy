import React from 'react'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography, Divider, TextField } from '@material-ui/core/';
import red from "@material-ui/core/colors/red";
import { toast } from "react-toastify";

import { isAuthenticated } from '../../auth/auth'

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
    const {user} = isAuthenticated()

    if(!user?.isAdmin) {
      history.push('/')
    }
    
    const [trafic, setTrafic] = React.useState()
    const [desktopTrafic, setDesktopTrafic] = React.useState()
    const [tabletTrafic, setTabletTrafic] = React.useState()
    const [mobileTrafic, setMobileTrafic] = React.useState()



    const handleSubmit = async (event) => {
        event.preventDefault()
        await Axios.post('http://localhost:8080/admin/dashboard/trafic', {
           trafic, desktopTrafic, tabletTrafic, mobileTrafic
           })
              .then(function (response) {
                console.log(response.data);
                history.push('/admin-dashboard')
                toast.success(response.data.message)
              })
              .catch(function (error) {
                //console.log(error);
                toast.error(error)
              });
    }     

    return (
        <div className={classes.root}>
            <Typography color="secondary" variant="h4" align="center" >Update Trafic Now!</Typography>
            <Divider variant="middle" />
            
        <div className={classes.head} >

            <TextField 
            required={true}
            variant="outlined" 
            fullWidth 
            className={classes.fileInput} 
            label="Enter Total Trafic"
            type="number"
            onChange={(e)=> setTrafic(e.target.value)}
            />
            <TextField 
            required={true}
            variant="outlined" 
            fullWidth 
            className={classes.fileInput} 
            label="Enter Desktop Trafic %"
            type="number"
            onChange={(e)=> setDesktopTrafic(e.target.value)}
            />
            <TextField 
            required={true}
            variant="outlined" 
            fullWidth 
            className={classes.fileInput} 
            label="Enter Tablet Trafic %"
            type="number"
            onChange={(e)=> setTabletTrafic(e.target.value)}
            />
            <TextField 
            required={true}
            variant="outlined" 
            fullWidth 
            className={classes.fileInput} 
            label="Enter Mobile Trafic %"
            type="number"
            onChange={(e)=> setMobileTrafic(e.target.value)}
            />
            <Button fullWidth onClick={handleSubmit} variant="outlined" color="primary" > Submit</Button>
        </div>
        </div>
    )
}

export default Index
