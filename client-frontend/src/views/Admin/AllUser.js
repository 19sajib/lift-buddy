import React from 'react'
import {
    Avatar,
    Card,
    CardContent,
    Grid,
    Typography, LinearProgress
  } from '@material-ui/core';
  import { red } from '@material-ui/core/colors';
  import PeopleIcon from '@material-ui/icons/PeopleOutlined';
  
  const AllUser = ({props, user}) => {

  return(
    <Card {...props}>
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
            Total User
            </Typography>
            {!user ? <LinearProgress /> :
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {user}
            </Typography>}
          </Grid>
          <Grid item>
            <Avatar style={{backgroundColor: red[600], height: 56, width: 56}}
            >
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        {/* <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            pt: 2
          }}
        >
          <ArrowUpwardIcon sx={{ color: green[900] }} />
          <Typography
            variant="body2"
            sx={{
              color: green[900],
              mr: 1
            }}
          >
            16%
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
  
  export default AllUser;