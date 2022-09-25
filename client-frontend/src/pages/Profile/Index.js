import React from 'react';
import { Button, Card, Container, Grid } from '@material-ui/core';
import {useHistory, Link} from 'react-router-dom'

import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import OwnPostList from './OwnPostList/OwnPostList'
import { isAuthenticated } from '../../auth/auth'

const Account = () => {

  const history = useHistory()
  const { user } = isAuthenticated()
console.log(user);
  if(!user) {
    history.push('/')
  }


  return (
      <Container maxWidth="lg">
        {user.isAdmin &&
                  <>
                    <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
        <Card style={{marginBottom: '10px', }}>
            <Button style={{margin: '10px'}} component={Link} to="/admin-dashboard" 
            variant="outlined" color="primary" >View Admin Panel</Button>
        </Card>
        </Grid> </> }
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
        <Profile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
        <ProfileDetails />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
        <OwnPostList />
          </Grid>
        </Grid>
      </Container>
  );
};

export default Account;