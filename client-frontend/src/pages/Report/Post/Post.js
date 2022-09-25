import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Dialog, DialogActions, 
  DialogContent } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ListIcon from '@material-ui/icons/List';
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment'
import { useDispatch } from 'react-redux'

import { deletePost, likePost } from '../../../actions/posts'
import { isAuthenticated } from '../../../auth/auth'
import useStyles from './styles'
import Directions from '../../Posts/Map/MapDirection';


const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {user} = isAuthenticated()

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const GuestList = () => {
      if (post?.likes?.length > 0) {
        return post?.likes.find((like) => like === (user?._id))
          ? (
            <><ListAltIcon color="primary" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} Others Going` : `${post.likes.length > 1 ? 'You and 1 Person Going' : 'Only You are Going'}` }</>
          ) : (
            <><ListAltIcon color="primary" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Person Going' : 'Persons Going'}</>
          );
      }
  
      return <><ListAltIcon />&nbsp;Still Nobody Going</>;
    };

    const Likes = () => {
        if (post?.likes.find((like) => like === (user?._id))) {
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
              <CardMedia className={classes.media} image={post?.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?._id === post.creator) 
                 &&
                (<div className={classes.overlay2}>
               <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
                   <MoreHorizIcon fontSize="default" color="secondary"/>
               </Button>
            </div>)}
            <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" >Leaving At: { moment(post?.leavingTime).format('YYYY-MM-DD hh:mm A') }</Typography>  
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>I am leaving for {post.destination} from {post.source}, wanna join me?</Typography>  
            
            <CardContent>
                  <Button disabled variant="outlined" color="primary" onClick={handleClickOpen}>Wanna See The Possible Route?</Button>
                  <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                  <DialogContent>
                  <Directions origin={post.source} destination={post.destination} />  
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                  </Dialog>
            </CardContent>
            <Typography className={classes.infoLine} variant="body2" >Note: {post?.message} </Typography>
            <div className={classes.infoLine}>
            <ListIcon color="secondary" />Only {post?.guest} Person Can Go!
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
                {(user?._id !== post.creator)
                 &&
                (<Button size="small" color="secondary" disabled >
                <ReportIcon fontSize="small" />
                Report
            </Button>)}
            </CardActions>
        </Card>      
    )
}
export default  Post;
