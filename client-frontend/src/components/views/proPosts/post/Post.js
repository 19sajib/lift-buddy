import React from 'react';
import { Card, Typography } from '@material-ui/core/';
// import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

// import { deleteProPost } from '../../../../actions/proPost'
import useStyles from './styles'
// import { isAuthenticated } from '../../../../auth/auth'

const Post = ({ post, setCurrentId }) => {
    const posts = useSelector((state) => state.posts)
    console.log(posts);
    const classes = useStyles();
    //const dispatch = useDispatch();
    //const user = isAuthenticated()


    return (
        <Card className={classes.card} >
             
            <div className={classes.overlay}>
                <Typography variant="h6">{post.destination}</Typography>
                <Typography variant="body2" color="textSecondary">{post.message}</Typography> 
            </div>
            
        </Card>      
    )
}
export default  Post;
