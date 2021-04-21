import React,{ useState } from 'react'
import { Button, Container, Paper } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Input from './Input'
import useStyles from './styles'
import { forgetpass } from '../../actions/auth'

const initialState = { email: ''}

const ForgetPassword = () => {

    const classes = useStyles()

    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()

    const getEmail = async (e) => {
        e.preventDefault()

         dispatch(forgetpass(formData, history))

    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }


    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3} variant="outlined" >
            <form className={classes.form} >
              <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
               <Button  variant="contained" color="primary" onClick={getEmail} className={classes.submit}>
                    Send Password Reset Link
                </Button>
                </form>
        </Paper>
        </Container>
    )
}

export default ForgetPassword;
