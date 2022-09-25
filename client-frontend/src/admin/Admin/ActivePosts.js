import React from 'react'
import { useSelector } from 'react-redux'
import {
    Avatar,
    Card,
    CardContent,
    Grid,
    Typography, LinearProgress
  } from '@material-ui/core';
  import PostAddIcon from '@material-ui/icons/PostAdd';
  import { indigo } from '@material-ui/core/colors';
  
  const Budget = (props) => {

  const {posts} = useSelector((state) => state.posts)

  return(
    <Card
      sx={{ height: '100%' }}
      {...props}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          style={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              Active Posts
            </Typography>
            {!posts?.length ? <LinearProgress /> :
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {posts?.length}
            </Typography>}
          </Grid>
          <Grid item>
            <Avatar style={{backgroundColor: indigo[600], height: 56, width: 56}}
            >
              <PostAddIcon />
            </Avatar>
          </Grid>
        </Grid>
        {/* <Box pt={2} display="flex" alignItems="center"
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ArrowDownwardIcon style={{color: red[900]}} sx={{ color: red[900] }} />
          <Typography
            style={{color: red[900], margin: 1}}
            sx={{
              color: red[900],
              mr: 1
            }}
            variant="body2"
          >
            12%
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Since last month
          </Typography>
        </Box> */}
      </CardContent>
    </Card>
  )
      };
  
  export default Budget;