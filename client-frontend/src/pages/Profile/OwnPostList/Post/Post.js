import React from 'react';
import { Card, CardActions, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ListIcon from '@material-ui/icons/List';
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard';
import moment from 'moment'
import { useDispatch } from 'react-redux'

import { deletePost, likePost } from '../../../../actions/posts'
import { isAuthenticated } from '../../../../auth/auth'
import useStyles from './styles'


const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {user} = isAuthenticated()


    const GuestList = () => {
      if (post.likes.length > 0) {
        return post.likes.find((like) => like === (user?._id))
          ? (
            <><ListAltIcon color="primary" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} Others Went` : `${post.likes.length > 1 ? 'You and 1 Person Went' : 'Only You Went'}` }</>
          ) : (
            <><ListAltIcon color="primary" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Person Went' : 'Persons Went'}</>
          );
      }
  
      return <><ListAltIcon />&nbsp;Nobody Went With You</>;
    };

    const Likes = () => {
        if (post.likes.find((like) => like === (user?._id))) {
          return (<>
              <Button size="small" color="primary" disabled onClick={() => dispatch(likePost({postId: post._id, userId: user._id}))}>
                <DepartureBoardIcon fontSize="small" />Cancle My Ride
                </Button>
                </>)
        }
        return (<>
              <Button size="small" color="primary" disabled onClick={() => dispatch(likePost({postId: post._id, userId: user._id}))}>
                <DepartureBoardIcon fontSize="small" />Confirm My Ride
                </Button></>
            );
      };

    return (
        <Card className={classes.card} >
             
            <div className={classes.details}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">Post Created At: {moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" >Leaving At: { post?.leavingTime }</Typography>  
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>I am leaving for {post.destination} from {post.source}, wanna join me?</Typography>  
            

            <div className={classes.infoLine}>
            <ListIcon color="secondary" />Only {post?.guest} Person Could Go!
            </div>
              
            <div className={classes.infoLine}>
                    <GuestList />
            </div>

            <CardActions className={classes.cardActions}>
                    <Likes />
                {(user?._id === post.creator)
                 &&
                (<Button size="small" color="secondary" disabled onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>)}
            </CardActions>
        </Card>      
    )
}
export default  Post;