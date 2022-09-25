import React, { useEffect, useState } from 'react'
import axios from 'axios'
import clsx from 'clsx'
import { Grid, LinearProgress, CardHeader, Card, Divider, Button, Collapse } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import Post from './Post/Post'
import useStyles from './styles'
import { isAuthenticated } from '../../../auth/auth'

const OwnPostList = () => {
    const {user} = isAuthenticated()
    const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
    const [posts, setPosts] = useState()

    useEffect(() => {
    axios.post('http://localhost:8080/posts/meAsGuest', {
        "id": user?._id
      })
      .then(function (response) {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }, [])
      const classes = useStyles();

      const Content = () => {
        return (
            !posts ? <LinearProgress /> : (
                <Grid className={classes.container} container alignItems="stretch" spacing={1}>
                    {posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={6} > 
                             <Post post={post} />
                        </Grid>
                    ))}
                </Grid>
            )
        );
      }

    return (
       
       <React.Fragment>
            <Card className={classes.cardActions}> 
        <CardHeader
          title="Here Is Your All Posts"
          color="secondary"
        />
        <Button className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })} size="large" color="secondary" onClick={handleExpandClick}>
         Click Here <ExpandMoreIcon />
        </Button>
        </Card>
        <Divider />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Content />
        </Collapse>
        </React.Fragment>
    )
}

export default OwnPostList