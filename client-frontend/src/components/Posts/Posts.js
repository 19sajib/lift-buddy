import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import load from '../../assests/images/load.gif'
import loading from '../../assests/images/ll.gif'

import Post from './Post/Post'
import useStyles from './styles'


const Posts = ({ setCurrentId }) => {
    const {posts, isLoading, rLoading} = useSelector((state) => state.posts)
   // console.log('newPost',posts);
    const classes = useStyles();

    
    if(rLoading) {
        return (
   <>
    <img src={loading} alt="load" className={classes.loading} />
    <div className={classes.Loadingcontainer}>
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                       {posts.map(post => {
                            return (
                           <Grid key={post._id} item xs={12} sm={12} lg={6}> 
                                <Post post={post} setCurrentId={setCurrentId} />
                           </Grid>
                            );
                            })}

                   </Grid> 
                   </div>
                   </>
                    )   
        
    }


    if (!posts.length && !isLoading) return <Typography variant="h3" align="center" color="secondary" >No Posts Found</Typography> ;

    return (

    isLoading ? <img src={load} alt="load" /> : (
           <Grid className={classes.container} container alignItems="stretch" spacing={3}>
               {posts.map(post => {
                    return (
                   <Grid key={post._id} item xs={12} sm={12} lg={6}> 
                        <Post post={post} setCurrentId={setCurrentId} />
                   </Grid>
                    );
                    })}
               {/* {posts.map((post) => (
                   <Grid key={post._id} item xs={12} sm={6}> 
                   <Post post={post} setCurrentId={setCurrentId} />
                   </Grid>
               ))} */}
           </Grid>
       )
    )
}
export default  Posts;
