import React, { useState, useEffect } from 'react'
import { Container, Grid, Grow} from '@material-ui/core'
import { useDispatch } from 'react-redux'

import { readProPost } from '../../../actions/proPost'
import Form from '../../Form/ProForm'
import Posts from '../../views/proPosts/Posts'
import useStyles from '../../../styles'

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch(readProPost());

    useEffect(() => {
        dispatch(readProPost())
    }, [currentId, dispatch])

    return (
        <Grow in>
                <Container>
                <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                       <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
                </Container>  
            </Grow>
    )
}

export default Home
