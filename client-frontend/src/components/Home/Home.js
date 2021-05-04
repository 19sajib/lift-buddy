import React, { useState, useEffect } from 'react'
import { Container, Grid, Grow, Box, Divider } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import Pagination from '@material-ui/lab/Pagination';
import { useSelector } from 'react-redux'

import {getPosts} from '../../actions/posts'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import useStyles from '../../styles'


const Home = () => {
     const posts = useSelector((state) => state.posts)
    // console.log(posts);
    // const filterData = posts.filter(obj => {
    //     return obj.destination === "Sajek"
    //   })
    // console.log(filterData);
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch(getPosts());

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])

    const postsPerPage = 6;
    const [page, setPage] = React.useState(1);
    // const [noOfPages] = React.useState(
    // Math.ceil(posts?.length / postsPerPage)
    // );

    // const handleChange = (event, value) => {
    //     setPage(value);
    //   };


    return (
        <div>
        <Grow in>
                <Container>
                <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                {/* <HomeHelper page={page} postsPerPage={postsPerPage} setCurrentId={setCurrentId} /> */}
                    <Grid item xs={12} sm={7}>
                    <Posts page={page} postsPerPage={postsPerPage} setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
                </Container>  
            </Grow>
                <Divider />
                <Box component="span">
                    {/* <Pagination
                    count={noOfPages}
                    page={page}
                    onChange={handleChange}
                    defaultPage={1}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                    classes={{ ul: classes.paginator }}
                    /> */}
                    <Pagination 
                    count={Math.ceil(posts.length%postsPerPage)===0 ? Math.ceil(posts.length/postsPerPage) : Math.ceil(posts.length/postsPerPage +1)} 
                    page={page} 
                    onChange={(event,val)=> setPage(val)} 
                    color="secondary"
                    size="large"
                    showFirstButton
                    showLastButton
                    classes={{ ul: classes.paginator }}
                     />
                </Box>
                </div>
    )
}

export default Home
