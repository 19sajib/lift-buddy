import React,{ useState } from 'react'
import { Button, Container, Paper, Typography } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { resetpass } from '../../actions/auth'
import Input from './Input'
import useStyles from './styles'

const initialState = { password: ''}
const ResetPassword = () => {

    const classes = useStyles()

    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState(initialState)
    const dispatch = useDispatch()
    const {token} = useParams()
    //console.log(token);
    const history = useHistory()

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword )
    
    const newpass = async (e) => {
        e.preventDefault()

        dispatch(resetpass( {password, token, history}))

    }

    const handleChange = (e) => {
        setPassword(e.target.value)
    }


    return (
        <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3} variant="outlined" >
            <Typography variant="h5" color="secondary" gutterBottom align="center" >🔑Enter New Password</Typography>
        <form align="center" className={classes.form} >
        <Input required="true" name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
        <Button fullWidth variant="contained" color="primary" onClick={newpass} className={classes.submit}>
         Change Password
        </Button>
          </form>
          </Paper>
        </Container>
    )
}

export default ResetPassword;

