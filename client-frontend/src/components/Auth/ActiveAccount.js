import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'

import { activeAccount } from '../../actions/auth'


const ActiveAccount = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const { token } = useParams()
    //console.log(token);    
    
    const confirmEmail = async (e) => {
        e.preventDefault()

     dispatch(activeAccount({token}, history))

    }

    return (
            <Button align="center"  variant="contained" color="primary" onClick={confirmEmail}>
               Active Your Account
            </Button>
    )
}

export default ActiveAccount
